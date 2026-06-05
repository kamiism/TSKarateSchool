import { useState } from 'react';
import { Lock } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

// Placeholder syllabus — content will be provided later
const beltSyllabus = [
  {
    belt: 'White Belt',
    color: '#F5F5F5',
    borderColor: '#999',
    level: '10th Kyu',
    topics: [
      'Basic stance (Zenkutsu-dachi, Kokutsu-dachi)',
      'Oi-zuki (Lunge Punch)',
      'Age-uke (Rising Block)',
      'Mae-geri (Front Kick)',
      'Taikyoku Shodan (Kata)',
      'Dojo etiquette & Rei (Bowing)',
    ],
  },
  {
    belt: 'Yellow Belt',
    color: '#FFD700',
    borderColor: '#DAA520',
    level: '8th Kyu',
    topics: [
      'Gyaku-zuki (Reverse Punch)',
      'Soto-uke (Outside Block)',
      'Yoko-geri (Side Kick)',
      'Heian Shodan (Kata)',
      'Basic Kumite drills',
      'Counting in Japanese (1–10)',
    ],
  },
  {
    belt: 'Orange Belt',
    color: '#FF8C00',
    borderColor: '#CC7000',
    level: '7th Kyu',
    topics: [
      'Uchi-uke (Inside Block)',
      'Shuto-uke (Knife-hand Block)',
      'Mawashi-geri (Roundhouse Kick)',
      'Heian Nidan (Kata)',
      'Three-step sparring (Sanbon Kumite)',
      'Basic self-defense techniques',
    ],
  },
  {
    belt: 'Green Belt',
    color: '#228B22',
    borderColor: '#1A6B1A',
    level: '5th Kyu',
    topics: [
      'Empi-uchi (Elbow Strike)',
      'Ushiro-geri (Back Kick)',
      'Heian Sandan & Yondan (Kata)',
      'One-step sparring (Ippon Kumite)',
      'Combination techniques',
      'Introduction to Bunkai (application)',
    ],
  },
  {
    belt: 'Blue Belt',
    color: '#1E90FF',
    borderColor: '#0B6EC5',
    level: '3rd Kyu',
    topics: [
      'Advanced combination attacks',
      'Heian Godan (Kata)',
      'Tekki Shodan (Kata)',
      'Free sparring basics (Jiyu Kumite)',
      'Advanced self-defense',
      'Tournament preparation',
    ],
  },
  {
    belt: 'Brown Belt',
    color: '#8B4513',
    borderColor: '#6B3410',
    level: '1st Kyu',
    topics: [
      'Bassai Dai (Kata)',
      'Kanku Dai (Kata)',
      'Advanced Jiyu Kumite',
      'Advanced Bunkai analysis',
      'Teaching assistance (Sempai role)',
      'Mental discipline & philosophy',
    ],
  },
  {
    belt: 'Black Belt',
    color: '#000505',
    borderColor: '#3B3355',
    level: 'Shodan',
    topics: [
      'Jion (Kata)',
      'Enpi (Kata)',
      'Mastery of all previous Kata',
      'Advanced tournament Kumite',
      'Instructor development',
      'Karate-Do philosophy & history',
    ],
  },
];

export default function Syllabus({ currentBelt }) {
  const currentBeltIndex = beltSyllabus.findIndex(item => item.belt === currentBelt);
  const maxAccessibleIdx = currentBeltIndex !== -1 ? currentBeltIndex : 0;
  const [openBelt, setOpenBelt] = useState(currentBelt);
  const sectionRef = useScrollReveal();

  return (
    <section id="syllabus" className="py-16 bg-brand-white" ref={sectionRef}>
      <div className="w-[min(1200px,92%)] mx-auto">
        <h2 className="reveal text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight mb-10">
          Your Path<br />Forward
        </h2>

        {/* Accordion */}
        <div className="reveal reveal-delay-1 space-y-0 border-3 border-brand-black">
          {beltSyllabus.map((item, idx) => {
            const isOpen = openBelt === item.belt;
            const isCurrent = currentBelt === item.belt;
            const isLocked = idx > maxAccessibleIdx;

            return (
              <div
                key={item.belt}
                className={`${idx !== beltSyllabus.length - 1 ? 'border-b-3 border-brand-black' : ''}`}
              >
                {/* Accordion Header */}
                <button
                  disabled={isLocked}
                  onClick={() => !isLocked && setOpenBelt(isOpen ? null : item.belt)}
                  className={`w-full flex items-center justify-between px-6 py-4 transition-colors duration-200
                             bg-transparent border-none text-left
                             ${isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                             ${isOpen ? 'bg-brand-ice/20' : isLocked ? '' : 'hover:bg-brand-ice/10'}`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-8 h-4 border-2 flex-shrink-0"
                      style={{ backgroundColor: item.color, borderColor: item.borderColor }}
                    />
                    <div>
                      <span className="font-bold text-base uppercase tracking-wide text-brand-black block">
                        {item.belt}
                      </span>
                      <span className="font-mono text-[0.65rem] tracking-wider uppercase text-brand-muted">
                        {item.level}
                      </span>
                    </div>
                    {isCurrent && (
                      <span className="font-mono text-[0.6rem] tracking-wider uppercase bg-brand-purple text-brand-white px-2.5 py-1">
                        Current
                      </span>
                    )}
                  </div>
                  {isLocked ? (
                    <Lock className="w-5 h-5 text-brand-muted" />
                  ) : (
                    <span className={`font-mono text-xl font-bold text-brand-black transition-transform duration-300 ${isOpen ? 'rotate-45' : ''
                      }`}>
                      +
                    </span>
                  )}
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-400 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="px-6 pb-5 pt-2">
                    <div className="pl-12 border-l-3" style={{ borderColor: item.borderColor }}>
                      <ul className="space-y-2">
                        {item.topics.map((topic, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="font-mono text-[0.65rem] text-brand-muted mt-1 flex-shrink-0">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="text-sm text-brand-muted leading-relaxed">{topic}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="font-mono text-[0.65rem] text-brand-muted/60 mt-4 tracking-wider uppercase italic">
                        * Detailed syllabus content coming soon
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
