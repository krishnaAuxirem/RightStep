import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Users, Star, BookOpen, Code2, BarChart2, Briefcase, Palette, Settings, DollarSign, Smartphone, Award, TrendingUp, Zap } from 'lucide-react';
import learningPathBg from '@/assets/learning-path-bg.jpg';

const categories = ['All', 'Engineering', 'Data Science', 'Product', 'Design', 'Management', 'Finance'];

const categoryMeta: Record<string, { icon: any; accent: string; accentBg: string }> = {
  Engineering: { icon: Code2, accent: 'text-blue-400', accentBg: 'bg-blue-500' },
  'Data Science': { icon: BarChart2, accent: 'text-purple-400', accentBg: 'bg-purple-500' },
  Product: { icon: Briefcase, accent: 'text-green-400', accentBg: 'bg-green-500' },
  Design: { icon: Palette, accent: 'text-orange-400', accentBg: 'bg-orange-500' },
  Management: { icon: Settings, accent: 'text-indigo-400', accentBg: 'bg-indigo-500' },
  Finance: { icon: DollarSign, accent: 'text-yellow-400', accentBg: 'bg-yellow-500' },
};

const paths = [
  { title: 'Software Engineering (SDE)', category: 'Engineering', level: 'Beginner → Expert', duration: '6 months', learners: 12400, rating: 4.9, modules: 24, img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80', gradient: 'from-blue-600/80 via-blue-900/60 to-slate-900/90', accentColor: '#3B82F6', desc: 'Master DSA, System Design, and FAANG interview preparation.', skills: ['DSA', 'System Design', 'FAANG'], jobRate: 94 },
  { title: 'Data Science & ML', category: 'Data Science', level: 'Intermediate', duration: '8 months', learners: 9600, rating: 4.8, modules: 32, img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80', gradient: 'from-purple-600/80 via-purple-900/60 to-slate-900/90', accentColor: '#A855F7', desc: 'End-to-end data science from Python basics to ML deployment.', skills: ['Python', 'ML', 'Deep Learning'], jobRate: 89 },
  { title: 'Product Management', category: 'Product', level: 'Intermediate', duration: '4 months', learners: 8200, rating: 4.7, modules: 18, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', gradient: 'from-green-600/80 via-green-900/60 to-slate-900/90', accentColor: '#22C55E', desc: 'Learn PM fundamentals, product strategy, and case interview prep.', skills: ['Strategy', 'Case Studies', 'Analytics'], jobRate: 86 },
  { title: 'UI/UX Design', category: 'Design', level: 'Beginner', duration: '5 months', learners: 6800, rating: 4.9, modules: 20, img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', gradient: 'from-orange-600/80 via-orange-900/60 to-slate-900/90', accentColor: '#F97316', desc: 'Design thinking, Figma mastery, and building a stunning portfolio.', skills: ['Figma', 'UX Research', 'Prototyping'], jobRate: 91 },
  { title: 'DevOps & Cloud', category: 'Engineering', level: 'Advanced', duration: '6 months', learners: 5400, rating: 4.6, modules: 28, img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80', gradient: 'from-slate-600/80 via-slate-800/60 to-slate-900/90', accentColor: '#64748B', desc: 'AWS, Docker, Kubernetes, CI/CD pipelines, and cloud architecture.', skills: ['AWS', 'Docker', 'Kubernetes'], jobRate: 92 },
  { title: 'Finance & FinTech', category: 'Finance', level: 'Beginner → Advanced', duration: '7 months', learners: 4200, rating: 4.7, modules: 22, img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80', gradient: 'from-yellow-600/80 via-yellow-900/60 to-slate-900/90', accentColor: '#EAB308', desc: 'Corporate finance, financial modeling, and breaking into FinTech.', skills: ['Financial Modeling', 'Valuation', 'FinTech'], jobRate: 83 },
  { title: 'Engineering Management', category: 'Management', level: 'Advanced', duration: '4 months', learners: 3100, rating: 4.8, modules: 16, img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80', gradient: 'from-indigo-600/80 via-indigo-900/60 to-slate-900/90', accentColor: '#6366F1', desc: 'Lead engineering teams, manage projects, and grow to CTO.', skills: ['People Mgmt', 'Roadmapping', 'Hiring'], jobRate: 88 },
  { title: 'Android Development', category: 'Engineering', level: 'Beginner', duration: '5 months', learners: 7600, rating: 4.6, modules: 26, img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80', gradient: 'from-teal-600/80 via-teal-900/60 to-slate-900/90', accentColor: '#14B8A6', desc: 'Build production-ready Android apps with Kotlin and Jetpack Compose.', skills: ['Kotlin', 'Jetpack', 'Compose'], jobRate: 87 },
];

const LearningPaths = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = paths.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    (!search || p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={learningPathBg} alt="Learning Paths" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient opacity-90" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full text-sm font-medium mb-4">Learning Paths</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Path to <span className="text-gradient">Career Success</span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-8">
            Structured, expert-curated learning paths for every career goal. Start where you are, go where you want.
          </p>
          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search learning paths..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-slate-400 focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-background border-b border-border sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Paths Grid */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground"><span className="font-semibold text-foreground">{filtered.length}</span> paths found</p>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p className="text-lg">No paths found for &ldquo;{search}&rdquo;</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((path, i) => {
                const meta = categoryMeta[path.category] || { icon: BookOpen, accent: 'text-green-400', accentBg: 'bg-green-500' };
                const CatIcon = meta.icon;
                return (
                  <div key={i} className="group relative rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 hover:border-transparent" style={{ '--accent': path.accentColor } as any}>
                    {/* Left accent bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300 group-hover:w-1.5" style={{ background: path.accentColor }} />

                    {/* Image area */}
                    <div className="relative h-44 overflow-hidden">
                      <img src={path.img} alt={path.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className={`absolute inset-0 bg-gradient-to-b ${path.gradient}`} />

                      {/* Category icon badge */}
                      <div className="absolute top-3 left-4 flex items-center gap-1.5">
                        <div className="w-7 h-7 rounded-lg bg-black/40 backdrop-blur-sm border border-white/15 flex items-center justify-center">
                          <CatIcon className={`w-3.5 h-3.5 ${meta.accent}`} />
                        </div>
                        <span className="text-white text-xs font-semibold bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">{path.level}</span>
                      </div>

                      {/* Category label top right */}
                      <div className="absolute top-3 right-3">
                        <span className="text-white text-xs font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">{path.category}</span>
                      </div>

                      {/* Job rate - bottom of image */}
                      <div className="absolute bottom-3 left-4 right-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white/70 text-[10px] font-medium">Job Placement Rate</span>
                          <span className="font-bold text-xs" style={{ color: path.accentColor }}>{path.jobRate}%</span>
                        </div>
                        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${path.jobRate}%`, background: path.accentColor }} />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 pl-5">
                      <h3 className="font-bold text-foreground mb-1.5 leading-snug text-sm group-hover:text-green-500 transition-colors">{path.title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">{path.desc}</p>

                      {/* Skill tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {path.skills.map(s => (
                          <span key={s} className="px-2 py-0.5 text-[10px] font-medium rounded-md border" style={{ color: path.accentColor, borderColor: `${path.accentColor}30`, background: `${path.accentColor}0F` }}>{s}</span>
                        ))}
                      </div>

                      {/* Meta row */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {path.duration}</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {path.modules} mods</span>
                        <span className="flex items-center gap-1 ml-auto">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="font-semibold text-foreground">{path.rating}</span>
                        </span>
                      </div>

                      {/* Learners mini bar */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex -space-x-1.5 shrink-0">
                          {[40, 41, 42].map(n => (
                            <img key={n} src={`https://i.pravatar.cc/20?img=${n}`} className="w-5 h-5 rounded-full border border-card object-cover" alt="" />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{(path.learners / 1000).toFixed(1)}k enrolled</span>
                      </div>

                      <Link to="/register" className="flex w-full items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 text-white" style={{ background: path.accentColor }}>
                        Start Path <Zap className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Can't Find Your Path?</h2>
          <p className="text-green-50 mb-8">Tell us your goal and we'll create a custom learning path just for you.</p>
          <Link to="/contact" className="inline-block px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 transition-colors">
            Request a Custom Path
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LearningPaths;
