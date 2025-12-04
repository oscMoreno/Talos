import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0D0D12]/95 backdrop-blur-sm z-50 border-b border-[#CBD5E1]/20">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-[#F8FAFC] font-bold text-xl">Talos</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('portfolio')} className="text-[#F8FAFC] hover:text-[#9747FF] transition-colors duration-300">
              Portafolio
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-[#F8FAFC] hover:text-[#9747FF] transition-colors duration-300">
              Testimonios
            </button>
            <button onClick={() => scrollToSection('services')} className="text-[#F8FAFC] hover:text-[#9747FF] transition-colors duration-300">
              Servicios
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-[#F8FAFC] hover:text-[#9747FF] transition-colors duration-300">
              Contacto
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#F8FAFC] hover:text-[#9747FF] transition-colors duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-[#CBD5E1]/20 pt-4">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('portfolio')} className="text-[#F8FAFC] hover:text-[#9747FF] transition-colors duration-300 text-left">
                Portafolio
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-[#F8FAFC] hover:text-[#9747FF] transition-colors duration-300 text-left">
                Testimonios
              </button>
              <button onClick={() => scrollToSection('services')} className="text-[#F8FAFC] hover:text-[#9747FF] transition-colors duration-300 text-left">
                Servicios
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-[#F8FAFC] hover:text-[#9747FF] transition-colors duration-300 text-left">
                Contacto
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;