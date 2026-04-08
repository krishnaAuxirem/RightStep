import { useEffect, useRef, useState } from 'react';
import { Users, BookOpen, Star, Award } from 'lucide-react';

const stats = [
  { icon: Users, value: 50000, suffix: '+', label: 'Active Learners', sub: 'students & professionals', color: 'text-green-400', glow: 'bg-green-500/20' },
  { icon: BookOpen, value: 200, suffix: '+', label: 'Learning Paths', sub: 'expertly crafted', color: 'text-blue-400', glow: 'bg-blue-500/20' },
  { icon: Star, value: 98, suffix: '%', label: 'Satisfaction Rate', sub: 'from learner reviews', color: 'text-yellow-400', glow: 'bg-yellow-500/20' },
  { icon: Award, value: 1500, suffix: '+', label: 'Success Stories', sub: 'careers transformed', color: 'text-purple-400', glow: 'bg-purple-500/20' },
];

const useCounter = (target: number, started: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const duration = 2200;
    const steps = 70;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target, started]);
  return count;
};

const StatCard = ({ icon: Icon, value, suffix, label, sub, color, glow, started }: any) => {
  const count = useCounter(value, started);
  return (
    <div className="relative group text-center p-8">
      {/* Divider (not on last) */}
      <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-slate-700/50 to-transparent hidden lg:block last:hidden" />

      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${glow} border border-white/8 mb-5 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>

      <div className={`text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight ${color}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
        {count.toLocaleString()}{suffix}
      </div>

      <div className="text-white font-semibold text-base mb-1">{label}</div>
      <div className="text-slate-500 text-sm">{sub}</div>
    </div>
  );
};

const StatsSection = () => {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden py-4">
      {/* Deep dark with subtle green tint */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #060D1A 0%, #0A1628 50%, #060D1A 100%)' }} />
      {/* Top/bottom border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/25 to-transparent" />
      {/* Subtle radial glow */}
      <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(34,197,94,0.06) 0%, transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 pt-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            Trusted by <span className="text-gradient">Thousands</span> Across India
          </h2>
          <p className="text-slate-500 text-sm">Numbers that reflect our commitment to your success</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-800/60 border border-slate-800/60 rounded-2xl overflow-hidden bg-slate-900/30 backdrop-blur-sm mb-10">
          {stats.map(stat => (
            <StatCard key={stat.label} {...stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
