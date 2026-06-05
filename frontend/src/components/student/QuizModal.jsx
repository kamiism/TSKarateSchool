import { useState } from 'react';

const dailyQuiz = {
  question: "What is the Japanese term for 'Roundhouse Kick'?",
  options: ["Mae-geri", "Yoko-geri", "Mawashi-geri", "Ushiro-geri"],
  correct: 2, // index of Mawashi-geri
};

export default function QuizModal({ isOpen, onClose, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    setTimeout(() => {
      onComplete(selected === dailyQuiz.correct);
      onClose();
      setSubmitted(false);
      setSelected(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-brand-black/80 backdrop-blur-sm p-4">
      <div className="bg-brand-white border-4 border-brand-black w-full max-w-md p-8 relative shadow-brutal-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 font-mono font-bold text-xl cursor-pointer bg-transparent border-none text-brand-black hover:text-brand-purple transition-colors"
        >
          X
        </button>

        <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-4 block">
          // Daily Attendance Quiz
        </span>

        {submitted ? (
          <div className="text-center py-8">
            <h3 className={`text-2xl font-bold mb-4 ${selected === dailyQuiz.correct ? 'text-[#228B22]' : 'text-[#D9381E]'}`}>
              {selected === dailyQuiz.correct ? 'Correct! 🎉' : 'Incorrect! ❌'}
            </h3>
            <p className="text-brand-muted font-mono text-sm leading-relaxed">
              {selected === dailyQuiz.correct 
                ? 'Your attendance for today has been marked and points have been added.' 
                : 'Better luck tomorrow. Keep studying your terminology!'}
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold leading-tight mb-6 text-brand-black">
              {dailyQuiz.question}
            </h3>

            <div className="space-y-3 mb-8">
              {dailyQuiz.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelected(idx)}
                  className={`w-full text-left px-5 py-3 border-2 border-brand-black font-mono text-sm cursor-pointer transition-all duration-150
                    ${selected === idx 
                      ? 'bg-brand-purple text-brand-white translate-x-1 translate-y-1 shadow-none' 
                      : 'bg-transparent text-brand-black hover:bg-brand-ice/20 shadow-brutal'
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={selected === null}
              className={`w-full font-mono text-sm font-bold uppercase tracking-wider py-3.5 border-3 border-brand-black transition-all duration-150
                ${selected === null 
                  ? 'opacity-50 cursor-not-allowed bg-brand-ice text-brand-muted' 
                  : 'bg-brand-black text-brand-white cursor-pointer hover:bg-brand-purple hover:shadow-brutal-purple hover:-translate-x-0.5 hover:-translate-y-0.5'
                }
              `}
            >
              Submit Answer
            </button>
          </>
        )}
      </div>
    </div>
  );
}
