import { stripe } from '../payments/stripe';
import { db } from './drizzle';
import { users, teams, teamMembers } from './schema';
import { hashPassword } from '@/lib/auth/session';
import { eq } from 'drizzle-orm';

async function cleanStripe() {
  console.log('Cleaning up existing Stripe products and prices...');
  const products = await stripe.products.list({ limit: 100, active: true });

  for (const product of products.data) {
    const prices = await stripe.prices.list({ product: product.id, active: true });
    for (const price of prices.data) {
      await stripe.prices.update(price.id, { active: false });
    }
    await stripe.products.update(product.id, { active: false });
    console.log(`Archived product: ${product.name} (${product.id})`);
  }
  console.log('Stripe cleanup complete.');
}

async function createStripeProducts() {
  console.log('Creating Stripe products and prices...');

  const baseProduct = await stripe.products.create({
    name: 'Base',
    description: 'Base subscription plan',
    metadata: {
      features: 'Unlimited Usage;Unlimited Workspace Members;Email Support'
    }
  });

  await stripe.prices.create({
    product: baseProduct.id,
    unit_amount: 16000, // $160 MXN in cents
    currency: 'mxn',
    recurring: {
      interval: 'month',
      trial_period_days: 7,
    },
  });

  const plusProduct = await stripe.products.create({
    name: 'Plus',
    description: 'Plus subscription plan',
    metadata: {
      features:
        'Everything in Base, and:;Early Access to New Features;24/7 Support + Slack Access'
    }
  });

  await stripe.prices.create({
    product: plusProduct.id,
    unit_amount: 24000, // $240 MXN in cents
    currency: 'mxn',
    recurring: {
      interval: 'month',
      trial_period_days: 14,
    },
  });

  console.log('Stripe products and prices created successfully.');
}

async function seedDatabase() {
  console.log('Seeding database...');
  const email = 'test@test.com';

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    console.log('Test user already exists. Skipping database seed.');
    return;
  }

  const passwordHash = await hashPassword('admin123');

  const [testUser] = await db
    .insert(users)
    .values([
      {
        email: email,
        passwordHash: passwordHash,
        role: "owner",
      },
    ])
    .returning();

  console.log('Initial user created.');

  const [testTeam] = await db
    .insert(teams)
    .values({
      name: 'Test Team',
    })
    .returning();

  await db.insert(teamMembers).values({
    teamId: testTeam.id,
    userId: testUser.id,
    role: 'owner',
  });

  console.log('Database seeded successfully.');
}

async function main() {
  try {
    await cleanStripe();
    await createStripeProducts();
    await seedDatabase();
  } catch (error) {
    console.error('Seed process failed:', error);
    process.exit(1);
  }
}

main();
