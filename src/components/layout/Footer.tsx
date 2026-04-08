import { Link } from 'react-router-dom';
import { Target, Mail, Phone, MapPin, Linkedin, Instagram, Twitter, Youtube, ArrowRight, Zap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Platform: [
      { label: 'Learning Paths', to: '/learning-paths' },
      { label: 'Mentors', to: '/mentors' },
      { label: 'Features', to: '/features' },
      { label: 'Pricing', to: '/pricing' },
    ],
    Company: [
      { label: 'About Us', to: '/about' },
      { label: 'Blog', to: '/blog' },
      { label: 'Careers', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
    Support: [
      { label: 'Help Center', to: '/contact' },
      { label: 'Community', to: '/contact' },
      { label: 'Privacy Policy', to: '/contact' },
      { label: 'Terms of Service', to: '/contact' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:bg-blue-600 hover:border-blue-600' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:bg-sky-500 hover:border-sky-500' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:bg-pink-600 hover:border-pink-600' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube', color: 'hover:bg-red-600 hover:border-red-600' },
  ];

  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #060D1A 0%, #030810 100%)' }}>
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-16 bg-green-500/5 blur-2xl" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/30 rounded-xl blur-md" />
                <div className="relative w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.03em' }}>
                <span className="text-green-400">Right</span>
                <span className="text-white">Step</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
              Empowering individuals to take the right steps toward their career and personal growth through structured guidance, mentorship, and accountability.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              {[
                { icon: Mail, text: 'hello@rightstep.ai', href: 'mailto:hello@rightstep.ai' },
                { icon: Phone, text: '+91 12345 67890', href: 'tel:+911234567890' },
                { icon: MapPin, text: 'Bengaluru, Karnataka, India', href: undefined },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-2.5 text-sm text-slate-400">
                  <div className="w-7 h-7 rounded-lg bg-green-500/10 border border-green-500/15 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  {href
                    ? <a href={href} className="hover:text-green-400 transition-colors">{text}</a>
                    : <span>{text}</span>
                  }
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl border border-slate-700 text-slate-400 hover:text-white transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 ${color}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-5 text-sm tracking-wide">{category}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-500 hover:text-green-400 transition-colors group flex items-center gap-0 hover:gap-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="relative rounded-2xl overflow-hidden mb-10 border border-slate-700/50">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.06) 0%, rgba(16,185,129,0.03) 50%, rgba(59,130,246,0.04) 100%)' }} />
          <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-500/15 border border-green-500/20 rounded-xl flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">Stay ahead of the curve</h4>
                <p className="text-sm text-slate-400 max-w-xs">Weekly career tips, learning resources, and platform updates directly in your inbox.</p>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto shrink-0">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-56 px-4 py-2.5 bg-slate-800/80 border border-slate-600/60 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-green-500 transition-colors"
              />
              <button className="btn-primary whitespace-nowrap text-sm px-4 py-2.5 flex items-center gap-1.5">
                Subscribe <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800/60">
          <p className="text-xs text-slate-600">
            © {currentYear} RightStep Technologies Pvt. Ltd. · All rights reserved · Made with ♥ in India
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <Link to="/contact" className="hover:text-slate-400 transition-colors">Privacy</Link>
            <span>·</span>
            <Link to="/contact" className="hover:text-slate-400 transition-colors">Terms</Link>
            <span>·</span>
            <Link to="/contact" className="hover:text-slate-400 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
