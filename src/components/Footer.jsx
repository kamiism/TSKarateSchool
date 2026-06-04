export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 70;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="bg-brand-black text-brand-white border-t-3 border-brand-black">
      {/* Main Footer */}
      <div className="w-[min(1200px,92%)] mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-mono text-lg font-bold uppercase tracking-wide mb-4">
              T.S Karate School
            </h3>
            <p className="text-sm text-brand-muted leading-relaxed mb-6">
              Traditional karate training with modern discipline. Building
              warriors of character since establishment.
            </p>
            <div className="flex gap-3">
              {['FB', 'IG', 'YT'].map((label) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 border-2 border-brand-white/20 flex items-center justify-center
                             font-mono text-xs font-bold transition-all duration-200
                             hover:border-brand-white hover:bg-brand-white hover:text-brand-black"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-5">
              Quick Links
            </h4>
            {[
              { label: 'About Us', id: 'about' },
              { label: 'Programs', id: 'programs' },
              { label: 'Why Choose Us', id: 'why' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block text-sm text-brand-ice py-1 transition-colors duration-200 hover:text-brand-white
                           bg-transparent border-none cursor-pointer text-left"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => alert('Gallery coming soon!')}
              className="block text-sm text-brand-ice py-1 transition-colors duration-200 hover:text-brand-white
                         bg-transparent border-none cursor-pointer text-left"
            >
              Gallery
            </button>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-5">
              Programs
            </h4>
            {['Little Warriors', 'Junior Karatekas', 'Adult & Advanced', 'Private Sessions'].map((name) => (
              <button
                key={name}
                onClick={() => scrollTo('programs')}
                className="block text-sm text-brand-ice py-1 transition-colors duration-200 hover:text-brand-white
                           bg-transparent border-none cursor-pointer text-left"
              >
                {name}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-5">
              Contact Us
            </h4>
            <div className="space-y-3">
              {[
                { icon: '📍', text: <>T.S Karate School,<br />Your Address Here</> },
                { icon: '📞', text: '+91 XXXXX XXXXX' },
                { icon: '✉', text: 'info@tskarate.com' },
                { icon: '⏰', text: 'Mon – Sat: 4 PM – 9 PM' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-brand-ice">
                  <span className="text-base leading-relaxed flex-shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-[min(1200px,92%)] mx-auto border-t-2 border-brand-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[0.7rem] text-brand-muted tracking-wider">
          © {new Date().getFullYear()} T.S KARATE SCHOOL. ALL RIGHTS RESERVED.
        </span>
        <div className="flex gap-6">
          <a href="#" className="font-mono text-[0.7rem] text-brand-muted tracking-wide transition-colors duration-200 hover:text-brand-white">
            Privacy Policy
          </a>
          <a href="#" className="font-mono text-[0.7rem] text-brand-muted tracking-wide transition-colors duration-200 hover:text-brand-white">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
