import { useState } from 'react';
import { Shield, Plus, Trash2, Mail, User, ShieldAlert, Key, AtSign } from 'lucide-react';
import { globalStaffData } from '../../data/staffData';

export default function StaffManagement() {
  const [staff, setStaff] = useState(globalStaffData);
  const [showAdd, setShowAdd] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', email: '', username: '', password: '', role: 'Moderator' });
  const [toast, setToast] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email || !newStaff.username || !newStaff.password) return;

    const added = { id: Date.now(), ...newStaff, status: 'Active' };
    setStaff([...staff, added]);
    globalStaffData.push(added);
    setNewStaff({ name: '', email: '', username: '', password: '', role: 'Moderator' });
    setShowAdd(false);
    showToast('Staff member added successfully.');
  };

  const handleRemove = (id) => {
    setStaff(staff.filter(s => s.id !== id));
    showToast('Staff member removed.');
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight">
            Staff &<br />Moderators
          </h1>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-wider
                     px-6 py-2.5 border-3 border-brand-black bg-brand-black text-brand-white cursor-pointer
                     transition-all duration-150 hover:bg-brand-purple hover:border-brand-purple
                     hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal self-start sm:self-auto"
        >
          <Plus size={16} />
          {showAdd ? 'Cancel' : 'Add Staff'}
        </button>
      </div>

      {/* Add Staff Form */}
      {showAdd && (
        <form onSubmit={handleAdd} className="border-3 border-brand-black p-6 bg-brand-white mb-8 shadow-brutal">
          <h2 className="font-mono text-sm tracking-widest uppercase text-brand-black mb-6 border-b-2 border-brand-black pb-2">
            New Staff Member
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
                Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="text"
                  required
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 border-2 border-brand-black font-mono text-sm bg-transparent
                             outline-none focus:border-brand-purple transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="email"
                  required
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 border-2 border-brand-black font-mono text-sm bg-transparent
                             outline-none focus:border-brand-purple transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
                Username (Login ID)
              </label>
              <div className="relative">
                <AtSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="text"
                  required
                  value={newStaff.username}
                  onChange={(e) => setNewStaff({ ...newStaff, username: e.target.value })}
                  placeholder="sensei_user"
                  className="w-full pl-10 pr-4 py-3 border-2 border-brand-black font-mono text-sm bg-transparent
                             outline-none focus:border-brand-purple transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
                Password
              </label>
              <div className="relative">
                <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="password"
                  required
                  value={newStaff.password}
                  onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border-2 border-brand-black font-mono text-sm bg-transparent
                             outline-none focus:border-brand-purple transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="font-mono text-[0.7rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
                Role
              </label>
              <div className="relative">
                <ShieldAlert size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-brand-black font-mono text-sm bg-transparent
                             outline-none focus:border-brand-purple transition-colors appearance-none cursor-pointer"
                >
                  <option value="Moderator">Moderator</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-brand-purple text-brand-white font-mono text-sm font-bold uppercase tracking-wider
                       border-2 border-brand-black cursor-pointer hover:bg-brand-black transition-colors hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
          >
            Create Account
          </button>
        </form>
      )}

      {/* Staff List */}
      <div className="border-3 border-brand-black overflow-x-auto bg-brand-white">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b-3 border-brand-black bg-brand-ice/10">
              <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-4 px-6">Name</th>
              <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-4 px-6">Email</th>
              <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-4 px-6">Role</th>
              <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-left py-4 px-6">Status</th>
              <th className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted text-right py-4 px-6">Action</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.id} className="border-b-2 border-brand-black last:border-0 hover:bg-brand-ice/5 transition-colors">
                <td className="py-4 px-6">
                  <span className="font-medium text-brand-black block">{s.name}</span>
                </td>
                <td className="py-4 px-6 font-mono text-sm text-brand-muted">
                  {s.email}
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-wider border-2 ${
                    s.role === 'Admin' ? 'border-brand-purple text-brand-purple bg-brand-purple/5' : 'border-brand-black text-brand-black bg-brand-black/5'
                  }`}>
                    <Shield size={12} />
                    {s.role}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="font-mono text-xs text-[#228B22] font-bold uppercase tracking-wider">{s.status}</span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => handleRemove(s.id)}
                    disabled={s.role === 'Admin' && staff.filter(x => x.role === 'Admin').length === 1}
                    className="p-2 text-brand-muted hover:text-[#D9381E] disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-transparent border-none cursor-pointer"
                    title="Remove User"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 border-3 border-brand-black bg-brand-white p-4 shadow-brutal flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-4">
          <Shield size={20} className="text-[#228B22]" />
          <p className="font-mono text-sm font-bold">{toast}</p>
        </div>
      )}
    </div>
  );
}
