import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Clock, Users, Filter, Linkedin, Twitter, ChevronRight, CheckCircle } from 'lucide-react';
import mentorsBg from '@/assets/mentors-bg.jpg';

const specializations = ['All', 'Software Engineering', 'Data Science', 'Product', 'Design', 'Finance', 'Leadership'];

const mentors = [
  { name: 'Rahul Mehta', role: 'Senior SDE @ Google', spec: 'Software Engineering', exp: '8 years', rating: 4.9, sessions: 240, price: 1999, available: true, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80&fit=crop&crop=face', skills: ['DSA', 'System Design', 'FAANG Prep'] },
  { name: 'Dr. Priya Sharma', role: 'ML Engineer @ Microsoft', spec: 'Data Science', exp: '10 years', rating: 4.8, sessions: 189, price: 2499, available: true, img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80&fit=crop&crop=face', skills: ['ML/AI', 'Python', 'Deep Learning'] },
  { name: 'Aditya Kumar', role: 'PM @ Flipkart', spec: 'Product', exp: '6 years', rating: 5.0, sessions: 312, price: 1499, available: true, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&fit=crop&crop=face', skills: ['Product Strategy', 'Case Studies', 'Analytics'] },
  { name: 'Neha Gupta', role: 'Data Scientist @ Razorpay', spec: 'Data Science', exp: '5 years', rating: 4.7, sessions: 156, price: 1799, available: true, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80&fit=crop&crop=face', skills: ['Statistics', 'SQL', 'Python'] },
  { name: 'Vikram Singh', role: 'Design Lead @ Swiggy', spec: 'Design', exp: '7 years', rating: 4.9, sessions: 98, price: 1599, available: false, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&fit=crop&crop=face', skills: ['Figma', 'UX Research', 'Design Systems'] },
  { name: 'Ananya Iyer', role: 'VP Engineering @ Meesho', spec: 'Leadership', exp: '12 years', rating: 5.0, sessions: 67, price: 3999, available: true, img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&q=80&fit=crop&crop=face', skills: ['Engineering Management', 'Team Building', 'Strategy'] },
  { name: 'Rohan Verma', role: 'SDE2 @ Amazon', spec: 'Software Engineering', exp: '5 years', rating: 4.8, sessions: 203, price: 1299, available: true, img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&q=80&fit=crop&crop=face', skills: ['Java', 'Spring Boot', 'AWS'] },
  { name: 'Kiran Reddy', role: 'CFO @ FinTech Startup', spec: 'Finance', exp: '9 years', rating: 4.6, sessions: 134, price: 2299, available: false, img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&q=80&fit=crop&crop=face', skills: ['Financial Modeling', 'VC Pitch', 'FinTech'] },
];

const Mentors = () => {
  const [activeSpec, setActiveSpec] = useState('All');
  const [search, setSearch] = useState('');
  const [showAvailable, setShowAvailable] = useState(false);

  const filtered = mentors.filter(m =>
    (activeSpec === 'All' || m.spec === activeSpec) &&
    (!showAvailable || m.available) &&
    (!search || m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={mentorsBg} alt="Mentors" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient opacity-90" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full text-sm font-medium mb-4">Our Mentors</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Learn from <span className="text-gradient">Industry Leaders</span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-8">
            Book 1-on-1 sessions with verified professionals from Google, Microsoft, Amazon, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search mentors..."
                className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-green-500 transition-colors"
              />
            </div>
            <button
              onClick={() => setShowAvailable(!showAvailable)}
              className={`px-5 py-3.5 rounded-xl font-medium text-sm transition-all ${showAvailable ? 'bg-green-500 text-white' : 'glass text-white hover:bg-white/10'}`}
            >
              Available Now
            </button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-background border-b border-border sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {specializations.map(spec => (
              <button
                key={spec}
                onClick={() => setActiveSpec(spec)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeSpec === spec ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors Grid */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <p className="text-muted-foreground mb-8">
            <span className="font-semibold text-foreground">{filtered.length}</span> mentors available
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((mentor, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden card-hover group">
                <div className="relative">
                  <img src={mentor.img} alt={mentor.name} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${mentor.available ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                      {mentor.available ? 'Available' : 'Busy'}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground">{mentor.name}</h3>
                  <p className="text-muted-foreground text-xs mb-2">{mentor.role}</p>
                  <div className="flex items-center gap-3 text-xs mb-3">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-3.5 h-3.5 fill-current" /> <span className="font-medium text-foreground">{mentor.rating}</span>
                    </div>
                    <span className="text-muted-foreground">{mentor.sessions} sessions</span>
                    <span className="text-muted-foreground">{mentor.exp}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {mentor.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-green-500/10 text-green-600 dark:text-green-400 text-xs rounded-full">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-green-500 font-bold">₹{mentor.price.toLocaleString()}/hr</span>
                  </div>
                  <Link to="/register" className={`block w-full text-center text-sm font-semibold py-2 rounded-xl transition-all ${mentor.available ? 'btn-primary' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}>
                    {mentor.available ? 'Book Session' : 'Currently Busy'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become Mentor */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Want to Become a Mentor?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Share your expertise, help others grow, and earn while doing what you love.</p>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {['Earn up to ₹50K/month', 'Flexible schedule', 'Build your brand'].map(b => (
              <div key={b} className="flex items-center gap-2 bg-card border border-border rounded-xl p-4 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> {b}
              </div>
            ))}
          </div>
          <Link to="/register" className="btn-primary inline-flex items-center gap-2">
            Apply as Mentor <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Mentors;
