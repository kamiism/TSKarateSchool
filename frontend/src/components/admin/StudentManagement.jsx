import { useState } from 'react';
import { Search, Plus, Trash2, ChevronDown, X, WifiOff, Wifi } from 'lucide-react';

const beltOptions = [
  { belt: 'White Belt', color: '#F5F5F5', borderColor: '#999' },
  { belt: 'Yellow Belt', color: '#FFD700', borderColor: '#DAA520' },
  { belt: 'Orange Belt', color: '#FF8C00', borderColor: '#CC7000' },
  { belt: 'Green Belt', color: '#228B22', borderColor: '#1A6B1A' },
  { belt: 'Blue Belt', color: '#1E90FF', borderColor: '#0B6EC5' },
  { belt: 'Brown Belt', color: '#8B4513', borderColor: '#6B3410' },
  { belt: 'Black Belt', color: '#000505', borderColor: '#3B3355' },
];

const offlineStudents = [
  { id: 1, name: 'Arjun Sharma', belt: 'Orange Belt', beltColor: '#FF8C00', quizPoints: 780, attendance: 70 },
  { id: 2, name: 'Priya Patel', belt: 'Green Belt', beltColor: '#228B22', quizPoints: 950, attendance: 92 },
  { id: 3, name: 'Rahul Kumar', belt: 'Blue Belt', beltColor: '#1E90FF', quizPoints: 880, attendance: 85 },
  { id: 4, name: 'Sneha Gupta', belt: 'Yellow Belt', beltColor: '#FFD700', quizPoints: 720, attendance: 78 },
  { id: 5, name: 'Vikram Singh', belt: 'Orange Belt', beltColor: '#FF8C00', quizPoints: 690, attendance: 65 },
  { id: 6, name: 'Ananya Joshi', belt: 'White Belt', beltColor: '#F5F5F5', quizPoints: 650, attendance: 88 },
  { id: 7, name: 'Karthik Nair', belt: 'Yellow Belt', beltColor: '#FFD700', quizPoints: 600, attendance: 72 },
  { id: 8, name: 'Divya Reddy', belt: 'White Belt', beltColor: '#F5F5F5', quizPoints: 550, attendance: 60 },
];

const hybridStudents = [
  { id: 101, name: 'Aditya Verma', belt: 'Green Belt', beltColor: '#228B22', quizPoints: 820, attendance: 88 },
  { id: 102, name: 'Meera Iyer', belt: 'Blue Belt', beltColor: '#1E90FF', quizPoints: 910, attendance: 95 },
  { id: 103, name: 'Rohan Das', belt: 'Orange Belt', beltColor: '#FF8C00', quizPoints: 760, attendance: 80 },
  { id: 104, name: 'Kavya Menon', belt: 'Yellow Belt', beltColor: '#FFD700', quizPoints: 680, attendance: 75 },
  { id: 105, name: 'Suresh Babu', belt: 'Brown Belt', beltColor: '#8B4513', quizPoints: 970, attendance: 91 },
];

