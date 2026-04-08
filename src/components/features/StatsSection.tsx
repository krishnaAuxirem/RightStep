import { useEffect, useRef, useState } from 'react';
import { Users, BookOpen, Star, Award } from 'lucide-react';

const stats = [
  { icon: Users, value: 50000, suffix: '+', label: 'Active Learners', color: 'text-green-400' },
  { icon: BookOpen, value: 200, suffix: '+', label: 'Learning Paths', color: 'text-blue-400' },
  { icon: Star, value: 98, suffix: '%', label: 'Satisfaction Rate', color: 'text-yellow-400' },
  { icon: Award, value: 1500, suffix: '+', label: 'Success Stories', color: 'text-purple-400' },
];

const useCounter = (target: number, started: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
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

const StatCard = ({ icon: Icon, value, suffix, label, color, started }: any) => {
  const count = useCounter(value, started);
  return (
    <div className="text-center p-6">
      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-4 ${color}`}>
        <Icon className="w-7 h-7" />
      </div>
      <div className={`text-4xl font-bold text-white mb-2 ${color}`}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  );
};

const StatsSection = () => {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Trusted by <span className="text-gradient">Thousands</span>
          </h2>
          <p className="text-slate-400">Numbers that reflect our commitment to your success</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(stat => (
            <StatCard key={stat.label} {...stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
