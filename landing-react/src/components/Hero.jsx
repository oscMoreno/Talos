import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D0D12] via-[#1a1a2e] to-[#9747FF] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#9747FF]/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-[#38BDF8]/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-[#9747FF]/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-[#38BDF8]/15 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-7xl font-bold text-[#F8FAFC] mb-6 animate-fade-in-up">
          Crea Logos que
          <span className="block bg-gradient-to-r from-[#9747FF] to-[#38BDF8] bg-clip-text text-transparent">
            Impactan
          </span>
        </h1>
        <p className="text-xl sm:text-2xl text-[#CBD5E1] mb-12 max-w-2xl mx-auto animate-fade-in-up delay-300">
          Diseñamos identidades visuales únicas que conectan con tu audiencia y elevan tu marca al siguiente nivel.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-600">
          <button
            onClick={() => scrollToSection('contact')}
            className="group bg-gradient-to-r from-[#9747FF] to-[#38BDF8] text-[#F8FAFC] px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-[#9747FF]/50 transition-all duration-300 transform hover:scale-105"
          >
            Comienza tu Proyecto
            <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className="border-2 border-[#CBD5E1] text-[#F8FAFC] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#CBD5E1]/10 transition-all duration-300"
          >
            Ver Portafolio
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#CBD5E1] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[#CBD5E1] rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;