import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, Target, ChevronDown, Bell, User, LogOut, Settings, Zap } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Features', path: '/features' },
  { label: 'Learning Paths', path: '/learning-paths' },
  { label: 'Mentors', path: '/mentors' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleDashboard = () => {
    if (user?.role === 'admin') navigate('/admin');
    else if (user?.role === 'mentor') navigate('/mentor-dashboard');
    else navigate('/dashboard');
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-background/92 backdrop-blur-xl border-b border-border/60 shadow-[0_1px_24px_rgb(0_0_0_/_0.06)]'
        : 'bg-transparent'
    }`}>
      {/* Top announcement bar */}
      {!scrolled && location.pathname === '/' && (
        <div className="bg-gradient-to-r from-green-600/90 to-emerald-600/90 backdrop-blur-sm text-white text-xs font-medium text-center py-2 px-4 flex items-center justify-center gap-2">
          <Zap className="w-3 h-3" />
          <span>🎉 14-day free trial — No credit card required.</span>
          <Link to="/register" className="underline underline-offset-2 hover:no-underline font-semibold">Start now →</Link>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-green-500/30 rounded-xl blur-md group-hover:blur-lg transition-all" />
              <div className="relative w-9 h-9 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-105 transition-transform duration-200">
                <Target className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.03em' }}>
              <span className="text-green-500">Right</span>
              <span className="text-foreground">Step</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-0.5 bg-muted/60 backdrop-blur-sm rounded-2xl px-1.5 py-1.5 border border-border/50">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-green-600 dark:text-green-400 bg-background shadow-sm border border-border/50'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/70'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-500" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-muted/80 hover:bg-muted border border-border/50 transition-all duration-200 hover:shadow-sm"
              aria-label="Toggle theme"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-muted/30" />
              {isDark
                ? <Sun className="w-4 h-4 text-yellow-400 relative z-10" />
                : <Moon className="w-4 h-4 text-slate-500 relative z-10" />
              }
            </button>

            {isAuthenticated && user ? (
              <div className="relative" data-dropdown>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl bg-muted/80 hover:bg-muted border border-border/50 transition-all duration-200 hover:shadow-sm"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
                    alt={user.name}
                    className="w-7 h-7 rounded-lg object-cover ring-2 ring-green-500/30"
                  />
                  <span className="hidden md:block text-sm font-medium">{user.name.split(' ')[0]}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-xl shadow-black/10 overflow-hidden z-50 animate-scale-in">
                    {/* User info */}
                    <div className="p-3 border-b border-border bg-muted/30">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={user.avatar || ''}
                          alt={user.name}
                          className="w-9 h-9 rounded-xl object-cover"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-foreground truncate">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>
                      <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        user.role === 'admin'
                          ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                          : user.role === 'mentor'
                          ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </div>

                    {/* Menu items */}
                    <div className="p-1.5 space-y-0.5">
                      {[
                        { icon: User, label: 'Dashboard', action: handleDashboard },
                        { icon: Bell, label: 'Notifications', action: handleDashboard },
                        { icon: Settings, label: 'Settings', action: handleDashboard },
                      ].map(item => (
                        <button
                          key={item.label}
                          onClick={item.action}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-foreground rounded-xl hover:bg-muted transition-colors text-left font-medium"
                        >
                          <item.icon className="w-4 h-4 text-muted-foreground" />
                          {item.label}
                        </button>
                      ))}
                      <div className="my-1 border-t border-border" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-xl hover:bg-muted/60"
                >
                  Sign in
                </Link>
                <Link to="/register" className="btn-primary text-sm px-4 py-2.5">
                  Get Started →
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-muted/80 border border-border/50 hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen
                ? <X className="w-4.5 h-4.5" />
                : <Menu className="w-4.5 h-4.5" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-border/50 mt-1 animate-fade-in-up">
            <div className="pt-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'text-green-500 bg-green-500/8 border border-green-500/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  }`}
                >
                  {isActive(link.path) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2.5 shrink-0" />
                  )}
                  {link.label}
                </Link>
              ))}
            </div>
            {!isAuthenticated && (
              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border/50">
                <Link to="/login" className="w-full text-center py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground">
                  Sign in
                </Link>
                <Link to="/register" className="w-full btn-primary text-sm text-center">
                  Get Started Free →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
