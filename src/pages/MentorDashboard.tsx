import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Users, Clock, Star,
  Menu, Bell, LogOut, Target, ChevronRight, Plus, Video, Settings
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

type MentorSection = 'overview' | 'bookings' | 'schedule' | 'students' | 'settings';

const navItems: { id: MentorSection; label: string; icon: any }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'schedule', label: 'My Schedule', icon: Clock },
  { id: 'students', label: 'My Students', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const bookings = [
  { student: 'Alex Johnson', topic: 'DSA & Interview Prep', date: 'Apr 8, 2025', time: '3:00 PM', status: 'upcoming', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80&fit=crop&crop=face' },
  { student: 'Sneha Patel', topic: 'System Design Review', date: 'Apr 9, 2025', time: '11:00 AM', status: 'upcoming', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&fit=crop&crop=face' },
  { student: 'Karthik Nair', topic: 'Career Transition to PM', date: 'Apr 7, 2025', time: '5:00 PM', status: 'completed', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&fit=crop&crop=face' },
  { student: 'Rohan Verma', topic: 'Resume Review', date: 'Apr 6, 2025', time: '2:00 PM', status: 'completed', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&q=80&fit=crop&crop=face' },
];

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MentorDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const [active, setActive] = useState<MentorSection>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [availability, setAvailability] = useState<Set<string>>(new Set(['Mon-9:00 AM', 'Mon-10:00 AM', 'Wed-3:00 PM', 'Fri-11:00 AM']));

  if (!isAuthenticated || user?.role !== 'mentor') return <Navigate to="/login" replace />;

  const toggleSlot = (slot: string) => {
    setAvailability(prev => {
      const updated = new Set(prev);
      if (updated.has(slot)) updated.delete(slot);
      else updated.add(slot);
      return updated;
    });
  };

  const renderContent = () => {
    switch (active) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-1">Welcome, {user?.name?.split(' ')[0]}! 👋</h2>
              <p className="text-blue-100 text-sm">You have 2 upcoming sessions this week.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Sessions', val: '189', icon: Video, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
                { label: 'This Month', val: '12', icon: Calendar, color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
                { label: 'Rating', val: '4.9 ★', icon: Star, color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' },
                { label: 'Students', val: '68', icon: Users, color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
              ].map(s => (
                <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{s.val}</div>
                  <div className="text-muted-foreground text-xs">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Upcoming Bookings */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Upcoming Sessions</h3>
                <button onClick={() => setActive('bookings')} className="text-xs text-green-500 flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></button>
              </div>
              <div className="space-y-3">
                {bookings.filter(b => b.status === 'upcoming').map((b, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <img src={b.avatar} alt={b.student} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{b.student}</p>
                      <p className="text-xs text-muted-foreground">{b.topic}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-foreground">{b.date}</p>
                      <p className="text-xs text-muted-foreground">{b.time}</p>
                    </div>
                    <button className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1">
                      <Video className="w-3 h-3" /> Join
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-foreground">All Bookings</h2>
            <div className="space-y-3">
              {bookings.map((b, i) => (
                <div key={i} className={`bg-card border rounded-2xl p-5 flex items-center gap-4 flex-wrap ${b.status === 'completed' ? 'border-border opacity-75' : 'border-blue-500/30'}`}>
                  <img src={b.avatar} alt={b.student} className="w-12 h-12 rounded-xl object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{b.student}</h3>
                    <p className="text-sm text-muted-foreground">{b.topic}</p>
                    <p className="text-xs text-muted-foreground">{b.date} at {b.time}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${b.status === 'upcoming' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'}`}>
                      {b.status}
                    </span>
                    {b.status === 'upcoming' && (
                      <button className="flex items-center gap-1 btn-primary text-xs py-1.5 px-3">
                        <Video className="w-3 h-3" /> Join
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Manage Availability</h2>
              <p className="text-xs text-muted-foreground">Click slots to toggle availability</p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left py-2 pr-4 text-muted-foreground font-medium text-xs">Time</th>
                    {days.map(d => <th key={d} className="text-center py-2 px-2 text-muted-foreground font-medium text-xs">{d}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(time => (
                    <tr key={time}>
                      <td className="py-1.5 pr-4 text-xs text-muted-foreground whitespace-nowrap">{time}</td>
                      {days.map(day => {
                        const key = `${day}-${time}`;
                        const isAvail = availability.has(key);
                        return (
                          <td key={day} className="py-1.5 px-2 text-center">
                            <button
                              onClick={() => toggleSlot(key)}
                              className={`w-full py-2 px-1 rounded-lg text-xs font-medium transition-all ${
                                isAvail
                                  ? 'bg-green-500 text-white hover:bg-green-400'
                                  : 'bg-muted text-muted-foreground hover:bg-green-500/10 hover:text-green-500'
                              }`}
                            >
                              {isAvail ? 'Open' : '—'}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'students':
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-foreground">My Students</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {bookings.filter(b => b.status === 'completed').map((b, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3">
                  <img src={b.avatar} alt={b.student} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-semibold text-foreground">{b.student}</h3>
                    <p className="text-xs text-muted-foreground">Topic: {b.topic}</p>
                    <p className="text-xs text-muted-foreground">Last session: {b.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-foreground">Mentor Profile Settings</h2>
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Display Name</label>
                <input defaultValue={user?.name} className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-green-500 transition-colors text-foreground" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Hourly Rate (₹)</label>
                <input type="number" defaultValue={2499} className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-green-500 transition-colors text-foreground" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Expertise</label>
                <input defaultValue="ML/AI, Python, Deep Learning" className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-green-500 transition-colors text-foreground" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Bio</label>
                <textarea rows={4} className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:border-green-500 transition-colors text-foreground resize-none" defaultValue="ML Engineer at Microsoft with 10 years of experience in AI research and applied machine learning." />
              </div>
              <button className="btn-primary text-sm px-6 py-2.5">Save Changes</button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm"><span className="text-blue-500">Mentor</span><span className="text-foreground"> Panel</span></span>
          </Link>
        </div>

        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <img src={user?.avatar || ''} alt={user?.name} className="w-10 h-10 rounded-xl object-cover" />
            <div>
              <p className="text-sm font-semibold text-foreground">{user?.name}</p>
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">Mentor</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActive(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active === item.id ? 'bg-green-500 text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-3 border-t border-border space-y-1">
          <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-card border-b border-border px-4 lg:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-muted">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-foreground">Mentor Dashboard</h1>
          </div>
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-muted">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
          </button>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default MentorDashboard;
