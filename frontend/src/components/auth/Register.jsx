import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const STEPS = ['Personal', 'Contact', 'Physical', 'Account', 'Verify'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-7 h-7 border-3 flex items-center justify-center font-mono text-[0.6rem] font-bold
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
            <span className="font-mono text-[0.5rem] tracking-[0.12em] uppercase text-brand-muted">
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-[2px] mx-1.5 mb-5 transition-colors duration-300 ${i < current ? 'bg-brand-purple' : 'bg-brand-white/10'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-5 mt-1">
      <span className="text-brand-purple text-base">{icon}</span>
      <h2 className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-brand-white font-bold">{title}</h2>
      <div className="flex-1 h-[1px] bg-brand-white/10" />
    </div>
  );
}

function InputField({ id, label, type = 'text', value, onChange, placeholder, autoComplete, required = true, focusState, setFocusState, fieldKey, disabled = false }) {
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-brand-ice block mb-2">
        {label}
      </label>
      <div className={`border-3 transition-all duration-150 ${disabled ? 'border-brand-white/10 opacity-50' : focusState[fieldKey] ? 'border-brand-purple shadow-brutal-purple' : 'border-brand-white/30 hover:border-brand-white/60'}`}>
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
          disabled={disabled}
        />
      </div>
    </div>
  );
}

