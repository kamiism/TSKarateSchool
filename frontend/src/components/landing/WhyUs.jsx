import { useScrollReveal } from '../../hooks/useScrollReveal';

const reasons = [
  {
    num: '01',
    title: 'Certified Black Belt Instructors',
    desc: 'Every instructor holds a verified black belt with years of competitive and teaching experience in traditional Karate.',
  },
  {
    num: '02',
    title: 'Small Batch Training',
    desc: 'We limit class sizes to ensure personalized attention and accelerated skill development for every student.',
  },
  {
    num: '03',
    title: 'Tournament Ready',
    desc: 'Our students regularly compete and medal at state and national level karate championships.',
  },
  {
    num: '04',
    title: 'Holistic Development',
    desc: 'Beyond techniques — we build character, resilience, and life skills that extend far beyond the dojo.',
  },
];

export default function WhyUs() {
  const sectionRef = useScrollReveal();

  return (
    <section id="why" className="py-24 bg-brand-white" ref={sectionRef}>
      <div className="w-[min(1200px,92%)] mx-auto">
        <span className="reveal font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-3 block">
          // Why Choose Us
        </span>
        <h2 className="reveal text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.05] tracking-tight mb-6">
          Built<br />Different
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 mt-12 border-3 border-brand-black">
          {reasons.map((item, i) => (
            <div
              key={item.num}
              className={`reveal reveal-delay-${i + 1}
                         relative p-10 transition-colors duration-300 hover:bg-brand-ice group
                         ${i < 2 ? 'border-b-3 border-brand-black' : ''}
                         ${i % 2 === 0 ? 'md:border-r-3 md:border-brand-black' : ''}`}
            >
              <span className="font-mono text-5xl font-bold text-brand-ice absolute top-4 right-6 leading-none
                             transition-colors duration-300 group-hover:text-brand-purple">
                {item.num}
              </span>
              <h3 className="text-xl font-bold uppercase tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-brand-muted max-w-[340px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
