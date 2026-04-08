import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, Users, BookOpen, DollarSign, FileText, Settings,
  Menu, Bell, LogOut, Target, ChevronRight, TrendingUp, Plus,
  Edit, Trash2, CheckCircle, XCircle, Eye, Search, Filter
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { toast } from 'sonner';

type AdminSection = 'overview' | 'users' | 'mentors' | 'content' | 'payments' | 'blog';

const mockUsers = [
  { id: 1, name: 'Alex Johnson', email: 'user@example.com', role: 'user', status: 'active', joined: '2024-01-15' },
  { id: 2, name: 'Rahul Mehta', email: 'rahul@example.com', role: 'mentor', status: 'active', joined: '2024-02-10' },
  { id: 3, name: 'Sneha Patel', email: 'sneha@example.com', role: 'user', status: 'inactive', joined: '2024-03-05' },
  { id: 4, name: 'Karthik Nair', email: 'karthik@example.com', role: 'user', status: 'active', joined: '2024-03-20' },
];

const mockMentors = [
  { id: 1, name: 'Rahul Mehta', email: 'rahul@google.com', expertise: 'SDE', status: 'approved', sessions: 240 },
  { id: 2, name: 'Dr. Priya Sharma', email: 'priya@microsoft.com', expertise: 'ML/AI', status: 'pending', sessions: 0 },
  { id: 3, name: 'Aditya Kumar', email: 'aditya@flipkart.com', expertise: 'Product', status: 'approved', sessions: 312 },
];

const mockBlogPosts = [
  { id: 1, title: 'How to Create a 6-Month Career Roadmap', category: 'Career', status: 'published', date: '2024-03-28', views: 1240 },
  { id: 2, title: '10 Skills Every Software Engineer Needs in 2025', category: 'Tech', status: 'published', date: '2024-03-22', views: 3850 },
  { id: 3, title: 'Mentor or Self-Learn? Here\'s the Truth', category: 'Mentorship', status: 'draft', date: '2024-03-15', views: 0 },
];

const navItems: { id: AdminSection; label: string; icon: any }[] = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Manage Users', icon: Users },
  { id: 'mentors', label: 'Mentor Approval', icon: CheckCircle },
  { id: 'content', label: 'Content', icon: BookOpen },
  { id: 'payments', label: 'Payments', icon: DollarSign },
  { id: 'blog', label: 'Blog Management', icon: FileText },
];

const AdminDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const [active, setActive] = useState<AdminSection>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState(mockUsers);
  const [mentors, setMentors] = useState(mockMentors);
  const [blogPosts, setBlogPosts] = useState(mockBlogPosts);
  const [search, setSearch] = useState('');

  if (!isAuthenticated || user?.role !== 'admin') return <Navigate to="/login" replace />;

  const approveMentor = (id: number) => {
    setMentors(prev => prev.map(m => m.id === id ? { ...m, status: 'approved' } : m));
    toast.success('Mentor approved!');
  };

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast.success('User removed');
  };

  const toggleBlogStatus = (id: number) => {
    setBlogPosts(prev => prev.map(p => p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p));
    toast.success('Blog status updated');
  };

  const renderContent = () => {
    switch (active) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Users', val: '50,248', change: '+12%', icon: Users, color: 'from-blue-500 to-blue-600' },
                { label: 'Active Mentors', val: '148', change: '+5%', icon: CheckCircle, color: 'from-green-500 to-green-600' },
                { label: 'Monthly Revenue', val: '₹4.2L', change: '+18%', icon: DollarSign, color: 'from-purple-500 to-purple-600' },
                { label: 'Published Blogs', val: '86', change: '+3', icon: FileText, color: 'from-orange-500 to-orange-600' },
              ].map(s => (
                <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{s.val}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                    <span className="text-xs text-green-500 font-medium">{s.change}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Recent Users</h3>
                  <button onClick={() => setActive('users')} className="text-xs text-green-500 flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></button>
                </div>
                <div className="space-y-3">
                  {users.slice(0, 3).map(u => (
                    <div key={u.id} className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-sm font-bold">
                        {u.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${u.status === 'active' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {u.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Mentors */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Pending Mentor Approvals</h3>
                  <button onClick={() => setActive('mentors')} className="text-xs text-green-500 flex items-center gap-1">Review <ChevronRight className="w-3 h-3" /></button>
                </div>
                {mentors.filter(m => m.status === 'pending').length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">All mentors are approved ✅</p>
                ) : (
                  <div className="space-y-3">
                    {mentors.filter(m => m.status === 'pending').map(m => (
                      <div key={m.id} className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 text-sm font-bold">{m.name[0]}</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{m.name}</p>
                          <p className="text-xs text-muted-foreground">{m.expertise}</p>
                        </div>
                        <button onClick={() => approveMentor(m.id)} className="text-xs btn-primary py-1 px-3">Approve</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <h2 className="text-xl font-bold text-foreground">Manage Users</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search users..."
                    className="pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                <button className="btn-primary flex items-center gap-1 text-sm py-2"><Plus className="w-4 h-4" />Add</button>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      {['Name', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-muted-foreground font-medium text-xs">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {users.filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())).map(u => (
                      <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{u.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            u.role === 'mentor' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                            u.role === 'admin' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                            'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                          }`}>{u.role}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.status === 'active' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>{u.status}</span>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{u.joined}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 hover:bg-muted rounded-lg transition-colors text-blue-500"><Edit className="w-3.5 h-3.5" /></button>
                            <button onClick={() => deleteUser(u.id)} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'mentors':
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-foreground">Mentor Approval</h2>
            <div className="space-y-3">
              {mentors.map(m => (
                <div key={m.id} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 flex-wrap">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">{m.name[0]}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{m.name}</h3>
                    <p className="text-sm text-muted-foreground">{m.email} • {m.expertise}</p>
                    <p className="text-xs text-muted-foreground">{m.sessions} sessions completed</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${m.status === 'approved' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                      {m.status}
                    </span>
                    {m.status === 'pending' && (
                      <>
                        <button onClick={() => approveMentor(m.id)} className="flex items-center gap-1 text-sm bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-400 transition-colors">
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button className="flex items-center gap-1 text-sm bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-200 transition-colors">
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'blog':
        return (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Blog Management</h2>
              <button className="btn-primary flex items-center gap-1 text-sm py-2">
                <Plus className="w-4 h-4" /> New Post
              </button>
            </div>
            <div className="space-y-3">
              {blogPosts.map(post => (
                <div key={post.id} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{post.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{post.category}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        {post.status === 'published' && <><span>•</span><span>{post.views.toLocaleString()} views</span></>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${post.status === 'published' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                        {post.status}
                      </span>
                      <button className="p-1.5 hover:bg-muted rounded-lg text-blue-500 transition-colors"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 hover:bg-muted rounded-lg text-green-500 transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => toggleBlogStatus(post.id)} className="p-1.5 hover:bg-muted rounded-lg text-orange-500 transition-colors" title="Toggle status">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button onClick={() => setBlogPosts(prev => prev.filter(p => p.id !== post.id))} className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-foreground">Payment Management</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Total Revenue', val: '₹12,40,000', color: 'text-green-500' },
                { label: 'This Month', val: '₹4,20,000', color: 'text-blue-500' },
                { label: 'Pending Payouts', val: '₹82,500', color: 'text-orange-500' },
              ].map(s => (
                <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
                  <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-border font-semibold text-foreground">Recent Transactions</div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      {['User', 'Plan', 'Amount', 'Date', 'Status'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-muted-foreground font-medium text-xs">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { user: 'Alex J.', plan: 'Pro', amount: '₹2,499', date: '2024-03-28', status: 'success' },
                      { user: 'Sneha P.', plan: 'Elite', amount: '₹5,999', date: '2024-03-27', status: 'success' },
                      { user: 'Karthik N.', plan: 'Starter', amount: '₹999', date: '2024-03-26', status: 'pending' },
                    ].map((t, i) => (
                      <tr key={i} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{t.user}</td>
                        <td className="px-4 py-3 text-muted-foreground">{t.plan}</td>
                        <td className="px-4 py-3 text-green-500 font-semibold">{t.amount}</td>
                        <td className="px-4 py-3 text-muted-foreground">{t.date}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${t.status === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>{t.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-foreground">Content Management</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { title: 'Learning Paths', count: 48, icon: BookOpen, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
                { title: 'Video Lessons', count: 320, icon: FileText, color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
                { title: 'Quiz Sets', count: 96, icon: CheckCircle, color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
                { title: 'Resources', count: 142, icon: Settings, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20' },
              ].map(c => (
                <div key={c.title} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.color}`}>
                    <c.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{c.title}</h3>
                    <p className="text-2xl font-bold text-foreground">{c.count}</p>
                  </div>
                  <button className="btn-primary text-xs py-1.5 px-3">Manage</button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm"><span className="text-red-500">Admin</span><span className="text-foreground"> Panel</span></span>
          </Link>
        </div>

        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <img src={user?.avatar || ''} alt={user?.name} className="w-10 h-10 rounded-xl object-cover" />
            <div>
              <p className="text-sm font-semibold text-foreground">{user?.name}</p>
              <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-full">Admin</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActive(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active === item.id ? 'bg-green-500 text-white' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
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
            <h1 className="font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-muted">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
          </button>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
