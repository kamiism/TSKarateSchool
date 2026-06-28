import { useState } from 'react';
import { Plus, Trash2, ChevronDown, Save, Play, FileText, X, Calendar } from 'lucide-react';
import { offlineBeltData } from '../SyllabusManagement';

const beltOptions = [
  { belt: 'White Belt', color: '#F5F5F5', borderColor: '#999' },
  { belt: 'Yellow Belt', color: '#FFD700', borderColor: '#DAA520' },
  { belt: 'Orange Belt', color: '#FF8C00', borderColor: '#CC7000' },
  { belt: 'Green Belt', color: '#228B22', borderColor: '#1A6B1A' },
  { belt: 'Blue-II Belt', color: '#1E90FF', borderColor: '#0B6EC5' },
  { belt: 'Blue-I Belt', color: '#0000CD', borderColor: '#00008B' },
  { belt: 'Purple-II Belt', color: '#9370DB', borderColor: '#4B0082' },
  { belt: 'Purple-I Belt', color: '#800080', borderColor: '#4B0082' },
  { belt: 'Brown-III Belt', color: '#CD853F', borderColor: '#8B4513' },
  { belt: 'Brown-II Belt', color: '#A0522D', borderColor: '#8B4513' },
  { belt: 'Brown-I Belt', color: '#8B4513', borderColor: '#6B3410' },
  { belt: 'Black Belt', color: '#000505', borderColor: '#3B3355' },
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
      { name: 'Punch Combinations', maxMarks: 15, criteria: 'Speed, accuracy, and transitions' },
      { name: 'Kick Techniques', maxMarks: 15, criteria: 'Mawashi-geri and Yoko-geri form' },
      { name: 'Blocking Drills', maxMarks: 10, criteria: 'Uchi-uke and Shuto-uke precision' },
      { name: 'Kata', maxMarks: 25, criteria: 'Heian Nidan — full performance' },
      { name: 'Sparring', maxMarks: 15, criteria: 'Sanbon Kumite control and timing' },
    ],
  },
];

const emptyParameter = { name: '', maxMarks: 10, criteria: '' };

const parseTopicToParameter = (topic) => {
  const match = topic.match(/^(.*?)\s*\((.*?)\)$/);
  if (match) {
    return { name: match[2].trim(), maxMarks: 10, criteria: match[1].trim() };
  }
  return { name: topic.trim(), maxMarks: 10, criteria: '' };
};

const getBeltParameters = (belt) => {
  const savedSyllabusStr = localStorage.getItem('admin_syllabus_offline');
  let syllabusData = offlineBeltData;
  
  if (savedSyllabusStr) {
    try {
      syllabusData = JSON.parse(savedSyllabusStr);
    } catch (e) {
      console.error(e);
    }
  }

  const beltInfo = syllabusData.find(b => b.belt === belt);
  if (beltInfo && beltInfo.topics) {
    return beltInfo.topics.map(parseTopicToParameter);
  }
  
  return [
    { name: 'Punch', maxMarks: 10, criteria: '' },
    { name: 'Kick', maxMarks: 15, criteria: '' },
    { name: 'Kata', maxMarks: 20, criteria: '' },
  ];
};

