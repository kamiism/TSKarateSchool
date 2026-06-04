import { useCountUp } from '../hooks/useCountUp';

function StatItem({ count, suffix, label }) {
  const ref = useCountUp(count, 1500, suffix);
  return (
    <div className="text-center">
      <span ref={ref} className="font-mono text-3xl font-bold text-brand-white block">
        0
      </span>
      <span className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted mt-1 block">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="mt-[70px] min-h-[calc(100vh-70px)] flex flex-col relative overflow-hidden bg-brand-black text-brand-white">
      {/* Background Grid */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-[3px] opacity-15">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="hero-bg-cell bg-brand-muted flex items-center justify-center"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/70 via-brand-purple/50 to-brand-black/85 z-[2]" />
      </div>

      {/* Content */}
      <div className="relative z-[3] flex-1 flex flex-col justify-center py-16 w-[min(1200px,92%)] mx-auto">
        <span className="font-mono text-[0.8rem] tracking-[0.3em] uppercase text-brand-ice mb-6 flex items-center gap-4
                         before:content-[''] before:w-10 before:h-0.5 before:bg-brand-ice">
          Est. Since Tradition
        </span>

        <h1 className="text-[clamp(3rem,9vw,8rem)] font-bold leading-[0.92] tracking-tighter mb-8 cursor-default">
          <span className="block">T.S</span>
          <span className="block text-stroke">KARATE</span>
          <span className="block text-brand-ice">SCHOOL</span>
        </h1>

        <p className="text-lg max-w-[500px] text-brand-ice leading-relaxed mb-10">
          Where ancient martial arts discipline meets modern training methodology.
          Build strength, character, and unwavering focus through the art of Karate.
        </p>

        <div className="flex gap-4 flex-wrap">
          <button
            id="hero-register"
            onClick={() => alert('Registration opening soon!')}
            className="inline-flex items-center justify-center font-mono text-sm font-bold uppercase tracking-wider
                       px-7 py-3.5 border-3 border-brand-white bg-brand-black text-brand-white cursor-pointer
                       transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-brand-purple hover:shadow-brutal-purple
                       active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            Start Your Journey →
          </button>
          <button
            id="hero-login"
            onClick={() => alert('Login page coming soon!')}
            className="inline-flex items-center justify-center font-mono text-sm font-bold uppercase tracking-wider
                       px-7 py-3.5 border-3 border-brand-white bg-transparent text-brand-white cursor-pointer
                       transition-all duration-150 hover:bg-brand-white hover:text-brand-black
                       active:translate-x-0.5 active:translate-y-0.5"
          >
            Student Log In
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-[3] border-t-2 border-brand-white/20 py-8 w-[min(1200px,92%)] mx-auto">
        <div className="grid grid-cols-4 gap-8 max-md:grid-cols-2 max-md:gap-4">
          <StatItem count={500} suffix="+" label="Students Trained" />
          <StatItem count={15} suffix="+" label="Years Experience" />
          <StatItem count={8} suffix="" label="Black Belt Instructors" />
          <StatItem count={50} suffix="+" label="Tournament Medals" />
        </div>
      </div>
    </section>
  );
}
