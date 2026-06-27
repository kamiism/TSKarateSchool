import { useState } from 'react';
import { Save, Upload, X, ToggleLeft, ToggleRight } from 'lucide-react';
import { defaultFeeSettings, BELTS } from '../../data/feeData';
import Toast from '../Toast';

export default function FeeSettings() {
  const [settings, setSettings] = useState({ ...defaultFeeSettings });
  const [qrPreview, setQrPreview] = useState(null);
  const [toast, setToast] = useState(null);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const updateBeltFee = (belt, value) => {
    setSettings((prev) => ({
      ...prev,
      beltFees: { ...prev.beltFees, [belt]: Number(value) || 0 },
    }));
  };

  const updateExamBeltFee = (belt, value) => {
    setSettings((prev) => ({
      ...prev,
      examFeePerBelt: { ...prev.examFeePerBelt, [belt]: Number(value) || 0 },
    }));
  };

  const handleQrUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setQrPreview(URL.createObjectURL(file));
      updateSetting('qrImage', file);
    }
  };

  const handleSave = () => {
    setToast('Fee settings saved successfully.');
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-2 block">
          // Configuration
        </span>
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight tracking-tight">
          Fee<br />Settings
        </h1>
      </div>

      <div className="space-y-6 max-w-[800px]">
        {/* Monthly Fee Amount */}
        <div className="border-3 border-brand-black p-6 bg-brand-white">
          <h3 className="font-mono text-sm tracking-widest uppercase text-brand-black mb-6 border-b-2 border-brand-black pb-2">
            Monthly Fee Amount
          </h3>
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-bold text-brand-muted">₹</span>
            <input
              type="number"
              value={settings.monthlyFee}
              onChange={(e) => updateSetting('monthlyFee', Number(e.target.value))}
              className="w-40 px-4 py-2.5 border-2 border-brand-black font-mono text-lg font-bold bg-brand-white
                         focus:outline-none focus:shadow-brutal transition-all"
            />
            <span className="font-mono text-xs text-brand-muted uppercase tracking-wider">/ month (default)</span>
          </div>
        </div>

        {/* Fee Per Belt Tier */}
        <div className="border-3 border-brand-black p-6 bg-brand-white">
          <div className="flex items-center justify-between mb-6 border-b-2 border-brand-black pb-2">
            <h3 className="font-mono text-sm tracking-widest uppercase text-brand-black">
              Fee Per Belt Tier
            </h3>
            <button
              onClick={() => updateSetting('feePerBelt', !settings.feePerBelt)}
              className="flex items-center gap-2 cursor-pointer bg-transparent border-none"
            >
              {settings.feePerBelt ? (
                <ToggleRight size={28} strokeWidth={2} className="text-[#1DB97A]" />
              ) : (
                <ToggleLeft size={28} strokeWidth={2} className="text-brand-muted" />
              )}
              <span className="font-mono text-[0.65rem] font-bold uppercase tracking-wider text-brand-muted">
                {settings.feePerBelt ? 'Enabled' : 'Disabled'}
              </span>
            </button>
          </div>

          {settings.feePerBelt && (
            <div className="space-y-3">
              {BELTS.map((belt) => (
                <div key={belt.name} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-32">
                    <div
                      className="w-5 h-2.5 border flex-shrink-0"
                      style={{ backgroundColor: belt.color, borderColor: belt.borderColor }}
                    />
                    <span className="font-mono text-xs uppercase tracking-wider text-brand-muted">
                      {belt.name.replace(' Belt', '')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-sm text-brand-muted">₹</span>
                    <input
                      type="number"
                      value={settings.beltFees[belt.name]}
                      onChange={(e) => updateBeltFee(belt.name, e.target.value)}
                      className="w-28 px-3 py-1.5 border-2 border-brand-black font-mono text-sm bg-brand-white
                                 focus:outline-none focus:shadow-brutal transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Exam Fee Per Belt Tier */}
        <div className="border-3 border-brand-black p-6 bg-brand-white">
          <div className="flex items-center justify-between mb-6 border-b-2 border-brand-black pb-2">
            <h3 className="font-mono text-sm tracking-widest uppercase text-brand-black">
              Exam Fee Per Belt Tier
            </h3>
          </div>

          <div className="space-y-3">
            {BELTS.map((belt) => (
              <div key={`exam-${belt.name}`} className="flex items-center gap-4">
                <div className="flex items-center gap-2 w-32">
                  <div
                    className="w-5 h-2.5 border flex-shrink-0"
                    style={{ backgroundColor: belt.color, borderColor: belt.borderColor }}
                  />
                  <span className="font-mono text-xs uppercase tracking-wider text-brand-muted">
                    {belt.name.replace(' Belt', '')}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-mono text-sm text-brand-muted">₹</span>
                  <input
                    type="number"
                    value={settings.examFeePerBelt[belt.name]}
                    onChange={(e) => updateExamBeltFee(belt.name, e.target.value)}
                    className="w-28 px-3 py-1.5 border-2 border-brand-black font-mono text-sm bg-brand-white
                               focus:outline-none focus:shadow-brutal transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QR Code Image */}
        <div className="border-3 border-brand-black p-6 bg-brand-white">
          <h3 className="font-mono text-sm tracking-widest uppercase text-brand-black mb-6 border-b-2 border-brand-black pb-2">
            QR Code Image
          </h3>
          {qrPreview ? (
            <div className="relative inline-block border-2 border-brand-black p-2 mb-4">
              <img src={qrPreview} alt="QR Preview" className="w-48 h-48 object-contain" />
              <button
                onClick={() => {
                  setQrPreview(null);
                  updateSetting('qrImage', null);
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-brand-black text-brand-white flex items-center justify-center cursor-pointer border-none"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <label className="inline-flex items-center gap-2 px-5 py-3 border-2 border-dashed border-brand-muted/40
                              cursor-pointer hover:border-brand-black transition-colors">
              <Upload size={16} className="text-brand-muted" />
              <span className="font-mono text-xs uppercase tracking-wider text-brand-muted">Upload QR Image</span>
              <input type="file" accept="image/*" onChange={handleQrUpload} className="hidden" />
            </label>
          )}
          <p className="font-mono text-[0.6rem] text-brand-muted mt-2">
            Displayed on the student payment page. Recommended size: 400×400px.
          </p>
        </div>

        {/* UPI Details */}
        <div className="border-3 border-brand-black p-6 bg-brand-white">
          <h3 className="font-mono text-sm tracking-widest uppercase text-brand-black mb-6 border-b-2 border-brand-black pb-2">
            UPI Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
                UPI ID
              </label>
              <input
                type="text"
                value={settings.upiId}
                onChange={(e) => updateSetting('upiId', e.target.value)}
                className="w-full max-w-sm px-4 py-2.5 border-2 border-brand-black font-mono text-sm bg-brand-white
                           focus:outline-none focus:shadow-brutal transition-all"
              />
            </div>
            <div>
              <label className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted block mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={settings.upiName}
                onChange={(e) => updateSetting('upiName', e.target.value)}
                className="w-full max-w-sm px-4 py-2.5 border-2 border-brand-black font-mono text-sm bg-brand-white
                           focus:outline-none focus:shadow-brutal transition-all"
              />
            </div>
          </div>
        </div>

        {/* Due Date & Auto-Overdue */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border-3 border-brand-black p-6 bg-brand-white">
            <h3 className="font-mono text-sm tracking-widest uppercase text-brand-black mb-6 border-b-2 border-brand-black pb-2">
              Fee Due Date
            </h3>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={28}
                value={settings.dueDateDay}
                onChange={(e) => updateSetting('dueDateDay', Math.min(28, Math.max(1, Number(e.target.value))))}
                className="w-20 px-3 py-2.5 border-2 border-brand-black font-mono text-lg font-bold text-center bg-brand-white
                           focus:outline-none focus:shadow-brutal transition-all"
              />
              <span className="font-mono text-xs text-brand-muted uppercase tracking-wider">of each month</span>
            </div>
          </div>

          <div className="border-3 border-brand-black p-6 bg-brand-white">
            <h3 className="font-mono text-sm tracking-widest uppercase text-brand-black mb-6 border-b-2 border-brand-black pb-2">
              Auto-Overdue
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateSetting('autoOverdue', !settings.autoOverdue)}
                className="flex items-center gap-2 cursor-pointer bg-transparent border-none"
              >
                {settings.autoOverdue ? (
                  <ToggleRight size={32} strokeWidth={2} className="text-[#1DB97A]" />
                ) : (
                  <ToggleLeft size={32} strokeWidth={2} className="text-brand-muted" />
                )}
              </button>
              <span className="font-mono text-xs text-brand-muted leading-snug">
                Automatically mark PENDING as OVERDUE after due date passes
              </span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-brand-black bg-brand-black text-brand-white
                     font-mono text-[0.75rem] font-bold uppercase tracking-wider cursor-pointer
                     hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal transition-all
                     active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          <Save size={16} /> Save Settings
        </button>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
