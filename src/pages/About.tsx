import { Link } from 'react-router-dom';
import { Target, Users, Heart, Globe, Award, TrendingUp, Linkedin, Twitter } from 'lucide-react';

const team = [
  { name: 'Arjun Sharma', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80&fit=crop&crop=face', linkedin: '#', twitter: '#' },
  { name: 'Kavya Menon', role: 'Head of Product', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80&fit=crop&crop=face', linkedin: '#', twitter: '#' },
  { name: 'Rohan Gupta', role: 'CTO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80&fit=crop&crop=face', linkedin: '#', twitter: '#' },
  { name: 'Ananya Iyer', role: 'Head of Mentorship', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80&fit=crop&crop=face', linkedin: '#', twitter: '#' },
];

const values = [
  { icon: Target, title: 'Purpose-Driven', desc: 'Every feature we build serves a single purpose: helping you grow faster.' },
  { icon: Heart, title: 'People First', desc: 'We believe every person deserves the guidance to reach their full potential.' },
  { icon: Globe, title: 'Accessible', desc: 'Quality career guidance should be available to everyone, everywhere in India.' },
  { icon: Award, title: 'Excellence', desc: 'We partner only with the best mentors and create world-class content.' },
];

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-green-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full text-sm font-medium mb-4">About Us</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            We're On a Mission to Make <span className="text-gradient">Career Growth</span> Accessible
          </h1>
          <p className="text-slate-300 text-xl leading-relaxed max-w-2xl mx-auto">
            RightStep was born from a simple belief — everyone deserves a clear, guided path to the career they dream of.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-green-500 text-sm font-semibold uppercase tracking-widest">Our Story</span>
              <h2 className="text-3xl font-bold text-foreground mt-2 mb-4">Started From a Problem We Lived</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>In 2023, our founder Arjun Sharma was struggling to break into top tech companies despite having strong fundamentals. The problem wasn't skill — it was direction. There were thousands of resources but no structured, personalized guidance.</p>
                <p>After cracking FAANG with the help of a mentor, he realized this guidance shouldn't be a privilege. He built RightStep to give every student and professional the structured roadmap and mentorship that changed his career.</p>
                <p>Today, RightStep serves over 50,000 learners across India, helping them make the right steps toward their goals every single day.</p>
              </div>
              <Link to="/register" className="btn-primary inline-flex items-center gap-2 mt-6">
                Join Our Community
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
                alt="Our story"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white p-4 rounded-2xl shadow-xl">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-green-100">Learners Empowered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-500 text-sm font-semibold uppercase tracking-widest">Values</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">What Drives Us</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center card-hover">
                <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-green-500" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-500 text-sm font-semibold uppercase tracking-widest">Team</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">The People Behind RightStep</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden card-hover group">
                <div className="aspect-square overflow-hidden">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground">{member.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{member.role}</p>
                  <div className="flex gap-2">
                    <a href={member.linkedin} className="w-8 h-8 bg-muted hover:bg-blue-500 rounded-lg flex items-center justify-center text-muted-foreground hover:text-white transition-all">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a href={member.twitter} className="w-8 h-8 bg-muted hover:bg-sky-400 rounded-lg flex items-center justify-center text-muted-foreground hover:text-white transition-all">
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Take Your Right Step?</h2>
          <p className="text-green-50 mb-8">Join the community of driven professionals building their dream careers.</p>
          <Link to="/register" className="inline-block px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 transition-colors">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
