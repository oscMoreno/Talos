const Contact = () => (
  <section id="contact" className="py-24 px-4 bg-[#F8FAFC]">
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-light text-center mb-12 text-[#0D0D12]">
        Contáctanos
      </h2>
      <form className="bg-white p-8 border border-[#CBD5E1]">
        <div className="mb-6">
          <label className="block text-[#0D0D12] mb-2 font-medium">Nombre</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-[#CBD5E1] focus:outline-none focus:border-[#9747FF] transition-colors duration-300"
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#0D0D12] mb-2 font-medium">Correo Electrónico</label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-[#CBD5E1] focus:outline-none focus:border-[#9747FF] transition-colors duration-300"
          />
        </div>
        <div className="mb-8">
          <label className="block text-[#0D0D12] mb-2 font-medium">Mensaje</label>
          <textarea
            className="w-full px-4 py-3 border border-[#CBD5E1] focus:outline-none focus:border-[#9747FF] transition-colors duration-300 h-32 resize-none"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-[#9747FF] text-[#F8FAFC] py-4 font-medium hover:bg-[#8B3DFF] transition-colors duration-300"
        >
          Enviar Mensaje
        </button>
      </form>
    </div>
  </section>
);

export default Contact;