import { useState, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import QuizModal from './QuizModal';

const mockQuizHistory = [
  { id: 1, name: 'Daily Kata Terminology', date: '2026-06-03', marks: '5/5' },
  { id: 2, name: 'Basic Stances Review', date: '2026-06-02', marks: '4/5' },
  { id: 3, name: 'Dojo Etiquette', date: '2026-06-01', marks: '2/5' },
];

export default function QuizSection() {
  const sectionRef = useScrollReveal();
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [history, setHistory] = useState(mockQuizHistory);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock time window set by Admin (e.g. 18:00 to 20:00)
  const QUIZ_START_HOUR = 18; // 6 PM
  const QUIZ_END_HOUR = 20;   // 8 PM

  useEffect(() => {
    // Update time every minute to accurately lock/unlock quiz
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const currentHour = currentTime.getHours();
  const isTimeWindowOpen = currentHour >= QUIZ_START_HOUR && currentHour < QUIZ_END_HOUR;

  const handleQuizComplete = (score, total) => {
    setQuizCompleted(true);
    // Add to history
    const newEntry = {
      id: Date.now(),
      name: 'Live Karate Quiz',
      date: new Date().toISOString().split('T')[0],
      marks: `${score}/${total}`
    };
    setHistory([newEntry, ...history]);
  };

  return (
    <section id="take-quiz" className="py-16 bg-brand-white" ref={sectionRef}>
      <div className="w-[min(1200px,92%)] mx-auto">
        <div className="reveal mb-10">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-2 block">
            // Assessment
          </span>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight text-brand-black">
            Quiz Center
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Quiz Box */}
          <div className="reveal reveal-delay-1 lg:col-span-1 border-3 border-brand-black p-8 bg-brand-black text-brand-white shadow-brutal-purple flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs tracking-[0.15em] uppercase text-brand-ice block mb-4 border-b-2 border-brand-ice/30 pb-2">
                Active Assessment
              </span>
              <h3 className="text-2xl font-bold leading-tight mb-4">
                Take the live quiz
              </h3>
              <p className="text-sm text-brand-ice leading-relaxed mb-8">
                Test your knowledge of stances, techniques, and dojo etiquette. This 5-question live quiz will also mark your attendance for today.
              </p>
            </div>
            <button
              onClick={() => setIsQuizOpen(true)}
              disabled={quizCompleted || !isTimeWindowOpen}
              className={`w-full font-mono text-sm font-bold uppercase tracking-wider px-6 py-3.5 border-3 border-brand-ice transition-all duration-150
                ${(quizCompleted || !isTimeWindowOpen)
                  ? 'bg-transparent text-brand-muted opacity-50 cursor-not-allowed'
                  : 'bg-brand-ice text-brand-black cursor-pointer hover:bg-brand-purple hover:text-brand-white hover:border-brand-purple hover:shadow-brutal hover:-translate-x-1 hover:-translate-y-1'
                }`}
            >
              {quizCompleted 
                ? 'Completed Today' 
                : !isTimeWindowOpen 
                  ? `Available ${QUIZ_START_HOUR}:00 - ${QUIZ_END_HOUR}:00` 
                  : 'Start Quiz →'}
            </button>
          </div>

          {/* Quiz History Box */}
          <div className="reveal reveal-delay-2 lg:col-span-2 border-3 border-brand-black bg-brand-white p-8">
            <h3 className="font-mono text-sm tracking-widest uppercase text-brand-black mb-6 border-b-2 border-brand-black pb-2">
              Quiz History
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
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
                        <span className={`font-mono text-sm font-bold ${entry.marks.startsWith('5/') ? 'text-brand-black' : 'text-[#D9381E]'}`}>
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
      </div>

      <QuizModal 
        isOpen={isQuizOpen} 
        onClose={() => setIsQuizOpen(false)} 
        onComplete={handleQuizComplete} 
      />
    </section>
  );
}
