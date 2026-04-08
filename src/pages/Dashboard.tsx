import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, Target, Map, CheckSquare, TrendingUp, Users, Settings,
  Bell, LogOut, Menu, X, Star, Clock, BookOpen, Award, Zap, ChevronRight,
  Plus, Check, Calendar, BarChart2, User
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

type Section = 'overview' | 'goals' | 'learning' | 'tasks' | 'progress' | 'mentors' | 'profile';

const goals = [
  { title: 'Land SDE Role at FAANG', progress: 65, deadline: 'Jun 2025', category: 'Career' },
  { title: 'Complete DSA Mastery Path', progress: 42, deadline: 'May 2025', category: 'Skill' },
  { title: 'Build 3 Portfolio Projects', progress: 80, deadline: 'Apr 2025', category: 'Project' },
];

const tasks = [
  { title: 'Solve 5 LeetCode problems', done: false, priority: 'High', due: 'Today' },
  { title: 'Watch System Design lecture', done: true, priority: 'Medium', due: 'Yesterday' },
  { title: 'Update resume with new projects', done: false, priority: 'High', due: 'Tomorrow' },
  { title: 'Practice mock interview', done: false, priority: 'Medium', due: 'This week' },
  { title: 'Read "Clean Code" Chapter 5', done: true, priority: 'Low', due: 'Last week' },
];

