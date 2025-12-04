import { Palette, Zap, Users } from 'lucide-react';

const Services = () => (
  <section id="services" className="py-24 px-4 bg-[#F8FAFC]">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-light text-center mb-16 text-[#0D0D12]">
        Nuestros Servicios
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 text-center border border-[#CBD5E1]">
          <Palette className="w-12 h-12 text-[#9747FF] mx-auto mb-6" />
          <h3 className="text-xl font-medium mb-4 text-[#0D0D12]">Diseño de Logo Personalizado</h3>
          <p className="text-[#374151] leading-relaxed">
            Logos a medida creados para reflejar tu identidad de marca única y valores.
          </p>
        </div>
        <div className="bg-white p-8 text-center border border-[#CBD5E1]">
          <Zap className="w-12 h-12 text-[#38BDF8] mx-auto mb-6" />
          <h3 className="text-xl font-medium mb-4 text-[#0D0D12]">Identidad de Marca</h3>
          <p className="text-[#374151] leading-relaxed">
            Paquetes completos de identidad visual incluyendo paletas de colores y tipografía.
          </p>
        </div>
        <div className="bg-white p-8 text-center border border-[#CBD5E1] sm:col-span-2 lg:col-span-1">
          <Users className="w-12 h-12 text-[#9747FF] mx-auto mb-6" />
          <h3 className="text-xl font-medium mb-4 text-[#0D0D12]">Rediseño de Logo</h3>
          <p className="text-[#374151] leading-relaxed">
            Moderniza tu logo existente para alinearlo con las tendencias actuales de diseño.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Services;