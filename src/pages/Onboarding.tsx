import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import {
  Target, Briefcase, Code2, BarChart2, Palette, Users, TrendingUp,
  ChevronRight, ChevronLeft, Zap, BookOpen, Video, PenTool, Headphones,
  Star, Clock, CheckCircle, ArrowRight, SkipForward
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// ─── Step Data ───────────────────────────────────────────────────────────────

const careerGoals = [
  { id: 'sde', label: 'Software Engineer', icon: Code2, desc: 'FAANG, startups, SDE roles', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400' },
  { id: 'pm', label: 'Product Manager', icon: Briefcase, desc: 'Strategy, roadmaps, leadership', color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400' },
  { id: 'ds', label: 'Data Scientist', icon: BarChart2, desc: 'ML, AI, analytics, research', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400' },
  { id: 'design', label: 'UI/UX Designer', icon: Palette, desc: 'Figma, prototyping, user research', color: 'from-orange-500 to-red-500', bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400' },
  { id: 'lead', label: 'Engineering Manager', icon: Users, desc: 'Team leadership, roadmaps, hiring', color: 'from-indigo-500 to-blue-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-600 dark:text-indigo-400' },
  { id: 'entrepreneur', label: 'Entrepreneur', icon: TrendingUp, desc: 'Startup building, fundraising', color: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20', text: 'text-yellow-600 dark:text-yellow-400' },
];

const skillLevels = [
  {
    id: 'beginner', label: 'Beginner', sub: '0–1 years',
    desc: "I'm just getting started. I have basic knowledge and want to build a solid foundation.",
    milestones: ['Learn fundamentals', 'Build first projects', 'Understand industry basics'],
    color: 'border-green-500 bg-green-500',
  },
  {
    id: 'intermediate', label: 'Intermediate', sub: '1–3 years',
    desc: "I have some experience and practical skills. I want to level up and fill knowledge gaps.",
    milestones: ['Deepen existing skills', 'Tackle complex problems', 'Build a strong portfolio'],
    color: 'border-blue-500 bg-blue-500',
  },
  {
    id: 'advanced', label: 'Advanced', sub: '3+ years',
    desc: "I'm experienced and targeting top-tier roles. I need advanced strategies and mentorship.",
    milestones: ['Master advanced concepts', 'Crack top-tier interviews', 'Lead projects at scale'],
    color: 'border-purple-500 bg-purple-500',
  },
];

const learningStyles = [
  { id: 'video', label: 'Video Learner', icon: Video, desc: 'I learn best by watching tutorials and video explanations.', tag: 'Visual' },
  { id: 'reading', label: 'Reading & Docs', icon: BookOpen, desc: 'I prefer written content — articles, docs, and books.', tag: 'Textual' },
  { id: 'handson', label: 'Hands-On Practice', icon: PenTool, desc: 'I learn by doing — exercises, projects, and challenges.', tag: 'Practical' },
  { id: 'audio', label: 'Audio & Podcasts', icon: Headphones, desc: 'I absorb knowledge through podcasts and audio explanations.', tag: 'Auditory' },
];

const recommendedPaths: Record<string, { title: string; duration: string; modules: number; rating: number; learners: string; reason: string; steps: string[] }> = {
  sde: { title: 'Software Engineering (SDE)', duration: '6 months', modules: 24, rating: 4.9, learners: '12,400', reason: 'Perfectly aligned with your Software Engineer goal', steps: ['Foundations of DSA', 'System Design Mastery', 'FAANG Interview Prep', 'Portfolio & Networking'] },
  pm: { title: 'Product Management', duration: '4 months', modules: 18, rating: 4.7, learners: '8,200', reason: "Built for aspiring PMs targeting top product companies", steps: ['PM Fundamentals', 'Product Strategy', 'Case Study Mastery', 'Stakeholder Communication'] },
  ds: { title: 'Data Science & ML', duration: '8 months', modules: 32, rating: 4.8, learners: '9,600', reason: 'End-to-end data science with a focus on real-world ML', steps: ['Python & Statistics', 'ML Algorithms', 'Deep Learning', 'Model Deployment'] },
  design: { title: 'UI/UX Design', duration: '5 months', modules: 20, rating: 4.9, learners: '6,800', reason: 'Design-focused curriculum with Figma and portfolio building', steps: ['Design Thinking', 'Figma Mastery', 'User Research', 'Portfolio Launch'] },
  lead: { title: 'Engineering Management', duration: '4 months', modules: 16, rating: 4.8, learners: '3,100', reason: 'Leadership training tailored for senior engineers', steps: ['People Management', 'Engineering Strategy', 'Hiring & Mentoring', 'CTO Roadmap'] },
  entrepreneur: { title: 'Startup Launchpad', duration: '5 months', modules: 22, rating: 4.7, learners: '4,500', reason: 'Startup fundamentals from idea to fundraising', steps: ['Idea Validation', 'MVP Building', 'Growth Hacking', 'Fundraising 101'] },
};

// ─── Progress Indicator ──────────────────────────────────────────────────────

const StepIndicator = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} className="flex items-center gap-2">
        <div className={`transition-all duration-300 rounded-full flex items-center justify-center ${
          i < current ? 'w-7 h-7 bg-green-500 text-white' :
          i === current ? 'w-7 h-7 bg-green-500 text-white ring-4 ring-green-500/20' :
          'w-2 h-2 bg-muted-foreground/30'
        }`}>
          {i < current ? <CheckCircle className="w-4 h-4" /> : i === current ? <span className="text-xs font-bold">{i + 1}</span> : null}
        </div>
        {i < total - 1 && (
          <div className={`h-0.5 w-8 sm:w-12 rounded-full transition-all duration-300 ${i < current ? 'bg-green-500' : 'bg-muted-foreground/20'}`} />
        )}
      </div>
    ))}
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

const Onboarding = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [learningStyle, setLearningStyle] = useState('');

  if (!isAuthenticated) return <Navigate to="/register" replace />;

  const totalSteps = 4;

  const stepLabels = ['Career Goal', 'Skill Level', 'Learning Style', 'Your Path'];

  const handleNext = () => setStep(s => Math.min(s + 1, totalSteps - 1));
  const handleBack = () => setStep(s => Math.max(s - 1, 0));
  const handleSkip = () => navigate('/dashboard');
  const handleComplete = () => navigate('/dashboard');

  const path = recommendedPaths[goal] || recommendedPaths['sde'];

  const canAdvance = [
    !!goal,
    !!skillLevel,
    !!learningStyle,
    true,
  ][step];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-4 py-4 flex items-center justify-between bg-card">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg">
            <span className="text-green-500">Right</span>
            <span className="text-foreground">Step</span>
          </span>
        </div>
        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-muted"
        >
          <SkipForward className="w-4 h-4" /> Skip onboarding
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="flex flex-col items-center mb-10">
            <StepIndicator current={step} total={totalSteps} />
            <div className="flex gap-6 mt-3">
              {stepLabels.map((label, i) => (
                <span key={i} className={`text-xs font-medium hidden sm:block transition-colors ${i === step ? 'text-green-500' : i < step ? 'text-muted-foreground' : 'text-muted-foreground/40'}`}>
                  {label}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Step {step + 1} of {totalSteps}</p>
          </div>

          {/* ── Step 0: Career Goal ── */}
          {step === 0 && (
            <div className="animate-slide-in-left">
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  What's your <span className="text-green-500">career goal</span>?
                </h1>
                <p className="text-muted-foreground">We'll personalize your learning path based on your target role.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {careerGoals.map(g => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`group flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                      goal === g.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md shadow-green-500/10'
                        : 'border-border bg-card hover:border-green-300 hover:shadow-sm'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${g.color} shadow-sm shrink-0`}>
                      <g.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${goal === g.id ? 'text-green-700 dark:text-green-400' : 'text-foreground'}`}>{g.label}</p>
                      <p className="text-xs text-muted-foreground">{g.desc}</p>
                    </div>
                    {goal === g.id && <CheckCircle className="w-5 h-5 text-green-500 ml-auto shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 1: Skill Level ── */}
          {step === 1 && (
            <div className="animate-slide-in-left">
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  What's your <span className="text-green-500">current skill level</span>?
                </h1>
                <p className="text-muted-foreground">Be honest — this helps us calibrate the right starting point.</p>
              </div>
              <div className="space-y-4">
                {skillLevels.map(level => (
                  <button
                    key={level.id}
                    onClick={() => setSkillLevel(level.id)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
                      skillLevel === level.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md shadow-green-500/10'
                        : 'border-border bg-card hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-3 h-3 rounded-full ${skillLevel === level.id ? level.color : 'bg-muted-foreground/30'}`} />
                          <span className="font-bold text-foreground">{level.label}</span>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{level.sub}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{level.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {level.milestones.map(m => (
                            <span key={m} className="text-xs px-2 py-1 bg-muted rounded-lg text-muted-foreground">{m}</span>
                          ))}
                        </div>
                      </div>
                      {skillLevel === level.id && <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-1" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 2: Learning Style ── */}
          {step === 2 && (
            <div className="animate-slide-in-left">
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  How do you <span className="text-green-500">learn best</span>?
                </h1>
                <p className="text-muted-foreground">We'll tailor content format to match your preferred learning style.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {learningStyles.map(style => (
                  <button
                    key={style.id}
                    onClick={() => setLearningStyle(style.id)}
                    className={`group flex flex-col items-start gap-3 p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
                      learningStyle === style.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md shadow-green-500/10'
                        : 'border-border bg-card hover:border-green-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        learningStyle === style.id ? 'bg-green-500' : 'bg-muted group-hover:bg-green-50 dark:group-hover:bg-green-900/20'
                      }`}>
                        <style.icon className={`w-6 h-6 ${learningStyle === style.id ? 'text-white' : 'text-muted-foreground group-hover:text-green-500'}`} />
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        learningStyle === style.id ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-muted text-muted-foreground'
                      }`}>{style.tag}</span>
                    </div>
                    <div>
                      <p className={`font-semibold mb-1 ${learningStyle === style.id ? 'text-green-700 dark:text-green-400' : 'text-foreground'}`}>{style.label}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{style.desc}</p>
                    </div>
                    {learningStyle === style.id && <CheckCircle className="w-4 h-4 text-green-500 self-end" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 3: Recommended Path ── */}
          {step === 3 && (
            <div className="animate-slide-in-left">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-green-500" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Your <span className="text-green-500">personalized path</span> is ready!
                </h1>
                <p className="text-muted-foreground">Based on your answers, here's the perfect learning journey for you.</p>
              </div>

              <div className="bg-card border-2 border-green-500 rounded-2xl overflow-hidden shadow-xl shadow-green-500/10 mb-6">
                {/* Path header */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-5 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-semibold text-green-100">AI Recommended</span>
                  </div>
                  <h2 className="text-xl font-bold mb-1">{path.title}</h2>
                  <p className="text-green-100 text-sm">{path.reason}</p>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
                  {[
                    { icon: Clock, val: path.duration, label: 'Duration' },
                    { icon: BookOpen, val: `${path.modules} modules`, label: 'Content' },
                    { icon: Users, val: path.learners, label: 'Learners' },
                  ].map(s => (
                    <div key={s.label} className="p-3 text-center">
                      <s.icon className="w-4 h-4 text-green-500 mx-auto mb-1" />
                      <p className="text-sm font-bold text-foreground">{s.val}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
                {/* Steps */}
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Your learning journey:</h3>
                  <div className="space-y-3">
                    {path.steps.map((s, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center text-xs font-bold text-green-500 shrink-0">
                          {i + 1}
                        </div>
                        <div className="flex-1 h-0.5 bg-gradient-to-r from-green-500/50 to-transparent rounded-full" />
                        <span className="text-sm text-foreground font-medium">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* User summary */}
              <div className="bg-muted/50 rounded-2xl p-4 mb-2">
                <h3 className="text-sm font-semibold text-foreground mb-3">Your Profile Summary</h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: 'Goal', val: careerGoals.find(g => g.id === goal)?.label || '—' },
                    { label: 'Level', val: skillLevels.find(l => l.id === skillLevel)?.label || '—' },
                    { label: 'Style', val: learningStyles.find(s => s.id === learningStyle)?.label || '—' },
                  ].map(item => (
                    <div key={item.label} className="bg-card rounded-xl p-3 border border-border">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground mt-0.5 leading-tight">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            {step < totalSteps - 1 ? (
              <button
                onClick={handleNext}
                disabled={!canAdvance}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-white text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-green-500/25"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-white text-sm font-semibold transition-all shadow-lg shadow-green-500/25"
              >
                Start Learning <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
