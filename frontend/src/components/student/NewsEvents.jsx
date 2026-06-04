import { useScrollReveal } from '../../hooks/useScrollReveal';

// Placeholder news & events — will be managed by admin later
const newsItems = [
  {
    id: 1,
    type: 'event',
    date: '2026-06-15',
    title: 'Annual Inter-Dojo Championship',
    description: 'Compete against students from neighboring dojos in kata and kumite. Registration closes June 10th.',
    tag: 'Tournament',
  },
  {
    id: 2,
    type: 'news',
    date: '2026-06-08',
    title: 'Belt Grading Exam — June Batch',
    description: 'Students eligible for belt promotion are requested to confirm their participation by June 5th.',
    tag: 'Grading',
  },
  {
    id: 3,
    type: 'event',
    date: '2026-06-20',
    title: 'Special Workshop: Self-Defense Basics',
    description: 'A weekend workshop open to all belt levels. Learn practical self-defense techniques from our senior Sensei.',
    tag: 'Workshop',
  },
  {
    id: 4,
    type: 'news',
    date: '2026-06-01',
    title: 'Summer Training Schedule Update',
    description: 'New timings effective from June 1st. Morning batches now available for advanced students.',
    tag: 'Announcement',
  },
  {
    id: 5,
    type: 'event',
    date: '2026-07-04',
    title: 'Karate Demo Day — Open House',
    description: 'Invite your family and friends! Students will perform kata demonstrations and sparring exhibitions.',
    tag: 'Demo',
  },
];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.toLocaleString('default', { month: 'short' }).toUpperCase();
  return { day, month };
}

export default function NewsEvents() {
  const sectionRef = useScrollReveal();

  return (
    <section id="news" className="py-16 bg-brand-white" ref={sectionRef}>
      <div className="w-[min(1200px,92%)] mx-auto">
        <span className="reveal font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-3 block">
          // News & Events
        </span>
        <h2 className="reveal text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight mb-10">
          Stay<br />Updated
        </h2>

        <div className="reveal reveal-delay-1 space-y-0">
          {newsItems.map((item, i) => {
            const { day, month } = formatDate(item.date);
            return (
              <div
                key={item.id}
                className={`flex items-start gap-6 p-6 border-3 border-brand-black
                           transition-all duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal
                           ${i > 0 ? '-mt-[3px]' : ''}`}
              >
                {/* Date Block */}
                <div className="flex-shrink-0 w-16 h-16 border-2 border-brand-black flex flex-col items-center justify-center bg-brand-black text-brand-white">
                  <span className="font-mono text-xl font-bold leading-none">{day}</span>
                  <span className="font-mono text-[0.6rem] tracking-wider uppercase text-brand-ice">{month}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <h3 className="font-bold text-base uppercase tracking-wide text-brand-black">
                      {item.title}
                    </h3>
                    <span className={`font-mono text-[0.6rem] tracking-wider uppercase px-2 py-0.5 flex-shrink-0
                                    ${item.type === 'event'
                                      ? 'bg-brand-purple text-brand-white'
                                      : 'bg-brand-ice text-brand-black'
                                    }`}>
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="font-mono text-[0.65rem] text-brand-muted/60 mt-6 tracking-wider uppercase italic text-center">
          * News and events are managed by the admin. Check back regularly for updates.
        </p>
      </div>
    </section>
  );
}
