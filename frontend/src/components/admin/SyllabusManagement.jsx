import { useState } from 'react';
import { Plus, Trash2, Edit, X, ChevronDown, ChevronUp, GripVertical, WifiOff, Wifi } from 'lucide-react';

const offlineBeltData = [
  {
    belt: 'White Belt', color: '#F5F5F5', borderColor: '#999', level: '10th Kyu',
    topics: ['Basic stance (Zenkutsu-dachi, Kokutsu-dachi)', 'Oi-zuki (Lunge Punch)', 'Age-uke (Rising Block)', 'Mae-geri (Front Kick)', 'Taikyoku Shodan (Kata)', 'Dojo etiquette & Rei (Bowing)'],
  },
  {
    belt: 'Yellow Belt', color: '#FFD700', borderColor: '#DAA520', level: '8th Kyu',
    topics: ['Gyaku-zuki (Reverse Punch)', 'Soto-uke (Outside Block)', 'Yoko-geri (Side Kick)', 'Heian Shodan (Kata)', 'Basic Kumite drills', 'Counting in Japanese (1–10)'],
  },
  {
    belt: 'Orange Belt', color: '#FF8C00', borderColor: '#CC7000', level: '7th Kyu',
    topics: ['Uchi-uke (Inside Block)', 'Shuto-uke (Knife-hand Block)', 'Mawashi-geri (Roundhouse Kick)', 'Heian Nidan (Kata)', 'Three-step sparring (Sanbon Kumite)', 'Basic self-defense techniques'],
  },
  {
    belt: 'Green Belt', color: '#228B22', borderColor: '#1A6B1A', level: '5th Kyu',
    topics: ['Empi-uchi (Elbow Strike)', 'Ushiro-geri (Back Kick)', 'Heian Sandan & Yondan (Kata)', 'One-step sparring (Ippon Kumite)', 'Combination techniques', 'Introduction to Bunkai (application)'],
  },
  {
    belt: 'Blue Belt', color: '#1E90FF', borderColor: '#0B6EC5', level: '3rd Kyu',
    topics: ['Advanced combination attacks', 'Heian Godan (Kata)', 'Tekki Shodan (Kata)', 'Free sparring basics (Jiyu Kumite)', 'Advanced self-defense', 'Tournament preparation'],
  },
  {
    belt: 'Brown Belt', color: '#8B4513', borderColor: '#6B3410', level: '1st Kyu',
    topics: ['Bassai Dai (Kata)', 'Kanku Dai (Kata)', 'Advanced Jiyu Kumite', 'Advanced Bunkai analysis', 'Teaching assistance (Sempai role)', 'Mental discipline & philosophy'],
  },
  {
    belt: 'Black Belt', color: '#000505', borderColor: '#3B3355', level: 'Shodan',
    topics: ['Jion (Kata)', 'Enpi (Kata)', 'Mastery of all previous Kata', 'Advanced tournament Kumite', 'Instructor development', 'Karate-Do philosophy & history'],
  },
];

const hybridBeltData = [
  {
    belt: 'White Belt', color: '#F5F5F5', borderColor: '#999', level: '10th Kyu',
    topics: ['Video: Basic stance fundamentals', 'Online quiz: Dojo etiquette', 'Live session: Taikyoku Shodan walkthrough', 'Homework: Stance practice log'],
  },
  {
    belt: 'Yellow Belt', color: '#FFD700', borderColor: '#DAA520', level: '8th Kyu',
    topics: ['Video: Reverse punch mechanics', 'Online drill: Block identification', 'Live session: Heian Shodan practice', 'Homework: Japanese terminology worksheet'],
  },
  {
    belt: 'Orange Belt', color: '#FF8C00', borderColor: '#CC7000', level: '7th Kyu',
    topics: ['Video: Roundhouse kick technique', 'Online quiz: Kata sequence memory', 'Live session: Sanbon Kumite demo', 'Homework: Self-defense scenario journal'],
  },
  {
    belt: 'Green Belt', color: '#228B22', borderColor: '#1A6B1A', level: '5th Kyu',
    topics: ['Video: Elbow strike & back kick', 'Online drill: Combination builder', 'Live session: Ippon Kumite sparring', 'Homework: Bunkai analysis report'],
  },
  {
    belt: 'Blue Belt', color: '#1E90FF', borderColor: '#0B6EC5', level: '3rd Kyu',
    topics: ['Video: Advanced combinations', 'Online quiz: Tournament rules', 'Live session: Jiyu Kumite basics', 'Homework: Tournament prep plan'],
  },
  {
    belt: 'Brown Belt', color: '#8B4513', borderColor: '#6B3410', level: '1st Kyu',
    topics: ['Video: Bassai Dai deep dive', 'Online seminar: Bunkai analysis', 'Live session: Advanced Kumite', 'Homework: Teaching plan draft'],
  },
  {
    belt: 'Black Belt', color: '#000505', borderColor: '#3B3355', level: 'Shodan',
    topics: ['Video: Mastery review series', 'Online seminar: Karate-Do philosophy', 'Live session: Instructor evaluation', 'Homework: Personal training curriculum'],
  },
];