export default function ExamSetup({ initialConfig, onStartExam, onScheduleExam, onCancel, templates, onSaveTemplate }) {
  const [title, setTitle] = useState(initialConfig?.title || '');
  const [selectedBelts, setSelectedBelts] = useState(initialConfig?.belts || []);
  const [examDate, setExamDate] = useState(initialConfig?.date || '');
  const [examTime, setExamTime] = useState(initialConfig?.time || '');
  
  const [parametersByBelt, setParametersByBelt] = useState(initialConfig?.parametersByBelt || {
    // initialize with default if belts exist
    ...(initialConfig?.belts || []).reduce((acc, belt) => {
      acc[belt] = initialConfig?.parametersByBelt?.[belt] || getBeltParameters(belt);
      return acc;
    }, {})
  });

  const [activeBeltTab, setActiveBeltTab] = useState(initialConfig?.belts?.[0] || null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const toggleBelt = (belt) => {
    setSelectedBelts(prev => {
      const isSelected = prev.includes(belt);
      let newBelts;
      if (isSelected) {
        newBelts = prev.filter(b => b !== belt);
        if (activeBeltTab === belt) {
          setActiveBeltTab(newBelts[0] || null);
        }
      } else {
        newBelts = [...prev, belt];
        if (!activeBeltTab) setActiveBeltTab(belt);
        
        setParametersByBelt(p => ({
          ...p,
          [belt]: p[belt] || getBeltParameters(belt)
        }));
      }
      return newBelts;
    });
  };

  const updateParam = (belt, idx, field, value) => {
    setParametersByBelt(prev => {
      const updatedBeltParams = [...(prev[belt] || [])];
      updatedBeltParams[idx] = { ...updatedBeltParams[idx], [field]: field === 'maxMarks' ? (parseInt(value) || 0) : value };
      return { ...prev, [belt]: updatedBeltParams };
    });
  };

  const addParameter = (belt) => {
    setParametersByBelt(prev => ({
      ...prev,
      [belt]: [...(prev[belt] || []), { ...emptyParameter }]
    }));
  };

  const removeParameter = (belt, idx) => {
    if ((parametersByBelt[belt] || []).length <= 1) return;
    setParametersByBelt(prev => ({
      ...prev,
      [belt]: prev[belt].filter((_, i) => i !== idx)
    }));
  };

  const loadTemplate = (tpl) => {
    if (!activeBeltTab) return;
    setParametersByBelt(prev => ({
      ...prev,
      [activeBeltTab]: tpl.parameters.map(p => ({ ...p }))
    }));
    setShowTemplateModal(false);
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim() || !activeBeltTab) return;
    onSaveTemplate({
      id: `tpl-${Date.now()}`,
      name: templateName.trim(),
      parameters: parametersByBelt[activeBeltTab].map(p => ({ ...p })),
    });
    setTemplateName('');
  };

  const canStart = title.trim() && selectedBelts.length > 0 && examDate &&
    selectedBelts.every(belt => 
      (parametersByBelt[belt] || []).length > 0 && 
      parametersByBelt[belt].every(p => p.name.trim() && p.maxMarks > 0)
    );

  const handleStart = () => {
    if (!canStart) return;
    onStartExam({
      title: title.trim(),
      belts: selectedBelts,
      date: examDate,
      time: examTime,
      parametersByBelt: { ...parametersByBelt }
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-2 block">
            // Examination
          </span>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight">
            {initialConfig ? 'Edit' : 'Exam'}<br />{initialConfig ? 'Schedule' : 'Setup'}
          </h1>
        </div>
        <div className="flex gap-2 self-start sm:self-auto">
          {onCancel && (
            <button
              onClick={onCancel}
              className="flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-wider
                         px-4 py-2 border-3 border-brand-black bg-transparent text-brand-black cursor-pointer
                         transition-all duration-150 hover:bg-brand-black hover:text-brand-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
            >
              Cancel
            </button>
          )}
          <button
            onClick={() => setShowTemplateModal(true)}
            className="flex items-center gap-2 font-mono text-[0.7rem] font-bold uppercase tracking-wider
                       px-4 py-2 border-3 border-brand-black bg-brand-white text-brand-black cursor-pointer
                       transition-all duration-150 hover:bg-brand-ice hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
          >
            <FileText size={14} />
            Templates
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Exam Title */}
          <div className="border-3 border-brand-black p-6 bg-brand-white">
            <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
              Exam Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='e.g. "Yellow Belt Grading — June 2026"'
              className="w-full px-4 py-3 border-3 border-brand-black font-mono text-sm bg-transparent
                         outline-none text-brand-black placeholder:text-brand-muted/60 focus:border-brand-purple transition-colors"
            />
          </div>

          {/* Belt Selection */}
          <div className="border-3 border-brand-black p-6 bg-brand-white">
            <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-3">
              Belt Levels Being Examined
            </label>
            <div className="flex flex-wrap gap-2">
              {beltOptions.map((b) => {
                const isSelected = selectedBelts.includes(b.belt);
                return (
                  <button
                    key={b.belt}
                    onClick={() => toggleBelt(b.belt)}
                    className={`flex items-center gap-2 px-4 py-2 border-2 font-mono text-xs font-bold uppercase tracking-wider
                               cursor-pointer transition-all duration-150
                               ${isSelected
                        ? 'border-brand-black bg-brand-black text-brand-white shadow-brutal-purple translate-x-[-2px] translate-y-[-2px]'
                        : 'border-brand-ice/50 bg-transparent text-brand-muted hover:border-brand-black'
                      }`}
                  >
                    <div
                      className="w-4 h-2 border"
                      style={{ backgroundColor: b.color, borderColor: b.borderColor }}
                    />
                    {b.belt.replace(' Belt', '')}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border-3 border-brand-black p-6 bg-brand-white">
              <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
                Exam Date
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className="w-full px-4 py-3 border-3 border-brand-black font-mono text-sm bg-transparent
                           outline-none text-brand-black focus:border-brand-purple transition-colors"
              />
            </div>
            <div className="border-3 border-brand-black p-6 bg-brand-white">
              <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
                Exam Time
              </label>
              <input
                type="time"
                value={examTime}
                onChange={(e) => setExamTime(e.target.value)}
                className="w-full px-4 py-3 border-3 border-brand-black font-mono text-sm bg-transparent
                           outline-none text-brand-black focus:border-brand-purple transition-colors"
              />
            </div>
          </div>

          {/* Testing Parameters */}
          <div className="border-3 border-brand-black p-6 bg-brand-white">
            <div className="flex items-center justify-between mb-4">
              <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted">
                Testing Parameters
              </label>
            </div>

            {selectedBelts.length === 0 ? (
              <p className="text-sm font-mono text-brand-muted">Select belts above to configure parameters.</p>
            ) : (
              <div>
                {/* Tabs */}
                <div className="flex flex-wrap gap-1 mb-4 border-b-2 border-brand-ice/50 pb-2">
                  {selectedBelts.map(belt => {
                    const isActive = activeBeltTab === belt;
                    const meta = beltOptions.find(b => b.belt === belt);
                    return (
                      <button
                        key={belt}
                        onClick={() => setActiveBeltTab(belt)}
                        className={`px-3 py-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-wider
                                   border-2 transition-all duration-150 cursor-pointer
                                   ${isActive 
                                     ? 'border-brand-black bg-brand-black text-brand-white' 
                                     : 'border-transparent bg-brand-ice/20 text-brand-muted hover:bg-brand-ice hover:text-brand-black'}`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 border" style={{ backgroundColor: meta?.color, borderColor: meta?.borderColor }} />
                          {belt.replace(' Belt', '')}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active Tab Content */}
                {activeBeltTab && parametersByBelt[activeBeltTab] && (
                  <>
                    <div className="flex justify-end mb-2">
                      <span className="font-mono text-xs text-brand-purple font-bold">
                        Total for {activeBeltTab}: {(parametersByBelt[activeBeltTab] || []).reduce((sum, p) => sum + (parseInt(p.maxMarks) || 0), 0)} marks
                      </span>
                    </div>
                    <div className="space-y-3">
                      {(parametersByBelt[activeBeltTab] || []).map((param, idx) => (
                        <div key={idx} className="flex items-start gap-3 border-2 border-brand-ice/30 p-3">
                          <span className="font-mono text-[0.65rem] text-brand-muted mt-3 flex-shrink-0 w-6">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <div className="flex-1 space-y-2">
                            <div className="flex gap-3">
                              <input
                                type="text"
                                value={param.name}
                                onChange={(e) => updateParam(activeBeltTab, idx, 'name', e.target.value)}
                                placeholder="Parameter name (e.g. Punch)"
                                className="flex-1 px-3 py-2 border-2 border-brand-black font-mono text-sm bg-transparent
                                           outline-none text-brand-black placeholder:text-brand-muted/60 focus:border-brand-purple transition-colors"
                              />
                              <input
                                type="number"
                                min="1"
                                max="100"
                                value={param.maxMarks}
                                onChange={(e) => updateParam(activeBeltTab, idx, 'maxMarks', e.target.value)}
                                className="w-20 px-3 py-2 border-2 border-brand-black font-mono text-sm bg-transparent
                                           outline-none text-brand-black text-center focus:border-brand-purple transition-colors"
                              />
                            </div>
                            <input
                              type="text"
                              value={param.criteria}
                              onChange={(e) => updateParam(activeBeltTab, idx, 'criteria', e.target.value)}
                              placeholder="Judging criteria (optional)"
                              className="w-full px-3 py-1.5 border-b-2 border-brand-ice/30 font-mono text-xs bg-transparent
                                         outline-none text-brand-muted placeholder:text-brand-muted/40 focus:border-brand-purple transition-colors"
                            />
                          </div>
                          <button
                            onClick={() => removeParameter(activeBeltTab, idx)}
                            disabled={(parametersByBelt[activeBeltTab] || []).length <= 1}
                            className={`mt-2 p-1.5 border-none bg-transparent transition-colors
                                       ${(parametersByBelt[activeBeltTab] || []).length <= 1 ? 'text-brand-ice cursor-not-allowed' : 'text-brand-muted hover:text-[#D9381E] cursor-pointer'}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => addParameter(activeBeltTab)}
                      className="flex items-center gap-2 mt-4 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-brand-purple
                                 bg-transparent border-none cursor-pointer hover:text-brand-black transition-colors"
                    >
                      <Plus size={14} />
                      Add Parameter
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right — Summary & Actions */}
        <div className="space-y-4">
          {/* Summary Card */}
          <div className="border-3 border-brand-black bg-brand-black text-brand-white p-6 sticky top-6">
            <span className="font-mono text-xs tracking-[0.15em] uppercase text-brand-ice block mb-4 border-b-2 border-brand-ice/30 pb-2">
              Exam Summary
            </span>
            <div className="space-y-3">
              <div>
                <span className="font-mono text-[0.6rem] text-brand-muted uppercase tracking-wider block">Title</span>
                <span className="font-mono text-sm text-brand-white">{title || '—'}</span>
              </div>
              <div>
                <span className="font-mono text-[0.6rem] text-brand-muted uppercase tracking-wider block">Belts</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedBelts.length === 0 ? (
                    <span className="font-mono text-sm text-brand-muted">None selected</span>
                  ) : (
                    selectedBelts.map(b => {
                      const belt = beltOptions.find(bo => bo.belt === b);
                      return (
                        <span key={b} className="flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-wider text-brand-ice px-2 py-0.5 border border-brand-ice/30">
                          <span className="w-3 h-1.5" style={{ backgroundColor: belt?.color }} />
                          {b.replace(' Belt', '')}
                        </span>
                      );
                    })
                  )}
                </div>
              </div>
              <div>
                <span className="font-mono text-[0.6rem] text-brand-muted uppercase tracking-wider block">Date</span>
                <span className="font-mono text-sm text-brand-white">{examDate || '—'}</span>
              </div>
              <div>
                <span className="font-mono text-[0.6rem] text-brand-muted uppercase tracking-wider block">Parameters</span>
                <span className="font-mono text-sm text-brand-white">
                  {selectedBelts.reduce((sum, b) => sum + (parametersByBelt[b] || []).filter(p => p.name.trim()).length, 0)} total defined
                </span>
              </div>
              <div>
                <span className="font-mono text-[0.6rem] text-brand-muted uppercase tracking-wider block">Total Marks</span>
                <div className="flex flex-col gap-1 mt-1">
                  {selectedBelts.length === 0 && <span className="font-mono text-sm text-brand-white">—</span>}
                  {selectedBelts.map(b => (
                    <span key={b} className="font-mono text-sm text-brand-white flex justify-between">
                      <span className="text-[0.65rem] text-brand-ice">{b.replace(' Belt', '')}:</span>
                      {(parametersByBelt[b] || []).reduce((sum, p) => sum + (parseInt(p.maxMarks) || 0), 0)}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleStart}
              disabled={!canStart}
              className={`w-full mt-6 flex items-center justify-center gap-2 font-mono text-sm font-bold uppercase tracking-wider
                         py-3.5 border-3 transition-all duration-150
                         ${canStart
                  ? 'border-brand-ice bg-brand-ice text-brand-black cursor-pointer hover:bg-brand-purple hover:text-brand-white hover:border-brand-purple hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5'
                  : 'border-brand-muted/30 bg-transparent text-brand-muted/50 cursor-not-allowed'
                }`}
            >
              <Play size={16} />
              Start Exam
            </button>

            <button
              onClick={() => {
                if (onScheduleExam) {
                  onScheduleExam({
                    title: title.trim(),
                    belts: selectedBelts,
                    date: examDate,
                    time: examTime,
                    parametersByBelt: { ...parametersByBelt },
                    totalStudents: 15, // mock
                  });
                } else {
                  alert(`Exam scheduled for ${examDate}`);
                }
              }}
              disabled={!canStart}
              className={`w-full mt-3 flex items-center justify-center gap-2 font-mono text-sm font-bold uppercase tracking-wider
                         py-3.5 border-3 transition-all duration-150
                         ${canStart
                  ? 'border-brand-ice bg-transparent text-brand-ice cursor-pointer hover:bg-brand-ice hover:text-brand-black hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5'
                  : 'border-brand-muted/30 bg-transparent text-brand-muted/50 cursor-not-allowed'
                }`}
            >
              <Calendar size={16} />
              {initialConfig ? 'Update Schedule' : (examDate ? `Schedule for ${examDate}` : 'Schedule Date')}
            </button>

            {/* Save as Template */}
            <div className="mt-4 pt-4 border-t border-brand-ice/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Template name..."
                  className="flex-1 px-3 py-2 border-2 border-brand-ice/30 font-mono text-xs bg-transparent
                             outline-none text-brand-white placeholder:text-brand-muted/60 focus:border-brand-ice transition-colors"
                />
                <button
                  onClick={handleSaveTemplate}
                  disabled={!templateName.trim() || !activeBeltTab || (parametersByBelt[activeBeltTab] || []).length === 0}
                  className="p-2 border-2 border-brand-ice/30 bg-transparent text-brand-ice cursor-pointer
                             hover:border-brand-ice hover:text-brand-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Save size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Picker Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black/80 backdrop-blur-sm p-4">
          <div className="bg-brand-white border-4 border-brand-black w-full max-w-md p-8 relative shadow-brutal-lg">
            <button
              onClick={() => setShowTemplateModal(false)}
              className="absolute top-4 right-4 cursor-pointer bg-transparent border-none text-brand-black hover:text-brand-purple transition-colors"
            >
              <X size={20} />
            </button>

            <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-4 block">
              // Saved Templates
            </span>
            <h3 className="text-xl font-bold mb-6">Load Template</h3>

            {templates.length === 0 ? (
              <p className="text-sm text-brand-muted font-mono">No templates saved yet.</p>
            ) : (
              <div className="space-y-2">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => loadTemplate(tpl)}
                    className="w-full text-left px-5 py-3 border-2 border-brand-black font-mono text-sm cursor-pointer
                               transition-all duration-150 bg-transparent text-brand-black hover:bg-brand-ice/20 shadow-brutal
                               hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                  >
                    <span className="font-bold block">{tpl.name}</span>
                    <span className="text-[0.65rem] text-brand-muted block mt-0.5">
                      {tpl.parameters.length} parameters · {tpl.parameters.reduce((s, p) => s + p.maxMarks, 0)} total marks
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
