import { useScrollReveal } from '../hooks/useScrollReveal';

export default function CTA() {
  const sectionRef = useScrollReveal();

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-brand-white" ref={sectionRef}>
      <div className="w-[min(1200px,92%)] mx-auto">
        <div className="reveal brutal-offset border-3 border-brand-black p-16 max-md:p-10 text-center bg-brand-white">
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-tight mb-4">
            Ready to Begin?
          </h2>
          <p className="text-lg text-brand-muted mb-10 max-w-[500px] mx-auto leading-relaxed">
            Join hundreds of students who have transformed their lives through
            the discipline and art of Karate. Your first class is on us.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              id="cta-register"
              onClick={() => alert('Registration opening soon!')}
              className="inline-flex items-center justify-center font-mono text-sm font-bold uppercase tracking-wider
                         px-7 py-3.5 border-3 border-brand-black bg-brand-black text-brand-white cursor-pointer
                         transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-brand-purple hover:shadow-brutal-purple
                         active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              Register Now →
            </button>
            <button
              id="cta-contact"
              onClick={scrollToContact}
              className="inline-flex items-center justify-center font-mono text-sm font-bold uppercase tracking-wider
                         px-7 py-3.5 border-3 border-brand-black bg-brand-white text-brand-black cursor-pointer
                         transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-brand-ice hover:shadow-brutal
                         active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
