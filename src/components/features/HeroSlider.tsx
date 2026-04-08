import { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    tag: 'Career Growth',
    headline: 'Land Your Dream Job',
    sub: 'Structured roadmaps tailored to your target role',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    tag: 'Skill Building',
    headline: 'Master In-Demand Skills',
    sub: 'Curated learning paths with expert-crafted content',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    tag: 'Mentorship',
    headline: 'Learn from the Best',
    sub: 'Book 1-on-1 sessions with industry veterans',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    tag: 'Goal Tracking',
    headline: 'Achieve Milestones Faster',
    sub: 'Visual progress tracking keeps you accountable',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    tag: 'Community',
    headline: 'Grow Together',
    sub: 'Join a thriving community of ambitious professionals',
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [current]);

  const goNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(prev => (prev + 1) % slides.length);
      setIsAnimating(false);
    }, 400);
  };

  const goPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(prev => (prev - 1 + slides.length) % slides.length);
      setIsAnimating(false);
    }, 400);
  };

  const goTo = (idx: number) => {
    if (isAnimating || idx === current) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setIsAnimating(false);
    }, 400);
  };

  const slide = slides[current];

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl shadow-black/30">
      {/* Image */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <img
          src={slide.image}
          alt={slide.headline}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
      </div>

      {/* Content */}
      <div className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <span className="inline-block px-3 py-1 bg-green-500/90 text-white text-xs font-semibold rounded-full mb-2">
          {slide.tag}
        </span>
        <h3 className="text-xl font-bold text-white mb-1">{slide.headline}</h3>
        <p className="text-sm text-slate-300">{slide.sub}</p>
      </div>

      {/* Controls */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <button onClick={goPrev} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <ChevronUp className="w-4 h-4" />
        </button>
        <button onClick={goNext} className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`rounded-full transition-all duration-300 ${
              idx === current ? 'w-2 h-6 bg-green-400' : 'w-2 h-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-3 right-3 px-2 py-1 glass rounded-lg text-xs text-white font-medium">
        {current + 1} / {slides.length}
      </div>
    </div>
  );
};

export default HeroSlider;
