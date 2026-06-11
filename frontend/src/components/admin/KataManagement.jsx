import { useState } from 'react';
import { Plus, Trash2, Edit, X, Play, ExternalLink, WifiOff, Wifi } from 'lucide-react';

const beltOptions = ['White Belt', 'Yellow Belt', 'Orange Belt', 'Green Belt', 'Blue Belt', 'Brown Belt', 'Black Belt'];

const offlineVideos = [
  { id: 1, youtubeId: 'q59hFRLjQqo', title: 'Taikyoku Shodan', belt: 'White Belt', description: 'The first and most fundamental kata. Master the basic form of stepping and punching.' },
  { id: 2, youtubeId: 'q59hFRLjQqo', title: 'Heian Shodan', belt: 'Yellow Belt', description: 'Introduces rising block and knife-hand techniques in a structured pattern.' },
  { id: 3, youtubeId: 'q59hFRLjQqo', title: 'Heian Nidan', belt: 'Orange Belt', description: 'Develops back stance, side kick, and more complex blocking sequences.' },
  { id: 4, youtubeId: 'q59hFRLjQqo', title: 'Heian Sandan', belt: 'Green Belt', description: 'Introduces elbow strikes, spinning techniques, and simultaneous block-strike.' },
  { id: 5, youtubeId: 'q59hFRLjQqo', title: 'Bassai Dai', belt: 'Brown Belt', description: 'A powerful kata emphasizing the conversion of defensive moves to offensive attacks.' },
];

const hybridVideos = [
  { id: 201, youtubeId: 'q59hFRLjQqo', title: 'Online: Taikyoku Shodan Tutorial', belt: 'White Belt', description: 'Step-by-step online tutorial for learning Taikyoku Shodan at home.' },
  { id: 202, youtubeId: 'q59hFRLjQqo', title: 'Online: Heian Shodan Breakdown', belt: 'Yellow Belt', description: 'Detailed breakdown of each movement in Heian Shodan for remote practice.' },
  { id: 203, youtubeId: 'q59hFRLjQqo', title: 'Online: Heian Nidan Analysis', belt: 'Orange Belt', description: 'Video analysis of Heian Nidan with slow-motion demonstrations.' },
];

const emptyVideo = { title: '', youtubeId: '', belt: 'White Belt', description: '' };

