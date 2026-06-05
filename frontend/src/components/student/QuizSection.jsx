import { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import QuizModal from './QuizModal';

const mockQuizHistory = [
  { id: 1, name: 'Daily Kata Terminology', date: '2026-06-03', marks: '10/10' },
  { id: 2, name: 'Basic Stances Review', date: '2026-06-02', marks: '10/10' },
  { id: 3, name: 'Dojo Etiquette', date: '2026-06-01', marks: '0/10' },
];

export default function QuizSection() {
  const sectionRef = useScrollReveal();
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [history, setHistory] = useState(mockQuizHistory);

  const handleQuizComplete = (isCorrect) => {
    setQuizCompleted(true);
    // Add to history
    const newEntry = {
      id: Date.now(),
      name: 'Daily Attendance Quiz',
      date: new Date().toISOString().split('T')[0],
      marks: isCorrect ? '10/10' : '0/10'
    };
    setHistory([newEntry, ...history]);
  };

  return (
    <section id="take-quiz" className="py-16 bg-brand-white" ref={sectionRef}>
      <div className="w-[min(1200px,92%)] mx-auto">
        <div className="reveal flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-2 block">
              // Assessment
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight text-brand-black">
              Daily Quiz
            </h2>
          </div>
          <button
            onClick={() => setIsQuizOpen(true)}
            disabled={quizCompleted}
            className={`font-mono text-sm font-bold uppercase tracking-wider px-7 py-3 border-3 border-brand-black transition-all duration-150
              ${quizCompleted
                ? 'bg-brand-ice text-brand-muted opacity-50 cursor-not-allowed'
                : 'bg-brand-black text-brand-white cursor-pointer hover:bg-brand-purple hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
              }`}
          >
            {quizCompleted ? 'Quiz Completed Today' : 'Take Current Quiz'}
          </button>
        </div>

        <div className="reveal reveal-delay-1 border-3 border-brand-black bg-brand-white p-8">
          <h3 className="font-mono text-sm tracking-widest uppercase text-brand-black mb-6 border-b-2 border-brand-black pb-2">
            Quiz History
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-125">
              <thead>
                <tr className="border-b-2 border-brand-ice/30">
                  <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-2">Date</th>
                  <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-2">Quiz Name</th>
                  <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-right py-3 px-2">Marks Obtained</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry) => (
                  <tr key={entry.id} className="border-b border-brand-ice/20 hover:bg-brand-ice/10 transition-colors">
                    <td className="py-4 px-2">
                      <span className="font-mono text-sm text-brand-muted">{entry.date}</span>
                    </td>
                    <td className="py-4 px-2">
                      <span className="font-medium text-sm text-brand-black">{entry.name}</span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <span className={`font-mono text-sm font-bold ${entry.marks === '10/10' ? 'text-brand-black' : 'text-[#D9381E]'}`}>
                        {entry.marks}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <QuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        onComplete={handleQuizComplete} 
      />
    </section>
  );
}
