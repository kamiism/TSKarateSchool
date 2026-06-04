const words = [
  'Discipline', 'Strength', 'Honor', 'Focus',
  'Respect', 'Perseverance', 'Karate-Do',
];

export default function Marquee() {
  // Double the items for seamless loop
  const items = [...words, ...words];

  return (
    <div
      className="bg-brand-black text-brand-white py-3.5 overflow-hidden border-y-3 border-brand-black"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee">
        {items.map((word, i) => (
          <span
            key={i}
            className="marquee-item font-mono text-[0.8rem] tracking-[0.15em] uppercase whitespace-nowrap px-8 flex items-center gap-8"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
