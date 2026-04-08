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
      <section className="relative min-h-screen flex items-center overflow-hidden noise-overlay">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={heroBg} alt="Hero" className="w-full h-full object-cover scale-105" />
          <div className="absolute inset-0 hero-gradient opacity-95" />
          {/* Radial glow spots */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div className="animate-slide-in-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold mb-7 border border-green-500/30 bg-green-500/10 backdrop-blur-sm text-green-400" style={{ letterSpacing: '0.04em' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                INDIA'S #1 CAREER GROWTH PLATFORM
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-6 tracking-tight">
                Take the{' '}
                <span className="text-shimmer">Right Steps</span>
                <br className="hidden sm:block" />
                {' '}Toward Your
                <br />
                Dream Career
              </h1>

              <p className="text-lg text-slate-300/90 leading-relaxed mb-9 max-w-lg">
                Structured learning paths, expert mentorship, and goal tracking — everything you need to accelerate your career and personal growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link to="/register" className="btn-primary flex items-center justify-center gap-2 text-base px-7 py-3.5">
                  Start Free Trial <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/features" className="flex items-center justify-center gap-2 text-base font-semibold px-6 py-3.5 rounded-xl border border-white/20 text-white/90 hover:bg-white/10 hover:border-white/40 transition-all duration-200 backdrop-blur-sm">
                  <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 ml-0.5" />
                  </div>
                  Watch Demo
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  { icon: CheckCircle, label: 'No credit card' },
                  { icon: CheckCircle, label: '14-day free trial' },
                  { icon: CheckCircle, label: 'Cancel anytime' },
                ].map(t => (
                  <div key={t.label} className="flex items-center gap-1.5 text-slate-400 text-sm">
                    <t.icon className="w-3.5 h-3.5 text-green-400" />
                    {t.label}
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                <div className="flex -space-x-2.5">
                  {[
                    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
                  ].map((src, i) => (
                    <img key={i} src={src} alt="" className="w-9 h-9 rounded-full border-2 border-slate-900 object-cover" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-400 text-xs">Loved by <span className="text-white font-semibold">50,000+</span> professionals</p>
                </div>
              </div>
            </div>

            {/* Right - Slider */}
            <div className="animate-slide-in-right hidden md:block relative">
              {/* Glow behind slider */}
              <div className="absolute inset-0 bg-green-500/8 rounded-3xl blur-2xl scale-110" />
              <div className="relative h-[480px] lg:h-[530px]">
                <HeroSlider />
              </div>

              {/* Floating card - bottom left */}
              <div className="absolute -bottom-5 -left-8 glass-card rounded-2xl p-3.5 animate-float hidden lg:flex items-center gap-3 border border-white/10 shadow-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold">Goal Achieved!</p>
                  <p className="text-slate-300 text-xs">Software Engineer @ Google</p>
                </div>
              </div>

              {/* Floating card - top right */}
              <div className="absolute -top-4 -right-6 glass-card rounded-2xl p-3 animate-float-delayed hidden lg:flex items-center gap-2.5 border border-white/10 shadow-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold">+340%</p>
                  <p className="text-slate-300 text-[10px]">Skill Growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 100L48 91.3C96 82.7 192 65.3 288 61.3C384 57.3 480 65.7 576 70.3C672 75 768 75 864 68.3C960 61.7 1056 48.3 1152 44.7C1248 41 1344 47 1392 50L1440 53V100H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 dot-pattern opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-48 spotlight" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge-green mb-4 mx-auto">Why RightStep</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-4 mb-4">
              Everything You Need to{' '}
              <span className="text-gradient">Succeed</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              A complete ecosystem designed to take you from where you are to where you want to be.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="group relative p-6 bg-card border border-border rounded-2xl card-premium overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-500/3 group-hover:to-emerald-500/5 transition-all duration-500 rounded-2xl" />
                {/* Icon */}
                <div className="relative w-12 h-12 mb-5">
                  <div className="absolute inset-0 bg-green-500/15 rounded-xl blur-sm group-hover:blur-md transition-all" />
                  <div className="relative w-12 h-12 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/20 border border-green-500/20 rounded-xl flex items-center justify-center group-hover:border-green-500/40 transition-colors">
                    <f.icon className="w-5.5 h-5.5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2 text-base tracking-tight">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-500/5 to-transparent rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-muted/40 to-muted/20" />
        <div className="absolute inset-0 grid-pattern opacity-40" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge-green mb-4 mx-auto">Process</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-4 mb-4">
              How <span className="text-gradient">RightStep</span> Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Four simple steps to accelerate your career growth journey</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <div key={i} className="relative">
                {/* Connector line */}
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:flex absolute top-8 left-[calc(50%+2rem)] right-0 items-center z-0">
                    <div className="flex-1 h-px bg-gradient-to-r from-green-500/40 to-border" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/40 shrink-0" />
                  </div>
                )}
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Step number */}
                  <div className="relative mb-5">
                    <div className="absolute inset-0 bg-green-500/25 rounded-2xl blur-lg" />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg" style={{ boxShadow: '0 8px 24px rgb(34 197 94 / 0.3)' }}>
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-base">{step.title}</h3>
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
      <section className="section-padding relative overflow-hidden noise-overlay">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #060D1A 0%, #0A1A3D 40%, #061C16 70%, #080E22 100%)' }} />
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-green-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-blue-600/8 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-green-500/25 bg-green-500/10 text-green-400 mb-4" style={{ letterSpacing: '0.04em' }}>
              Testimonials
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-4 mb-3">
              Real <span className="text-gradient">Success</span> Stories
            </h2>
            <p className="text-slate-400 text-lg">From students to top companies — real transformations</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover:-translate-y-1" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                {/* Stars first */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="w-7 h-7 text-green-400/60 mb-3" />
                <p className="text-slate-300 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-xl object-cover ring-2 ring-green-500/20" />
                  <div>
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 spotlight" />

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="badge-green mb-4 mx-auto">Pricing</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-4 mb-3">
              Simple, <span className="text-gradient">Transparent</span> Pricing
            </h2>
            <p className="text-muted-foreground text-lg">Invest in your growth — choose a plan that fits your journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-start">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                  i === 1
                    ? 'border-green-500 shadow-2xl shadow-green-500/15 md:-mt-4 md:mb-4'
                    : 'border-border hover:border-green-500/40 hover:shadow-xl hover:shadow-black/5'
                }`}
              >
                {/* Popular card bg */}
                {i === 1 && (
                  <div className="absolute inset-0 bg-gradient-to-b from-green-500/4 to-transparent" />
                )}

                {/* Badge */}
                {plan.badge && (
                  <div className={`absolute top-0 left-0 right-0 text-center py-1.5 text-xs font-bold tracking-wide text-white ${
                    i === 1
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                  }`}>
                    ★ {plan.badge}
                  </div>
                )}

                <div className={`relative p-6 bg-card ${plan.badge ? 'pt-10' : ''}`}>
                  <div className="mb-5">
                    <h3 className="font-bold text-foreground text-lg mb-1">{plan.name}</h3>
                    <p className="text-muted-foreground text-xs">Per user, billed monthly</p>
                  </div>

                  <div className="mb-6 pb-6 border-b border-border">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold text-foreground tracking-tight">₹{plan.price.toLocaleString()}</span>
                      <span className="text-muted-foreground text-sm mb-1">/ {plan.period}</span>
                    </div>
                    {i === 1 && (
                      <p className="text-green-500 text-xs font-medium mt-1">Save 20% with annual billing</p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-7">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <div className="w-4 h-4 rounded-full bg-green-500/15 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle className="w-2.5 h-2.5 text-green-500" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/register"
                    className={`block text-center font-semibold py-3 rounded-xl transition-all duration-200 text-sm ${
                      i === 1
                        ? 'btn-primary'
                        : 'border-2 border-border text-foreground hover:border-green-500 hover:text-green-500 hover:bg-green-500/5'
                    }`}
                  >
                    Get Started →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-muted-foreground text-sm mt-8">
            All plans include a 14-day free trial. No credit card required.
          </p>
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
      <section className="relative overflow-hidden noise-overlay">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #14532d 0%, #166534 40%, #15803d 70%, #16a34a 100%)' }} />
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 grid-pattern opacity-10" />

        <div className="relative section-padding">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon */}
            <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/20">
              <Globe className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
              Ready to Take Your
              <br />
              First Right Step?
            </h2>
            <p className="text-green-100/90 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join over 50,000 professionals who are actively growing their careers with RightStep.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-all duration-200 shadow-xl shadow-black/20 hover:shadow-2xl hover:-translate-y-0.5 text-base"
              >
                Start Free Trial — 14 Days
              </Link>
              <Link
                to="/mentors"
                className="px-8 py-4 bg-white/10 border border-white/25 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/40 transition-all duration-200 backdrop-blur-sm text-base"
              >
                Browse Mentors →
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-green-100/70 text-sm">
              {['No credit card required', 'Cancel anytime', '14-day free trial'].map(item => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-green-300" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
