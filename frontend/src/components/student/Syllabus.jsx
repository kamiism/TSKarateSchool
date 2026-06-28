import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { offlineBeltData } from '../admin/SyllabusManagement';

export default function Syllabus({ currentBelt }) {
  const [beltSyllabus, setBeltSyllabus] = useState(offlineBeltData);

  useEffect(() => {
    const saved = localStorage.getItem('admin_syllabus_offline');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length === offlineBeltData.length) {
          setBeltSyllabus(parsed);
        }
      } catch (e) {}
    }
  }, []);

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
