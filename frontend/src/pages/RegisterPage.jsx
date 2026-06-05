import Register from '../components/auth/Register';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center relative overflow-hidden py-12">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-brand-white) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-white) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Decorative corner accents */}
      <div className="absolute top-0 right-0 w-24 h-24 border-b-3 border-l-3 border-brand-purple opacity-30" />
      <div className="absolute bottom-0 left-0 w-24 h-24 border-t-3 border-r-3 border-brand-purple opacity-30" />

      {/* Floating kanji decoration */}
      <span className="absolute top-16 left-12 text-[8rem] font-bold text-brand-white opacity-[0.03] select-none leading-none max-md:hidden">
        入門
      </span>
      <span className="absolute bottom-16 right-12 text-[6rem] font-bold text-brand-white opacity-[0.03] select-none leading-none max-md:hidden">
        登録
      </span>

      <Register />
    </div>
  );
}
