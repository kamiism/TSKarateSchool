import { useState } from 'react';
import { Plus, Trash2, X, Clock, ToggleLeft, ToggleRight, ChevronDown, ChevronUp, WifiOff, Wifi } from 'lucide-react';

const offlineQuizzes = [
  {
    id: 1,
    name: 'Daily Kata Terminology',
    startHour: 18,
    endHour: 20,
    active: true,
    attempts: 32,
    avgScore: 4.2,
    questions: [
      { question: "What is the Japanese term for 'Roundhouse Kick'?", options: ['Mae-geri', 'Yoko-geri', 'Mawashi-geri', 'Ushiro-geri'], correct: 2 },
      { question: "What does 'Kata' translate to in English?", options: ['Form or Pattern', 'Sparring', 'Basic Technique', 'Breaking'], correct: 0 },
      { question: "Which stance is known as the 'Front Stance'?", options: ['Kokutsu-dachi', 'Zenkutsu-dachi', 'Kiba-dachi', 'Neko-ashi-dachi'], correct: 1 },
      { question: "What is the term for a block that goes from inside to outside?", options: ['Age-uke', 'Soto-uke', 'Uchi-uke', 'Gedan-barai'], correct: 2 },
      { question: "In dojo etiquette, what does 'Osu' signify?", options: ['Hello', 'Goodbye', 'Patience/Respect/Acknowledgment', 'Stop'], correct: 2 },
    ],
  },
  {
    id: 2,
    name: 'Basic Stances Review',
    startHour: 18,
    endHour: 20,
    active: false,
    attempts: 28,
    avgScore: 3.8,
    questions: [
      { question: "What is Kiba-dachi?", options: ['Horse Stance', 'Cat Stance', 'Front Stance', 'Back Stance'], correct: 0 },
      { question: "How many steps in Taikyoku Shodan?", options: ['10', '15', '20', '25'], correct: 2 },
      { question: "What is the ready position called?", options: ['Yoi', 'Rei', 'Hajime', 'Yame'], correct: 0 },
      { question: "Which foot moves first in Heian Shodan?", options: ['Right', 'Left', 'Both', 'Neither'], correct: 1 },
      { question: "What does 'Gedan' mean?", options: ['Upper', 'Middle', 'Lower', 'Side'], correct: 2 },
    ],
  },
];

const hybridQuizzes = [
  {
    id: 201,
    name: 'Online Kata Theory',
    startHour: 10,
    endHour: 22,
    active: true,
    attempts: 45,
    avgScore: 3.9,
    questions: [
      { question: "What is the purpose of Kata?", options: ['Exercise', 'Practicing forms against imaginary opponents', 'Meditation', 'Stretching'], correct: 1 },
      { question: "How many Heian Kata exist?", options: ['3', '4', '5', '6'], correct: 2 },
      { question: "What does 'Kiai' mean?", options: ['Spirit shout', 'Bow', 'Block', 'Kick'], correct: 0 },
      { question: "Which kata is performed first in Shotokan?", options: ['Heian Shodan', 'Taikyoku Shodan', 'Bassai Dai', 'Jion'], correct: 1 },
      { question: "What is 'Bunkai'?", options: ['A stance', 'Application of kata movements', 'A type of kick', 'A belt rank'], correct: 1 },
    ],
  },
];

const emptyQuestion = { question: '', options: ['', '', '', ''], correct: 0 };

