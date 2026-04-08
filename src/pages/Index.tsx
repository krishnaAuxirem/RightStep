import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Play, CheckCircle, Star, Quote, ChevronRight,
  Target, Map, Users, TrendingUp, BookOpen, Award, Zap, Shield,
  MessageCircle, Clock, Globe, BarChart2, Plus, Minus
} from 'lucide-react';
import HeroSlider from '@/components/features/HeroSlider';
import StatsSection from '@/components/features/StatsSection';
import heroBg from '@/assets/hero-bg.jpg';

const features = [
  { icon: Map, title: 'Structured Paths', desc: 'Step-by-step roadmaps customized for your career goals and current skill level.' },
  { icon: Users, title: 'Expert Mentors', desc: 'Connect 1-on-1 with industry veterans for personalized guidance and feedback.' },
  { icon: Target, title: 'Goal Tracking', desc: 'Set milestones, track daily progress, and celebrate achievements.' },
  { icon: TrendingUp, title: 'Progress Analytics', desc: 'Visual dashboards showing your growth trajectory and areas to improve.' },
  { icon: BookOpen, title: 'Curated Content', desc: 'High-quality resources handpicked by experts for every learning path.' },
  { icon: Zap, title: 'AI Recommendations', desc: 'Smart suggestions that adapt to your pace and learning style.' },
];

const howItWorks = [
  { step: '01', title: 'Create Your Account', desc: 'Sign up and complete a short assessment to understand your current level and goals.' },
  { step: '02', title: 'Choose Your Path', desc: 'Browse curated learning paths or let our system recommend the best fit for you.' },
  { step: '03', title: 'Learn & Practice', desc: 'Work through structured modules, complete tasks, and build real-world skills.' },
  { step: '04', title: 'Track & Grow', desc: 'Monitor progress, book mentor sessions, and advance toward your ultimate goal.' },
];

