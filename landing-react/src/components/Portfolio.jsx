import { portfolioLogos } from '../data/content';

const Portfolio = () => {
  return (
    <section id="portfolio" className="pt-32 pb-24 px-4 bg-[#0D0D12]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light text-center mb-16 text-[#F8FAFC]">
          Portafolio
        </h2>
        <div className="overflow-hidden">
          <div className="flex animate-scroll space-x-6">
            {portfolioLogos.concat(portfolioLogos).map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="flex-shrink-0 w-32 h-32 bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-center hover:bg-[#CBD5E1] transition-colors duration-300 rounded-lg">
                <div className={`w-20 h-20 ${logo.color} rounded-lg flex items-center justify-center text-[#F8FAFC] font-bold text-xl`}>
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