export default function QuizManagement({ adminMode = 'offline' }) {
  const [quizzes, setQuizzes] = useState(adminMode === 'hybrid' ? hybridQuizzes : offlineQuizzes);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [expandedQuiz, setExpandedQuiz] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [newQuiz, setNewQuiz] = useState({
    name: '',
    startHour: 18,
    endHour: 20,
    questions: [
      { ...emptyQuestion, options: [...emptyQuestion.options] },
      { ...emptyQuestion, options: [...emptyQuestion.options] },
      { ...emptyQuestion, options: [...emptyQuestion.options] },
      { ...emptyQuestion, options: [...emptyQuestion.options] },
      { ...emptyQuestion, options: [...emptyQuestion.options] },
    ],
  });

  const toggleActive = (id) => {
    setQuizzes(prev => prev.map(q => q.id === id ? { ...q, active: !q.active } : q));
  };

  const handleDelete = (id) => {
    setQuizzes(prev => prev.filter(q => q.id !== id));
    setDeleteConfirm(null);
  };

  const updateNewQuestion = (qIdx, field, value) => {
    setNewQuiz(prev => {
      const questions = [...prev.questions];
      if (field === 'question') {
        questions[qIdx] = { ...questions[qIdx], question: value };
      } else if (field === 'correct') {
        questions[qIdx] = { ...questions[qIdx], correct: value };
      } else if (field.startsWith('option-')) {
        const optIdx = parseInt(field.split('-')[1]);
        const options = [...questions[qIdx].options];
        options[optIdx] = value;
        questions[qIdx] = { ...questions[qIdx], options };
      }
      return { ...prev, questions };
    });
  };

  const handleCreateQuiz = () => {
    if (!newQuiz.name.trim()) return;
    const hasAllQuestions = newQuiz.questions.every(
      q => q.question.trim() && q.options.every(o => o.trim())
    );
    if (!hasAllQuestions) return;

    const quiz = {
      id: Date.now(),
      ...newQuiz,
      active: false,
      attempts: 0,
      avgScore: 0,
    };
    setQuizzes(prev => [quiz, ...prev]);
    setNewQuiz({
      name: '',
      startHour: 18,
      endHour: 20,
      questions: Array(5).fill(null).map(() => ({ ...emptyQuestion, options: [...emptyQuestion.options] })),
    });
    setShowCreateModal(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted">
              // Assessment
            </span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-wider border-2 ${
              adminMode === 'hybrid'
                ? 'border-[#1E90FF] bg-[#1E90FF]/10 text-[#1E90FF]'
                : 'border-brand-muted/40 bg-brand-muted/10 text-brand-muted'
            }`}>
              {adminMode === 'hybrid' ? <Wifi size={10} /> : <WifiOff size={10} />}
              {adminMode}
            </span>
          </div>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight">
            Quiz<br />Management
          </h1>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider
                     px-6 py-2.5 border-3 border-brand-black bg-brand-black text-brand-white cursor-pointer
                     transition-all duration-150 hover:bg-brand-purple hover:border-brand-purple
                     hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal self-start sm:self-auto"
        >
          <Plus size={16} />
          Create Quiz
        </button>
      </div>

      {/* Quiz List */}
      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="border-3 border-brand-black bg-brand-white">
            {/* Quiz Header */}
            <div className="flex items-center justify-between px-6 py-4 flex-wrap gap-3">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setExpandedQuiz(expandedQuiz === quiz.id ? null : quiz.id)}
                  className="bg-transparent border-none cursor-pointer text-brand-black p-0"
                >
                  {expandedQuiz === quiz.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                <div>
                  <h3 className="font-bold text-base uppercase tracking-wide text-brand-black">{quiz.name}</h3>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="font-mono text-[0.6rem] tracking-wider uppercase text-brand-muted flex items-center gap-1">
                      <Clock size={10} />
                      {quiz.startHour}:00 – {quiz.endHour}:00
                    </span>
                    <span className="font-mono text-[0.6rem] tracking-wider uppercase text-brand-muted">
                      {quiz.attempts} attempts
                    </span>
                    <span className="font-mono text-[0.6rem] tracking-wider uppercase text-brand-muted">
                      avg: {quiz.avgScore}/5
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Active Toggle */}
                <button
                  onClick={() => toggleActive(quiz.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 border-2 font-mono text-[0.65rem] font-bold uppercase tracking-wider
                             cursor-pointer transition-all duration-150
                             ${quiz.active
                      ? 'border-[#228B22] bg-[#228B22]/10 text-[#228B22]'
                      : 'border-brand-muted/30 bg-transparent text-brand-muted'
                    }`}
                >
                  {quiz.active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                  {quiz.active ? 'Active' : 'Inactive'}
                </button>
                {/* Delete */}
                {deleteConfirm === quiz.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(quiz.id)}
                      className="font-mono text-[0.6rem] font-bold uppercase px-3 py-1.5 border-2 border-[#D9381E] bg-[#D9381E] text-brand-white cursor-pointer"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="font-mono text-[0.6rem] font-bold uppercase px-3 py-1.5 border-2 border-brand-black bg-transparent text-brand-black cursor-pointer"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(quiz.id)}
                    className="p-1.5 border-none bg-transparent cursor-pointer text-brand-muted hover:text-[#D9381E] transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Expanded Questions */}
            {expandedQuiz === quiz.id && (
              <div className="border-t-2 border-brand-black px-6 py-4">
                <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block mb-4">
                  Questions ({quiz.questions.length})
                </span>
                <div className="space-y-3">
                  {quiz.questions.map((q, i) => (
                    <div key={i} className="border-2 border-brand-ice/30 p-4">
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-xs text-brand-muted mt-0.5 flex-shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-brand-black mb-2">{q.question}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {q.options.map((opt, oi) => (
                              <span
                                key={oi}
                                className={`font-mono text-xs px-2 py-1 ${oi === q.correct
                                    ? 'bg-brand-purple/10 text-brand-purple font-bold border-l-2 border-brand-purple'
                                    : 'text-brand-muted'
                                  }`}
                              >
                                {opt}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Quiz Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black/80 backdrop-blur-sm p-4">
          <div className="bg-brand-white border-4 border-brand-black w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative shadow-brutal-lg">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 cursor-pointer bg-transparent border-none text-brand-black hover:text-brand-purple transition-colors"
            >
              <X size={20} />
            </button>

            <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-4 block">
              // New Quiz
            </span>
            <h3 className="text-xl font-bold mb-6">Create Quiz</h3>

            {/* Quiz Name */}
            <div className="mb-4">
              <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
                Quiz Name
              </label>
              <input
                type="text"
                value={newQuiz.name}
                onChange={(e) => setNewQuiz(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Daily Kata Terminology"
                className="w-full px-4 py-3 border-3 border-brand-black font-mono text-sm bg-transparent
                           outline-none text-brand-black placeholder:text-brand-muted/60 focus:border-brand-purple transition-colors"
              />
            </div>

            {/* Time Window */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
                  Start Hour (24h)
                </label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={newQuiz.startHour}
                  onChange={(e) => setNewQuiz(prev => ({ ...prev, startHour: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 border-3 border-brand-black font-mono text-sm bg-transparent
                             outline-none text-brand-black focus:border-brand-purple transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
                  End Hour (24h)
                </label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={newQuiz.endHour}
                  onChange={(e) => setNewQuiz(prev => ({ ...prev, endHour: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 border-3 border-brand-black font-mono text-sm bg-transparent
                             outline-none text-brand-black focus:border-brand-purple transition-colors"
                />
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-5">
              {newQuiz.questions.map((q, qIdx) => (
                <div key={qIdx} className="border-2 border-brand-black p-4">
                  <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
                    Question {qIdx + 1}
                  </span>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => updateNewQuestion(qIdx, 'question', e.target.value)}
                    placeholder="Enter question..."
                    className="w-full px-3 py-2 border-2 border-brand-ice/40 font-mono text-sm bg-transparent
                               outline-none text-brand-black placeholder:text-brand-muted/40 mb-3 focus:border-brand-purple transition-colors"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateNewQuestion(qIdx, 'correct', oIdx)}
                          className={`w-5 h-5 flex-shrink-0 border-2 cursor-pointer transition-all
                                     ${q.correct === oIdx
                              ? 'bg-brand-purple border-brand-purple'
                              : 'bg-transparent border-brand-muted/40 hover:border-brand-purple'
                            }`}
                        />
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => updateNewQuestion(qIdx, `option-${oIdx}`, e.target.value)}
                          placeholder={`Option ${oIdx + 1}`}
                          className="flex-1 px-2 py-1.5 border-b-2 border-brand-ice/30 font-mono text-xs bg-transparent
                                     outline-none text-brand-black placeholder:text-brand-muted/40 focus:border-brand-purple transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleCreateQuiz}
              className="w-full mt-6 font-mono text-sm font-bold uppercase tracking-wider py-3.5 border-3 border-brand-black
                         bg-brand-black text-brand-white cursor-pointer transition-all duration-150
                         hover:bg-brand-purple hover:border-brand-purple hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              Create Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
