import { Mail, Phone, MapPin, Facebook, Youtube } from 'lucide-react';

const Footer = () => (
  <footer className="py-16 px-4 bg-[#0D0D12] text-[#F8FAFC]">
    <div className="max-w-6xl mx-auto text-center">
      <div className="flex justify-center space-x-12 mb-8">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#9747FF] transition-all duration-300 transform hover:scale-110 p-3 rounded-full bg-[#F8FAFC]/10 hover:bg-[#9747FF]/20">
          <Facebook className="w-10 h-10 text-[#38BDF8]" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#9747FF] transition-all duration-300 transform hover:scale-110 p-3 rounded-full bg-[#F8FAFC]/10 hover:bg-[#9747FF]/20">
          <Youtube className="w-10 h-10 text-[#38BDF8]" />
        </a>
        <div className="p-3 rounded-full bg-[#F8FAFC]/10">
          <Mail className="w-10 h-10 text-[#38BDF8]" />
        </div>
        <div className="p-3 rounded-full bg-[#F8FAFC]/10">
          <Phone className="w-10 h-10 text-[#38BDF8]" />
        </div>
        <div className="p-3 rounded-full bg-[#F8FAFC]/10">
          <MapPin className="w-10 h-10 text-[#38BDF8]" />
        </div>
      </div>
      <p className="text-[#CBD5E1]">&copy; 2024 Servicios de Creación de Logos Talos. Todos los derechos reservados.</p>
    </div>
  </footer>
);

export default Footer;