import React from 'react';
import { getStripePrices } from '@/lib/payments/stripe';
import Stripe from 'stripe';
import { PricingCard } from '@/components/ui/pricing-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { checkoutAction } from '@/lib/payments/actions';
import { SubmitButton } from '@/components/ui/submit-button';
import { 
  Star, 
  Check, 
  ArrowRight, 
  Shield, 
  Clock, 
  Users, 
  Coffee,
  Package,
  Truck,
  X,
  Zap,
  Heart,
  Award
} from 'lucide-react';
import Link from 'next/link';

const features = {
  base: [
    "Hasta 250g de café premium mensual",
    "Granos de origen único",
    "Tostado fresco semanal",
    "Guía de preparación incluida",
    "Envío gratis a domicilio",
    "Soporte por email",
    "Cancela cuando quieras"
  ],
  plus: [
    "Hasta 500g de café premium mensual", 
    "Acceso a mezclas exclusivas",
    "Granos de fincas premium",
    "Tostado fresco bi-semanal",
    "Guías detalladas de catación",
    "Envío gratis prioritario",
    "Soporte prioritario por chat",
    "Acceso a eventos virtuales",
    "Descuentos en compras adicionales",
    "Cancela cuando quieras"
  ]
};

const testimonials = [
  {
    name: "Laura Martínez",
    role: "CEO, Tech Startup",
    content: "El plan Plus es perfecto para nuestra oficina. La calidad es excepcional y el equipo ama la variedad.",
    rating: 5,
    avatar: "LM",
    plan: "Plus"
  },
  {
    name: "Roberto Silva",
    role: "Freelance Designer", 
    content: "El plan Base me da exactamente lo que necesito. Café increíble sin comprometerme a cantidades enormes.",
    rating: 5,
    avatar: "RS",
    plan: "Base"
  },
  {
    name: "Carmen López",
    role: "Marketing Manager",
    content: "Probé el período gratuito y me enamoré. Ahora no puedo imaginar mi rutina matutina sin Acme Cafes.",
    rating: 5,
    avatar: "CL",
    plan: "Plus"
  }
];

const comparisonFeatures = [
  {
    category: "Producto",
    features: [
      { name: "Cantidad mensual", base: "250g", plus: "500g" },
      { name: "Tipos de café", base: "Origen único", plus: "Origen único + Mezclas exclusivas" },
      { name: "Frecuencia de tostado", base: "Semanal", plus: "Bi-semanal" },
      { name: "Puntuación SCA", base: "85+ puntos", plus: "87+ puntos" }
    ]
  },
  {
    category: "Servicio",
    features: [
      { name: "Envío", base: "Gratis estándar", plus: "Gratis prioritario" },
      { name: "Soporte", base: "Email", plus: "Chat prioritario" },
      { name: "Garantía", base: "30 días", plus: "30 días" },
      { name: "Cancelación", base: "Cualquier momento", plus: "Cualquier momento" }
    ]
  },
  {
    category: "Extras",
    features: [
      { name: "Guías de preparación", base: "Básicas", plus: "Detalladas + Catación" },
      { name: "Eventos virtuales", base: "❌", plus: "✅ Acceso completo" },
      { name: "Descuentos adicionales", base: "❌", plus: "✅ 15% off" },
      { name: "Muestras especiales", base: "❌", plus: "✅ Mensual" }
    ]
  }
];

const faqs = [
  {
    question: "¿Realmente es gratis el período de prueba?",
    answer: "Sí, completamente gratis. Recibes tu primer envío sin costo y puedes cancelar antes de que termine el período de prueba sin ningún cargo."
  },
  {
    question: "¿Puedo cambiar de plan después de suscribirme?",
    answer: "Absolutamente. Puedes cambiar entre planes en cualquier momento desde tu cuenta. Los cambios se aplican en tu próximo ciclo de facturación."
  },
  {
    question: "¿Qué pasa si no me gusta el café que recibo?",
    answer: "Ofrecemos garantía de satisfacción del 100%. Si no estás completamente satisfecho, contáctanos y te enviamos un reemplazo gratis o te devolvemos tu dinero."
  },
  {
    question: "¿Puedo pausar mi suscripción si viajo?",
    answer: "Sí, puedes pausar tu suscripción hasta por 3 meses sin penalizaciones. Perfecto para vacaciones o viajes de trabajo."
  },
  {
    question: "¿Ofrecen descuentos para empresas?",
    answer: "Sí, tenemos planes especiales para equipos de 5+ personas con descuentos progresivos. Contáctanos para una cotización personalizada."
  },
  {
    question: "¿Cómo funciona la cancelación?",
    answer: "Super simple. Un clic en tu cuenta y listo. No hay penalizaciones, contratos a largo plazo ni preguntas incómodas."
  }
];

