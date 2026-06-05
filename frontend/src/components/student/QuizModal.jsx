import { useState } from 'react';

const liveQuizQuestions = [
  {
    question: "What is the Japanese term for 'Roundhouse Kick'?",
    options: ["Mae-geri", "Yoko-geri", "Mawashi-geri", "Ushiro-geri"],
    correct: 2,
  },
  {
    question: "What does 'Kata' translate to in English?",
    options: ["Form or Pattern", "Sparring", "Basic Technique", "Breaking"],
    correct: 0,
  },
  {
    question: "Which stance is known as the 'Front Stance'?",
    options: ["Kokutsu-dachi", "Zenkutsu-dachi", "Kiba-dachi", "Neko-ashi-dachi"],
    correct: 1,
  },
  {
    question: "What is the term for a block that goes from inside to outside?",
    options: ["Age-uke", "Soto-uke", "Uchi-uke", "Gedan-barai"],
    correct: 2,
  },
  {
    question: "In dojo etiquette, what does 'Osu' signify?",
    options: ["Hello", "Goodbye", "Patience/Respect/Acknowledgment", "Stop"],
    correct: 2,
  }
];

export default function QuizModal({ isOpen, onClose, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentQ = liveQuizQuestions[currentStep];
  const isLastQuestion = currentStep === liveQuizQuestions.length - 1;

  const handleNext = () => {
    if (selected === null) return;
    
    const isCorrect = selected === currentQ.correct;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (isLastQuestion) {
      setSubmitted(true);
      setTimeout(() => {
        const finalScore = score + (isCorrect ? 1 : 0);
        onComplete(finalScore, liveQuizQuestions.length);
        onClose();
        // Reset state for next time
        setSubmitted(false);
        setCurrentStep(0);
        setScore(0);
        setSelected(null);
      }, 3000);
    } else {
      setCurrentStep(prev => prev + 1);
      setSelected(null);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black/80 backdrop-blur-sm p-4">
      <div className="bg-brand-white border-4 border-brand-black w-full max-w-md p-8 relative shadow-brutal-lg">
        {/* Close Button */}
        {!submitted && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 font-mono font-bold text-xl cursor-pointer bg-transparent border-none text-brand-black hover:text-brand-purple transition-colors"
          >
            X
          </button>
        )}

        <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-4 block">
          // Live Quiz ({currentStep + 1}/{liveQuizQuestions.length})
        </span>

        {submitted ? (
          <div className="text-center py-8">
            <h3 className="text-3xl font-bold mb-4 text-brand-black">
              Quiz Complete! 🎉
            </h3>
            <p className="text-xl font-mono mb-4 text-brand-purple font-bold">
              You scored: {score + (selected === currentQ.correct ? 1 : 0)}/{liveQuizQuestions.length}
            </p>
            <p className="text-brand-muted font-mono text-sm leading-relaxed">
              Your attendance has been recorded and points have been updated.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold leading-tight mb-6 text-brand-black min-h-[4rem]">
              {currentQ.question}
            </h3>

            <div className="space-y-3 mb-8">
              {currentQ.options.map((option, idx) => (
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
              onClick={handleNext}
              disabled={selected === null}
              className={`w-full font-mono text-sm font-bold uppercase tracking-wider py-3.5 border-3 border-brand-black transition-all duration-150
                ${selected === null 
                  ? 'opacity-50 cursor-not-allowed bg-brand-ice text-brand-muted' 
                  : 'bg-brand-black text-brand-white cursor-pointer hover:bg-brand-purple hover:shadow-brutal-purple hover:-translate-x-0.5 hover:-translate-y-0.5'
                }
              `}
            >
              {isLastQuestion ? 'Submit Quiz' : 'Next Question'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
