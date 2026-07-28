import { useState } from 'react';
import { X, Upload } from 'lucide-react';

export default function ExamPaymentModal({ exam, onClose, onSubmit }) {
  const [refId, setRefId] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!refId.trim()) return;
    onSubmit({ examId: exam.id, refId: refId.trim(), screenshot });
  };

  return (
    <div className="fixed inset-0 z-[9000] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-black/80" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 bg-brand-white border-3 border-brand-black w-[min(500px,92%)] max-h-[90vh] overflow-y-auto shadow-brutal-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-brand-black bg-brand-ice/10">
          <div>
            <h3 className="font-mono text-sm font-bold tracking-[0.15em] uppercase text-brand-black">
              Submit Payment Proof
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center cursor-pointer bg-transparent border-none text-brand-muted hover:text-brand-black transition-colors"
          >
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">
          {/* Exam Details */}
          <div>
            <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
              Paying for
            </label>
            <div className="px-4 py-3 border-2 border-brand-black bg-brand-ice/5">
              <span className="font-bold text-sm text-brand-black block">{exam.title}</span>
              <span className="font-mono text-[0.65rem] tracking-wider text-brand-muted uppercase">
                {exam.examDate}
              </span>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
              Amount
            </label>
            <div className="px-4 py-2.5 border-2 border-brand-ice/40 bg-brand-ice/10 font-mono text-lg font-bold text-brand-black">
              ₹{exam.amount.toLocaleString('en-IN')}
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
                         focus:outline-none focus:border-brand-purple focus:shadow-[2px_2px_0px_var(--color-brand-purple)] transition-all placeholder:text-brand-muted/50"
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
                                cursor-pointer hover:border-brand-black hover:bg-brand-ice/5 transition-colors">
                <Upload size={16} className="text-brand-muted" />
                <span className="font-mono text-xs text-brand-muted">+ Upload Screenshot</span>
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t-2 border-brand-black bg-brand-ice/5">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border-2 border-brand-black bg-transparent font-mono text-[0.7rem] font-bold
                       uppercase tracking-wider cursor-pointer hover:bg-brand-ice/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!refId.trim()}
            className="flex-1 px-4 py-2.5 border-3 border-brand-black bg-brand-black text-brand-white font-mono text-[0.7rem]
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
