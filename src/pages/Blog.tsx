import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, ChevronRight, Tag, TrendingUp, BookOpen } from 'lucide-react';

const categories = ['All', 'Career', 'Tech', 'Mentorship', 'Skills', 'Productivity', 'Interview'];

const posts = [
  {
    id: 1, title: 'How to Create a 6-Month Career Roadmap That Actually Works',
    cat: 'Career', date: 'March 28, 2025', read: '5 min', views: 1240, featured: true,
    img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80',
    author: { name: 'Arjun Sharma', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&q=80&fit=crop&crop=face', role: 'Founder, RightStep' },
    excerpt: 'A career roadmap without structure is just wishful thinking. Here is how to create one that drives real results in 6 months.',
  },
  {
    id: 2, title: '10 Skills Every Software Engineer Must Have in 2025',
    cat: 'Tech', date: 'March 22, 2025', read: '7 min', views: 3850, featured: false,
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    author: { name: 'Rahul Mehta', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80&fit=crop&crop=face', role: 'SDE @ Google' },
    excerpt: 'The software landscape is evolving fast. Here are the 10 skills that top companies are looking for in 2025.',
  },
  {
    id: 3, title: 'Mentor or Self-Learn? The Honest Answer Nobody Gives',
    cat: 'Mentorship', date: 'March 15, 2025', read: '4 min', views: 2100, featured: false,
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    author: { name: 'Dr. Priya Sharma', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&q=80&fit=crop&crop=face', role: 'ML Engineer @ Microsoft' },
    excerpt: 'The debate has been going on for years. We break down exactly when self-learning wins, and when mentorship is essential.',
  },
  {
    id: 4, title: 'The Deep Work Method: How to Study 3x More Effectively',
    cat: 'Productivity', date: 'March 10, 2025', read: '6 min', views: 1680, featured: false,
    img: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=600&q=80',
    author: { name: 'Ananya Iyer', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&q=80&fit=crop&crop=face', role: 'VP Engineering' },
    excerpt: 'Deep work principles applied to skill development. Stop studying for hours, start studying smart.',
  },
  {
    id: 5, title: 'FAANG Interview Prep: A Complete 3-Month Plan',
    cat: 'Interview', date: 'March 5, 2025', read: '9 min', views: 5200, featured: false,
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=600&q=80',
    author: { name: 'Rahul Mehta', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80&fit=crop&crop=face', role: 'SDE @ Google' },
    excerpt: 'The exact plan I used to get offers from Google, Amazon, and Microsoft — broken down week by week.',
  },
  {
    id: 6, title: 'From Engineer to Product Manager: My Transition Story',
    cat: 'Career', date: 'February 28, 2025', read: '5 min', views: 1920, featured: false,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    author: { name: 'Aditya Kumar', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80&fit=crop&crop=face', role: 'PM @ Flipkart' },
    excerpt: 'After 4 years as a software engineer, I made the leap to product management. Here is everything I learned.',
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const featured = posts[0];
  const filtered = posts.slice(1).filter(p =>
    (activeCategory === 'All' || p.cat === activeCategory) &&
    (!search || p.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-28 hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full text-sm font-medium mb-4">Blog & Insights</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Career Wisdom from <span className="text-gradient">Industry Experts</span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-8">Actionable career advice, learning strategies, and industry insights to accelerate your growth.</p>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder:text-slate-400 focus:outline-none focus:border-green-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section-padding bg-background pb-0">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Featured Article</h2>
          <Link to={`/blog/${featured.id}`} className="group grid lg:grid-cols-2 gap-0 bg-card border border-border rounded-2xl overflow-hidden card-hover block">
            <div className="h-60 lg:h-auto overflow-hidden">
              <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6 lg:p-8 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full mb-3">{featured.cat}</span>
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-green-500 transition-colors">{featured.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-3">
                <img src={featured.author.avatar} alt={featured.author.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium text-foreground">{featured.author.name}</p>
                  <p className="text-xs text-muted-foreground">{featured.date} • {featured.read} read</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-background border-b border-border sticky top-16 z-20 mt-8">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat ? 'bg-green-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding bg-background">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p>No articles found for "{search}"</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(post => (
                <Link to={`/blog/${post.id}`} key={post.id} className="group rounded-2xl overflow-hidden bg-card border border-border card-hover block">
                  <div className="h-44 overflow-hidden">
                    <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">{post.cat}</span>
                      <span className="text-muted-foreground text-xs ml-auto flex items-center gap-1"><Clock className="w-3 h-3" /> {post.read}</span>
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-green-500 transition-colors leading-snug mb-3">{post.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-2">
                      <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="text-xs font-medium text-foreground">{post.author.name}</p>
                        <p className="text-xs text-muted-foreground">{post.date}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-xl mx-auto text-center">
          <TrendingUp className="w-10 h-10 text-white mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-white mb-2">Get Weekly Career Insights</h2>
          <p className="text-green-50 mb-6 text-sm">Join 10,000+ professionals receiving expert advice every week.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder:text-green-100 focus:outline-none focus:border-white transition-colors"
            />
            <button className="px-5 py-3 bg-white text-green-600 font-semibold rounded-xl hover:bg-green-50 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