export default function StudentManagement({ adminMode = 'offline' }) {
  const [students, setStudents] = useState(adminMode === 'hybrid' ? hybridStudents : offlineStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBelt, setFilterBelt] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [newStudent, setNewStudent] = useState({ name: '', belt: 'White Belt' });

  const filtered = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBelt = filterBelt === 'All' || s.belt === filterBelt;
    return matchesSearch && matchesBelt;
  });

  const handleBeltChange = (studentId, newBelt) => {
    const beltObj = beltOptions.find(b => b.belt === newBelt);
    setStudents(prev =>
      prev.map(s => s.id === studentId ? { ...s, belt: newBelt, beltColor: beltObj?.color || s.beltColor } : s)
    );
  };

  const handleAddStudent = () => {
    if (!newStudent.name.trim()) return;
    const beltObj = beltOptions.find(b => b.belt === newStudent.belt);
    const student = {
      id: Date.now(),
      name: newStudent.name.trim(),
      belt: newStudent.belt,
      beltColor: beltObj?.color || '#F5F5F5',
      quizPoints: 0,
      attendance: 0,
    };
    setStudents(prev => [...prev, student]);
    setNewStudent({ name: '', belt: 'White Belt' });
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted">
            // Management
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
          Student<br />Registry
        </h1>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="flex-1 flex items-center border-3 border-brand-black bg-brand-white px-4">
          <Search size={16} className="text-brand-muted flex-shrink-0" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2.5 font-mono text-sm bg-transparent border-none outline-none text-brand-black placeholder:text-brand-muted/60"
          />
        </div>

        {/* Belt Filter */}
        <div className="relative">
          <select
            value={filterBelt}
            onChange={(e) => setFilterBelt(e.target.value)}
            className="appearance-none font-mono text-sm font-medium uppercase tracking-wider
                       px-5 py-2.5 pr-10 border-3 border-brand-black bg-brand-white text-brand-black
                       cursor-pointer outline-none"
          >
            <option value="All">All Belts</option>
            {beltOptions.map(b => (
              <option key={b.belt} value={b.belt}>{b.belt}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
        </div>

        {/* Add Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 font-mono text-sm font-bold uppercase tracking-wider
                     px-6 py-2.5 border-3 border-brand-black bg-brand-black text-brand-white cursor-pointer
                     transition-all duration-150 hover:bg-brand-purple hover:border-brand-purple
                     hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
        >
          <Plus size={16} />
          Add Student
        </button>
      </div>

      {/* Student Count */}
      <div className="mb-4">
        <span className="font-mono text-xs text-brand-muted tracking-wider">
          {filtered.length} student{filtered.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {/* Table */}
      <div className="border-3 border-brand-black bg-brand-white overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b-2 border-brand-black">
              <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4">#</th>
              <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4">Name</th>
              <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4">Belt</th>
              <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-right py-3 px-4">Quiz Pts</th>
              <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-right py-3 px-4">Attendance</th>
              <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-center py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student, idx) => (
              <tr key={student.id} className="border-b border-brand-ice/20 hover:bg-brand-ice/10 transition-colors">
                <td className="py-3.5 px-4">
                  <span className="font-mono text-xs text-brand-muted">{String(idx + 1).padStart(2, '0')}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-medium text-sm text-brand-black">{student.name}</span>
                </td>
                <td className="py-3.5 px-4">
                  <div className="relative inline-block">
                    <select
                      value={student.belt}
                      onChange={(e) => handleBeltChange(student.id, e.target.value)}
                      className="appearance-none font-mono text-xs font-medium uppercase tracking-wider
                                 pl-8 pr-6 py-1.5 border-2 bg-transparent cursor-pointer outline-none"
                      style={{ borderColor: student.beltColor }}
                    >
                      {beltOptions.map(b => (
                        <option key={b.belt} value={b.belt}>{b.belt}</option>
                      ))}
                    </select>
                    <div
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-2 border"
                      style={{ backgroundColor: student.beltColor, borderColor: student.beltColor }}
                    />
                    <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
                  </div>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <span className="font-mono text-sm font-bold text-brand-black">{student.quizPoints}</span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 h-2 border border-brand-ice/40 bg-brand-ice/10">
                      <div
                        className="h-full bg-brand-purple transition-all"
                        style={{ width: `${student.attendance}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-brand-muted">{student.attendance}%</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-center">
                  {deleteConfirm === student.id ? (
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="font-mono text-[0.6rem] font-bold uppercase tracking-wider px-3 py-1
                                   border-2 border-[#D9381E] bg-[#D9381E] text-brand-white cursor-pointer"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="font-mono text-[0.6rem] font-bold uppercase tracking-wider px-3 py-1
                                   border-2 border-brand-black bg-transparent text-brand-black cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(student.id)}
                      className="p-1.5 border-none bg-transparent cursor-pointer text-brand-muted
                                 hover:text-[#D9381E] transition-colors"
                      aria-label={`Delete ${student.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className="py-10 text-center">
                  <span className="font-mono text-sm text-brand-muted">No students found</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black/80 backdrop-blur-sm p-4">
          <div className="bg-brand-white border-4 border-brand-black w-full max-w-md p-8 relative shadow-brutal-lg">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 cursor-pointer bg-transparent border-none text-brand-black hover:text-brand-purple transition-colors"
            >
              <X size={20} />
            </button>

            <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-4 block">
              // New Student
            </span>
            <h3 className="text-xl font-bold mb-6">Add Student</h3>

            <div className="space-y-4">
              <div>
                <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter student name"
                  className="w-full px-4 py-3 border-3 border-brand-black font-mono text-sm bg-transparent
                             outline-none text-brand-black placeholder:text-brand-muted/60
                             focus:border-brand-purple transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
                  Starting Belt
                </label>
                <div className="relative">
                  <select
                    value={newStudent.belt}
                    onChange={(e) => setNewStudent(prev => ({ ...prev, belt: e.target.value }))}
                    className="w-full appearance-none px-4 py-3 pr-10 border-3 border-brand-black font-mono text-sm
                               bg-transparent cursor-pointer outline-none text-brand-black"
                  >
                    {beltOptions.map(b => (
                      <option key={b.belt} value={b.belt}>{b.belt}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
                </div>
              </div>
            </div>

            <button
              onClick={handleAddStudent}
              disabled={!newStudent.name.trim()}
              className={`w-full mt-6 font-mono text-sm font-bold uppercase tracking-wider py-3.5 border-3 border-brand-black
                         transition-all duration-150
                         ${newStudent.name.trim()
                  ? 'bg-brand-black text-brand-white cursor-pointer hover:bg-brand-purple hover:border-brand-purple hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5'
                  : 'bg-brand-ice text-brand-muted cursor-not-allowed opacity-50'
                }`}
            >
              Add Student
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