export default async function PricingPage() {
  const prices = await getStripePrices();
  const sortedPrices = prices.sort(
    (a, b) => (a.unit_amount || 0) - (b.unit_amount || 0)
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-orange-200 mb-8">
              <div className="flex -space-x-1">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-orange-500 border-2 border-white"></div>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">
                2,500+ empresarios satisfechos
              </span>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-6">
              Planes que se adaptan a{' '}
              <span className="text-orange-600">tu ritmo de vida</span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-8 mb-8">
              Desde el freelancer que necesita su dosis diaria hasta equipos completos. 
              <strong>Comienza gratis, cancela cuando quieras.</strong>
            </p>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 mb-12">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Garantía 30 días</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Período de prueba gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span>Sin compromiso</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Limited Time Offer Banner */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl p-6 mb-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-5 h-5" />
              <span className="font-semibold">Oferta por Tiempo Limitado</span>
            </div>
            <p className="text-lg">
              <strong>Primer mes GRATIS</strong> en cualquier plan + envío gratis por 3 meses
            </p>
            <p className="text-sm opacity-90 mt-1">
              Válido hasta fin de mes • Solo para nuevos usuarios
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {sortedPrices.map((price, index) => {
              const product = price.product as Stripe.Product;
              const isPopular = index === 1;
              const planFeatures = index === 0 ? features.base : features.plus;
              
              return (
                <div key={price.id} className="relative">
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 text-sm font-semibold">
                        🔥 Más Popular
                      </Badge>
                    </div>
                  )}
                  <div className={`relative rounded-2xl border-2 p-8 ${
                    isPopular 
                      ? 'border-orange-600 shadow-2xl scale-105 bg-white' 
                      : 'border-gray-200 bg-white hover:border-orange-300 transition-colors'
                  }`}>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <div className="mb-4">
                        <span className="text-5xl font-bold text-gray-900">
                          ${price.unit_amount ? Math.floor(price.unit_amount / 100) : 0}
                        </span>
                        <span className="text-xl text-gray-500 ml-2">
                          MXN/mes
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-green-500" />
                        <span className="text-green-700 font-medium">
                          {price.recurring?.trial_period_days || 0} días gratis
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {planFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                                         <form action={checkoutAction} className="w-full">
                       <input type="hidden" name="priceId" value={price.id} />
                       <input type="hidden" name="trialPeriodDays" value={price.recurring?.trial_period_days || 0} />
                       <Button 
                         type="submit"
                         className={`w-full h-12 text-lg font-semibold rounded-lg transition-all duration-200 ${
                           isPopular
                             ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg'
                             : 'bg-gray-900 hover:bg-gray-800 text-white'
                         }`}
                       >
                         Comenzar Prueba Gratuita
                         <ArrowRight className="ml-2 w-5 h-5" />
                       </Button>
                     </form>
                    
                    <p className="text-center text-sm text-gray-500 mt-3">
                      Sin tarjeta de crédito • Cancela cuando quieras
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enterprise CTA */}
          <div className="text-center mt-16">
            <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <Award className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                ¿Necesitas algo más grande?
              </h3>
              <p className="text-gray-600 mb-6">
                Planes empresariales con descuentos por volumen, facturación personalizada 
                y gestión dedicada de cuenta.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
              >
                Hablar con Ventas
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comparación Detallada de Planes
            </h2>
            <p className="text-xl text-gray-600">
              Todo lo que incluye cada plan, lado a lado
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">
                      Funcionalidad
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">
                      Plan Base
                    </th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900 bg-orange-50">
                      Plan Plus ⭐
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category, categoryIdx) => (
                    <React.Fragment key={categoryIdx}>
                      <tr className="bg-gray-100">
                        <td colSpan={3} className="py-3 px-6 font-semibold text-gray-800 text-sm uppercase tracking-wide">
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, featureIdx) => (
                        <tr key={featureIdx} className="border-b border-gray-100">
                          <td className="py-4 px-6 text-gray-700 font-medium">
                            {feature.name}
                          </td>
                          <td className="py-4 px-6 text-center text-gray-600">
                            {feature.base}
                          </td>
                          <td className="py-4 px-6 text-center text-gray-600 bg-orange-50/50">
                            {feature.plus}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xl text-gray-600">
              Historias reales de personas que encontraron su plan perfecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 relative">
                <div className="absolute top-4 right-4">
                  <Badge variant={testimonial.plan === 'Plus' ? 'default' : 'secondary'} className="text-xs">
                    Plan {testimonial.plan}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Money-Back Guarantee */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Garantía de Satisfacción 100%
            </h2>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              Si no estás completamente satisfecho con tu suscripción en los primeros 30 días, 
              te devolvemos tu dinero. Sin preguntas, sin complicaciones.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Satisfacción garantizada</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>30 días para decidir</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span>98% de retención</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600">
              Respuestas a las dudas más comunes sobre nuestros planes
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            ¿Listo para el mejor café de tu vida?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Más de 2,500 personas ya disfrutan de café excepcional cada día. 
            Únete a ellos con tu prueba gratuita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold text-orange-600 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-200"
            >
              Comenzar Prueba Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold text-white border-2 border-white rounded-lg hover:bg-white hover:text-orange-600 transition-all duration-200"
            >
              Hablar con un Experto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 