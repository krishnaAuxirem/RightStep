import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Users, Star, ChevronRight, Filter, BookOpen } from 'lucide-react';
import learningPathBg from '@/assets/learning-path-bg.jpg';

const categories = ['All', 'Engineering', 'Data Science', 'Product', 'Design', 'Management', 'Finance'];

const paths = [
  { title: 'Software Engineering (SDE)', category: 'Engineering', level: 'Beginner → Expert', duration: '6 months', learners: 12400, rating: 4.9, modules: 24, img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80', color: 'from-blue-500 to-cyan-500', desc: 'Master DSA, System Design, and FAANG interview preparation.' },
  { title: 'Data Science & ML', category: 'Data Science', level: 'Intermediate', duration: '8 months', learners: 9600, rating: 4.8, modules: 32, img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80', color: 'from-purple-500 to-pink-500', desc: 'End-to-end data science from Python basics to ML deployment.' },
  { title: 'Product Management', category: 'Product', level: 'Intermediate', duration: '4 months', learners: 8200, rating: 4.7, modules: 18, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', color: 'from-green-500 to-emerald-500', desc: 'Learn PM fundamentals, product strategy, and case interview prep.' },
  { title: 'UI/UX Design', category: 'Design', level: 'Beginner', duration: '5 months', learners: 6800, rating: 4.9, modules: 20, img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', color: 'from-orange-500 to-red-500', desc: 'Design thinking, Figma mastery, and building a stunning portfolio.' },
  { title: 'DevOps & Cloud', category: 'Engineering', level: 'Advanced', duration: '6 months', learners: 5400, rating: 4.6, modules: 28, img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80', color: 'from-slate-500 to-slate-700', desc: 'AWS, Docker, Kubernetes, CI/CD pipelines, and cloud architecture.' },
  { title: 'Finance & FinTech', category: 'Finance', level: 'Beginner → Advanced', duration: '7 months', learners: 4200, rating: 4.7, modules: 22, img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80', color: 'from-yellow-500 to-orange-500', desc: 'Corporate finance, financial modeling, and breaking into FinTech.' },
  { title: 'Engineering Management', category: 'Management', level: 'Advanced', duration: '4 months', learners: 3100, rating: 4.8, modules: 16, img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80', color: 'from-indigo-500 to-blue-500', desc: 'Lead engineering teams, manage projects, and grow to CTO.' },
  { title: 'Android Development', category: 'Engineering', level: 'Beginner', duration: '5 months', learners: 7600, rating: 4.6, modules: 26, img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80', color: 'from-green-600 to-teal-500', desc: 'Build production-ready Android apps with Kotlin and Jetpack Compose.' },
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
              <p className="text-lg">No paths found for "{search}"</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((path, i) => (
                <div key={i} className="group rounded-2xl overflow-hidden bg-card border border-border card-hover">
                  <div className="relative h-40 overflow-hidden">
                    <img src={path.img} alt={path.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${path.color} opacity-40`} />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 glass text-white text-xs font-medium rounded-full">{path.level}</span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 bg-black/40 text-white text-xs font-medium rounded-full">{path.category}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground mb-2 leading-snug">{path.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-2">{path.desc}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {path.duration}</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {path.modules} modules</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                        <span className="font-medium">{path.rating}</span>
                        <span className="text-muted-foreground">({(path.learners / 1000).toFixed(1)}k)</span>
                      </div>
                    </div>
                    <Link to="/register" className="w-full btn-primary text-sm text-center block py-2">
                      Start Path
                    </Link>
                  </div>
                </div>
              ))}
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
