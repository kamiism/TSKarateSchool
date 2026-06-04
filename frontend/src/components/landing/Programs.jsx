import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Shield, Zap, Flame, Clock } from 'lucide-react';

const programs = [
  {
    icon: <Shield size={40} strokeWidth={1.5} />,
    title: 'Little Warriors',
    age: 'Ages 4 – 7',
    desc: 'Fun-based karate fundamentals that build coordination, confidence, and social skills in young learners.',
    schedule: 'Mon / Wed / Fri — 4:00 PM',
  },
  {
    icon: <Zap size={40} strokeWidth={1.5} />,
    title: 'Junior Karatekas',
    age: 'Ages 8 – 14',
    desc: 'Structured training in kata, kumite, and self-defense with a focus on discipline and character development.',
    schedule: 'Mon – Sat — 5:30 PM',
  },
  {
    icon: <Flame size={40} strokeWidth={1.5} />,
    title: 'Adult & Advanced',
    age: 'Ages 15+',
    desc: 'Intensive training for serious practitioners — master advanced kata, competitive kumite, and self-defense techniques.',
    schedule: 'Mon – Sat — 7:00 PM',
  },
];

export default function Programs() {
  const sectionRef = useScrollReveal();

  return (
    <section id="programs" className="py-24 bg-brand-black text-brand-white" ref={sectionRef}>
      <div className="w-[min(1200px,92%)] mx-auto">
        <span className="reveal font-mono text-xs tracking-[0.2em] uppercase text-brand-ice mb-3 block">
          // Our Programs
        </span>
        <h2 className="reveal text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.05] tracking-tight mb-6 text-brand-white">
          Train at<br />Every Level
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-12">
          {programs.map((program, i) => (
            <div
              key={program.title}
              className={`reveal reveal-delay-${i + 1}
                         program-accent relative overflow-hidden
                         border-2 border-brand-white/15 bg-brand-white/[0.03] p-10
                         transition-all duration-300 hover:border-brand-ice hover:-translate-x-[3px] hover:-translate-y-[3px]`}
            >
              <div className="mb-6 text-brand-purple">{program.icon}</div>
              <h3 className="text-xl font-bold uppercase tracking-wide mb-3">
                {program.title}
              </h3>
              <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-ice mb-4 block">
                {program.age}
              </span>
              <p className="text-sm leading-relaxed text-brand-ice mb-6">
                {program.desc}
              </p>
              <span className="font-mono text-xs text-brand-muted flex items-center gap-2">
                <Clock size={14} className="text-brand-ice" /> {program.schedule}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