const upcomingMentorSessions = [
  { mentor: 'Rahul Mehta', role: 'SDE @ Google', date: 'Tomorrow, 3:00 PM', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80&fit=crop&crop=face' },
  { mentor: 'Dr. Priya Sharma', role: 'ML Engineer @ Microsoft', date: 'Sat, 11:00 AM', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=80&fit=crop&crop=face' },
];

const learningPaths = [
  { title: 'DSA Mastery', progress: 42, totalModules: 24, completedModules: 10, img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&q=80' },
  { title: 'System Design', progress: 28, totalModules: 18, completedModules: 5, img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200&q=80' },
  { title: 'Behavioral Interviews', progress: 75, totalModules: 12, completedModules: 9, img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&q=80' },
];

const navItems: { id: Section; label: string; icon: any }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'learning', label: 'Learning Paths', icon: Map },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
  { id: 'mentors', label: 'Mentor Booking', icon: Users },
  { id: 'profile', label: 'Profile', icon: Settings },
];

const ProgressBar = ({ value, color = 'bg-green-500' }: { value: number; color?: string }) => (
  <div className="w-full bg-muted rounded-full h-2">
    <div className={`${color} h-2 rounded-full transition-all duration-700`} style={{ width: `${value}%` }} />
  </div>
);

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const [active, setActive] = useState<Section>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [taskList, setTaskList] = useState(tasks);
  const [notifications, setNotifications] = useState(3);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const toggleTask = (idx: number) => {
    setTaskList(prev => prev.map((t, i) => i === idx ? { ...t, done: !t.done } : t));
  };

  const renderContent = () => {
    switch (active) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Welcome */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-1">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
              <p className="text-green-50 text-sm">You're 65% closer to your goal. Keep it up!</p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-green-100">Overall Progress</span>
                  <span className="font-semibold">65%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Goals Active', val: '3', icon: Target, color: 'text-green-500 bg-green-50 dark:bg-green-900/20' },
                { label: 'Paths Enrolled', val: '3', icon: BookOpen, color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
                { label: 'Tasks Done', val: '12', icon: CheckSquare, color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
                { label: 'Days Streak', val: '7', icon: Zap, color: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20' },
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

            {/* Active Goals */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Active Goals</h3>
                <button onClick={() => setActive('goals')} className="text-xs text-green-500 flex items-center gap-1">View all <ChevronRight className="w-3 h-3" /></button>
              </div>
              <div className="space-y-4">
                {goals.map((g, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground">{g.title}</span>
                      <span className="text-xs text-green-500 font-semibold">{g.progress}%</span>
                    </div>
                    <ProgressBar value={g.progress} />
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">Due: {g.deadline}</span>
                      <span className="px-1.5 py-0.5 bg-accent text-accent-foreground text-xs rounded">{g.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Upcoming Mentor Sessions</h3>
                <button onClick={() => setActive('mentors')} className="text-xs text-green-500 flex items-center gap-1">Book new <ChevronRight className="w-3 h-3" /></button>
              </div>
              <div className="space-y-3">
                {upcomingMentorSessions.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                    <img src={s.avatar} alt={s.mentor} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{s.mentor}</p>
                      <p className="text-xs text-muted-foreground">{s.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-foreground">{s.date}</p>
                      <button className="text-xs text-green-500 hover:underline">Join</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">My Goals</h2>
              <button className="btn-primary flex items-center gap-2 text-sm py-2">
                <Plus className="w-4 h-4" /> Add Goal
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[...goals, { title: 'Get AWS Certification', progress: 15, deadline: 'Aug 2025', category: 'Certification' }].map((g, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{g.title}</h3>
                      <span className="text-xs px-2 py-0.5 bg-accent text-accent-foreground rounded-full">{g.category}</span>
                    </div>
                    <span className="text-2xl font-bold text-green-500">{g.progress}%</span>
                  </div>
                  <ProgressBar value={g.progress} />
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" /> Deadline: {g.deadline}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'learning':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Learning Paths</h2>
              <Link to="/learning-paths" className="btn-primary flex items-center gap-2 text-sm py-2">
                <Plus className="w-4 h-4" /> Browse Paths
              </Link>
            </div>
            {learningPaths.map((p, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="flex items-center gap-4 p-5">
                  <img src={p.img} alt={p.title} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <BookOpen className="w-4 h-4" />
                      {p.completedModules}/{p.totalModules} modules completed
                    </div>
                    <ProgressBar value={p.progress} />
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-green-500">{p.progress}%</span>
                    <p className="text-xs text-muted-foreground">complete</p>
                  </div>
                </div>
                <div className="border-t border-border px-5 py-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Next: Module {p.completedModules + 1}</span>
                  <button className="text-xs btn-primary py-1.5 px-4">Continue</button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'tasks':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Daily Tasks</h2>
              <button className="btn-primary flex items-center gap-2 text-sm py-2">
                <Plus className="w-4 h-4" /> Add Task
              </button>
            </div>
            <div className="space-y-3">
              {taskList.map((task, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 bg-card border rounded-2xl transition-all ${task.done ? 'border-green-500/30 opacity-60' : 'border-border'}`}>
                  <button onClick={() => toggleTask(i)} className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${task.done ? 'bg-green-500 border-green-500' : 'border-border hover:border-green-500'}`}>
                    {task.done && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${task.done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.due}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    task.priority === 'High' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>{task.priority}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'progress': {
        const weeklyTasks = [
          { day: 'Mon', completed: 3, target: 5 },
          { day: 'Tue', completed: 5, target: 5 },
          { day: 'Wed', completed: 4, target: 5 },
          { day: 'Thu', completed: 2, target: 5 },
          { day: 'Fri', completed: 6, target: 5 },
          { day: 'Sat', completed: 4, target: 5 },
          { day: 'Sun', completed: 3, target: 5 },
        ];
        const monthlyHours = [
          { month: 'Oct', hours: 38 },
          { month: 'Nov', hours: 52 },
          { month: 'Dec', hours: 44 },
          { month: 'Jan', hours: 61 },
          { month: 'Feb', hours: 74 },
          { month: 'Mar', hours: 68 },
          { month: 'Apr', hours: 82 },
        ];
        const skillGrowth = [
          { subject: 'DSA', A: 65, fullMark: 100 },
          { subject: 'System Design', A: 40, fullMark: 100 },
          { subject: 'Problem Solving', A: 75, fullMark: 100 },
          { subject: 'Communication', A: 80, fullMark: 100 },
          { subject: 'Leadership', A: 55, fullMark: 100 },
          { subject: 'Cloud/DevOps', A: 48, fullMark: 100 },
        ];
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Progress Tracking</h2>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: 'Tasks This Week', val: '27 / 35', sub: '+2 vs last week', icon: CheckSquare, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
                { label: 'Study Hours (Month)', val: '82 hrs', sub: '↑ 20% from March', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
                { label: 'Achievements', val: '7 badges', sub: '2 new this week', icon: Award, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
              ].map(s => (
                <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
                  <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{s.val}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Weekly Task Completion - Line Chart */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">Weekly Task Completion</h3>
                  <p className="text-xs text-muted-foreground">Completed vs target tasks per day</p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-green-500/10 text-green-500 font-medium rounded-full">This Week</span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={weeklyTasks} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line type="monotone" dataKey="completed" stroke="#22C55E" strokeWidth={2.5} dot={{ r: 4, fill: '#22C55E' }} activeDot={{ r: 6 }} name="Completed" />
                  <Line type="monotone" dataKey="target" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="5 5" dot={false} name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly Study Hours - Bar Chart */}
            <div className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">Monthly Study Hours</h3>
                  <p className="text-xs text-muted-foreground">Total hours invested per month</p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-blue-500/10 text-blue-500 font-medium rounded-full">Last 7 months</span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={monthlyHours} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                    cursor={{ fill: 'hsl(var(--muted))', radius: 8 }}
                  />
                  <Bar dataKey="hours" fill="#3B82F6" radius={[6, 6, 0, 0]} name="Study Hours" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Skill Radar Chart + Bars */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Radar */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-semibold text-foreground mb-1">Skill Radar</h3>
                <p className="text-xs text-muted-foreground mb-4">Overall skill distribution</p>
                <ResponsiveContainer width="100%" height={220}>
                  <RadarChart data={skillGrowth}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                    <Radar name="Skills" dataKey="A" stroke="#22C55E" fill="#22C55E" fillOpacity={0.2} strokeWidth={2} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '12px',
                        fontSize: '12px',
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Skill bars */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-semibold text-foreground mb-1">Skill Levels</h3>
                <p className="text-xs text-muted-foreground mb-4">Current proficiency %</p>
                <div className="space-y-3.5">
                  {[
                    { skill: 'DSA', val: 65, color: 'bg-green-500' },
                    { skill: 'System Design', val: 40, color: 'bg-blue-500' },
                    { skill: 'Problem Solving', val: 75, color: 'bg-purple-500' },
                    { skill: 'Communication', val: 80, color: 'bg-yellow-500' },
                    { skill: 'Leadership', val: 55, color: 'bg-pink-500' },
                    { skill: 'Cloud / DevOps', val: 48, color: 'bg-cyan-500' },
                  ].map(s => (
                    <div key={s.skill}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-foreground font-medium">{s.skill}</span>
                        <span className="text-muted-foreground">{s.val}%</span>
                      </div>
                      <ProgressBar value={s.val} color={s.color} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'mentors':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Mentor Booking</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: 'Rahul Mehta', role: 'SDE @ Google', rating: 4.9, price: '₹1,999/hr', available: true, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop&crop=face' },
                { name: 'Dr. Priya Sharma', role: 'ML Engineer @ Microsoft', rating: 4.8, price: '₹2,499/hr', available: true, img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&fit=crop&crop=face' },
                { name: 'Aditya Kumar', role: 'PM @ Flipkart', rating: 5.0, price: '₹1,499/hr', available: false, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop&crop=face' },
                { name: 'Neha Gupta', role: 'DS @ Razorpay', rating: 4.7, price: '₹1,799/hr', available: true, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&fit=crop&crop=face' },
              ].map((m, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
                  <div className="relative">
                    <img src={m.img} alt={m.name} className="w-14 h-14 rounded-xl object-cover" />
                    <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${m.available ? 'bg-green-500' : 'bg-gray-400'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{m.name}</h3>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs">{m.rating}</span>
                      <span className="text-xs text-green-500 font-semibold">{m.price}</span>
                    </div>
                  </div>
                  <button className={`text-sm px-4 py-2 rounded-xl font-medium ${m.available ? 'btn-primary' : 'bg-muted text-muted-foreground cursor-not-allowed'}`} disabled={!m.available}>
                    {m.available ? 'Book' : 'Busy'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Profile Settings</h2>
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80&fit=crop&crop=face'}
                  alt={user?.name}
                  className="w-20 h-20 rounded-2xl object-cover"
                />
                <div>
                  <h3 className="font-bold text-foreground text-lg">{user?.name}</h3>
                  <p className="text-muted-foreground text-sm">{user?.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full font-medium">
                    {user?.role}
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', val: user?.name || '' },
                  { label: 'Email', val: user?.email || '' },
                  { label: 'Career Goal', val: user?.goal || 'Not set' },
                  { label: 'Member Since', val: user?.joinDate || '' },
                ].map(f => (
                  <div key={f.label}>
                    <label className="text-sm font-medium text-foreground block mb-1">{f.label}</label>
                    <input
                      type="text"
                      defaultValue={f.val}
                      className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>
                ))}
              </div>
              <button className="mt-4 btn-primary text-sm px-6 py-2.5">Save Changes</button>
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
        {/* Logo */}
        <div className="p-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold"><span className="text-green-500">Right</span><span className="text-foreground">Step</span></span>
          </Link>
        </div>

        {/* User */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <img src={user?.avatar || ''} alt={user?.name} className="w-10 h-10 rounded-xl object-cover" />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-foreground truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActive(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active === item.id
                    ? 'bg-green-500 text-white'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-border space-y-1">
          <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-card border-b border-border px-4 lg:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-muted">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-foreground capitalize">{active.replace('-', ' ')}</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-muted hover:bg-muted/80 transition-colors">
              <Bell className="w-4 h-4" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
