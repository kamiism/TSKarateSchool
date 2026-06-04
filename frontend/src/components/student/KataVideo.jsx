import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

// Placeholder Kata videos — replace with real YouTube IDs
const kataVideos = [
  { id: 'q59hFRLjQqo', title: 'Taikyoku Shodan', belt: 'White Belt', description: 'The first and most fundamental kata. Master the basic form of stepping and punching.' },
  { id: 'q59hFRLjQqo', title: 'Heian Shodan', belt: 'Yellow Belt', description: 'Introduces rising block and knife-hand techniques in a structured pattern.' },
  { id: 'q59hFRLjQqo', title: 'Heian Nidan', belt: 'Orange Belt', description: 'Develops back stance, side kick, and more complex blocking sequences.' },
  { id: 'q59hFRLjQqo', title: 'Heian Sandan', belt: 'Green Belt', description: 'Introduces elbow strikes, spinning techniques, and simultaneous block-strike.' },
  { id: 'q59hFRLjQqo', title: 'Bassai Dai', belt: 'Brown Belt', description: 'A powerful kata emphasizing the conversion of defensive moves to offensive attacks.' },
];

export default function KataVideo() {
  const [activeVideo, setActiveVideo] = useState(0);
  const sectionRef = useScrollReveal();

  const current = kataVideos[activeVideo];

  return (
    <section id="kata" className="py-16 bg-brand-black text-brand-white" ref={sectionRef}>
      <div className="w-[min(1200px,92%)] mx-auto">
        <span className="reveal font-mono text-xs tracking-[0.2em] uppercase text-brand-ice mb-3 block">
          // Kata Reference
        </span>
        <h2 className="reveal text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight text-brand-white mb-10">
          Learn Your<br />Kata
        </h2>

        <div className="reveal reveal-delay-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="border-3 border-brand-ice/20 bg-brand-black">
              {/* Video iframe */}
              <div className="relative w-full aspect-video bg-brand-muted/20">
                <iframe width="786" height="442" src="https://www.youtube.com/embed/jH6bv4GDpp0?si=nNg2mCprxPa9hhHv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
              {/* Video Info */}
              <div className="p-5 border-t-2 border-brand-ice/20">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-lg uppercase tracking-wide">{current.title}</h3>
                  <span className="font-mono text-[0.6rem] tracking-wider uppercase bg-brand-purple text-brand-white px-2 py-0.5">
                    {current.belt}
                  </span>
                </div>
                <p className="text-sm text-brand-ice leading-relaxed">{current.description}</p>
              </div>
            </div>
          </div>

          {/* Video List */}
          <div className="border-3 border-brand-ice/20 flex flex-col">
            <div className="px-4 py-3 border-b-2 border-brand-ice/20">
              <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted">
                Kata Library
              </span>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[400px] lg:max-h-none">
              {kataVideos.map((video, i) => (
                <button
                  key={i}
                  onClick={() => setActiveVideo(i)}
                  className={`w-full text-left px-4 py-3.5 border-b border-brand-ice/10 cursor-pointer
                             bg-transparent border-x-0 border-t-0 transition-all duration-200 flex items-start gap-3
                             ${i === activeVideo
                               ? 'bg-brand-purple/20 border-l-4 border-l-brand-purple'
                               : 'hover:bg-brand-white/5'
                             }`}
                >
                  <span className="font-mono text-[0.65rem] text-brand-muted mt-0.5 flex-shrink-0 w-5">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span className={`block text-sm font-bold ${i === activeVideo ? 'text-brand-white' : 'text-brand-ice'}`}>
                      {video.title}
                    </span>
                    <span className="block font-mono text-[0.6rem] text-brand-muted tracking-wider uppercase mt-0.5">
                      {video.belt}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
