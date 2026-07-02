import { X, MessageSquareWarning } from 'lucide-react';

const mockQueries = [
  {
    id: 1,
    studentName: 'Arjun Sharma',
    studentBelt: 'Orange Belt',
    type: 'Payment Failed',
    description: 'My UPI payment was deducted from bank but it shows pending here.',
    date: '2 hours ago',
    status: 'open'
  },
  {
    id: 2,
    studentName: 'Sneha Gupta',
    studentBelt: 'Yellow Belt',
    type: 'Amount Mismatch',
    description: 'I am supposed to have a sibling discount applied.',
    date: '1 day ago',
    status: 'open'
  },
  {
    id: 3,
    studentName: 'Rahul Kumar',
    studentBelt: 'Blue-II Belt',
    type: 'Payment Not Updated',
    description: 'Paid cash at the front desk yesterday.',
    date: '3 days ago',
    status: 'resolved'
  }
];

export default function AdminQueriesPanel({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-brand-black/40 z-[9998]" onClick={onClose} />
      
      {/* Slide Panel */}
      <div className="fixed top-0 right-0 h-screen w-[min(400px,100%)] bg-brand-white border-l-4 border-brand-black z-[9999] shadow-[-10px_0_30px_rgba(0,0,0,0.2)] flex flex-col transition-transform duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b-2 border-brand-black bg-brand-ice/10">
          <div className="flex items-center gap-3">
            <MessageSquareWarning size={20} strokeWidth={2.5} className="text-brand-purple" />
            <h3 className="font-mono text-sm font-bold tracking-[0.15em] uppercase text-brand-black">
              Student Queries
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center cursor-pointer bg-transparent border-none text-brand-muted hover:text-brand-black transition-colors"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Query List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-ice/5">
          {mockQueries.map(query => (
            <div key={query.id} className="border-2 border-brand-black bg-brand-white p-4 hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase text-brand-muted">
                  {query.date}
                </span>
                <span className={`font-mono text-[0.6rem] font-bold tracking-[0.15em] uppercase px-2 py-0.5 border ${
                  query.status === 'open' 
                    ? 'border-[#D9381E] text-[#D9381E] bg-[#D9381E]/10' 
                    : 'border-[#228B22] text-[#228B22] bg-[#228B22]/10'
                }`}>
                  {query.status}
                </span>
              </div>
              
              <div className="mb-2">
                <span className="font-bold text-sm text-brand-black block">{query.studentName}</span>
                <span className="font-mono text-[0.65rem] tracking-wider uppercase text-brand-muted">{query.studentBelt}</span>
              </div>
              
              <div className="mb-2">
                 <span className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-purple font-bold block mb-1">
                   Issue: {query.type}
                 </span>
                 <p className="text-sm text-brand-black leading-snug">
                   "{query.description}"
                 </p>
              </div>

              {query.status === 'open' && (
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 py-1.5 font-mono text-[0.65rem] font-bold uppercase border-2 border-brand-black bg-brand-black text-brand-white cursor-pointer hover:bg-brand-purple hover:border-brand-purple transition-colors">
                    Resolve
                  </button>
                  <button className="flex-1 py-1.5 font-mono text-[0.65rem] font-bold uppercase border-2 border-brand-black bg-transparent text-brand-black cursor-pointer hover:bg-brand-ice/20 transition-colors">
                    Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
