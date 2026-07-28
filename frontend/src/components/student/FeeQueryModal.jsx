import { useState } from 'react';
import { X, Send } from 'lucide-react';

export default function FeeQueryModal({ onClose, onSubmit }) {
  const [queryType, setQueryType] = useState('Payment Failed');
  const [description, setDescription] = useState('');

  const queryTypes = [
    'Payment Failed',
    'Amount Mismatch',
    'Payment Not Updated',
    'Other Issue'
  ];

  const handleSubmit = () => {
    if (!description.trim()) return;
    onSubmit({ type: queryType, description: description.trim(), date: new Date().toISOString() });
  };

  return (
    <div className="fixed inset-0 z-[9000] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 bg-brand-white border-3 border-brand-black w-[min(500px,92%)] max-h-[90vh] overflow-y-auto shadow-brutal-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-brand-black bg-brand-ice/10">
          <div>
            <h3 className="font-mono text-sm font-bold tracking-[0.15em] uppercase text-brand-black">
              Raise a Query
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
          {/* Query Type */}
          <div>
            <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
              Issue Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {queryTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setQueryType(type)}
                  className={`px-3 py-2.5 font-mono text-xs cursor-pointer border-2 transition-all text-left
                             ${queryType === type
                      ? 'border-brand-purple bg-brand-purple/10 text-brand-purple font-bold'
                      : 'border-brand-ice/40 bg-transparent text-brand-black hover:border-brand-ice'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please describe the issue in detail..."
              rows={5}
              className="w-full px-4 py-3 border-2 border-brand-black bg-transparent font-mono text-sm
                         focus:outline-none focus:border-brand-purple focus:shadow-[2px_2px_0px_var(--color-brand-purple)] transition-all resize-none placeholder:text-brand-muted/50"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t-2 border-brand-black bg-brand-ice/5">
          <button
            onClick={handleSubmit}
            disabled={!description.trim()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-3 border-brand-black bg-brand-black text-brand-white font-mono text-[0.7rem]
                       font-bold uppercase tracking-wider cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5
                       hover:shadow-brutal transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            Submit Query <Send size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
