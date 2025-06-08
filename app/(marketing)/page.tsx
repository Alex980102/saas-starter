import { Coffee, Package, Truck, Star, Check, ArrowRight, Users, Shield, Clock } from 'lucide-react';
import Link from 'next/link';
import { getStripePrices } from '@/lib/payments/stripe';
import Stripe from 'stripe';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { checkoutAction } from '@/lib/payments/actions';

const testimonials = [
  {
    name: "María González",
    role: "Diseñadora",
    content: "El mejor café que he probado. La calidad es excepcional y llega súper fresco cada mes.",
    rating: 5,
    avatar: "MG"
  },
  {
    name: "Carlos Mendoza", 
    role: "Emprendedor",
    content: "Acme Cafes cambió completamente mi rutina matutina. No puedo imaginar mi día sin este café.",
    rating: 5,
    avatar: "CM"
  },
  {
    name: "Ana Rodríguez",
    role: "Arquitecta", 
    content: "La suscripción es perfecta para mi oficina. Todo el equipo ama la variedad y calidad.",
    rating: 5,
    avatar: "AR"
  }
];

const faqs = [
  {
    question: "¿Puedo cancelar mi suscripción en cualquier momento?",
    answer: "Sí, puedes cancelar tu suscripción en cualquier momento sin penalizaciones. Solo accede a tu cuenta y cancela con un clic."
  },
  {
    question: "¿Cómo funciona el período de prueba gratuito?",
    answer: "Tu período de prueba comienza cuando te suscribes. Durante este tiempo, recibes tu primer envío gratis y puedes explorar todos los beneficios sin costo."
  },
  {
    question: "¿De dónde viene el café?",
    answer: "Trabajamos directamente con productores de café de especialidad de Colombia, Guatemala, Costa Rica y Etiopía, asegurando comercio justo y máxima calidad."
  },
  {
    question: "¿Con qué frecuencia recibo mis envíos?",
    answer: "Los envíos se realizan cada 30 días. Puedes pausar, adelantar o retrasar tu próximo envío en cualquier momento desde tu cuenta."
  },
  {
    question: "¿Qué pasa si no me gusta el café?",
    answer: "Ofrecemos garantía de satisfacción del 100%. Si no estás completamente satisfecho, te devolvemos tu dinero sin preguntas."
  }
];

export default async function LandingPage() {
  const prices = await getStripePrices();
  const sortedPrices = prices.sort(
    (a, b) => (a.unit_amount || 0) - (b.unit_amount || 0)
  );
  
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
          <div className="text-center">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-orange-200 mb-8">
              <div className="flex -space-x-1">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-orange-500 border-2 border-white"></div>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">
                Más de 2,500 cafeteros felices
              </span>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl mb-6">
              El mejor café de especialidad,{' '}
              <span className="text-orange-600">directo a tu puerta</span>
            </h1>
            
            <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-8 mb-10">
              Descubre granos de café excepcionales seleccionados por expertos, 
              tostados a la perfección y entregados frescos cada mes. 
              <strong>Comienza tu prueba gratuita hoy.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="#plans"
                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold text-white bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700 hover:shadow-xl transition-all duration-200 group"
              >
                Comenzar Prueba Gratuita
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold text-gray-700 bg-white rounded-lg shadow-sm border border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                Ver cómo funciona
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Garantía de satisfacción</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Envío gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Cancela cuando quieras</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              ¿Por qué elegir Acme Cafes?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No somos solo otra suscripción de café. Somos tu conexión directa con los mejores granos del mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Coffee className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Calidad Premium</h3>
              <p className="text-gray-600">
                Granos 100% arábica de origen único, puntuados por encima de 85 puntos por expertos catadores.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comercio Directo</h3>
              <p className="text-gray-600">
                Trabajamos directamente con productores, asegurando precios justos y relaciones a largo plazo.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Package className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tostado Fresco</h3>
              <p className="text-gray-600">
                Tostamos semanalmente en pequeños lotes y enviamos dentro de 48 horas post-tostado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="how-it-works" className="py-20 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">¿Cómo Funciona?</Badge>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Tu café perfecto en 3 simples pasos
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hemos diseñado la experiencia más simple para que disfrutes del mejor café sin complicaciones.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="relative text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Package className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-orange-600">1</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Elige tu Plan</h3>
              <p className="text-gray-600">
                Selecciona la suscripción que mejor se adapte a tu consumo y preferencias de café.
              </p>
            </div>
            
            <div className="relative text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Coffee className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-orange-600">2</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Recibe Café Fresco</h3>
              <p className="text-gray-600">
                Tostamos los granos justo antes del envío para garantizar la máxima frescura y sabor.
              </p>
            </div>
            
            <div className="relative text-center">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Star className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-orange-600">3</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Disfruta</h3>
              <p className="text-gray-600">
                Prepara y disfruta de una experiencia de café excepcional desde la comodidad de tu hogar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xl text-gray-600">
              Más de 2,500 personas ya disfrutan del mejor café cada día
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
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

      {/* Pricing Section */}
      <section id="plans" className="py-20 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Nuestros Planes</Badge>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Encuentra la suscripción perfecta para ti
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Planes simples y transparentes. Comienza tu prueba gratuita y cancela en cualquier momento.
            </p>
          </div>

          {/* Limited Time Offer Banner */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-2xl p-6 mb-12 text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5" />
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
              const features = product.metadata.features?.split(';') || [];
              
              return (
                <div key={price.id} className="relative">
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 text-sm font-semibold">
                        🔥 Más Popular
                      </Badge>
                    </div>
                  )}
                  <div className={`relative rounded-2xl border-2 p-8 bg-white transition-all duration-200 ${
                    isPopular 
                      ? 'border-orange-600 shadow-2xl scale-105' 
                      : 'border-gray-200 hover:border-orange-300 hover:shadow-lg'
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
                      {features.map((feature, idx) => (
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

          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto shadow-sm border border-gray-200">
              <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                ¿Necesitas algo más grande?
              </h3>
              <p className="text-gray-600 mb-6">
                Planes empresariales con descuentos por volumen, facturación personalizada 
                y gestión dedicada de cuenta.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
              >
                Ver Todos los Planes
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600">
              Todo lo que necesitas saber sobre Acme Cafes
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

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
            ¿Listo para el mejor café de tu vida?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de amantes del café que ya disfrutan de granos excepcionales cada día. 
            Comienza tu prueba gratuita hoy.
          </p>
          <Link
            href="#plans"
            className="inline-flex items-center justify-center h-14 px-8 text-lg font-semibold text-orange-600 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-200 group"
          >
            Comenzar Prueba Gratuita
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Coffee className="h-8 w-8 text-orange-500" />
                <span className="ml-2 text-2xl font-bold">Acme Cafes</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Conectamos a los amantes del café con los mejores granos del mundo, 
                apoyando a productores locales y ofreciendo una experiencia excepcional.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>Garantía de satisfacción</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  <span>Envío gratis</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Compañía</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/about" className="hover:text-white transition-colors">Acerca de</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Carreras</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contacto</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/help" className="hover:text-white transition-colors">Centro de Ayuda</Link></li>
                <li><Link href="/shipping" className="hover:text-white transition-colors">Envíos</Link></li>
                <li><Link href="/returns" className="hover:text-white transition-colors">Devoluciones</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacidad</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Acme Cafes. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Términos de Servicio
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 