import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Clock, CheckCircle, ChevronRight, X, Calendar, Video, MessageCircle, Award, Briefcase } from 'lucide-react';
import mentorsBg from '@/assets/mentors-bg.jpg';
import { toast } from 'sonner';

const specializations = ['All', 'Software Engineering', 'Data Science', 'Product', 'Design', 'Finance', 'Leadership'];

interface Mentor {
  name: string;
  role: string;
  spec: string;
  exp: string;
  rating: number;
  sessions: number;
  price: number;
  available: boolean;
  img: string;
  skills: string[];
  bio: string;
  company: string;
  languages: string[];
  sessionTypes: string[];
}

const mentors: Mentor[] = [
  { name: 'Rahul Mehta', role: 'Senior SDE @ Google', spec: 'Software Engineering', exp: '8 years', rating: 4.9, sessions: 240, price: 1999, available: true, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80&fit=crop&crop=face', skills: ['DSA', 'System Design', 'FAANG Prep'], company: 'Google', bio: 'Senior Software Engineer at Google with 8+ years of experience in distributed systems and large-scale infrastructure. Helped 200+ engineers crack FAANG interviews. Specializes in algorithmic thinking and system design.', languages: ['English', 'Hindi'], sessionTypes: ['Interview Prep', 'Career Guidance', 'Code Review'] },
  { name: 'Dr. Priya Sharma', role: 'ML Engineer @ Microsoft', spec: 'Data Science', exp: '10 years', rating: 4.8, sessions: 189, price: 2499, available: true, img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80&fit=crop&crop=face', skills: ['ML/AI', 'Python', 'Deep Learning'], company: 'Microsoft', bio: 'PhD in Computer Science and ML Engineer at Microsoft Research. Expert in deep learning, NLP, and production ML systems. Published researcher with 15+ papers in top conferences.', languages: ['English', 'Hindi', 'Tamil'], sessionTypes: ['ML Roadmap', 'Research Guidance', 'Interview Prep'] },
  { name: 'Aditya Kumar', role: 'PM @ Flipkart', spec: 'Product', exp: '6 years', rating: 5.0, sessions: 312, price: 1499, available: true, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&fit=crop&crop=face', skills: ['Product Strategy', 'Case Studies', 'Analytics'], company: 'Flipkart', bio: 'Product Manager at Flipkart leading the growth team. Transitioned from software engineering and has a unique perspective on both technical and business aspects of product development.', languages: ['English', 'Hindi'], sessionTypes: ['PM Transition', 'Case Study Prep', 'Career Strategy'] },
  { name: 'Neha Gupta', role: 'Data Scientist @ Razorpay', spec: 'Data Science', exp: '5 years', rating: 4.7, sessions: 156, price: 1799, available: true, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80&fit=crop&crop=face', skills: ['Statistics', 'SQL', 'Python'], company: 'Razorpay', bio: 'Data Scientist at Razorpay working on fraud detection and risk modeling. Passionate about making data science accessible to beginners and helping them build strong statistical foundations.', languages: ['English', 'Hindi', 'Marathi'], sessionTypes: ['Data Science Basics', 'SQL Mastery', 'Career Transition'] },
  { name: 'Vikram Singh', role: 'Design Lead @ Swiggy', spec: 'Design', exp: '7 years', rating: 4.9, sessions: 98, price: 1599, available: false, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&fit=crop&crop=face', skills: ['Figma', 'UX Research', 'Design Systems'], company: 'Swiggy', bio: 'Design Lead at Swiggy overseeing the design system and user experience for 10M+ users. Expert in product design, design systems, and UX research methodologies.', languages: ['English', 'Hindi'], sessionTypes: ['Portfolio Review', 'UX Strategy', 'Design Systems'] },
  { name: 'Ananya Iyer', role: 'VP Engineering @ Meesho', spec: 'Leadership', exp: '12 years', rating: 5.0, sessions: 67, price: 3999, available: true, img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&q=80&fit=crop&crop=face', skills: ['Engineering Management', 'Team Building', 'Strategy'], company: 'Meesho', bio: 'VP Engineering at Meesho leading a team of 80+ engineers. 12 years of experience scaling engineering teams from 0 to 100+. Specializes in engineering leadership and organizational design.', languages: ['English', 'Hindi', 'Kannada'], sessionTypes: ['Leadership Coaching', 'Career Planning', 'Team Management'] },
  { name: 'Rohan Verma', role: 'SDE2 @ Amazon', spec: 'Software Engineering', exp: '5 years', rating: 4.8, sessions: 203, price: 1299, available: true, img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&q=80&fit=crop&crop=face', skills: ['Java', 'Spring Boot', 'AWS'], company: 'Amazon', bio: 'SDE2 at Amazon working on AWS services. Expert in Java ecosystem, microservices architecture, and cloud-native development. Loves helping freshers and juniors build strong engineering foundations.', languages: ['English', 'Hindi'], sessionTypes: ['Java Deep Dive', 'AWS Prep', 'Backend Engineering'] },
  { name: 'Kiran Reddy', role: 'CFO @ FinTech Startup', spec: 'Finance', exp: '9 years', rating: 4.6, sessions: 134, price: 2299, available: false, img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&q=80&fit=crop&crop=face', skills: ['Financial Modeling', 'VC Pitch', 'FinTech'], company: 'FinTech Startup', bio: 'CFO with experience at Goldman Sachs and now leading finance at a Series B FinTech startup. Expert in financial modeling, fundraising, and FinTech regulations.', languages: ['English', 'Telugu', 'Hindi'], sessionTypes: ['Finance Career', 'VC Pitch Prep', 'FinTech Roadmap'] },
];

// ─── Booking Modal ──────────────────────────────────────────────────────────
const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

const BookingModal = ({ mentor, onClose }: { mentor: Mentor; onClose: () => void }) => {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedType, setSelectedType] = useState(mentor.sessionTypes[0]);
  const [selectedDate, setSelectedDate] = useState('');
  const [step, setStep] = useState<'info' | 'book' | 'confirm'>('info');

  const today = new Date();
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    return d;
  });

  const handleBook = () => {
    if (!selectedDate || !selectedSlot) {
      toast.error('Please select a date and time slot.');
      return;
    }
    setStep('confirm');
  };

  const handleConfirm = () => {
    toast.success(`Session booked with ${mentor.name} on ${selectedDate} at ${selectedSlot}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-2xl bg-card border border-border rounded-2xl overflow-hidden shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative">
          <div className="h-24 bg-gradient-to-r from-green-600 to-emerald-600" />
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="absolute -bottom-10 left-6">
            <img src={mentor.img} alt={mentor.name} className="w-20 h-20 rounded-2xl object-cover border-4 border-card shadow-xl" />
          </div>
        </div>

        <div className="pt-14 px-6 pb-6">
          {step === 'info' && (
            <>
              {/* Mentor Info */}
              <div className="mb-5">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{mentor.name}</h2>
                    <p className="text-muted-foreground text-sm">{mentor.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-500">₹{mentor.price.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">per hour</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 text-sm">
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-semibold text-foreground">{mentor.rating}</span>
                  </span>
                  <span className="text-muted-foreground">{mentor.sessions} sessions completed</span>
                  <span className="text-muted-foreground">{mentor.exp} experience</span>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-5 p-4 bg-muted/50 rounded-xl">
                <p className="text-sm text-muted-foreground leading-relaxed">{mentor.bio}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 bg-muted/40 rounded-xl">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Briefcase className="w-3.5 h-3.5" /> Company
                  </div>
                  <p className="text-sm font-semibold text-foreground">{mentor.company}</p>
                </div>
                <div className="p-3 bg-muted/40 rounded-xl">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <MessageCircle className="w-3.5 h-3.5" /> Languages
                  </div>
                  <p className="text-sm font-semibold text-foreground">{mentor.languages.join(', ')}</p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Skills & Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {mentor.skills.map(s => (
                    <span key={s} className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-medium rounded-full border border-green-500/20">{s}</span>
                  ))}
                </div>
              </div>

              {/* Session Types */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Session Types</p>
                <div className="flex flex-wrap gap-2">
                  {mentor.sessionTypes.map(t => (
                    <span key={t} className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full border border-blue-500/20 flex items-center gap-1">
                      <Video className="w-3 h-3" /> {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {mentor.available ? (
                  <button onClick={() => setStep('book')} className="flex-1 btn-primary py-3 flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" /> Book a Session
                  </button>
                ) : (
                  <div className="flex-1 py-3 bg-muted text-muted-foreground text-center rounded-xl text-sm font-medium cursor-not-allowed">
                    Currently Busy — Check Back Soon
                  </div>
                )}
                <button onClick={onClose} className="px-5 py-3 border border-border rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
                  Close
                </button>
              </div>
            </>
          )}

          {step === 'book' && (
            <>
              <button onClick={() => setStep('info')} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
                ← Back to profile
              </button>
              <h3 className="text-lg font-bold text-foreground mb-1">Book Session with {mentor.name}</h3>
              <p className="text-sm text-muted-foreground mb-5">Select your preferred date, time, and session type</p>

              {/* Session Type */}
              <div className="mb-5">
                <p className="text-sm font-semibold text-foreground mb-2">Session Type</p>
                <div className="flex flex-wrap gap-2">
                  {mentor.sessionTypes.map(t => (
                    <button
                      key={t}
                      onClick={() => setSelectedType(t)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                        selectedType === t
                          ? 'bg-green-500 text-white border-green-500'
                          : 'border-border text-muted-foreground hover:border-green-500 hover:text-green-500'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-5">
                <p className="text-sm font-semibold text-foreground mb-2">Select Date</p>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {dates.map((d, i) => {
                    const label = d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(label)}
                        className={`shrink-0 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all ${
                          selectedDate === label
                            ? 'bg-green-500 text-white border-green-500'
                            : 'border-border text-muted-foreground hover:border-green-500 hover:text-green-500'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-foreground mb-2">Select Time Slot</p>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all ${
                        selectedSlot === slot
                          ? 'bg-green-500 text-white border-green-500'
                          : 'border-border text-muted-foreground hover:border-green-500 hover:text-green-500'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              {selectedDate && selectedSlot && (
                <div className="mb-5 p-4 bg-green-500/8 border border-green-500/20 rounded-xl">
                  <p className="text-sm font-semibold text-foreground mb-1">Session Summary</p>
                  <p className="text-sm text-muted-foreground">{selectedType} · {selectedDate} · {selectedSlot}</p>
                  <p className="text-sm font-bold text-green-500 mt-1">₹{mentor.price.toLocaleString()} (1 hour)</p>
                </div>
              )}

              <button onClick={handleBook} className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" /> Confirm Booking
              </button>
            </>
          )}

          {step === 'confirm' && (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
              <p className="text-muted-foreground text-sm mb-1">Your session with <span className="font-semibold text-foreground">{mentor.name}</span> is scheduled</p>
              <p className="text-green-500 font-semibold mb-1">{selectedDate} · {selectedSlot}</p>
              <p className="text-muted-foreground text-sm mb-6">{selectedType} session · ₹{mentor.price.toLocaleString()}</p>
              <div className="flex gap-3 justify-center">
                <button onClick={handleConfirm} className="btn-primary px-8 py-2.5">
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const Mentors = () => {
  const [activeSpec, setActiveSpec] = useState('All');
  const [search, setSearch] = useState('');
  const [showAvailable, setShowAvailable] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const filtered = mentors.filter(m =>
    (activeSpec === 'All' || m.spec === activeSpec) &&
    (!showAvailable || m.available) &&
    (!search || m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase()))
  );


  return (
    <div className="min-h-screen">
      {/* Booking Modal */}
      {selectedMentor && (
        <BookingModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />
      )}

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
                  <button
                    onClick={() => setSelectedMentor(mentor)}
                    className={`block w-full text-center text-sm font-semibold py-2 rounded-xl transition-all ${mentor.available ? 'btn-primary' : 'bg-muted text-muted-foreground'}`}
                  >
                    {mentor.available ? 'Book Session' : 'Currently Busy'}
                  </button>
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
