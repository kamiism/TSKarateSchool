import { useState } from 'react';
import { Plus, Trash2, Edit, X, ChevronDown } from 'lucide-react';

const typeOptions = [
  { value: 'event', label: 'Event' },
  { value: 'news', label: 'News' },
];

const initialNews = [
  { id: 1, type: 'event', date: '2026-06-15', title: 'Annual Inter-Dojo Championship', description: 'Compete against students from neighboring dojos in kata and kumite. Registration closes June 10th.', tag: 'Tournament' },
  { id: 2, type: 'news', date: '2026-06-08', title: 'Belt Grading Exam — June Batch', description: 'Students eligible for belt promotion are requested to confirm their participation by June 5th.', tag: 'Grading' },
  { id: 3, type: 'event', date: '2026-06-20', title: 'Special Workshop: Self-Defense Basics', description: 'A weekend workshop open to all belt levels. Learn practical self-defense techniques from our senior Sensei.', tag: 'Workshop' },
  { id: 4, type: 'news', date: '2026-06-01', title: 'Summer Training Schedule Update', description: 'New timings effective from June 1st. Morning batches now available for advanced students.', tag: 'Announcement' },
  { id: 5, type: 'event', date: '2026-07-04', title: 'Karate Demo Day — Open House', description: 'Invite your family and friends! Students will perform kata demonstrations and sparring exhibitions.', tag: 'Demo' },
];

const emptyItem = { title: '', description: '', date: '', type: 'news', tag: '' };

export default function NewsManagement() {
  const [items, setItems] = useState(initialNews);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ ...emptyItem });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const openCreate = () => {
    setEditingItem(null);
    setFormData({ ...emptyItem });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingItem(item.id);
    setFormData({ title: item.title, description: item.description, date: item.date, type: item.type, tag: item.tag });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.date || !formData.tag.trim()) return;
    if (editingItem) {
      setItems(prev => prev.map(i => i.id === editingItem ? { ...i, ...formData } : i));
    } else {
      setItems(prev => [{ id: Date.now(), ...formData }, ...prev]);
    }
    setShowModal(false);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    setItems(prev => prev.filter(i => i.id !== id));
    setDeleteConfirm(null);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-2 block">
            // Communications
          </span>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight">
            News &<br />Events
          </h1>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider
                     px-6 py-2.5 border-3 border-brand-black bg-brand-black text-brand-white cursor-pointer
                     transition-all duration-150 hover:bg-brand-purple hover:border-brand-purple
                     hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal self-start sm:self-auto"
        >
          <Plus size={16} />
          Add Entry
        </button>
      </div>

      {/* Items List */}
      <div className="space-y-0">
        {items.map((item, i) => (
          <div
            key={item.id}
            className={`flex items-start gap-6 p-6 border-3 border-brand-black bg-brand-white
                       transition-all duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal
                       ${i > 0 ? '-mt-[3px]' : ''}`}
          >
            {/* Date Block */}
            <div className="flex-shrink-0 w-16 h-16 border-2 border-brand-black flex flex-col items-center justify-center bg-brand-black text-brand-white">
              <span className="font-mono text-xl font-bold leading-none">
                {new Date(item.date).getDate()}
              </span>
              <span className="font-mono text-[0.6rem] tracking-wider uppercase text-brand-ice">
                {new Date(item.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                <h3 className="font-bold text-base uppercase tracking-wide text-brand-black">
                  {item.title}
                </h3>
                <span className={`font-mono text-[0.6rem] tracking-wider uppercase px-2 py-0.5 flex-shrink-0
                                ${item.type === 'event'
                    ? 'bg-brand-purple text-brand-white'
                    : 'bg-brand-ice text-brand-black'
                  }`}>
                  {item.tag}
                </span>
              </div>
              <p className="text-sm text-brand-muted leading-relaxed">{item.description}</p>
              <span className="font-mono text-[0.6rem] text-brand-muted/60 tracking-wider mt-2 block">
                {formatDate(item.date)}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => openEdit(item)}
                className="p-1.5 border-none bg-transparent cursor-pointer text-brand-muted hover:text-brand-purple transition-colors"
                aria-label={`Edit ${item.title}`}
              >
                <Edit size={16} />
              </button>
              {deleteConfirm === item.id ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="font-mono text-[0.55rem] font-bold uppercase px-2 py-1 border-2 border-[#D9381E] bg-[#D9381E] text-brand-white cursor-pointer"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="font-mono text-[0.55rem] font-bold uppercase px-2 py-1 border-2 border-brand-black bg-transparent text-brand-black cursor-pointer"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirm(item.id)}
                  className="p-1.5 border-none bg-transparent cursor-pointer text-brand-muted hover:text-[#D9381E] transition-colors"
                  aria-label={`Delete ${item.title}`}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black/80 backdrop-blur-sm p-4">
          <div className="bg-brand-white border-4 border-brand-black w-full max-w-lg p-8 relative shadow-brutal-lg">
            <button
              onClick={() => { setShowModal(false); setEditingItem(null); }}
              className="absolute top-4 right-4 cursor-pointer bg-transparent border-none text-brand-black hover:text-brand-purple transition-colors"
            >
              <X size={20} />
            </button>

            <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-4 block">
              // {editingItem ? 'Edit' : 'New'} Entry
            </span>
            <h3 className="text-xl font-bold mb-6">{editingItem ? 'Edit' : 'Add'} News / Event</h3>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Event or news title"
                  className="w-full px-4 py-3 border-3 border-brand-black font-mono text-sm bg-transparent
                             outline-none text-brand-black placeholder:text-brand-muted/60 focus:border-brand-purple transition-colors"
                />
              </div>

              {/* Type + Tag */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">Type</label>
                  <div className="relative">
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full appearance-none px-4 py-3 pr-10 border-3 border-brand-black font-mono text-sm
                                 bg-transparent cursor-pointer outline-none text-brand-black"
                    >
                      {typeOptions.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">Tag</label>
                  <input
                    type="text"
                    value={formData.tag}
                    onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value }))}
                    placeholder="e.g. Tournament"
                    className="w-full px-4 py-3 border-3 border-brand-black font-mono text-sm bg-transparent
                               outline-none text-brand-black placeholder:text-brand-muted/60 focus:border-brand-purple transition-colors"
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-3 border-3 border-brand-black font-mono text-sm bg-transparent
                             outline-none text-brand-black focus:border-brand-purple transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description..."
                  rows={3}
                  className="w-full px-4 py-3 border-3 border-brand-black font-mono text-sm bg-transparent
                             outline-none text-brand-black placeholder:text-brand-muted/60 resize-y focus:border-brand-purple transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full mt-6 font-mono text-sm font-bold uppercase tracking-wider py-3.5 border-3 border-brand-black
                         bg-brand-black text-brand-white cursor-pointer transition-all duration-150
                         hover:bg-brand-purple hover:border-brand-purple hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              {editingItem ? 'Save Changes' : 'Add Entry'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