function SelectField({ id, label, value, onChange, options, placeholder, focusState, setFocusState, fieldKey, required = true }) {
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-brand-ice block mb-2">
        {label}
      </label>
      <div className={`border-3 transition-all duration-150 relative ${focusState[fieldKey] ? 'border-brand-purple shadow-brutal-purple' : 'border-brand-white/30 hover:border-brand-white/60'}`}>
        <select
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocusState(p => ({ ...p, [fieldKey]: true }))}
          onBlur={() => setFocusState(p => ({ ...p, [fieldKey]: false }))}
          className="w-full bg-brand-black text-brand-white font-sans text-sm px-4 py-3 outline-none appearance-none cursor-pointer pr-10"
          required={required}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {/* Dropdown arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-muted">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
            <path d="M2 4L6 8L10 4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TextAreaField({ id, label, value, onChange, placeholder, focusState, setFocusState, fieldKey, required = true, rows = 3, disabled = false }) {
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-brand-ice block mb-2">
        {label}
      </label>
      <div className={`border-3 transition-all duration-150 ${disabled ? 'border-brand-white/10 opacity-50' : focusState[fieldKey] ? 'border-brand-purple shadow-brutal-purple' : 'border-brand-white/30 hover:border-brand-white/60'}`}>
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          onFocus={() => setFocusState(p => ({ ...p, [fieldKey]: true }))}
          onBlur={() => setFocusState(p => ({ ...p, [fieldKey]: false }))}
          placeholder={placeholder}
          className="w-full bg-transparent text-brand-white font-sans text-sm px-4 py-3 placeholder:text-brand-muted/40 outline-none resize-none"
          required={required}
          rows={rows}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

function RadioGroup({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-brand-ice block mb-3">
        {label}
      </label>
      <div className="flex gap-3 flex-wrap">
        {options.map(opt => (
          <label
            key={opt}
            className={`flex items-center gap-2.5 cursor-pointer border-3 px-4 py-2.5 transition-all duration-150
              ${value === opt
                ? 'border-brand-purple bg-brand-purple/10 text-brand-white'
                : 'border-brand-white/20 text-brand-muted hover:border-brand-white/40'}`}
          >
            <input
              type="radio" name={name} value={opt}
              checked={value === opt}
              onChange={e => onChange(e.target.value)}
              className="sr-only"
            />
            <div className={`w-3 h-3 border-2 transition-all duration-150 ${value === opt ? 'border-brand-purple bg-brand-purple' : 'border-brand-muted'}`} />
            <span className="font-mono text-[0.7rem] tracking-[0.1em] uppercase">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function Register() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  // ── Step 0: Personal ──
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [nationality, setNationality] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');

  // ── Step 1: Contact & Address ──
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [postalAddress, setPostalAddress] = useState('');
  const [postalPin, setPostalPin] = useState('');
  const [sameAsPostal, setSameAsPostal] = useState(false);
  const [permanentAddress, setPermanentAddress] = useState('');
  const [permanentPin, setPermanentPin] = useState('');

  // ── Step 2: Physical ──
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [hasDisability, setHasDisability] = useState('No');
  const [disabilityDetails, setDisabilityDetails] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const photoRef = useRef(null);

  // ── Step 3: Account ──
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // ── Step 4: OTP ──
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);
  const otpRefs = useRef([]);

  // Shared
  const [focusState, setFocusState] = useState({});
  const [error, setError] = useState('');

  // Auto-calculate age from DOB
  useEffect(() => {
    if (dateOfBirth) {
      const today = new Date();
      const birth = new Date(dateOfBirth);
      let calc = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) calc--;
      setAge(calc >= 0 ? String(calc) : '');
    } else {
      setAge('');
    }
  }, [dateOfBirth]);

  // Sync permanent address when checkbox toggled
  useEffect(() => {
    if (sameAsPostal) {
      setPermanentAddress(postalAddress);
      setPermanentPin(postalPin);
    }
  }, [sameAsPostal, postalAddress, postalPin]);

  // Resend countdown
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  // Photo handler
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError('Photo must be under 2MB');
      return;
    }
    setPhoto(file);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
    setError('');
  };

  // Per-step validation
  const validateStep = (s) => {
    setError('');
    switch (s) {
      case 0:
        if (!firstName.trim() || !lastName.trim()) return fail('First and Last name are required');
        if (!dateOfBirth) return fail('Date of birth is required');
        if (!sex) return fail('Please select sex');
        if (!fatherName.trim() || !motherName.trim()) return fail("Parent/guardian names are required");
        return true;
      case 1:
        if (!email.trim() || !phone.trim()) return fail('Email and phone are required');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('Enter a valid email address');
        if (!/^\+?[\d\s-]{7,15}$/.test(phone)) return fail('Enter a valid phone number');
        if (!postalAddress.trim() || !postalPin.trim()) return fail('Postal address and PIN are required');
        if (!/^\d{6}$/.test(postalPin)) return fail('PIN must be 6 digits');
        if (!sameAsPostal && (!permanentAddress.trim() || !permanentPin.trim())) return fail('Permanent address and PIN are required');
        if (!sameAsPostal && !/^\d{6}$/.test(permanentPin)) return fail('Permanent PIN must be 6 digits');
        return true;
      case 2:
        if (!height.trim() || !weight.trim()) return fail('Height and weight are required');
        if (hasDisability === 'Yes' && !disabilityDetails.trim()) return fail('Please provide disability details');
        return true;
      case 3:
        if (!username.trim()) return fail('Username is required');
        if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) return fail('Username: 3–20 chars, letters/numbers/underscores');
        if (password.length < 8) return fail('Password must be at least 8 characters');
        if (password !== confirmPassword) return fail('Passwords do not match');
        if (!agreedToTerms) return fail('You must agree to the certification declaration');
        return true;
      default:
        return true;
    }
  };

  const fail = (msg) => { setError(msg); return false; };

  const handleNext = (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    if (step === 3) {
      setResendTimer(30);
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setError('');
    setStep(step - 1);
  };

  // ── OTP handlers ──
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted.length) return;
    const next = [...otp];
    for (let i = 0; i < 6; i++) next[i] = pasted[i] || '';
    setOtp(next);
    otpRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.join('').length < 6) { setError('Enter the full 6-digit code'); return; }
    setError('');
    alert('Registration successful! Redirecting to login...');
    navigate('/login');
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    setOtp(['', '', '', '', '', '']);
    setResendTimer(30);
    setError('');
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

  // ── Navigation buttons (reused across steps) ──
  const NavButtons = ({ showBack = true, nextLabel = 'Continue →' }) => (
    <div className={`flex gap-3 mt-2 ${!showBack ? '' : ''}`}>
      {showBack && (
        <button
          type="button" onClick={handleBack}
          className="flex-1 font-mono text-sm font-bold uppercase tracking-wider
            py-4 border-3 border-brand-white/30 bg-transparent text-brand-white cursor-pointer
            transition-all duration-150 hover:border-brand-ice hover:text-brand-ice
            active:translate-x-0.5 active:translate-y-0.5"
        >
          ← Back
        </button>
      )}
      <button
        type="submit"
        className={`${showBack ? 'flex-[2]' : 'w-full'} font-mono text-sm font-bold uppercase tracking-wider
          py-4 border-3 border-brand-white bg-brand-white text-brand-black cursor-pointer
          transition-all duration-150
          hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-brand-purple hover:text-brand-white hover:border-brand-purple hover:shadow-brutal-purple
          active:translate-x-0.5 active:translate-y-0.5 active:shadow-none`}
      >
        {nextLabel}
      </button>
    </div>
  );

  return (
    <div className="relative z-10 w-[min(560px,92%)]">
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
            Admission Form
          </h1>
          <p className="font-mono text-[0.75rem] tracking-[0.15em] uppercase text-brand-muted mb-8">
            T.S Karate School, Dhubri — TSKSD
          </p>

          <StepIndicator current={step} />

          {/* Error Banner */}
          {error && (
            <div className="border-3 border-red-400 bg-red-400/10 px-4 py-3 mb-6 flex items-center gap-3">
              <span className="font-mono text-red-400 text-sm font-bold">!</span>
              <span className="font-mono text-[0.75rem] text-red-300">{error}</span>
            </div>
          )}

          {/* ═══════════════════════════════════════════
              STEP 0 — Personal Information
              ═══════════════════════════════════════════ */}
          {step === 0 && (
            <form onSubmit={handleNext} className="space-y-5">
              <SectionHeader icon="👤" title="Personal Information" />

              {/* Name row: First / Middle / Surname */}
              <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
                <InputField
                  id="reg-firstname" label="First Name *" value={firstName}
                  onChange={e => setFirstName(e.target.value)} placeholder="Aman"
                  autoComplete="given-name" fieldKey="firstName"
                  focusState={focusState} setFocusState={setFocusState}
                />
                <InputField
                  id="reg-middlename" label="Middle Name" value={middleName}
                  onChange={e => setMiddleName(e.target.value)} placeholder="Kumar"
                  autoComplete="additional-name" fieldKey="middleName" required={false}
                  focusState={focusState} setFocusState={setFocusState}
                />
                <InputField
                  id="reg-lastname" label="Surname *" value={lastName}
                  onChange={e => setLastName(e.target.value)} placeholder="Singh"
                  autoComplete="family-name" fieldKey="lastName"
                  focusState={focusState} setFocusState={setFocusState}
                />
              </div>

              {/* DOB / Age (auto) / Sex */}
              <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
                <InputField
                  id="reg-dob" label="Date of Birth *" type="date" value={dateOfBirth}
                  onChange={e => setDateOfBirth(e.target.value)} placeholder=""
                  fieldKey="dob" focusState={focusState} setFocusState={setFocusState}
                />
                <InputField
                  id="reg-age" label="Age" value={age}
                  onChange={() => {}} placeholder="Auto" disabled
                  fieldKey="age" required={false}
                  focusState={focusState} setFocusState={setFocusState}
                />
                <SelectField
                  id="reg-sex" label="Sex *" value={sex}
                  onChange={e => setSex(e.target.value)}
                  options={['Male', 'Female', 'Other']} placeholder="Select"
                  fieldKey="sex" focusState={focusState} setFocusState={setFocusState}
                />
              </div>

              {/* Blood Group / Nationality */}
              <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                <SelectField
                  id="reg-blood" label="Blood Group" value={bloodGroup}
                  onChange={e => setBloodGroup(e.target.value)}
                  options={BLOOD_GROUPS} placeholder="Select" required={false}
                  fieldKey="bloodGroup" focusState={focusState} setFocusState={setFocusState}
                />
                <InputField
                  id="reg-nationality" label="Nationality" value={nationality}
                  onChange={e => setNationality(e.target.value)} placeholder="Indian"
                  fieldKey="nationality" required={false}
                  focusState={focusState} setFocusState={setFocusState}
                />
              </div>

              {/* Marital Status */}
              <RadioGroup
                label="Marital Status"
                name="maritalStatus"
                value={maritalStatus}
                onChange={setMaritalStatus}
                options={['Unmarried', 'Married']}
              />

              <SectionHeader icon="👨‍👩‍👦" title="Guardian Details" />

              {/* Father / Mother */}
              <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                <InputField
                  id="reg-father" label="Father's Name *" value={fatherName}
                  onChange={e => setFatherName(e.target.value)} placeholder="Full Name"
                  fieldKey="fatherName" focusState={focusState} setFocusState={setFocusState}
                />
                <InputField
                  id="reg-mother" label="Mother's Name *" value={motherName}
                  onChange={e => setMotherName(e.target.value)} placeholder="Full Name"
                  fieldKey="motherName" focusState={focusState} setFocusState={setFocusState}
                />
              </div>

              <NavButtons showBack={false} />
            </form>
          )}

          {/* ═══════════════════════════════════════════
              STEP 1 — Contact & Address
              ═══════════════════════════════════════════ */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-5">
              <SectionHeader icon="📞" title="Contact Information" />

              <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                <InputField
                  id="reg-email" label="Email Address *" type="email" value={email}
                  onChange={e => setEmail(e.target.value)} placeholder="xyz@email.com"
                  autoComplete="email" fieldKey="email"
                  focusState={focusState} setFocusState={setFocusState}
                />
                <InputField
                  id="reg-phone" label="Phone / Mobile *" type="tel" value={phone}
                  onChange={e => setPhone(e.target.value)} placeholder="+91 98xxxxxxx"
                  autoComplete="tel" fieldKey="phone"
                  focusState={focusState} setFocusState={setFocusState}
                />
              </div>

              <SectionHeader icon="📍" title="Postal Address" />

              <TextAreaField
                id="reg-postal-addr" label="Address *" value={postalAddress}
                onChange={e => setPostalAddress(e.target.value)}
                placeholder="House No, Street, Area, City, District, State"
                fieldKey="postalAddress" rows={3}
                focusState={focusState} setFocusState={setFocusState}
              />
              <InputField
                id="reg-postal-pin" label="PIN Code *" value={postalPin}
                onChange={e => setPostalPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="6-digit PIN" fieldKey="postalPin"
                focusState={focusState} setFocusState={setFocusState}
              />

              {/* Same-as-postal checkbox */}
              <label className="flex items-center gap-3 cursor-pointer group mt-2">
                <div className={`w-5 h-5 border-3 flex items-center justify-center transition-all duration-150
                  ${sameAsPostal ? 'border-brand-purple bg-brand-purple' : 'border-brand-white/30 group-hover:border-brand-white/60'}`}>
                  {sameAsPostal && <span className="text-brand-white text-xs font-bold">✓</span>}
                </div>
                <input type="checkbox" checked={sameAsPostal} onChange={e => setSameAsPostal(e.target.checked)} className="sr-only" />
                <span className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-brand-muted group-hover:text-brand-white transition-colors">
                  Permanent address same as postal
                </span>
              </label>

              <SectionHeader icon="🏠" title="Permanent Address" />

              <TextAreaField
                id="reg-perm-addr" label="Address *" value={permanentAddress}
                onChange={e => setPermanentAddress(e.target.value)}
                placeholder="House No, Street, Area, City, District, State"
                fieldKey="permanentAddress" rows={3} disabled={sameAsPostal}
                focusState={focusState} setFocusState={setFocusState}
              />
              <InputField
                id="reg-perm-pin" label="PIN Code *" value={permanentPin}
                onChange={e => setPermanentPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="6-digit PIN" fieldKey="permanentPin" disabled={sameAsPostal}
                focusState={focusState} setFocusState={setFocusState}
              />

              <NavButtons />
            </form>
          )}

          {/* ═══════════════════════════════════════════
              STEP 2 — Physical Info & Photo
              ═══════════════════════════════════════════ */}
          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-5">
              <SectionHeader icon="📏" title="Physical Information" />

              <p className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-brand-muted -mt-2 mb-4">
                Discipline: Karate
              </p>

              <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                <InputField
                  id="reg-height" label="Height (cm) *" type="number" value={height}
                  onChange={e => setHeight(e.target.value)} placeholder="170"
                  fieldKey="height" focusState={focusState} setFocusState={setFocusState}
                />
                <InputField
                  id="reg-weight" label="Weight (kg) *" type="number" value={weight}
                  onChange={e => setWeight(e.target.value)} placeholder="65"
                  fieldKey="weight" focusState={focusState} setFocusState={setFocusState}
                />
              </div>

              {/* Disability */}
              <RadioGroup
                label="Any Disability?"
                name="disability"
                value={hasDisability}
                onChange={(val) => { setHasDisability(val); if (val === 'No') setDisabilityDetails(''); }}
                options={['No', 'Yes']}
              />
              {hasDisability === 'Yes' && (
                <TextAreaField
                  id="reg-disability" label="Disability Details *" value={disabilityDetails}
                  onChange={e => setDisabilityDetails(e.target.value)}
                  placeholder="Please describe the disability..."
                  fieldKey="disabilityDetails" rows={2}
                  focusState={focusState} setFocusState={setFocusState}
                />
              )}

              <SectionHeader icon="📷" title="Passport Photo" />

              {/* Photo upload */}
              <div
                onClick={() => photoRef.current?.click()}
                className={`border-3 border-dashed cursor-pointer transition-all duration-150 p-6 text-center
                  ${photoPreview ? 'border-brand-purple' : 'border-brand-white/20 hover:border-brand-white/50'}`}
              >
                {photoPreview ? (
                  <div className="flex flex-col items-center gap-3">
                    <img src={photoPreview} alt="Preview" className="w-24 h-28 object-cover border-3 border-brand-white" />
                    <span className="font-mono text-[0.65rem] text-brand-muted uppercase tracking-wider">Click to change</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl opacity-30">📷</span>
                    <span className="font-mono text-[0.7rem] text-brand-muted uppercase tracking-wider">Click to upload photo</span>
                    <span className="font-mono text-[0.6rem] text-brand-muted/50">JPG, PNG — Max 2MB</span>
                  </div>
                )}
              </div>
              <input ref={photoRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />

              <NavButtons />
            </form>
          )}

          {/* ═══════════════════════════════════════════
              STEP 3 — Account Setup
              ═══════════════════════════════════════════ */}
          {step === 3 && (
            <form onSubmit={handleNext} className="space-y-5">
              <SectionHeader icon="🔐" title="Account Setup" />

              <InputField
                id="reg-username" label="Username *" value={username}
                onChange={e => setUsername(e.target.value)} placeholder="aman_singh26"
                autoComplete="username" fieldKey="username"
                focusState={focusState} setFocusState={setFocusState}
              />

              {/* ── Password ── */}
              <div>
                <label htmlFor="reg-password" className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-brand-ice block mb-2">
                  Password *
                </label>
                <div className={`border-3 flex items-center transition-all duration-150 ${focusState.password ? 'border-brand-purple shadow-brutal-purple' : 'border-brand-white/30 hover:border-brand-white/60'}`}>
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onFocus={() => setFocusState(p => ({ ...p, password: true }))}
                    onBlur={() => setFocusState(p => ({ ...p, password: false }))}
                    placeholder="Min. 8 characters"
                    className="flex-1 bg-transparent text-brand-white font-sans text-sm px-4 py-3 placeholder:text-brand-muted/40 outline-none"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="px-3 py-3 bg-transparent border-none cursor-pointer text-brand-muted hover:text-brand-white transition-colors duration-150 flex-shrink-0"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    <EyeIcon off={showPassword} />
                  </button>
                </div>
                {/* Strength indicator */}
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

              {/* ── Confirm Password ── */}
              <div>
                <label htmlFor="reg-confirm" className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-brand-ice block mb-2">
                  Confirm Password *
                </label>
                <div className={`border-3 flex items-center transition-all duration-150 ${focusState.confirm ? 'border-brand-purple shadow-brutal-purple' : 'border-brand-white/30 hover:border-brand-white/60'}`}>
                  <input
                    id="reg-confirm"
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusState(p => ({ ...p, confirm: true }))}
                    onBlur={() => setFocusState(p => ({ ...p, confirm: false }))}
                    placeholder="Re-enter password"
                    className="flex-1 bg-transparent text-brand-white font-sans text-sm px-4 py-3 placeholder:text-brand-muted/40 outline-none"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="px-3 py-3 bg-transparent border-none cursor-pointer text-brand-muted hover:text-brand-white transition-colors duration-150 flex-shrink-0"
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    <EyeIcon off={showConfirm} />
                  </button>
                </div>
                {confirmPassword && (
                  <p className={`font-mono text-[0.65rem] tracking-[0.1em] mt-2 ${password === confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
                    {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                  </p>
                )}
              </div>

              {/* Certification */}
              <label
                className={`flex items-start gap-4 cursor-pointer border-3 p-4 mt-4 transition-all duration-150
                  ${agreedToTerms
                    ? 'border-brand-purple bg-brand-purple/5'
                    : 'border-brand-white/10 bg-brand-white/[0.02] hover:border-brand-white/25'}`}
              >
                <div className={`w-5 h-5 border-3 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all duration-150
                  ${agreedToTerms ? 'border-brand-purple bg-brand-purple' : 'border-brand-white/30'}`}>
                  {agreedToTerms && <span className="text-brand-white text-xs font-bold">✓</span>}
                </div>
                <input type="checkbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="sr-only" />
                <p className="font-mono text-[0.6rem] leading-relaxed text-brand-muted tracking-wide">
                  I hereby certify that the information given in this application form is to the best of my knowledge and belief.
                  I have read all the rules and regulations and promise to abide by them.
                </p>
              </label>

              <NavButtons nextLabel="Verify Email →" />
            </form>
          )}

          {/* ═══════════════════════════════════════════
              STEP 4 — OTP Verification
              ═══════════════════════════════════════════ */}
          {step === 4 && (
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="border-3 border-brand-white/10 bg-brand-white/[0.03] p-5 text-center">
                <p className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-brand-muted mb-1">
                  Verification code sent to
                </p>
                <p className="font-mono text-sm text-brand-ice font-bold">{email}</p>
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
                    type="button" onClick={handleResendOtp}
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
                  type="button" onClick={handleBack}
                  className="flex-1 font-mono text-sm font-bold uppercase tracking-wider
                             py-4 border-3 border-brand-white/30 bg-transparent text-brand-white cursor-pointer
                             transition-all duration-150
                             hover:border-brand-ice hover:text-brand-ice
                             active:translate-x-0.5 active:translate-y-0.5"
                >
                  ← Back
                </button>
                <button
                  id="reg-submit" type="submit"
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

          {/* ── Divider ── */}
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
