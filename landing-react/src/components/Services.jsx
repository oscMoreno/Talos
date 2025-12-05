import { Palette, Zap, Users } from 'lucide-react';

const Services = () => (
  <section id="services" className="py-24 px-4 bg-gradient-to-b from-[#F8FAFC] to-[#E2E8F0] relative overflow-hidden">
    {/* Background decorative elements */}
    <div className="absolute inset-0">
      <div className="absolute top-10 left-10 w-20 h-20 bg-[#9747FF]/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#38BDF8]/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#9747FF]/5 rounded-full blur-2xl"></div>
    </div>

    <div className="max-w-6xl mx-auto relative z-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#9747FF] to-[#38BDF8] bg-clip-text text-transparent">
        Nuestros Servicios
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="group bg-gradient-to-br from-white to-[#F8FAFC] p-8 text-center border border-[#CBD5E1]/50 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#9747FF]/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 backdrop-blur-sm">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#9747FF]/20 rounded-full blur-xl group-hover:bg-[#9747FF]/30 transition-all duration-300"></div>
            <Palette className="w-12 h-12 text-[#9747FF] mx-auto relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#9747FF] to-[#9747FF] bg-clip-text text-transparent">Diseño de Logo Personalizado</h3>
          <p className="text-[#374151] leading-relaxed group-hover:text-[#0D0D12] transition-colors duration-300">
            Logos a medida creados para reflejar tu identidad de marca única y valores.
          </p>
        </div>
        <div className="group bg-gradient-to-br from-white to-[#F8FAFC] p-8 text-center border border-[#CBD5E1]/50 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#38BDF8]/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 backdrop-blur-sm">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#38BDF8]/20 rounded-full blur-xl group-hover:bg-[#38BDF8]/30 transition-all duration-300"></div>
            <Zap className="w-12 h-12 text-[#38BDF8] mx-auto relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#38BDF8] to-[#38BDF8] bg-clip-text text-transparent">Identidad de Marca</h3>
          <p className="text-[#374151] leading-relaxed group-hover:text-[#0D0D12] transition-colors duration-300">
            Paquetes completos de identidad visual incluyendo paletas de colores y tipografía.
          </p>
        </div>
        <div className="group bg-gradient-to-br from-white to-[#F8FAFC] p-8 text-center border border-[#CBD5E1]/50 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#9747FF]/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[#9747FF]/20 rounded-full blur-xl group-hover:bg-[#9747FF]/30 transition-all duration-300"></div>
            <Users className="w-12 h-12 text-[#9747FF] mx-auto relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#9747FF] to-[#9747FF] bg-clip-text text-transparent">Rediseño de Logo</h3>
          <p className="text-[#374151] leading-relaxed group-hover:text-[#0D0D12] transition-colors duration-300">
            Moderniza tu logo existente para alinearlo con las tendencias actuales de diseño.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Services;