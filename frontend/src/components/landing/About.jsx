import { useState, useEffect, useCallback } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TSKar2 from './TSKar2.jpeg';
import TSKar3 from './TSKar3.jpeg';
import TSKar4 from './TSKar4.jpeg';
import TSKar5 from './TSKar5.jpeg';
import TSKar6 from './TSKar6.jpeg';
import TSKar7 from './TSKar7.jpeg';

const photos = [TSKar7, TSKar2, TSKar3, TSKar4, TSKar5, TSKar6];

const philosophy = [
  { num: '01', title: 'Discipline First', desc: 'We instill unwavering discipline — the foundation of every great martial artist.' },
  { num: '02', title: 'Respect Always', desc: 'Respect for self, others, and the art of Karate is woven into every lesson.' },
  { num: '03', title: 'Growth Mindset', desc: 'Every belt is a milestone, not a destination. We champion continuous evolution.' },
];

export default function About() {
  const sectionRef = useScrollReveal();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 3500); // Auto-slide every 3.5s
    return () => clearInterval(timer);
  }, [nextSlide, currentIndex]); // Reset timer when slide changes manually

  return (
    <section id="about" className="py-24 bg-brand-white" ref={sectionRef}>
      <div className="w-[min(1200px,92%)] mx-auto">
        {/* Section Header */}
        <span className="reveal font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-3 block">
          // About Our Dojo
        </span>
        <h2 className="reveal text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.05] tracking-tight mb-6">
          More Than<br />Just a School
        </h2>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <p className="reveal drop-cap text-[1.05rem] leading-relaxed text-brand-muted mb-6">
              T.S Karate School was founded on the belief that martial arts is more
              than physical combat — it's a path to self-discovery. Our dojo combines
              traditional Shotokan Karate techniques with modern sports science to
              create a training environment that develops the mind, body, and spirit.
            </p>
            <p className="reveal text-[1.05rem] leading-relaxed text-brand-muted mb-6">
              Under the guidance of our experienced Senseis, students learn not just
              to fight, but to cultivate discipline, respect, and inner strength that
              extends far beyond the dojo walls. Every class is designed to challenge
              you, push your limits, and reveal the warrior within.
            </p>
          </div>

          {/* Image Frame */}
          <div className="reveal relative">
            <div className="about-frame border-3 border-brand-black aspect-[4/5] bg-brand-ice relative overflow-hidden group">
              {/* Sliding Container */}
              <div 
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {photos.map((photo, index) => (
                  <img 
                    key={index} 
                    src={photo} 
                    alt={`T.S Karate Dojo ${index + 1}`} 
                    className="w-full h-full object-cover shrink-0 relative z-[1]" 
                  />
                ))}
              </div>
              
              {/* Brutalist Progress Dots */}
              <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2.5 z-10">
                {photos.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 transition-all duration-300 border-2 border-brand-black cursor-pointer 
                      ${index === currentIndex ? 'w-8 bg-brand-purple shadow-[2px_2px_0px_#000]' : 'w-2.5 bg-brand-white hover:bg-brand-ice'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 z-10 w-10 h-10 border-2 border-brand-black bg-brand-white/80 backdrop-blur-sm
                           flex items-center justify-center cursor-pointer shadow-brutal hover:bg-brand-white hover:-translate-x-1 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} className="text-brand-black" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 z-10 w-10 h-10 border-2 border-brand-black bg-brand-white/80 backdrop-blur-sm
                           flex items-center justify-center cursor-pointer shadow-brutal hover:bg-brand-white hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next slide"
              >
                <ChevronRight size={20} className="text-brand-black" />
              </button>
            </div>
            <div className="absolute top-3 left-3 -right-3 -bottom-3 bg-brand-purple -z-1" />
          </div>
        </div>

        {/* Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {philosophy.map((item, i) => (
            <div
              key={item.num}
              className={`reveal reveal-delay-${i + 1} border-2 border-brand-black p-6
                         transition-all duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal`}
            >
              <span className="font-mono text-3xl font-bold text-brand-purple block mb-2">
                {item.num}
              </span>
              <h3 className="font-bold text-base uppercase tracking-wide mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-brand-muted leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
