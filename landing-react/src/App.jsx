import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <Hero />
      <Portfolio />
      <Testimonials />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
