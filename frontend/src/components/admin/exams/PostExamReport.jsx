import { useState, useMemo } from 'react';
import { Flag, ChevronDown, Printer, Lock, AlertTriangle } from 'lucide-react';

const beltMeta = {
  'White Belt': { color: '#F5F5F5', borderColor: '#999' },
  'Yellow Belt': { color: '#FFD700', borderColor: '#DAA520' },
  'Orange Belt': { color: '#FF8C00', borderColor: '#CC7000' },
  'Green Belt': { color: '#228B22', borderColor: '#1A6B1A' },
  'Blue Belt': { color: '#1E90FF', borderColor: '#0B6EC5' },
  'Brown Belt': { color: '#8B4513', borderColor: '#6B3410' },
  'Black Belt': { color: '#000505', borderColor: '#3B3355' },
};

const outcomeOptions = [
  { value: 'pass', label: 'Pass', color: '#228B22' },
  { value: 'merit', label: 'Merit', color: '#1E90FF' },
  { value: 'distinction', label: 'Distinction', color: '#FFD700' },
  { value: 'reexam', label: 'Re-examination', color: '#D9381E' },
];

export default function PostExamReport({ examConfig, results: initialResults, onFinalize, onBack }) {
  const [results, setResults] = useState(initialResults);
  const [showFinalizeConfirm, setShowFinalizeConfirm] = useState(false);

  const updateScore = (studentId, paramName, value) => {
    const param = examConfig.parameters.find(p => p.name === paramName);
    const numVal = Math.max(0, Math.min(parseInt(value) || 0, param.maxMarks));
    setResults(prev => prev.map(r => {
      if (r.id !== studentId) return r;
      const newScores = { ...r.scores, [paramName]: numVal };
      const newTotal = Object.values(newScores).reduce((s, v) => s + v, 0);
      return {
        ...r,
        scores: newScores,
        total: newTotal,
        percentage: Math.round((newTotal / examConfig.totalMaxMarks) * 100),
      };
    }));
  };

  const updateRemarks = (studentId, value) => {
    setResults(prev => prev.map(r => r.id === studentId ? { ...r, remarks: value } : r));
  };

  const updateOutcome = (studentId, value) => {
    setResults(prev => prev.map(r => r.id === studentId ? { ...r, outcome: value } : r));
  };

  const wasModified = (student, paramName) => {
    return student.scores[paramName] !== student.originalScores[paramName];
  };

  // Summary statistics
  const stats = useMemo(() => {
    const totals = results.map(r => r.percentage);
    const passCount = results.filter(r => r.outcome === 'pass' || r.outcome === 'merit' || r.outcome === 'distinction').length;
    const reexamCount = results.filter(r => r.outcome === 'reexam').length;
    const unmarkedOutcome = results.filter(r => !r.outcome).length;
    return {
      avgScore: totals.length ? Math.round(totals.reduce((a, b) => a + b, 0) / totals.length) : 0,
      highest: totals.length ? Math.max(...totals) : 0,
      lowest: totals.length ? Math.min(...totals) : 0,
      passCount,
      reexamCount,
      unmarkedOutcome,
      total: results.length,
    };
  }, [results]);

  // Group by belt
  const beltGroups = useMemo(() => {
    const groups = {};
    examConfig.belts.forEach(belt => {
      groups[belt] = results.filter(r => r.belt === belt);
    });
    return groups;
  }, [examConfig.belts, results]);

  const handleFinalize = () => {
    onFinalize(results);
    setShowFinalizeConfirm(false);
  };

  const allOutcomesSet = results.every(r => r.outcome);

  return (
    <div className="print:bg-white print:p-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 print:hidden">
        <div>
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-2 block">
            // Results
          </span>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight">
            Exam<br />Report
          </h1>
          <span className="font-mono text-xs text-brand-muted tracking-wider mt-1 block">
            {examConfig.title} · {examConfig.date}
          </span>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-wider
                       px-4 py-2 border-3 border-brand-black bg-brand-white text-brand-black cursor-pointer
                       transition-all duration-150 hover:bg-brand-ice hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
          >
            <Printer size={14} />
            Print
          </button>
          <button
            onClick={() => setShowFinalizeConfirm(true)}
            disabled={!allOutcomesSet}
            className={`flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-wider
                       px-5 py-2 border-3 transition-all duration-150
                       ${allOutcomesSet
                ? 'border-brand-black bg-brand-black text-brand-white cursor-pointer hover:bg-brand-purple hover:border-brand-purple hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5'
                : 'border-brand-muted/30 bg-brand-ice text-brand-muted cursor-not-allowed'
              }`}
          >
            <Lock size={14} />
            Finalize
          </button>
        </div>
      </div>

      {/* Print Header */}
      <div className="hidden print:block mb-8">
        <h1 className="text-2xl font-bold">{examConfig.title}</h1>
        <p className="text-sm text-gray-600">{examConfig.date} · T.S Karate School</p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {[
          { label: 'Total', value: stats.total, accent: false },
          { label: 'Avg Score', value: `${stats.avgScore}%`, accent: false },
          { label: 'Highest', value: `${stats.highest}%`, accent: false },
          { label: 'Lowest', value: `${stats.lowest}%`, accent: false },
          { label: 'Passed', value: stats.passCount, accent: true, bg: '#228B22' },
          { label: 'Re-exam', value: stats.reexamCount, accent: true, bg: '#D9381E' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="border-3 border-brand-black p-4 print:border print:p-2"
            style={stat.accent ? { borderColor: stat.bg } : {}}
          >
            <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-brand-muted block mb-1">
              {stat.label}
            </span>
            <span className="font-mono text-2xl font-bold block print:text-lg" style={stat.accent ? { color: stat.bg } : {}}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {!allOutcomesSet && (
        <div className="flex items-center gap-2 px-4 py-3 border-2 border-[#DAA520] bg-[#DAA520]/10 mb-6 print:hidden">
          <AlertTriangle size={16} className="text-[#DAA520] flex-shrink-0" />
          <span className="font-mono text-xs text-[#DAA520]">
            {stats.unmarkedOutcome} student{stats.unmarkedOutcome !== 1 ? 's' : ''} without outcome. Set all outcomes to finalize.
          </span>
        </div>
      )}

      {/* Belt-wise Results */}
      <div className="space-y-6">
        {Object.entries(beltGroups).map(([belt, beltResults]) => {
          const meta = beltMeta[belt] || { color: '#ccc', borderColor: '#999' };
          const beltPassRate = beltResults.length
            ? Math.round((beltResults.filter(r => r.outcome === 'pass' || r.outcome === 'merit' || r.outcome === 'distinction').length / beltResults.length) * 100)
            : 0;

          return (
            <div key={belt}>
              {/* Belt Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-4 border-2" style={{ backgroundColor: meta.color, borderColor: meta.borderColor }} />
                <h3 className="font-bold text-base uppercase tracking-wide">{belt}</h3>
                <span className="font-mono text-[0.6rem] text-brand-muted tracking-wider">
                  {beltResults.length} students · {beltPassRate}% pass rate
                </span>
              </div>

              {/* Results Table */}
              <div className="border-3 border-brand-black bg-brand-white overflow-x-auto print:border">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b-2 border-brand-black print:border-b">
                      <th className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-brand-muted text-left py-2.5 px-3">Student</th>
                      {examConfig.parameters.map(p => (
                        <th key={p.name} className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-brand-muted text-center py-2.5 px-2">
                          {p.name}<br /><span className="text-[0.5rem] font-normal">/{p.maxMarks}</span>
                        </th>
                      ))}
                      <th className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-brand-muted text-center py-2.5 px-2">Total</th>
                      <th className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-brand-muted text-left py-2.5 px-2">Remarks</th>
                      <th className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-brand-muted text-center py-2.5 px-3 print:hidden">Outcome</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beltResults.map((student) => (
                      <tr
                        key={student.id}
                        className={`border-b border-brand-ice/20 hover:bg-brand-ice/5 transition-colors
                                   ${student.flagged ? 'bg-[#FFD700]/5' : ''}`}
                      >
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            {student.flagged && <Flag size={12} className="text-[#DAA520]" fill="#DAA520" />}
                            <span className="font-medium text-sm text-brand-black">{student.name}</span>
                          </div>
                        </td>
                        {examConfig.parameters.map(p => (
                          <td key={p.name} className="py-3 px-2 text-center">
                            <div className="relative inline-block">
                              <input
                                type="number"
                                min="0"
                                max={p.maxMarks}
                                value={student.scores[p.name]}
                                onChange={(e) => updateScore(student.id, p.name, e.target.value)}
                                className={`w-14 text-center font-mono text-sm font-bold border-b-2 bg-transparent outline-none py-0.5
                                           focus:border-brand-purple transition-colors print:border-none
                                           [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                                           ${wasModified(student, p.name) ? 'border-[#DAA520] text-[#DAA520]' : 'border-brand-ice/40 text-brand-black'}`}
                              />
                              {wasModified(student, p.name) && (
                                <span className="absolute -top-3 right-0 font-mono text-[0.45rem] text-[#DAA520] line-through">
                                  {student.originalScores[p.name]}
                                </span>
                              )}
                            </div>
                          </td>
                        ))}
                        <td className="py-3 px-2 text-center">
                          <span className="font-mono text-sm font-bold text-brand-black">{student.total}</span>
                          <span className={`font-mono text-[0.6rem] block ${
                            student.percentage >= 70 ? 'text-[#228B22]' :
                            student.percentage >= 40 ? 'text-[#DAA520]' :
                            'text-[#D9381E]'
                          }`}>
                            {student.percentage}%
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <input
                            type="text"
                            value={student.remarks}
                            onChange={(e) => updateRemarks(student.id, e.target.value)}
                            placeholder="—"
                            className="w-full font-mono text-xs bg-transparent border-none outline-none text-brand-muted
                                       placeholder:text-brand-muted/30 print:text-black"
                          />
                        </td>
                        <td className="py-3 px-3 print:hidden">
                          <div className="relative">
                            <select
                              value={student.outcome || ''}
                              onChange={(e) => updateOutcome(student.id, e.target.value)}
                              className="appearance-none w-full font-mono text-[0.65rem] font-bold uppercase tracking-wider
                                         px-3 py-1.5 pr-7 border-2 bg-transparent cursor-pointer outline-none"
                              style={{
                                borderColor: outcomeOptions.find(o => o.value === student.outcome)?.color || '#BFCDE0',
                                color: outcomeOptions.find(o => o.value === student.outcome)?.color || '#5D5D81',
                              }}
                            >
                              <option value="">Set...</option>
                              {outcomeOptions.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                              ))}
                            </select>
                            <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-brand-muted" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      {/* Finalize Confirmation */}
      {showFinalizeConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black/80 backdrop-blur-sm p-4">
          <div className="bg-brand-white border-4 border-brand-black w-full max-w-sm p-8 shadow-brutal-lg text-center">
            <Lock size={32} className="mx-auto mb-4 text-brand-purple" />
            <h3 className="text-xl font-bold mb-3">Finalize Results?</h3>
            <p className="text-sm text-brand-muted mb-6">
              This will lock all scores and save them to student records. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowFinalizeConfirm(false)}
                className="flex-1 font-mono text-sm font-bold uppercase tracking-wider py-3 border-3 border-brand-black
                           bg-transparent text-brand-black cursor-pointer hover:bg-brand-ice transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalize}
                className="flex-1 font-mono text-sm font-bold uppercase tracking-wider py-3 border-3 border-brand-black
                           bg-brand-black text-brand-white cursor-pointer hover:bg-brand-purple hover:border-brand-purple transition-all"
              >
                Finalize
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