const learningPaths = [
  { title: 'Software Engineering', level: 'Beginner → Expert', duration: '6 months', learners: '12,400', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80', color: 'from-blue-500 to-cyan-500' },
  { title: 'Product Management', level: 'Intermediate', duration: '4 months', learners: '8,200', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', color: 'from-purple-500 to-pink-500' },
  { title: 'Data Science & AI', level: 'Beginner → Advanced', duration: '8 months', learners: '9,600', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80', color: 'from-green-500 to-emerald-500' },
];

const mentors = [
  { name: 'Rahul Mehta', role: 'Senior SDE @ Google', rating: 4.9, sessions: 240, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&fit=crop&crop=face' },
  { name: 'Dr. Priya Sharma', role: 'ML Engineer @ Microsoft', rating: 4.8, sessions: 189, img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&fit=crop&crop=face' },
  { name: 'Aditya Kumar', role: 'PM @ Flipkart', rating: 5.0, sessions: 312, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop&crop=face' },
];

const testimonials = [
  { name: 'Sneha Patel', role: 'SDE at Amazon', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&q=80&fit=crop&crop=face', text: 'RightStep helped me crack my dream job at Amazon in just 5 months. The structured roadmap and mentor sessions were game-changers.' },
  { name: 'Karthik Nair', role: 'Product Manager at Swiggy', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&fit=crop&crop=face', text: 'The goal tracking feature kept me accountable every single day. I transitioned from engineering to PM in 4 months thanks to RightStep.' },
  { name: 'Ananya Singh', role: 'Data Scientist at Razorpay', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&fit=crop&crop=face', text: "Best investment I've made in my career. The mentors are incredibly experienced and the learning paths are laser-focused." },
];

const pricingPlans = [
  { name: 'Starter', price: 999, period: 'month', color: 'border-border', badge: '', features: ['2 Learning Paths', 'Goal Tracking', 'Community Access', 'Email Support', '5 AI Recommendations'] },
  { name: 'Pro', price: 2499, period: 'month', color: 'border-green-500', badge: 'Most Popular', features: ['Unlimited Learning Paths', '2 Mentor Sessions/month', 'Advanced Analytics', 'Priority Support', 'Unlimited AI Recommendations', 'Certificates'] },
  { name: 'Elite', price: 5999, period: 'month', color: 'border-blue-500', badge: 'Best Value', features: ['Everything in Pro', '8 Mentor Sessions/month', 'Dedicated Career Coach', '1-on-1 Resume Review', 'Interview Prep', 'Job Placement Support'] },
];

const blogPosts = [
  { title: 'How to Create a 6-Month Career Roadmap', cat: 'Career', date: 'Mar 28', img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&q=80', read: '5 min' },
  { title: '10 Skills Every Software Engineer Needs in 2025', cat: 'Tech', date: 'Mar 22', img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80', read: '7 min' },
  { title: 'Mentor or Self-Learn? Here\'s the Truth', cat: 'Mentorship', date: 'Mar 15', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80', read: '4 min' },
];

const faqs = [
  { q: 'How do I get started on RightStep?', a: 'Simply register, complete a short onboarding assessment, and we will recommend the best learning path for your goals. The whole process takes under 10 minutes.' },
  { q: 'Can I switch learning paths mid-way?', a: 'Absolutely. You can pause or switch learning paths anytime. Your progress is saved and you can always return to a path later.' },
  { q: 'How are mentors verified?', a: 'Every mentor on RightStep goes through a rigorous vetting process including credential verification, background checks, and a trial session review.' },
  { q: 'Is there a free trial available?', a: 'Yes! You get 14 days free on any paid plan. No credit card required to start your trial.' },
  { q: 'How are pricing plans billed?', a: 'Plans are billed monthly or annually (save 20%). You can cancel anytime without any penalty.' },
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient opacity-90" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="animate-slide-in-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                India's #1 Career Growth Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Take the{' '}
                <span className="text-gradient">Right Steps</span>
                {' '}Toward Your Dream Career
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
                Structured learning paths, expert mentorship, and goal tracking — everything you need to accelerate your career and personal growth journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link to="/register" className="btn-primary flex items-center justify-center gap-2 text-base">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/features" className="btn-secondary flex items-center justify-center gap-2 text-base border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  <Play className="w-5 h-5" /> Watch Demo
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {['No credit card', '14-day free trial', 'Cancel anytime'].map(t => (
                  <div key={t} className="flex items-center gap-1.5 text-slate-400 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Slider */}
            <div className="animate-slide-in-right hidden md:block">
              <div className="h-[480px] lg:h-[520px]">
                <HeroSlider />
              </div>
              {/* Floating cards */}
              <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-3 animate-float hidden lg:flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">Goal Achieved!</p>
                  <p className="text-slate-300 text-xs">Software Engineer @ Google</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 74.7C120 69.3 240 58.7 360 58.7C480 58.7 600 69.3 720 74.7C840 80 960 80 1080 74.7C1200 69.3 1320 58.7 1380 53.3L1440 48V80H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-green-500 text-sm font-semibold uppercase tracking-widest">Why RightStep</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-4">
              Everything You Need to <span className="text-gradient">Succeed</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A complete ecosystem designed to take you from where you are to where you want to be — step by step.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="group p-6 bg-card border border-border rounded-2xl card-hover">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
                  <f.icon className="w-6 h-6 text-green-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-green-500 text-sm font-semibold uppercase tracking-widest">Process</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-4">
              How <span className="text-gradient">RightStep</span> Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Four simple steps to accelerate your career growth journey</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, i) => (
              <div key={i} className="relative text-center">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-green-500/50 to-transparent" />
                )}
                <div className="relative z-10 inline-flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg shadow-green-500/25">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-green-500 text-sm font-semibold uppercase tracking-widest">Explore</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">
                Popular <span className="text-gradient">Learning Paths</span>
              </h2>
            </div>
            <Link to="/learning-paths" className="flex items-center gap-2 text-green-500 font-medium hover:gap-3 transition-all">
              View all paths <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {learningPaths.map((path, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden bg-card border border-border card-hover">
                <div className="relative h-48 overflow-hidden">
                  <img src={path.img} alt={path.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${path.color} opacity-40`} />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 glass text-white text-xs font-medium rounded-full">{path.level}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground text-lg mb-3">{path.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {path.duration}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {path.learners} learners</span>
                  </div>
                  <Link to="/learning-paths" className="w-full btn-primary text-sm text-center block">
                    Start Path
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Mentors */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-green-500 text-sm font-semibold uppercase tracking-widest">Mentorship</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">
                Learn from <span className="text-gradient">Industry Leaders</span>
              </h2>
            </div>
            <Link to="/mentors" className="flex items-center gap-2 text-green-500 font-medium hover:gap-3 transition-all">
              Meet all mentors <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {mentors.map((mentor, i) => (
              <div key={i} className="p-6 bg-card border border-border rounded-2xl card-hover text-center">
                <img src={mentor.img} alt={mentor.name} className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4 shadow-lg" />
                <h3 className="font-bold text-foreground mb-1">{mentor.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{mentor.role}</p>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-yellow-400 text-sm">
                    <Star className="w-4 h-4 fill-current" /> {mentor.rating}
                  </div>
                  <div className="text-muted-foreground text-sm">{mentor.sessions} sessions</div>
                </div>
                <Link to="/mentors" className="btn-secondary text-sm w-full block text-center">
                  Book Session
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-400 text-sm font-semibold uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-2 mb-3">
              Success <span className="text-gradient">Stories</span>
            </h2>
            <p className="text-slate-400">Real results from real people</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass rounded-2xl p-6">
                <Quote className="w-8 h-8 text-green-400 mb-4" />
                <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-current" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-500 text-sm font-semibold uppercase tracking-widest">Pricing</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-3">
              Simple, <span className="text-gradient">Transparent</span> Pricing
            </h2>
            <p className="text-muted-foreground">Invest in your growth — choose a plan that fits your journey</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <div key={i} className={`relative p-6 bg-card rounded-2xl border-2 ${plan.color} ${i === 1 ? 'scale-105 shadow-xl shadow-green-500/10' : ''} card-hover`}>
                {plan.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white ${i === 1 ? 'bg-green-500' : 'bg-blue-500'}`}>
                    {plan.badge}
                  </div>
                )}
                <h3 className="font-bold text-foreground text-lg mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-foreground">₹{plan.price.toLocaleString()}</span>
                  <span className="text-muted-foreground text-sm">/{plan.period}</span>
                </div>
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className={`block text-center font-semibold py-2.5 rounded-xl transition-all ${i === 1 ? 'bg-green-500 text-white hover:bg-green-400' : 'border-2 border-border text-foreground hover:border-green-500 hover:text-green-500'}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-green-500 text-sm font-semibold uppercase tracking-widest">Insights</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">
                Latest from the <span className="text-gradient">Blog</span>
              </h2>
            </div>
            <Link to="/blog" className="flex items-center gap-2 text-green-500 font-medium hover:gap-3 transition-all">
              Read all articles <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <Link to="/blog" key={i} className="group rounded-2xl overflow-hidden bg-card border border-border card-hover block">
                <div className="h-44 overflow-hidden">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">{post.cat}</span>
                    <span className="text-muted-foreground text-xs">{post.date}</span>
                    <span className="text-muted-foreground text-xs ml-auto">{post.read} read</span>
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-green-500 transition-colors leading-snug">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-500 text-sm font-semibold uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-3">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-foreground pr-4">{faq.q}</span>
                  {openFaq === i ? <Minus className="w-5 h-5 text-green-500 shrink-0" /> : <Plus className="w-5 h-5 text-green-500 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center">
          <Globe className="w-12 h-12 text-white/80 mx-auto mb-4" />
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Ready to Take Your First Right Step?
          </h2>
          <p className="text-green-50 text-lg mb-8 max-w-xl mx-auto">
            Join over 50,000 professionals who are actively growing their careers with RightStep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl">
              Start Free Trial — 14 Days
            </Link>
            <Link to="/mentors" className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
              Browse Mentors
            </Link>
          </div>
          <p className="text-green-100 text-sm mt-4">No credit card required • Cancel anytime</p>
        </div>
      </section>
    </div>
  );
};

export default Index;