export default function KataManagement({ adminMode = 'offline' }) {
  const [videos, setVideos] = useState(adminMode === 'hybrid' ? hybridVideos : offlineVideos);
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({ ...emptyVideo });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const openCreate = () => {
    setEditingVideo(null);
    setFormData({ ...emptyVideo });
    setShowModal(true);
  };

  const openEdit = (video) => {
    setEditingVideo(video.id);
    setFormData({ title: video.title, youtubeId: video.youtubeId, belt: video.belt, description: video.description });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.title.trim() || !formData.youtubeId.trim()) return;
    if (editingVideo) {
      setVideos(prev => prev.map(v => v.id === editingVideo ? { ...v, ...formData } : v));
    } else {
      setVideos(prev => [...prev, { id: Date.now(), ...formData }]);
    }
    setShowModal(false);
    setEditingVideo(null);
  };

  const handleDelete = (id) => {
    setVideos(prev => prev.filter(v => v.id !== id));
    setDeleteConfirm(null);
  };

  const getThumbnail = (ytId) => `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted">
              // Training
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
            Kata Video<br />Library
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
          Add Video
        </button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="border-3 border-brand-black bg-brand-white transition-all duration-200
                       hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal group"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-brand-ice/20 overflow-hidden">
              <img
                src={getThumbnail(video.youtubeId)}
                alt={video.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 border-3 border-brand-white bg-brand-white/90 flex items-center justify-center
                             text-brand-black hover:bg-brand-purple hover:text-brand-white hover:border-brand-purple transition-all"
                >
                  <Play size={20} fill="currentColor" />
                </a>
              </div>
              {/* Belt Badge */}
              <span className="absolute top-2 left-2 font-mono text-[0.55rem] tracking-wider uppercase bg-brand-purple text-brand-white px-2 py-0.5">
                {video.belt}
              </span>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="font-bold text-sm uppercase tracking-wide text-brand-black mb-1">
                {video.title}
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed mb-3 line-clamp-2">
                {video.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.6rem] text-brand-muted flex items-center gap-1">
                  <ExternalLink size={10} />
                  {video.youtubeId}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEdit(video)}
                    className="p-1 border-none bg-transparent cursor-pointer text-brand-muted hover:text-brand-purple transition-colors"
                  >
                    <Edit size={14} />
                  </button>
                  {deleteConfirm === video.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="font-mono text-[0.5rem] font-bold uppercase px-2 py-1 border border-[#D9381E] bg-[#D9381E] text-brand-white cursor-pointer"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="font-mono text-[0.5rem] font-bold uppercase px-2 py-1 border border-brand-black bg-transparent text-brand-black cursor-pointer"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(video.id)}
                      className="p-1 border-none bg-transparent cursor-pointer text-brand-muted hover:text-[#D9381E] transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black/80 backdrop-blur-sm p-4">
          <div className="bg-brand-white border-4 border-brand-black w-full max-w-lg p-8 relative shadow-brutal-lg">
            <button
              onClick={() => { setShowModal(false); setEditingVideo(null); }}
              className="absolute top-4 right-4 cursor-pointer bg-transparent border-none text-brand-black hover:text-brand-purple transition-colors"
            >
              <X size={20} />
            </button>

            <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-4 block">
              // {editingVideo ? 'Edit' : 'New'} Video
            </span>
            <h3 className="text-xl font-bold mb-6">{editingVideo ? 'Edit' : 'Add'} Kata Video</h3>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">Kata Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Heian Shodan"
                  className="w-full px-4 py-3 border-3 border-brand-black font-mono text-sm bg-transparent
                             outline-none text-brand-black placeholder:text-brand-muted/60 focus:border-brand-purple transition-colors"
                />
              </div>

              {/* YouTube ID */}
              <div>
                <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">YouTube Video ID</label>
                <input
                  type="text"
                  value={formData.youtubeId}
                  onChange={(e) => setFormData(prev => ({ ...prev, youtubeId: e.target.value }))}
                  placeholder="e.g. q59hFRLjQqo"
                  className="w-full px-4 py-3 border-3 border-brand-black font-mono text-sm bg-transparent
                             outline-none text-brand-black placeholder:text-brand-muted/60 focus:border-brand-purple transition-colors"
                />
                <span className="font-mono text-[0.6rem] text-brand-muted/60 mt-1 block">
                  The ID from youtube.com/watch?v=<strong>ID_HERE</strong>
                </span>
              </div>

              {/* Belt */}
              <div>
                <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">Belt Level</label>
                <select
                  value={formData.belt}
                  onChange={(e) => setFormData(prev => ({ ...prev, belt: e.target.value }))}
                  className="w-full appearance-none px-4 py-3 border-3 border-brand-black font-mono text-sm
                             bg-transparent cursor-pointer outline-none text-brand-black"
                >
                  {beltOptions.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of this kata..."
                  rows={3}
                  className="w-full px-4 py-3 border-3 border-brand-black font-mono text-sm bg-transparent
                             outline-none text-brand-black placeholder:text-brand-muted/60 resize-y focus:border-brand-purple transition-colors"
                />
              </div>

              {/* Preview */}
              {formData.youtubeId.trim() && (
                <div>
                  <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">Preview</label>
                  <div className="border-2 border-brand-ice/30 aspect-video">
                    <img
                      src={getThumbnail(formData.youtubeId)}
                      alt="Video preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleSave}
              disabled={!formData.title.trim() || !formData.youtubeId.trim()}
              className={`w-full mt-6 font-mono text-sm font-bold uppercase tracking-wider py-3.5 border-3 border-brand-black
                         transition-all duration-150
                         ${formData.title.trim() && formData.youtubeId.trim()
                  ? 'bg-brand-black text-brand-white cursor-pointer hover:bg-brand-purple hover:border-brand-purple hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5'
                  : 'bg-brand-ice text-brand-muted cursor-not-allowed opacity-50'
                }`}
            >
              {editingVideo ? 'Save Changes' : 'Add Video'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
