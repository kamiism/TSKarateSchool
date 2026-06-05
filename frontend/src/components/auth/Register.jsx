import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const STEPS = ['Details', 'Verify'];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-8 h-8 border-3 flex items-center justify-center font-mono text-xs font-bold
                         transition-all duration-200
                         ${i < current
                  ? 'bg-brand-purple border-brand-purple text-brand-white'
                  : i === current
                    ? 'bg-brand-white border-brand-white text-brand-black shadow-brutal-purple -translate-y-0.5'
                    : 'bg-transparent border-brand-white/20 text-brand-muted'
                }`}
            >
              {i < current ? '✓' : i + 1}
            </div>
            <span className="font-mono text-[0.55rem] tracking-[0.15em] uppercase text-brand-muted">
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-[2px] mx-2 mb-5 transition-colors duration-300 ${i < current ? 'bg-brand-purple' : 'bg-brand-white/10'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function InputField({ id, label, type = 'text', value, onChange, placeholder, autoComplete, required = true, focusState, setFocusState, fieldKey }) {
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-brand-muted block mb-2">
        {label}
      </label>
      <div className={`border-3 transition-all duration-150 ${focusState[fieldKey] ? 'border-brand-purple shadow-brutal-purple' : 'border-brand-white/30 hover:border-brand-white/60'}`}>
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocusState(p => ({ ...p, [fieldKey]: true }))}
          onBlur={() => setFocusState(p => ({ ...p, [fieldKey]: false }))}
          placeholder={placeholder}
          className="w-full bg-transparent text-brand-white font-sans text-sm px-4 py-3 placeholder:text-brand-muted/40 outline-none"
          required={required}
          autoComplete={autoComplete}
        />
      </div>
    </div>
  );
}

export default function Register() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  // Step 1 — Details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Step 2 — Security
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Step 3 — OTP
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const otpRefs = useRef([]);

  // Shared focus state
  const [focusState, setFocusState] = useState({});

  // Validation errors
  const [error, setError] = useState('');

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const validateStep1 = () => {
    if (!firstName.trim() || !lastName.trim() || !username.trim() || !email.trim() || !phone.trim()) {
      setError('All fields are required');
      return false;
    }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      setError('Username: 3–20 chars, letters/numbers/underscores only');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address');
      return false;
    }
    if (!/^\+?[\d\s-]{7,15}$/.test(phone)) {
      setError('Enter a valid phone number');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    setError('');
    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 0 && validateStep1()) {
      setStep(1);
      // Simulate sending OTP
      setOtpSent(true);
      setResendTimer(30);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-focus next
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 0) return;
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || '';
    }
    setOtp(newOtp);
    const focusIdx = Math.min(pasted.length, 5);
    otpRefs.current[focusIdx]?.focus();
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setError('Enter the full 6-digit code');
      return;
    }
    // TODO: wire up real verification
    setError('');
    alert('Registration successful! Redirecting to login...');
    navigate('/login');
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    setOtp(['', '', '', '', '', '']);
    setResendTimer(30);
    setError('');
    // TODO: actually resend OTP
  };

  const EyeIcon = ({ off }) => off ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  return (
    <div className="relative z-10 w-[min(500px,92%)]">
      {/* Logo / Back */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2.5 mb-10 cursor-pointer group bg-transparent border-none"
      >
        <div className="w-9 h-9 bg-brand-white text-brand-black border-3 border-brand-white flex items-center justify-center font-mono font-bold text-sm
                        group-hover:bg-brand-purple group-hover:text-brand-white group-hover:border-brand-purple transition-all duration-150">
          TS
        </div>
        <span className="font-mono font-bold text-[1.1rem] tracking-wide uppercase text-brand-white">
          T.S Karate
        </span>
      </button>

      {/* Register Card */}
      <div className="border-3 border-brand-white bg-brand-black relative">
        <div className="h-1.5 bg-brand-purple" />

        <div className="p-10 max-sm:p-7">
          {/* Heading */}
          <h1 className="font-mono text-[1.6rem] font-bold uppercase tracking-wider text-brand-white mb-1">
            Register
          </h1>
          <p className="font-mono text-[0.75rem] tracking-[0.15em] uppercase text-brand-muted mb-8">
            Begin your martial arts journey
          </p>

          {/* Step Indicator */}
          <StepIndicator current={step} />

          {/* Error Banner */}
          {error && (
            <div className="border-3 border-red-400 bg-red-400/10 px-4 py-3 mb-6 flex items-center gap-3">
              <span className="font-mono text-red-400 text-sm font-bold">!</span>
              <span className="font-mono text-[0.75rem] text-red-300">{error}</span>
            </div>
          )}

          {/* ═══ STEP 1 — Personal Details + Password ═══ */}
          {step === 0 && (
            <form onSubmit={handleNext} className="space-y-5">
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <InputField
                  id="reg-firstname" label="First Name" value={firstName}
                  onChange={(e) => setFirstName(e.target.value)} placeholder="John"
                  autoComplete="given-name" fieldKey="firstName"
                  focusState={focusState} setFocusState={setFocusState}
                />
                <InputField
                  id="reg-lastname" label="Last Name" value={lastName}
                  onChange={(e) => setLastName(e.target.value)} placeholder="Doe"
                  autoComplete="family-name" fieldKey="lastName"
                  focusState={focusState} setFocusState={setFocusState}
                />
              </div>
              <InputField
                id="reg-username" label="Username" value={username}
                onChange={(e) => setUsername(e.target.value)} placeholder="john_doe42"
                autoComplete="username" fieldKey="username"
                focusState={focusState} setFocusState={setFocusState}
              />
              <InputField
                id="reg-email" label="Email Address" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"
                autoComplete="email" fieldKey="email"
                focusState={focusState} setFocusState={setFocusState}
              />
              <InputField
                id="reg-phone" label="Phone Number" type="tel" value={phone}
                onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210"
                autoComplete="tel" fieldKey="phone"
                focusState={focusState} setFocusState={setFocusState}
              />

              {/* ── Password ─────────────────── */}
              <div>
                <label htmlFor="reg-password" className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-brand-muted block mb-2">
                  Password
                </label>
                <div className={`border-3 flex items-center transition-all duration-150 ${focusState.password ? 'border-brand-purple shadow-brutal-purple' : 'border-brand-white/30 hover:border-brand-white/60'}`}>
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusState(p => ({ ...p, password: true }))}
                    onBlur={() => setFocusState(p => ({ ...p, password: false }))}
                    placeholder="Min. 8 characters"
                    className="flex-1 bg-transparent text-brand-white font-sans text-sm px-4 py-3 placeholder:text-brand-muted/40 outline-none"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="px-3 py-3 bg-transparent border-none cursor-pointer text-brand-muted hover:text-brand-white transition-colors duration-150 flex-shrink-0"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    <EyeIcon off={showPassword} />
                  </button>
                </div>
                {/* Strength hints */}
                <div className="flex gap-1.5 mt-2.5">
                  {[1, 2, 3, 4].map((level) => {
                    let strength = 0;
                    if (password.length >= 8) strength++;
                    if (/[A-Z]/.test(password)) strength++;
                    if (/[0-9]/.test(password)) strength++;
                    if (/[^A-Za-z0-9]/.test(password)) strength++;
                    return (
                      <div
                        key={level}
                        className={`h-1 flex-1 transition-colors duration-300 ${level <= strength
                            ? strength <= 1 ? 'bg-red-400' : strength <= 2 ? 'bg-yellow-400' : strength <= 3 ? 'bg-brand-ice' : 'bg-green-400'
                            : 'bg-brand-white/10'
                          }`}
                      />
                    );
                  })}
                </div>
                <p className="font-mono text-[0.6rem] tracking-[0.1em] text-brand-muted/60 mt-1.5">
                  Use uppercase, numbers & symbols for stronger security
                </p>
              </div>

              {/* ── Confirm Password ─────────── */}
              <div>
                <label htmlFor="reg-confirm" className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-brand-muted block mb-2">
                  Confirm Password
                </label>
                <div className={`border-3 flex items-center transition-all duration-150 ${focusState.confirm ? 'border-brand-purple shadow-brutal-purple' : 'border-brand-white/30 hover:border-brand-white/60'}`}>
                  <input
                    id="reg-confirm"
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusState(p => ({ ...p, confirm: true }))}
                    onBlur={() => setFocusState(p => ({ ...p, confirm: false }))}
                    placeholder="Re-enter password"
                    className="flex-1 bg-transparent text-brand-white font-sans text-sm px-4 py-3 placeholder:text-brand-muted/40 outline-none"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="px-3 py-3 bg-transparent border-none cursor-pointer text-brand-muted hover:text-brand-white transition-colors duration-150 flex-shrink-0"
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    <EyeIcon off={showConfirm} />
                  </button>
                </div>
                {/* Match indicator */}
                {confirmPassword && (
                  <p className={`font-mono text-[0.65rem] tracking-[0.1em] mt-2 ${password === confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
                    {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full font-mono text-sm font-bold uppercase tracking-wider
                           py-4 mt-2 border-3 border-brand-white bg-brand-white text-brand-black cursor-pointer
                           transition-all duration-150
                           hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-brand-purple hover:text-brand-white hover:border-brand-purple hover:shadow-brutal-purple
                           active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                Verify Email →
              </button>
            </form>
          )}

          {/* ═══ STEP 2 — OTP Verification ═══ */}
          {step === 1 && (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="border-3 border-brand-white/10 bg-brand-white/[0.03] p-5 text-center">
                <p className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-brand-muted mb-1">
                  Verification code sent to
                </p>
                <p className="font-mono text-sm text-brand-ice font-bold">
                  {email}
                </p>
              </div>

              {/* OTP Inputs */}
              <div>
                <label className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-brand-muted block mb-3 text-center">
                  Enter 6-digit code
                </label>
                <div className="flex justify-center gap-2.5" onPaste={handleOtpPaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => (otpRefs.current[i] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className={`w-12 h-14 max-sm:w-10 max-sm:h-12 text-center font-mono text-xl font-bold border-3 bg-transparent text-brand-white
                                 outline-none transition-all duration-150
                                 ${digit ? 'border-brand-purple shadow-brutal-purple' : 'border-brand-white/30'}
                                 focus:border-brand-purple focus:shadow-brutal-purple`}
                    />
                  ))}
                </div>
              </div>

              {/* Resend */}
              <div className="text-center">
                {resendTimer > 0 ? (
                  <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase text-brand-muted">
                    Resend code in <span className="text-brand-ice font-bold">{resendTimer}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-brand-muted bg-transparent border-none cursor-pointer
                               relative pb-0.5
                               after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px]
                               after:bg-brand-purple after:transition-all after:duration-300 hover:after:w-full hover:text-brand-ice"
                  >
                    Resend Code
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => { setStep(0); setError(''); }}
                  className="flex-1 font-mono text-sm font-bold uppercase tracking-wider
                             py-4 border-3 border-brand-white/30 bg-transparent text-brand-white cursor-pointer
                             transition-all duration-150
                             hover:border-brand-ice hover:text-brand-ice
                             active:translate-x-0.5 active:translate-y-0.5"
                >
                  ← Back
                </button>
                <button
                  id="reg-submit"
                  type="submit"
                  className="flex-[2] font-mono text-sm font-bold uppercase tracking-wider
                             py-4 border-3 border-brand-white bg-brand-white text-brand-black cursor-pointer
                             transition-all duration-150
                             hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-brand-purple hover:text-brand-white hover:border-brand-purple hover:shadow-brutal-purple
                             active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  Complete Registration
                </button>
              </div>
            </form>
          )}

          {/* ── Divider ──────────────────────── */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-[2px] bg-brand-white/10" />
            <span className="font-mono text-[0.6rem] tracking-[0.25em] uppercase text-brand-muted">
              Already a member?
            </span>
            <div className="flex-1 h-[2px] bg-brand-white/10" />
          </div>

          {/* Login Link */}
          <button
            id="reg-login"
            type="button"
            onClick={() => navigate('/login')}
            className="w-full font-mono text-sm font-bold uppercase tracking-wider
                       py-4 border-3 border-brand-white/30 bg-transparent text-brand-white cursor-pointer
                       transition-all duration-150
                       hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-brand-ice hover:shadow-brutal hover:text-brand-ice
                       active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            Log In Instead
          </button>
        </div>
      </div>

      {/* Bottom tag */}
      <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-brand-muted/40 text-center mt-6">
        T.S Karate School &copy; {new Date().getFullYear()} &mdash; All rights reserved
      </p>
    </div>
  );
}
