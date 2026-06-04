import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function Testimonial() {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-16 bg-brand-purple text-brand-white overflow-hidden" ref={sectionRef}>
      <div className="reveal w-[min(1200px,92%)] mx-auto text-center">
        <blockquote className="text-[clamp(1.3rem,3vw,2rem)] font-medium leading-relaxed max-w-[700px] mx-auto mb-8 italic">
          "The way of karate is not about fighting — it's about building an
          indomitable spirit. At T.S Karate School, we forge warriors for life."
        </blockquote>
        <span className="font-mono text-[0.8rem] tracking-[0.15em] uppercase text-brand-ice">
          — Sensei, T.S Karate School
        </span>
      </div>
    </section>
  );
}