export default function SyllabusManagement({ adminMode = 'offline' }) {
  const [syllabus, setSyllabus] = useState(adminMode === 'hybrid' ? hybridBeltData : offlineBeltData);
  const [expandedBelt, setExpandedBelt] = useState(null);
  const [editingTopic, setEditingTopic] = useState(null); // { beltIdx, topicIdx }
  const [editValue, setEditValue] = useState('');
  const [addingToBelt, setAddingToBelt] = useState(null);
  const [newTopicValue, setNewTopicValue] = useState('');

  const startEdit = (beltIdx, topicIdx) => {
    setEditingTopic({ beltIdx, topicIdx });
    setEditValue(syllabus[beltIdx].topics[topicIdx]);
  };

  const saveEdit = () => {
    if (!editingTopic || !editValue.trim()) return;
    setSyllabus(prev => {
      const updated = [...prev];
      const topics = [...updated[editingTopic.beltIdx].topics];
      topics[editingTopic.topicIdx] = editValue.trim();
      updated[editingTopic.beltIdx] = { ...updated[editingTopic.beltIdx], topics };
      return updated;
    });
    setEditingTopic(null);
    setEditValue('');
  };

  const deleteTopic = (beltIdx, topicIdx) => {
    setSyllabus(prev => {
      const updated = [...prev];
      const topics = [...updated[beltIdx].topics];
      topics.splice(topicIdx, 1);
      updated[beltIdx] = { ...updated[beltIdx], topics };
      return updated;
    });
  };

  const addTopic = (beltIdx) => {
    if (!newTopicValue.trim()) return;
    setSyllabus(prev => {
      const updated = [...prev];
      const topics = [...updated[beltIdx].topics, newTopicValue.trim()];
      updated[beltIdx] = { ...updated[beltIdx], topics };
      return updated;
    });
    setNewTopicValue('');
    setAddingToBelt(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted">
            // Curriculum
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
          Syllabus<br />Editor
        </h1>
      </div>

      {/* Belt Accordion */}
      <div className="border-3 border-brand-black">
        {syllabus.map((belt, beltIdx) => {
          const isExpanded = expandedBelt === beltIdx;
          return (
            <div key={belt.belt} className={beltIdx !== syllabus.length - 1 ? 'border-b-3 border-brand-black' : ''}>
              {/* Belt Header */}
              <button
                onClick={() => setExpandedBelt(isExpanded ? null : beltIdx)}
                className={`w-full flex items-center justify-between px-6 py-4 cursor-pointer
                           bg-transparent border-none text-left transition-colors duration-200
                           ${isExpanded ? 'bg-brand-ice/20' : 'hover:bg-brand-ice/10'}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-8 h-4 border-2 flex-shrink-0"
                    style={{ backgroundColor: belt.color, borderColor: belt.borderColor }}
                  />
                  <div>
                    <span className="font-bold text-base uppercase tracking-wide text-brand-black block">
                      {belt.belt}
                    </span>
                    <span className="font-mono text-[0.65rem] tracking-wider uppercase text-brand-muted">
                      {belt.level} · {belt.topics.length} topics
                    </span>
                  </div>
                </div>
                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {/* Topics Editor */}
              {isExpanded && (
                <div className="border-t-2 border-brand-black px-6 py-4">
                  <div className="space-y-2">
                    {belt.topics.map((topic, topicIdx) => (
                      <div key={topicIdx} className="flex items-center gap-3 group">
                        <GripVertical size={14} className="text-brand-ice/40 flex-shrink-0" />
                        <span className="font-mono text-[0.65rem] text-brand-muted flex-shrink-0 w-6">
                          {String(topicIdx + 1).padStart(2, '0')}
                        </span>

                        {editingTopic?.beltIdx === beltIdx && editingTopic?.topicIdx === topicIdx ? (
                          <div className="flex-1 flex items-center gap-2">
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                              autoFocus
                              className="flex-1 px-3 py-1.5 border-2 border-brand-purple font-mono text-sm bg-transparent
                                         outline-none text-brand-black"
                            />
                            <button
                              onClick={saveEdit}
                              className="font-mono text-[0.6rem] font-bold uppercase px-3 py-1.5 border-2 border-brand-purple
                                         bg-brand-purple text-brand-white cursor-pointer"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingTopic(null)}
                              className="font-mono text-[0.6rem] font-bold uppercase px-3 py-1.5 border-2 border-brand-black
                                         bg-transparent text-brand-black cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="flex-1 text-sm text-brand-muted">{topic}</span>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => startEdit(beltIdx, topicIdx)}
                                className="p-1 border-none bg-transparent cursor-pointer text-brand-muted hover:text-brand-purple transition-colors"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => deleteTopic(beltIdx, topicIdx)}
                                className="p-1 border-none bg-transparent cursor-pointer text-brand-muted hover:text-[#D9381E] transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add Topic */}
                  {addingToBelt === beltIdx ? (
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-brand-ice/30">
                      <input
                        type="text"
                        value={newTopicValue}
                        onChange={(e) => setNewTopicValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addTopic(beltIdx)}
                        placeholder="New topic..."
                        autoFocus
                        className="flex-1 px-3 py-2 border-2 border-brand-black font-mono text-sm bg-transparent
                                   outline-none text-brand-black placeholder:text-brand-muted/60 focus:border-brand-purple transition-colors"
                      />
                      <button
                        onClick={() => addTopic(beltIdx)}
                        className="font-mono text-[0.65rem] font-bold uppercase tracking-wider px-4 py-2 border-2 border-brand-black
                                   bg-brand-black text-brand-white cursor-pointer hover:bg-brand-purple hover:border-brand-purple transition-all"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => { setAddingToBelt(null); setNewTopicValue(''); }}
                        className="p-1.5 border-none bg-transparent cursor-pointer text-brand-muted hover:text-brand-black transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAddingToBelt(beltIdx)}
                      className="flex items-center gap-2 mt-4 pt-3 border-t border-brand-ice/30
                                 font-mono text-[0.7rem] font-bold uppercase tracking-wider text-brand-purple
                                 bg-transparent border-b-0 border-x-0 cursor-pointer hover:text-brand-black transition-colors"
                    >
                      <Plus size={14} />
                      Add Topic
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
