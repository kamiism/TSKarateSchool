import { useState } from 'react';
import { ClipboardCheck, Plus, Calendar, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import ExamSetup from './ExamSetup';
import LiveMarking from './LiveMarking';
import PostExamReport from './PostExamReport';

// Mock students for exam — reuses same names as StudentManagement
const mockStudents = [
  { id: 1, name: 'Arjun Sharma', belt: 'Orange Belt', beltColor: '#FF8C00' },
  { id: 2, name: 'Priya Patel', belt: 'Green Belt', beltColor: '#228B22' },
  { id: 3, name: 'Rahul Kumar', belt: 'Blue-II Belt', beltColor: '#1E90FF' },
  { id: 4, name: 'Sneha Gupta', belt: 'Yellow Belt', beltColor: '#FFD700' },
  { id: 5, name: 'Vikram Singh', belt: 'Orange Belt', beltColor: '#FF8C00' },
  { id: 6, name: 'Ananya Joshi', belt: 'White Belt', beltColor: '#F5F5F5' },
  { id: 7, name: 'Karthik Nair', belt: 'Yellow Belt', beltColor: '#FFD700' },
  { id: 8, name: 'Divya Reddy', belt: 'White Belt', beltColor: '#F5F5F5' },
  { id: 9, name: 'Rohan Mehta', belt: 'Yellow Belt', beltColor: '#FFD700' },
  { id: 10, name: 'Meera Iyer', belt: 'Orange Belt', beltColor: '#FF8C00' },
];

const defaultTemplates = [
  {
    id: 'tpl-1',
    name: 'Standard Yellow Belt Test',
    parameters: [
      { name: 'Punch', maxMarks: 10, criteria: 'Check hip rotation and follow-through' },
      { name: 'Kick', maxMarks: 15, criteria: 'Height, speed, and chambering' },
      { name: 'Block', maxMarks: 10, criteria: 'Correct arm position and timing' },
      { name: 'Stance', maxMarks: 10, criteria: 'Width, depth, weight distribution' },
      { name: 'Kata', maxMarks: 20, criteria: 'Accuracy, rhythm, power, and spirit' },
    ],
  },
  {
    id: 'tpl-2',
    name: 'Standard Orange Belt Test',
    parameters: [
      { name: 'Punch Combos', maxMarks: 15, criteria: 'Speed, accuracy, and transitions' },
      { name: 'Kick Techniques', maxMarks: 15, criteria: 'Mawashi-geri and Yoko-geri form' },
      { name: 'Blocking', maxMarks: 10, criteria: 'Uchi-uke and Shuto-uke precision' },
      { name: 'Kata', maxMarks: 25, criteria: 'Heian Nidan — full performance' },
      { name: 'Sparring', maxMarks: 15, criteria: 'Sanbon Kumite control and timing' },
    ],
  },
];

const beltMeta = {
  'White Belt': { color: '#F5F5F5', borderColor: '#999' },
  'Yellow Belt': { color: '#FFD700', borderColor: '#DAA520' },
  'Orange Belt': { color: '#FF8C00', borderColor: '#CC7000' },
  'Green Belt': { color: '#228B22', borderColor: '#1A6B1A' },
  'Blue-II Belt': { color: '#1E90FF', borderColor: '#0B6EC5' },
  'Blue-I Belt': { color: '#0000CD', borderColor: '#00008B' },
  'Purple-II Belt': { color: '#9370DB', borderColor: '#4B0082' },
  'Purple-I Belt': { color: '#800080', borderColor: '#4B0082' },
  'Brown-III Belt': { color: '#CD853F', borderColor: '#8B4513' },
  'Brown-II Belt': { color: '#A0522D', borderColor: '#8B4513' },
  'Brown-I Belt': { color: '#8B4513', borderColor: '#6B3410' },
  'Black Belt': { color: '#000505', borderColor: '#3B3355' },
};

export default function ExamManagement() {
  // Phase: 'list' | 'setup' | 'live' | 'report'
  const [phase, setPhase] = useState('list');
  const [templates, setTemplates] = useState(defaultTemplates);
  const [examConfig, setExamConfig] = useState(null);
  const [examStudents, setExamStudents] = useState([]);
  const [examResults, setExamResults] = useState(null);
  const [pastExams, setPastExams] = useState([
    {
      id: 'past-1',
      title: 'White Belt Grading — May 2026',
      date: '2026-05-20',
      belts: ['White Belt'],
      totalStudents: 6,
      passRate: 83,
      status: 'finalized',
    },
  ]);
  const [scheduledExams, setScheduledExams] = useState([
    {
      id: 'sched-1',
      title: 'Upcoming Summer Grading',
      date: '2026-07-15',
      belts: ['White Belt', 'Yellow Belt', 'Orange Belt'],
      totalStudents: 15,
      status: 'scheduled',
    }
  ]);
  const [expandedPast, setExpandedPast] = useState(null);
  const [editingExam, setEditingExam] = useState(null);

  const handleStartExam = (config) => {
    setExamConfig(config);
    // Filter students whose belt is in the exam's belt selection
    const filtered = mockStudents.filter(s => config.belts.includes(s.belt));
    setExamStudents(filtered);
    setPhase('live');
  };

  const handleEndExam = (results) => {
    setExamResults(results);
    setPhase('report');
  };

  const handleFinalize = (finalResults) => {
    // Save to past exams
    const passCount = finalResults.filter(r => r.outcome === 'pass' || r.outcome === 'merit' || r.outcome === 'distinction').length;
    setPastExams(prev => [{
      id: `past-${Date.now()}`,
      title: examConfig.title,
      date: examConfig.date,
      belts: examConfig.belts,
      totalStudents: finalResults.length,
      passRate: finalResults.length ? Math.round((passCount / finalResults.length) * 100) : 0,
      status: 'finalized',
      results: finalResults,
      parametersByBelt: examConfig.parametersByBelt,
    }, ...prev]);

    // Reset
    setExamConfig(null);
    setExamStudents([]);
    setExamResults(null);
    setPhase('list');
  };

  const handleSaveTemplate = (template) => {
    setTemplates(prev => [...prev, template]);
  };

  // List View (default)
  if (phase === 'list') {
    return (
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight">
              Practical<br />Exams
            </h1>
          </div>
          <button
            onClick={() => setPhase('setup')}
            className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider
                       px-6 py-2.5 border-3 border-brand-black bg-brand-black text-brand-white cursor-pointer
                       transition-all duration-150 hover:bg-brand-purple hover:border-brand-purple
                       hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal self-start sm:self-auto"
          >
            <Plus size={16} />
            New Exam
          </button>
        </div>

        {/* Scheduled Exams */}
        {scheduledExams.length > 0 && (
          <div className="mb-10 space-y-3">
            <h2 className="font-mono text-xs tracking-widest uppercase text-brand-muted mb-4 border-b-2 border-brand-ice/50 pb-2">
              Scheduled Exams
            </h2>
            {scheduledExams.map((exam) => (
              <div key={exam.id} className="border-3 border-brand-purple bg-brand-white transition-all duration-200
                                            hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <Calendar size={18} className="text-brand-purple flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-base uppercase tracking-wide text-brand-black">{exam.title}</h3>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="font-mono text-[0.6rem] tracking-wider uppercase text-brand-muted">
                          {exam.date}
                        </span>
                        <span className="font-mono text-[0.6rem] tracking-wider uppercase text-brand-muted">
                          {exam.totalStudents} eligible students
                        </span>
                        <div className="flex gap-1">
                          {exam.belts.map(b => {
                            const meta = beltMeta[b];
                            return (
                              <div key={b} className="w-4 h-2 border" style={{ backgroundColor: meta?.color, borderColor: meta?.borderColor }} />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.6rem] tracking-wider uppercase px-2 py-0.5 bg-brand-purple/10 text-brand-purple font-bold">
                      {exam.status}
                    </span>
                    <button
                      onClick={() => {
                        setEditingExam(exam);
                        setPhase('setup');
                      }}
                      className="px-4 py-2 border-2 border-brand-purple bg-transparent text-brand-purple font-mono text-[0.65rem] font-bold uppercase tracking-wider
                                 cursor-pointer hover:bg-brand-purple hover:text-brand-white transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setExamConfig({ 
                          title: exam.title, 
                          date: exam.date, 
                          belts: exam.belts, 
                          parametersByBelt: exam.parametersByBelt || exam.belts.reduce((acc, b) => ({...acc, [b]: defaultTemplates[0].parameters}), {}) 
                        });
                        setExamStudents(mockStudents.filter(s => exam.belts.includes(s.belt)));
                        setPhase('live');
                      }}
                      className="px-4 py-2 border-2 border-brand-purple bg-brand-purple text-brand-white font-mono text-[0.65rem] font-bold uppercase tracking-wider
                                 cursor-pointer hover:bg-brand-black hover:border-brand-black transition-colors"
                    >
                      Start Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Past Exams */}
        <div className="space-y-3">
          <h2 className="font-mono text-xs tracking-widest uppercase text-brand-muted mb-4 border-b-2 border-brand-ice/50 pb-2">
            Past Exams
          </h2>
          {pastExams.length === 0 ? (
            <div className="border-3 border-brand-black p-10 text-center bg-brand-white">
              <ClipboardCheck size={40} className="mx-auto mb-4 text-brand-ice" />
              <p className="font-mono text-sm text-brand-muted">No exams conducted yet</p>
              <p className="font-mono text-xs text-brand-muted/60 mt-1">Click "New Exam" to begin</p>
            </div>
          ) : (
            pastExams.map((exam) => (
              <div key={exam.id} className="border-3 border-brand-black bg-brand-white transition-all duration-200
                                            hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal">
                <div className="flex items-center justify-between px-6 py-4 flex-wrap gap-3">
                  <div className="flex items-center gap-4">
                    <Calendar size={18} className="text-brand-purple flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-base uppercase tracking-wide text-brand-black">{exam.title}</h3>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="font-mono text-[0.6rem] tracking-wider uppercase text-brand-muted">
                          {exam.date}
                        </span>
                        <span className="font-mono text-[0.6rem] tracking-wider uppercase text-brand-muted">
                          {exam.totalStudents} students
                        </span>
                        <span className={`font-mono text-[0.6rem] font-bold tracking-wider uppercase
                                        ${exam.passRate >= 70 ? 'text-[#228B22]' : exam.passRate >= 50 ? 'text-[#DAA520]' : 'text-[#D9381E]'}`}>
                          {exam.passRate}% pass rate
                        </span>
                        <div className="flex gap-1">
                          {exam.belts.map(b => {
                            const meta = beltMeta[b];
                            return (
                              <div key={b} className="w-4 h-2 border" style={{ backgroundColor: meta?.color, borderColor: meta?.borderColor }} />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.6rem] tracking-wider uppercase px-2 py-0.5 bg-brand-purple/10 text-brand-purple font-bold">
                      {exam.status}
                    </span>
                    {exam.results && (
                      <button
                        onClick={() => setExpandedPast(expandedPast === exam.id ? null : exam.id)}
                        className="p-1.5 border-none bg-transparent cursor-pointer text-brand-muted hover:text-brand-purple transition-colors"
                      >
                        {expandedPast === exam.id ? <ChevronUp size={16} /> : <Eye size={16} />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Past Exam Details */}
                {expandedPast === exam.id && exam.results && (
                  <div className="border-t-2 border-brand-black px-6 py-4 overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="border-b border-brand-ice/30">
                          <th className="font-mono text-[0.6rem] uppercase text-brand-muted text-left py-2 px-2">Student</th>
                          <th className="font-mono text-[0.6rem] uppercase text-brand-muted text-left py-2 px-2">Belt</th>
                          <th className="font-mono text-[0.6rem] uppercase text-brand-muted text-center py-2 px-2">Score</th>
                          <th className="font-mono text-[0.6rem] uppercase text-brand-muted text-center py-2 px-2">%</th>
                          <th className="font-mono text-[0.6rem] uppercase text-brand-muted text-center py-2 px-2">Outcome</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exam.results.map(r => {
                          const outcomeColor = r.outcome === 'pass' ? '#228B22' :
                            r.outcome === 'merit' ? '#1E90FF' :
                            r.outcome === 'distinction' ? '#FFD700' :
                            r.outcome === 'reexam' ? '#D9381E' : '#5D5D81';
                          return (
                            <tr key={r.id} className="border-b border-brand-ice/10">
                              <td className="py-2 px-2 text-sm text-brand-black">{r.name}</td>
                              <td className="py-2 px-2">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-4 h-2 border" style={{ backgroundColor: r.beltColor, borderColor: r.beltColor }} />
                                  <span className="font-mono text-[0.6rem] text-brand-muted">{r.belt}</span>
                                </div>
                              </td>
                              <td className="py-2 px-2 text-center font-mono text-sm font-bold">{r.total}</td>
                              <td className="py-2 px-2 text-center font-mono text-xs">{r.percentage}%</td>
                              <td className="py-2 px-2 text-center">
                                <span className="font-mono text-[0.6rem] font-bold uppercase" style={{ color: outcomeColor }}>
                                  {r.outcome || '—'}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  if (phase === 'setup') {
    return (
      <ExamSetup
        initialConfig={editingExam}
        onStartExam={(config) => {
          handleStartExam(config);
          setEditingExam(null);
        }}
        onScheduleExam={(config) => {
          if (editingExam) {
            setScheduledExams(prev => prev.map(e => e.id === editingExam.id ? { ...e, ...config } : e));
          } else {
            setScheduledExams(prev => [{ id: `sched-${Date.now()}`, ...config, status: 'scheduled' }, ...prev]);
          }
          setEditingExam(null);
          setPhase('list');
        }}
        onCancel={() => {
          setEditingExam(null);
          setPhase('list');
        }}
        templates={templates}
        onSaveTemplate={handleSaveTemplate}
      />
    );
  }

  if (phase === 'live') {
    return (
      <LiveMarking
        examConfig={examConfig}
        students={examStudents}
        onEndExam={handleEndExam}
      />
    );
  }

  if (phase === 'report') {
    return (
      <PostExamReport
        examConfig={examConfig}
        results={examResults}
        onFinalize={handleFinalize}
        onBack={() => setPhase('live')}
      />
    );
  }

  return null;
}
