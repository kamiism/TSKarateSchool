import { useState, useMemo } from 'react';
import { ChevronDown, Check, X, CalendarDays, ClipboardList, ChevronLeft, ChevronRight } from 'lucide-react';

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

const allStudents = [
  { id: 1, name: 'Arjun Sharma', belt: 'Orange Belt', beltColor: '#FF8C00' },
  { id: 2, name: 'Priya Patel', belt: 'Green Belt', beltColor: '#228B22' },
  { id: 3, name: 'Rahul Kumar', belt: 'Blue-II Belt', beltColor: '#1E90FF' },
  { id: 4, name: 'Sneha Gupta', belt: 'Yellow Belt', beltColor: '#FFD700' },
  { id: 5, name: 'Vikram Singh', belt: 'Orange Belt', beltColor: '#FF8C00' },
  { id: 6, name: 'Ananya Joshi', belt: 'White Belt', beltColor: '#F5F5F5' },
  { id: 7, name: 'Karthik Nair', belt: 'Yellow Belt', beltColor: '#FFD700' },
  { id: 8, name: 'Divya Reddy', belt: 'White Belt', beltColor: '#F5F5F5' },
  { id: 9, name: 'Aditya Verma', belt: 'Green Belt', beltColor: '#228B22' },
  { id: 10, name: 'Meera Iyer', belt: 'Blue-II Belt', beltColor: '#1E90FF' },
  { id: 11, name: 'Rohan Das', belt: 'Orange Belt', beltColor: '#FF8C00' },
  { id: 12, name: 'Kavya Menon', belt: 'Yellow Belt', beltColor: '#FFD700' },
  { id: 13, name: 'Suresh Babu', belt: 'Brown-I Belt', beltColor: '#8B4513' },
];

// Generate mock past attendance (last 30 days, random)
function generateMockAttendance() {
  const records = {};
  const today = new Date();
  allStudents.forEach((s) => {
    records[s.id] = {};
    for (let i = 1; i <= 25; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      if (d.getDay() === 0) continue; // skip Sundays
      const key = d.toISOString().split('T')[0];
      records[s.id][key] = Math.random() > 0.2;
    }
  });
  return records;
}

const formatDate = (d) => d.toISOString().split('T')[0];

