import { useState, useMemo } from 'react';
import { Flag, FlagOff, ChevronDown, ChevronUp, MessageSquare, CheckCircle, Check, Plus, Minus } from 'lucide-react';

const beltMeta = {
  'White Belt': { color: '#F5F5F5', borderColor: '#999' },
  'Yellow Belt': { color: '#FFD700', borderColor: '#DAA520' },
  'Orange Belt': { color: '#FF8C00', borderColor: '#CC7000' },
  'Green Belt': { color: '#228B22', borderColor: '#1A6B1A' },
  'Blue Belt': { color: '#1E90FF', borderColor: '#0B6EC5' },
  'Brown Belt': { color: '#8B4513', borderColor: '#6B3410' },
  'Black Belt': { color: '#000505', borderColor: '#3B3355' },
};

export default function LiveMarking({ examConfig, students, onEndExam }) {
  // Initialize scores: { [studentId]: { params: { [paramName]: score }, remarks: '', flagged: false } }
  const [scores, setScores] = useState(() => {
    const initial = {};
    students.forEach(s => {
      initial[s.id] = {
        params: {},
        remarks: '',
        flagged: false,
      };
      examConfig.parameters.forEach(p => {
        initial[s.id].params[p.name] = 0;
      });
    });
    return initial;
  });

  const [collapsedBelts, setCollapsedBelts] = useState({});
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  // Track which parameter is open per student: { [studentId]: paramName | null }
  const [openParam, setOpenParam] = useState({});

  const toggleBeltCollapse = (belt) => {
    setCollapsedBelts(prev => ({ ...prev, [belt]: !prev[belt] }));
  };

  const updateScore = (studentId, paramName, value) => {
    const param = examConfig.parameters.find(p => p.name === paramName);
    const numVal = Math.max(0, Math.min(parseInt(value) || 0, param.maxMarks));
    setScores(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        params: { ...prev[studentId].params, [paramName]: numVal },
      },
    }));
  };

  const updateRemarks = (studentId, value) => {
    setScores(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], remarks: value },
    }));
  };

  const toggleFlag = (studentId) => {
    setScores(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], flagged: !prev[studentId].flagged },
    }));
  };

  const getStudentTotal = (studentId) => {
    return Object.values(scores[studentId]?.params || {}).reduce((s, v) => s + v, 0);
  };

  const isStudentMarked = (studentId) => {
    return Object.values(scores[studentId]?.params || {}).some(v => v > 0);
  };

  // Group students by belt
  const beltGroups = useMemo(() => {
    const groups = {};
    examConfig.belts.forEach(belt => {
      groups[belt] = students.filter(s => s.belt === belt);
    });
    return groups;
  }, [examConfig.belts, students]);

  const totalStudents = students.length;
  const markedStudents = students.filter(s => isStudentMarked(s.id)).length;
  const flaggedCount = students.filter(s => scores[s.id]?.flagged).length;

  const handleEnd = () => {
    const results = students.map(s => ({
      ...s,
      scores: { ...scores[s.id].params },
      originalScores: { ...scores[s.id].params },
      total: getStudentTotal(s.id),
      percentage: Math.round((getStudentTotal(s.id) / examConfig.totalMaxMarks) * 100),
      remarks: scores[s.id].remarks,
      flagged: scores[s.id].flagged,
      outcome: null,
    }));
    onEndExam(results);
  };

  return (
    <div>
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-brand-white border-b-3 border-brand-black -mx-6 md:-mx-10 px-6 md:px-10 py-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold uppercase tracking-wide">{examConfig.title}</h1>
            <span className="font-mono text-[0.65rem] text-brand-muted tracking-wider uppercase">
              Live Marking · {examConfig.date}
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Progress */}
            <div className="flex items-center gap-3">
              <div className="w-32 h-3 border-2 border-brand-black bg-brand-ice/20">
                <div
                  className="h-full bg-brand-purple transition-all duration-300"
                  style={{ width: `${totalStudents ? (markedStudents / totalStudents) * 100 : 0}%` }}
                />
              </div>
              <span className="font-mono text-xs font-bold text-brand-black">
                {markedStudents}/{totalStudents}
              </span>
            </div>

            {flaggedCount > 0 && (
              <span className="font-mono text-[0.65rem] font-bold uppercase tracking-wider text-[#DAA520] flex items-center gap-1">
                <Flag size={12} fill="#DAA520" />
                {flaggedCount} flagged
              </span>
            )}

            <button
              onClick={() => setShowEndConfirm(true)}
              className="flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-wider
                         px-5 py-2 border-3 border-brand-black bg-brand-black text-brand-white cursor-pointer
                         transition-all duration-150 hover:bg-brand-purple hover:border-brand-purple
                         hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
            >
              <CheckCircle size={14} />
              End Exam
            </button>
          </div>
        </div>
      </div>

      {/* Belt Groups */}
      <div className="space-y-6">
        {Object.entries(beltGroups).map(([belt, beltStudents]) => {
          const meta = beltMeta[belt] || { color: '#ccc', borderColor: '#999' };
          const isCollapsed = collapsedBelts[belt];

          return (
            <div key={belt} className="border-3 border-brand-black">
              {/* Belt Group Header */}
              <button
                onClick={() => toggleBeltCollapse(belt)}
                className="w-full flex items-center justify-between px-6 py-3 cursor-pointer
                           bg-brand-black text-brand-white border-none text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-4 border-2"
                    style={{ backgroundColor: meta.color, borderColor: meta.borderColor }}
                  />
                  <span className="font-bold text-sm uppercase tracking-wide">{belt}</span>
                  <span className="font-mono text-[0.6rem] text-brand-ice tracking-wider">
                    {beltStudents.length} student{beltStudents.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {isCollapsed ? <ChevronDown size={16} className="text-brand-ice" /> : <ChevronUp size={16} className="text-brand-ice" />}
              </button>

              {/* Students */}
              {!isCollapsed && (
                <div className="divide-y divide-brand-ice/20">
                  {beltStudents.map((student) => {
                    const studentData = scores[student.id];
                    const total = getStudentTotal(student.id);
                    const pct = Math.round((total / examConfig.totalMaxMarks) * 100);

                    return (
                      <div
                        key={student.id}
                        className={`p-5 transition-colors ${studentData?.flagged ? 'bg-[#FFD700]/8 border-l-4 border-l-[#DAA520]' : ''}`}
                      >
                        {/* Student Header */}
                        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 border-2 border-brand-black bg-brand-purple flex items-center justify-center
                                            font-mono text-xs font-bold text-brand-white uppercase">
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <span className="font-bold text-sm text-brand-black block">{student.name}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-lg font-bold text-brand-black">
                              {total}<span className="text-sm text-brand-muted">/{examConfig.totalMaxMarks}</span>
                            </span>
                            <span className={`font-mono text-xs font-bold px-2 py-0.5 ${
                              pct >= 70 ? 'bg-[#228B22]/10 text-[#228B22]' :
                              pct >= 40 ? 'bg-[#DAA520]/10 text-[#DAA520]' :
                              'bg-[#D9381E]/10 text-[#D9381E]'
                            }`}>
                              {pct}%
                            </span>
                            <button
                              onClick={() => toggleFlag(student.id)}
                              className={`p-1.5 border-none bg-transparent cursor-pointer transition-colors
                                         ${studentData?.flagged ? 'text-[#DAA520]' : 'text-brand-ice hover:text-[#DAA520]'}`}
                              title={studentData?.flagged ? 'Remove flag' : 'Flag for review'}
                            >
                              {studentData?.flagged ? <Flag size={16} fill="#DAA520" /> : <FlagOff size={16} />}
                            </button>
                          </div>
                        </div>

                        {/* Parameter Scores — Single Dropdown */}
                        <div className="mb-3">
                          {/* Dropdown + Score Input Row */}
                          <div className="flex items-center gap-2 flex-wrap">
                            <div className="relative flex-1 min-w-[140px]">
                              <select
                                value={openParam[student.id] || ''}
                                onChange={(e) => setOpenParam(prev => ({ ...prev, [student.id]: e.target.value }))}
                                className="w-full appearance-none bg-brand-white border-2 border-brand-black px-3 py-2.5 pr-8
                                           font-mono text-[0.75rem] font-bold uppercase tracking-wider text-brand-black
                                           cursor-pointer outline-none focus:border-brand-purple transition-colors"
                              >
                                <option value="">Select parameter…</option>
                                {examConfig.parameters.map((param) => {
                                  const s = studentData?.params[param.name] ?? 0;
                                  return (
                                    <option key={param.name} value={param.name}>
                                      {s > 0 ? '✓ ' : '○ '}{param.name} {s > 0 ? `(${s}/${param.maxMarks})` : ''}
                                    </option>
                                  );
                                })}
                              </select>
                              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-brand-muted">
                                <ChevronDown size={14} />
                              </div>
                            </div>

                            {/* Score input — visible when a param is selected */}
                            {openParam[student.id] && (() => {
                              const selParam = examConfig.parameters.find(p => p.name === openParam[student.id]);
                              if (!selParam) return null;
                              return (
                                <div className="flex items-end gap-1">
                                  <button
                                    onClick={() => updateScore(student.id, selParam.name, (studentData?.params[selParam.name] ?? 0) - 1)}
                                    className="p-1 mb-0.5 text-brand-black bg-brand-ice/50 hover:bg-brand-ice cursor-pointer transition-colors border-2 border-transparent hover:border-brand-black"
                                    aria-label="Decrease score"
                                  >
                                    <Minus size={16} strokeWidth={3} />
                                  </button>
                                  <input
                                    type="number"
                                    min="0"
                                    max={selParam.maxMarks}
                                    value={studentData?.params[selParam.name] ?? 0}
                                    onChange={(e) => updateScore(student.id, selParam.name, e.target.value)}
                                    className="w-14 text-center font-mono text-xl font-bold border-b-3 border-brand-black
                                               bg-transparent outline-none text-brand-black py-1
                                               focus:border-brand-purple transition-colors
                                               [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    autoFocus
                                  />
                                  <button
                                    onClick={() => updateScore(student.id, selParam.name, (studentData?.params[selParam.name] ?? 0) + 1)}
                                    className="p-1 mb-0.5 text-brand-black bg-brand-ice/50 hover:bg-brand-ice cursor-pointer transition-colors border-2 border-transparent hover:border-brand-black"
                                    aria-label="Increase score"
                                  >
                                    <Plus size={16} strokeWidth={3} />
                                  </button>
                                  <span className="font-mono text-xs text-brand-muted mb-1 ml-1">/{selParam.maxMarks}</span>
                                </div>
                              );
                            })()}
                          </div>

                          {/* Criteria hint */}
                          {openParam[student.id] && (() => {
                            const selParam = examConfig.parameters.find(p => p.name === openParam[student.id]);
                            return selParam?.criteria ? (
                              <p className="font-mono text-[0.55rem] text-brand-muted/60 mt-1 italic">{selParam.criteria}</p>
                            ) : null;
                          })()}

                          {/* Completed params badges */}
                          {examConfig.parameters.some(p => (studentData?.params[p.name] ?? 0) > 0) && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {examConfig.parameters.map((param) => {
                                const score = studentData?.params[param.name] ?? 0;
                                if (score <= 0) return null;
                                return (
                                  <span
                                    key={param.name}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#228B22]/10 border border-[#228B22]/30
                                               font-mono text-[0.6rem] font-bold text-[#228B22] uppercase tracking-wider"
                                  >
                                    <Check size={10} strokeWidth={3} />
                                    {param.name} {score}/{param.maxMarks}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Remarks */}
                        <div className="flex items-start gap-2">
                          <MessageSquare size={14} className="text-brand-muted mt-2 flex-shrink-0" />
                          <input
                            type="text"
                            value={studentData?.remarks || ''}
                            onChange={(e) => updateRemarks(student.id, e.target.value)}
                            placeholder="Quick remarks..."
                            className="flex-1 px-3 py-1.5 border-b-2 border-brand-ice/30 font-mono text-xs bg-transparent
                                       outline-none text-brand-muted placeholder:text-brand-muted/40 focus:border-brand-purple transition-colors"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* End Exam Confirmation */}
      {showEndConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black/80 backdrop-blur-sm p-4">
          <div className="bg-brand-white border-4 border-brand-black w-full max-w-sm p-8 shadow-brutal-lg text-center">
            <h3 className="text-xl font-bold mb-3">End Examination?</h3>
            <p className="text-sm text-brand-muted mb-2">
              {markedStudents}/{totalStudents} students marked
            </p>
            {flaggedCount > 0 && (
              <p className="text-sm text-[#DAA520] font-mono font-bold mb-4">
                {flaggedCount} student{flaggedCount !== 1 ? 's' : ''} flagged for review
              </p>
            )}
            <p className="text-xs text-brand-muted mb-6">
              You can still edit scores in the result report.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEndConfirm(false)}
                className="flex-1 font-mono text-sm font-bold uppercase tracking-wider py-3 border-3 border-brand-black
                           bg-transparent text-brand-black cursor-pointer hover:bg-brand-ice transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEnd}
                className="flex-1 font-mono text-sm font-bold uppercase tracking-wider py-3 border-3 border-brand-black
                           bg-brand-black text-brand-white cursor-pointer hover:bg-brand-purple hover:border-brand-purple transition-all"
              >
                End & Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
