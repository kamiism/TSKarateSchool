import { useNavigate } from 'react-router-dom';
import { Phone, Mail, Clock } from 'lucide-react';

export default function StudentFooter() {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-black text-brand-white border-t-3 border-brand-purple">
      <div className="w-[min(1200px,92%)] mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-mono text-lg font-bold uppercase tracking-wide mb-3">
              T.S Karate School
            </h3>
            <p className="text-sm text-brand-muted leading-relaxed mb-4">
              Student Portal — Train hard, stay disciplined, respect the art.
            </p>
            <button
              onClick={() => navigate('/')}
              className="font-mono text-[0.7rem] font-bold uppercase tracking-wider text-brand-ice
                         border-b border-brand-ice pb-0.5 cursor-pointer bg-transparent border-x-0 border-t-0
                         hover:text-brand-white hover:border-brand-white transition-colors"
            >
              ← Back to Main Site
            </button>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-4">
              Quick Links
            </h4>
            {[
              { label: 'Dashboard', id: 'dashboard' },
              { label: 'Leaderboard', id: 'leaderboard' },
              { label: 'Syllabus', id: 'syllabus' },
              { label: 'Kata Videos', id: 'kata' },
              { label: 'News & Events', id: 'news' },
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
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-brand-muted mb-4">
              Need Help?
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-3 text-sm text-brand-ice">
                <Phone size={16} className="flex-shrink-0" />
                <span>+91 XXXXX XXXXX</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-brand-ice">
                <Mail size={16} className="flex-shrink-0" />
                <span>info@tskarate.com</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-brand-ice">
                <Clock size={16} className="flex-shrink-0" />
                <span>Mon – Sat: 4 PM – 9 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[min(1200px,92%)] mx-auto border-t-2 border-brand-white/10 py-4 text-center">
        <span className="font-mono text-[0.65rem] text-brand-muted tracking-wider">
          © {new Date().getFullYear()} T.S KARATE SCHOOL — STUDENT PORTAL
        </span>
      </div>
    </footer>
  );
}
