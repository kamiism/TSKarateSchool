import { useState, useEffect } from 'react';

export default function Toast({ message, onClose, duration = 4000 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger slide-in
    requestAnimationFrame(() => setVisible(true));

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // wait for slide-out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] max-w-sm transition-all duration-300
                  ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
    >
      <div className="bg-brand-black border-2 border-brand-ice/20 px-5 py-4 shadow-brutal flex items-start gap-3">
        <div className="w-2 h-2 mt-1.5 bg-[#1DB97A] flex-shrink-0" />
        <p className="font-mono text-sm text-brand-white leading-snug">{message}</p>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          className="ml-auto text-brand-muted hover:text-brand-white font-mono text-xs cursor-pointer bg-transparent border-none flex-shrink-0"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