export default function AttendanceManagement() {
  const [tab, setTab] = useState('mark'); // 'mark' | 'sheet'
  const [selectedBelt, setSelectedBelt] = useState('All');
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [attendanceRecords, setAttendanceRecords] = useState(generateMockAttendance);
  const [todayMarked, setTodayMarked] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sheetMonth, setSheetMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const filteredStudents = selectedBelt === 'All'
    ? allStudents
    : allStudents.filter((s) => s.belt === selectedBelt);

  // Mark Attendance handlers
  const toggleStudent = (id) => {
    if (submitted) return;
    setTodayMarked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAll = () => {
    if (submitted) return;
    const allMarked = filteredStudents.every((s) => todayMarked[s.id]);
    const updated = { ...todayMarked };
    filteredStudents.forEach((s) => { updated[s.id] = !allMarked; });
    setTodayMarked(updated);
  };

  const handleSubmit = () => {
    setAttendanceRecords((prev) => {
      const updated = { ...prev };
      allStudents.forEach((s) => {
        if (!updated[s.id]) updated[s.id] = {};
        updated[s.id][selectedDate] = !!todayMarked[s.id];
      });
      return updated;
    });
    setSubmitted(true);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setTodayMarked({});
    setSubmitted(false);
    // Pre-fill if records exist for that date
    const existing = {};
    allStudents.forEach((s) => {
      if (attendanceRecords[s.id]?.[e.target.value]) {
        existing[s.id] = true;
      }
    });
    setTodayMarked(existing);
  };

  // Attendance Sheet helpers
  const daysInMonth = new Date(sheetMonth.year, sheetMonth.month + 1, 0).getDate();
  const monthDates = useMemo(() => {
    const dates = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(sheetMonth.year, sheetMonth.month, d);
      if (date.getDay() !== 0) { // exclude Sundays
        dates.push(formatDate(date));
      }
    }
    return dates;
  }, [sheetMonth, daysInMonth]);

  const monthLabel = new Date(sheetMonth.year, sheetMonth.month).toLocaleString('default', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    setSheetMonth((p) => {
      const d = new Date(p.year, p.month - 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  const nextMonth = () => {
    setSheetMonth((p) => {
      const d = new Date(p.year, p.month + 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  const getStudentStats = (studentId) => {
    const rec = attendanceRecords[studentId] || {};
    let present = 0, total = 0;
    monthDates.forEach((date) => {
      if (rec[date] !== undefined) {
        total++;
        if (rec[date]) present++;
      }
    });
    return { present, total, percent: total > 0 ? Math.round((present / total) * 100) : 0 };
  };

  const presentCount = filteredStudents.filter((s) => todayMarked[s.id]).length;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-2 block">
            // Tracking
          </span>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight">
            Attendance<br />Management
          </h1>
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-0 self-start sm:self-auto">
          <button
            onClick={() => setTab('mark')}
            className={`flex items-center gap-2 px-5 py-2.5 font-mono text-[0.7rem] font-bold uppercase tracking-wider border-3 border-brand-black cursor-pointer transition-all duration-150
              ${tab === 'mark'
                ? 'bg-brand-black text-brand-white'
                : 'bg-brand-white text-brand-black hover:bg-brand-ice/20'
              }`}
          >
            <CalendarDays size={14} />
            Mark Attendance
          </button>
          <button
            onClick={() => setTab('sheet')}
            className={`flex items-center gap-2 px-5 py-2.5 font-mono text-[0.7rem] font-bold uppercase tracking-wider border-3 border-brand-black border-l-0 cursor-pointer transition-all duration-150
              ${tab === 'sheet'
                ? 'bg-brand-black text-brand-white'
                : 'bg-brand-white text-brand-black hover:bg-brand-ice/20'
              }`}
          >
            <ClipboardList size={14} />
            Attendance Sheet
          </button>
        </div>
      </div>

      {tab === 'mark' ? (
        /* ─── MARK ATTENDANCE TAB ─── */
        <div>
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Date Picker */}
            <div className="flex items-center border-3 border-brand-black bg-brand-white px-4">
              <CalendarDays size={16} className="text-brand-muted flex-shrink-0" />
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="px-3 py-2.5 font-mono text-sm bg-transparent border-none outline-none text-brand-black cursor-pointer"
              />
            </div>

            {/* Belt Filter */}
            <div className="relative">
              <select
                value={selectedBelt}
                onChange={(e) => setSelectedBelt(e.target.value)}
                className="appearance-none font-mono text-sm font-medium uppercase tracking-wider
                           px-5 py-2.5 pr-10 border-3 border-brand-black bg-brand-white text-brand-black
                           cursor-pointer outline-none"
              >
                <option value="All">All Belts</option>
                {beltOptions.map((b) => (
                  <option key={b.belt} value={b.belt}>{b.belt}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
            </div>

            {/* Count Badge */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-3 border-brand-black bg-brand-black text-brand-white font-mono text-sm">
              <span className="font-bold">{presentCount}</span>
              <span className="text-brand-ice">/ {filteredStudents.length} present</span>
            </div>
          </div>

          {/* Student Checklist */}
          <div className="border-3 border-brand-black bg-brand-white">
            {/* Select All Header */}
            <div className="flex items-center gap-4 px-6 py-3 border-b-2 border-brand-black bg-brand-ice/10">
              <button
                onClick={handleSelectAll}
                disabled={submitted}
                className={`w-6 h-6 border-3 flex items-center justify-center transition-all duration-150
                  ${filteredStudents.every((s) => todayMarked[s.id]) && filteredStudents.length > 0
                    ? 'border-brand-purple bg-brand-purple'
                    : 'border-brand-black bg-transparent'
                  } ${submitted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {filteredStudents.every((s) => todayMarked[s.id]) && filteredStudents.length > 0 && (
                  <Check size={14} className="text-brand-white" strokeWidth={3} />
                )}
              </button>
              <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted">
                Select All Students
              </span>
            </div>

            {/* Student Rows */}
            {filteredStudents.map((student, idx) => (
              <div
                key={student.id}
                onClick={() => toggleStudent(student.id)}
                className={`flex items-center gap-4 px-6 py-4 border-b border-brand-ice/20
                           transition-all duration-150
                           ${submitted ? 'cursor-default' : 'cursor-pointer hover:bg-brand-ice/10'}
                           ${todayMarked[student.id] ? 'bg-[#228B22]/5' : ''}`}
              >
                {/* Checkbox */}
                <div className={`w-6 h-6 border-3 flex items-center justify-center flex-shrink-0 transition-all duration-150
                  ${todayMarked[student.id]
                    ? 'border-[#228B22] bg-[#228B22]'
                    : 'border-brand-black bg-transparent'
                  }`}
                >
                  {todayMarked[student.id] && (
                    <Check size={14} className="text-brand-white" strokeWidth={3} />
                  )}
                </div>

                {/* Index */}
                <span className="font-mono text-xs text-brand-muted w-6 flex-shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Name */}
                <span className="font-medium text-sm text-brand-black flex-1">
                  {student.name}
                </span>

                {/* Belt Badge */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-2.5 border"
                    style={{ backgroundColor: student.beltColor, borderColor: student.beltColor }}
                  />
                  <span className="font-mono text-[0.6rem] tracking-wider uppercase text-brand-muted hidden sm:inline">
                    {student.belt}
                  </span>
                </div>

                {/* Status */}
                <span className={`font-mono text-xs font-bold uppercase tracking-wider w-16 text-right
                  ${todayMarked[student.id] ? 'text-[#228B22]' : 'text-brand-muted'}`}
                >
                  {todayMarked[student.id] ? 'Present' : 'Absent'}
                </span>
              </div>
            ))}

            {filteredStudents.length === 0 && (
              <div className="py-12 text-center">
                <span className="font-mono text-sm text-brand-muted">No students found for this belt</span>
              </div>
            )}
          </div>

          {/* Submit / Edit Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSubmit}
              disabled={submitted}
              className={`flex-1 font-mono text-sm font-bold uppercase tracking-wider py-4 border-3 border-brand-black
                         transition-all duration-150
                         ${submitted
                  ? 'bg-[#228B22] border-[#228B22] text-brand-white cursor-default'
                  : 'bg-brand-black text-brand-white cursor-pointer hover:bg-brand-purple hover:border-brand-purple hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5'
                }`}
            >
              {submitted
                ? `✓ Attendance Submitted — ${presentCount}/${filteredStudents.length} Present`
                : `Submit Attendance for ${selectedDate}`
              }
            </button>
            {submitted && (
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 font-mono text-sm font-bold uppercase tracking-wider py-4 border-3 border-brand-black
                           bg-brand-white text-brand-black cursor-pointer transition-all duration-150
                           hover:bg-brand-black hover:text-brand-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      ) : (
        /* ─── ATTENDANCE SHEET TAB ─── */
        <div>
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
            {/* Month Navigation */}
            <div className="flex items-center gap-0">
              <button
                onClick={prevMonth}
                className="w-10 h-10 border-3 border-brand-black bg-brand-white flex items-center justify-center cursor-pointer
                           hover:bg-brand-black hover:text-brand-white transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="px-5 py-2 border-3 border-brand-black border-l-0 bg-brand-white font-mono text-sm font-bold uppercase tracking-wider min-w-[180px] text-center">
                {monthLabel}
              </div>
              <button
                onClick={nextMonth}
                className="w-10 h-10 border-3 border-brand-black border-l-0 bg-brand-white flex items-center justify-center cursor-pointer
                           hover:bg-brand-black hover:text-brand-white transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Belt Filter */}
            <div className="relative">
              <select
                value={selectedBelt}
                onChange={(e) => setSelectedBelt(e.target.value)}
                className="appearance-none font-mono text-sm font-medium uppercase tracking-wider
                           px-5 py-2.5 pr-10 border-3 border-brand-black bg-brand-white text-brand-black
                           cursor-pointer outline-none"
              >
                <option value="All">All Belts</option>
                {beltOptions.map((b) => (
                  <option key={b.belt} value={b.belt}>{b.belt}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
            </div>
          </div>

          {/* Attendance Grid */}
          <div className="border-3 border-brand-black bg-brand-white overflow-x-auto">
            <table className="w-full" style={{ minWidth: `${200 + monthDates.length * 36}px` }}>
              <thead>
                <tr className="border-b-2 border-brand-black">
                  <th className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-brand-muted text-left py-3 px-4 sticky left-0 bg-brand-white z-10 min-w-[160px]">
                    Student
                  </th>
                  {monthDates.map((date) => {
                    const day = new Date(date).getDate();
                    const dayName = new Date(date).toLocaleDateString('en', { weekday: 'short' }).charAt(0);
                    return (
                      <th key={date} className="py-2 px-0 text-center min-w-[34px]">
                        <span className="font-mono text-[0.5rem] text-brand-muted block">{dayName}</span>
                        <span className="font-mono text-[0.65rem] font-bold text-brand-black block">{day}</span>
                      </th>
                    );
                  })}
                  <th className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-brand-muted text-center py-3 px-3 sticky right-0 bg-brand-white z-10 min-w-[70px] border-l-2 border-brand-black">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => {
                  const stats = getStudentStats(student.id);
                  const rec = attendanceRecords[student.id] || {};
                  return (
                    <tr key={student.id} className="border-b border-brand-ice/20 hover:bg-brand-ice/5 transition-colors">
                      <td className="py-2.5 px-4 sticky left-0 bg-brand-white z-10">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-1.5 border flex-shrink-0"
                            style={{ backgroundColor: student.beltColor, borderColor: student.beltColor }}
                          />
                          <span className="font-medium text-xs text-brand-black whitespace-nowrap">{student.name}</span>
                        </div>
                      </td>
                      {monthDates.map((date) => {
                        const status = rec[date];
                        return (
                          <td key={date} className="py-2 px-0 text-center">
                            {status === undefined ? (
                              <span className="inline-block w-5 h-5 bg-brand-ice/20 border border-brand-ice/30" />
                            ) : status ? (
                              <span className="inline-flex items-center justify-center w-5 h-5 bg-[#228B22]/15 border border-[#228B22]/30">
                                <Check size={10} className="text-[#228B22]" strokeWidth={3} />
                              </span>
                            ) : (
                              <span className="inline-flex items-center justify-center w-5 h-5 bg-[#D9381E]/10 border border-[#D9381E]/30">
                                <X size={10} className="text-[#D9381E]" strokeWidth={3} />
                              </span>
                            )}
                          </td>
                        );
                      })}
                      <td className="py-2.5 px-3 text-center sticky right-0 bg-brand-white z-10 border-l-2 border-brand-black">
                        <div className="flex flex-col items-center gap-0.5">
                          <span className={`font-mono text-xs font-bold ${stats.percent >= 75 ? 'text-[#228B22]' : stats.percent >= 50 ? 'text-[#FF8C00]' : 'text-[#D9381E]'}`}>
                            {stats.percent}%
                          </span>
                          <span className="font-mono text-[0.55rem] text-brand-muted">
                            {stats.present}/{stats.total}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={monthDates.length + 2} className="py-12 text-center">
                      <span className="font-mono text-sm text-brand-muted">No students found for this belt</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 bg-[#228B22]/15 border border-[#228B22]/30">
                <Check size={10} className="text-[#228B22]" strokeWidth={3} />
              </span>
              <span className="font-mono text-[0.65rem] text-brand-muted uppercase tracking-wider">Present</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-5 h-5 bg-[#D9381E]/10 border border-[#D9381E]/30">
                <X size={10} className="text-[#D9381E]" strokeWidth={3} />
              </span>
              <span className="font-mono text-[0.65rem] text-brand-muted uppercase tracking-wider">Absent</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-5 h-5 bg-brand-ice/20 border border-brand-ice/30" />
              <span className="font-mono text-[0.65rem] text-brand-muted uppercase tracking-wider">No Record</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
