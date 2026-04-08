import { Link } from 'react-router-dom';
import {
  Map, Target, Users, TrendingUp, BookOpen, Zap, Bell, Shield,
  BarChart2, Calendar, MessageCircle, Award, ChevronRight, Check
} from 'lucide-react';

const features = [
  {
    icon: Map, title: 'Structured Learning Paths', color: 'from-green-500 to-emerald-500',
    desc: 'Career-specific roadmaps with step-by-step milestones. No more guessing what to learn next.',
    benefits: ['Personalized roadmaps', 'Industry-aligned content', 'Auto-updated paths', 'Progress milestones'],
    img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&q=80'
  },
  {
    icon: Users, title: 'Expert Mentorship', color: 'from-blue-500 to-cyan-500',
    desc: 'Book 1-on-1 sessions with verified professionals from top companies.',
    benefits: ['Verified mentors', 'Flexible scheduling', 'Session recordings', 'Follow-up support'],
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80'
  },
  {
    icon: Target, title: 'Goal Tracking', color: 'from-purple-500 to-pink-500',
    desc: 'Set SMART goals, break them into daily tasks, and watch your progress compound.',
    benefits: ['SMART goal framework', 'Daily task breakdown', 'Milestone celebrations', 'Deadline reminders'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80'
  },
  {
    icon: BarChart2, title: 'Progress Analytics', color: 'from-orange-500 to-red-500',
    desc: 'Detailed insights into your learning velocity, streak performance, and skill gaps.',
    benefits: ['Visual dashboards', 'Skill gap analysis', 'Performance trends', 'Competitive benchmarks'],
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80'
  },
];

const additionalFeatures = [
  { icon: Bell, title: 'Smart Notifications', desc: 'Never miss a task, session, or milestone with intelligent reminders.' },
  { icon: Shield, title: 'Verified Mentors', desc: 'Every mentor is manually vetted, background-checked, and quality-assessed.' },
  { icon: Zap, title: 'AI Recommendations', desc: 'Get content and resource suggestions personalized to your learning style.' },
  { icon: Calendar, title: 'Session Scheduler', desc: 'Easy calendar integration to book and manage your mentor sessions.' },
  { icon: MessageCircle, title: 'Community Forums', desc: 'Discuss, collaborate, and network with thousands of like-minded learners.' },
  { icon: Award, title: 'Certificates', desc: 'Earn verifiable certificates to showcase your achievements to employers.' },
];

const Features = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-80 h-80 bg-green-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full text-sm font-medium mb-4">Platform Features</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Built for <span className="text-gradient">Real Growth</span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto">
            Every feature is designed with one goal: to help you take structured, effective steps toward your career goals.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto space-y-24">
          {features.map((f, i) => (
            <div key={i} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
              <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} mb-5`}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">{f.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{f.desc}</p>
                <ul className="space-y-2.5 mb-6">
                  {f.benefits.map(b => (
                    <li key={b} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-green-500 shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="btn-primary inline-flex items-center gap-2">
                  Try it free <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className={i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <img
                  src={f.img}
                  alt={f.title}
                  className="w-full rounded-2xl shadow-2xl object-cover h-72 lg:h-80"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Features */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">And Much More</h2>
            <p className="text-muted-foreground">Everything you need in one focused platform</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((f, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 card-hover group">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500 transition-colors">
                  <f.icon className="w-6 h-6 text-green-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start Using All Features Free</h2>
          <p className="text-green-50 mb-8">14-day free trial. No credit card required.</p>
          <Link to="/register" className="inline-block px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 transition-colors">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;
