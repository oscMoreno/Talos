import { portfolioLogos } from '../data/content';

const Portfolio = () => {
  return (
    <section id="portfolio" className="pt-32 pb-24 px-4 bg-gradient-to-b from-[#0D0D12] to-[#1a1a2e]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-[#F8FAFC] bg-gradient-to-r from-[#9747FF] to-[#38BDF8] bg-clip-text text-transparent">
          Nuestro Portafolio
        </h2>
        <div className="overflow-hidden">
          <div className="flex animate-scroll space-x-6">
            {portfolioLogos.concat(portfolioLogos).map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-[#F8FAFC] to-[#CBD5E1] border border-[#9747FF]/20 flex items-center justify-center hover:shadow-lg hover:shadow-[#9747FF]/30 hover:scale-105 transition-all duration-300 rounded-xl backdrop-blur-sm">
                <div className={`w-20 h-20 ${logo.color} rounded-lg flex items-center justify-center text-[#F8FAFC] font-bold text-xl shadow-inner`}>
                  {logo.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;