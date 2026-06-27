import { useState } from 'react';
import { X, Upload, ChevronDown } from 'lucide-react';
import { FEE_STATUS, studentFeeHistory } from '../../data/feeData';

export default function PaymentConfirmModal({ onClose, onSubmit, pendingMonths }) {
  const [selectedMonths, setSelectedMonths] = useState(
    pendingMonths.length > 0 ? [pendingMonths[0].month] : []
  );
  const [refId, setRefId] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const availableMonths = studentFeeHistory.filter(
    (f) => f.status === FEE_STATUS.PENDING || f.status === FEE_STATUS.OVERDUE
  );

  const totalAmount = selectedMonths.length * 1500;

  const toggleMonth = (month) => {
    setSelectedMonths((prev) =>
      prev.includes(month) ? prev.filter((m) => m !== month) : [...prev, month]
    );
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!refId.trim() || selectedMonths.length === 0) return;
    onSubmit({ months: selectedMonths, refId: refId.trim(), screenshot });
  };

  return (
    <div className="fixed inset-0 z-[9000] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-black/80" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 bg-brand-white border-3 border-brand-black w-[min(500px,92%)] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-brand-black">
          <h3 className="font-mono text-sm font-bold tracking-[0.15em] uppercase">
            Submit Payment Proof
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 border-2 border-brand-black flex items-center justify-center cursor-pointer bg-transparent hover:bg-brand-black hover:text-brand-white transition-colors"
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">
          {/* Month Selector */}
          <div>
            <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
              Paying for
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 border-2 border-brand-black bg-brand-white
                           font-mono text-sm cursor-pointer hover:shadow-brutal transition-all"
              >
                <span>
                  {selectedMonths.length > 0
                    ? selectedMonths.join(', ') + ' 2026'
                    : 'Select month(s)'}
                </span>
                <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 w-full border-2 border-brand-black border-t-0 bg-brand-white z-10">
                  {availableMonths.map((f) => (
                    <label
                      key={f.month}
                      className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-brand-ice/10 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMonths.includes(f.month)}
                        onChange={() => toggleMonth(f.month)}
                        className="w-4 h-4 accent-brand-purple"
                      />
                      <span className="font-mono text-sm">{f.month} 2026</span>
                      <span
                        className="ml-auto font-mono text-[0.6rem] font-bold tracking-wider uppercase px-2 py-0.5 border"
                        style={{
                          color: f.status === FEE_STATUS.OVERDUE ? '#E8445A' : '#F5A623',
                          borderColor: f.status === FEE_STATUS.OVERDUE ? '#E8445A' : '#F5A623',
                        }}
                      >
                        {f.status}
                      </span>
                    </label>
                  ))}
                  {availableMonths.length === 0 && (
                    <span className="block px-4 py-3 font-mono text-xs text-brand-muted">No pending months</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
              Amount
            </label>
            <div className="px-4 py-2.5 border-2 border-brand-ice/40 bg-brand-ice/10 font-mono text-lg font-bold text-brand-black">
              ₹{totalAmount.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Reference ID */}
          <div>
            <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
              Transaction Reference ID *
            </label>
            <input
              type="text"
              value={refId}
              onChange={(e) => setRefId(e.target.value)}
              placeholder="e.g. TXN8472910"
              className="w-full px-4 py-2.5 border-2 border-brand-black bg-brand-white font-mono text-sm
                         focus:outline-none focus:shadow-brutal transition-all placeholder:text-brand-muted/50"
            />
          </div>

          {/* Screenshot */}
          <div>
            <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
              Screenshot (optional)
            </label>
            {previewUrl ? (
              <div className="relative border-2 border-brand-black p-2">
                <img src={previewUrl} alt="Payment screenshot" className="w-full max-h-40 object-contain" />
                <button
                  onClick={() => {
                    setScreenshot(null);
                    setPreviewUrl(null);
                  }}
                  className="absolute top-1 right-1 w-6 h-6 bg-brand-black text-brand-white flex items-center justify-center cursor-pointer border-none"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-brand-muted/40
                                cursor-pointer hover:border-brand-black transition-colors">
                <Upload size={16} className="text-brand-muted" />
                <span className="font-mono text-xs text-brand-muted">+ Upload Screenshot</span>
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t-2 border-brand-black">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border-2 border-brand-black bg-transparent font-mono text-[0.7rem] font-bold
                       uppercase tracking-wider cursor-pointer hover:bg-brand-ice/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!refId.trim() || selectedMonths.length === 0}
            className="flex-1 px-4 py-2.5 border-2 border-brand-black bg-brand-black text-brand-white font-mono text-[0.7rem]
                       font-bold uppercase tracking-wider cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5
                       hover:shadow-brutal transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            Submit for Verification →
          </button>
        </div>
      </div>
    </div>
  );
}
