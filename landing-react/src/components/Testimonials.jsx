import { Star } from 'lucide-react';
import { testimonials } from '../data/content';

const Testimonials = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-[#9747FF] fill-[#9747FF]' : 'text-[#CBD5E1]'}`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-24 px-4 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light text-center mb-16 text-[#0D0D12]">
          Testimonios
        </h2>
        <div className="overflow-hidden">
          <div className="flex animate-scroll space-x-6">
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <div key={`${testimonial.id}-${index}`} className="flex-shrink-0 w-80 bg-white p-6 border border-[#CBD5E1] rounded-lg">
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-[#374151] mb-4 leading-relaxed italic text-sm">
                  "{testimonial.comment}"
                </p>
                <div className="font-medium text-[#0D0D12] text-sm">
                  {testimonial.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;