import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Clock, Eye, Share2, Twitter, Linkedin, Bookmark,
  ChevronRight, Star, BookOpen, Calendar, Tag, User
} from 'lucide-react';

// ─── Full article data ────────────────────────────────────────────────────────

const posts = [
  {
    id: 1,
    title: 'How to Create a 6-Month Career Roadmap That Actually Works',
    cat: 'Career',
    date: 'March 28, 2025',
    read: '5 min',
    views: 1240,
    img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&q=80',
    author: {
      name: 'Arjun Sharma',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80&fit=crop&crop=face',
      role: 'Founder, RightStep',
      bio: 'Arjun is the founder of RightStep and has spent over a decade coaching professionals at Google, Amazon, and Microsoft. He writes about career strategy, structured learning, and personal growth.',
      articles: 42,
      followers: '12.4K',
    },
    tags: ['Career', 'Roadmap', 'Productivity', 'Goal Setting'],
    tableOfContents: [
      'Why Most Career Plans Fail',
      'The 6-Month Framework',
      'Setting Measurable Milestones',
      'Building Daily Habits',
      'Tracking and Adjusting',
      'Final Thoughts',
    ],
    content: [
      {
        heading: 'Why Most Career Plans Fail',
        body: `Most people approach career planning the wrong way. They set a big, vague goal — "I want to be a software engineer at Google" — write it on a sticky note, and then wait for magic to happen. Six months later, nothing has changed except the guilt.\n\nThe problem isn't ambition. It's architecture. A career roadmap without structure is just wishful thinking. And wishful thinking doesn't get you a Google offer — deliberate, measurable action does.\n\nIn this post, I'll walk you through the exact framework we use at RightStep to help thousands of professionals build roadmaps that drive real results in 90-day sprints across 6 months.`,
      },
      {
        heading: 'The 6-Month Framework',
        body: `The RightStep 6-month framework is built on three phases:\n\n**Phase 1 (Month 1–2): Foundation** — Audit your current skills, identify the skill gap between where you are and where you want to be, and design a targeted learning plan.\n\n**Phase 2 (Month 3–4): Acceleration** — Execute aggressively. Solve problems daily, build projects, attend events, and connect with people in your target role.\n\n**Phase 3 (Month 5–6): Positioning** — Polish your resume, optimize your LinkedIn, prep for interviews, and apply strategically. Quality over quantity.\n\nEach phase has specific deliverables. Not just "learn DSA" — but "complete LeetCode top 100, finish 3 mock interviews, and build one portfolio project."`,
      },
      {
        heading: 'Setting Measurable Milestones',
        body: `The difference between a goal and a milestone is specificity. "Get better at coding" is a goal. "Solve 5 LeetCode mediums per week, scoring 70%+ accuracy by week 8" is a milestone.\n\nFor each month in your roadmap:\n• Define 3 to 5 milestones — not more\n• Attach a metric (number, percentage, date)\n• Rate your confidence in hitting it (1–10)\n• Set a weekly check-in ritual\n\nConfidence rating below 6? Break the milestone into smaller pieces. Confidence rating above 9? You're sandbagging — push harder.`,
      },
      {
        heading: 'Building Daily Habits',
        body: `A 6-month plan lives and dies on daily execution. Here's a simple daily structure that hundreds of RightStep users swear by:\n\n• Morning (30 min): Review your goals and today's tasks\n• Deep Work Block 1 (90 min): Primary skill development\n• Deep Work Block 2 (60 min): Projects or problem-solving\n• Evening (20 min): Log what you completed and plan tomorrow\n\nThe key is non-negotiables — the two or three actions you will do no matter what. For a software engineer in training, that might be "solve at least 2 problems every single day."`,
      },
      {
        heading: 'Tracking and Adjusting',
        body: `Your roadmap isn't a contract — it's a living document. Every two weeks, run a 15-minute retrospective:\n\n1. What did you complete? (Celebrate wins)\n2. What did you miss? (No judgment, just analysis)\n3. What's blocking progress? (Remove the blocker)\n4. What one adjustment would make next 2 weeks 20% better?\n\nMost people never review their plans. This bi-weekly habit is what separates users who land their dream jobs in 5 months from those who are still "working on it" two years later.`,
      },
      {
        heading: 'Final Thoughts',
        body: `A 6-month career roadmap doesn't need to be perfect — it needs to be honest, measurable, and alive. Write it, share it with someone who will hold you accountable, and review it relentlessly.\n\nThe right steps, taken consistently, always lead somewhere great. That's the RightStep promise.`,
      },
    ],
    related: [2, 5, 4],
  },
  {
    id: 2,
    title: '10 Skills Every Software Engineer Must Have in 2025',
    cat: 'Tech',
    date: 'March 22, 2025',
    read: '7 min',
    views: 3850,
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
    author: {
      name: 'Rahul Mehta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&fit=crop&crop=face',
      role: 'SDE @ Google',
      bio: 'Rahul is a senior software engineer at Google with 8 years of experience across distributed systems and ML infrastructure. He mentors 200+ engineers and writes about the tech industry.',
      articles: 28,
      followers: '34.2K',
    },
    tags: ['Tech', 'Software Engineering', 'Skills', 'Career'],
    tableOfContents: [
      'Why the Skill Bar Is Rising',
      'Core Engineering Skills',
      'System Design Fundamentals',
      'Cloud & DevOps Literacy',
      'Soft Skills That Separate 10x Engineers',
      'How to Build These Skills Fast',
    ],
    content: [
      {
        heading: 'Why the Skill Bar Is Rising',
        body: 'The software industry has never been more competitive. With AI writing boilerplate code, companies are raising the bar significantly — they want engineers who think in systems, communicate clearly, and ship reliably. Here are the 10 skills that will define top software engineers in 2025.',
      },
      {
        heading: 'Core Engineering Skills',
        body: '1. DSA Mastery — Not just for interviews. Strong data structures and algorithms understanding translates directly into writing efficient, scalable code.\n\n2. System Design — From designing a URL shortener to architecting a distributed cache, system design thinking is non-negotiable for senior roles.\n\n3. Code Quality & Reviews — Writing clean, testable, documented code is table stakes. The ability to give and receive excellent code reviews is what 10x engineers do daily.',
      },
      {
        heading: 'System Design Fundamentals',
        body: 'Every senior engineer must understand: database sharding and replication, load balancing strategies, CAP theorem trade-offs, caching layers (Redis, Memcached), message queues (Kafka, RabbitMQ), and microservices vs monolith trade-offs.\n\nYou don\'t need to be an expert in all of them — but you need to know when and why to use each.',
      },
      {
        heading: 'Cloud & DevOps Literacy',
        body: 'The era of "I just write code" is over. Engineers are expected to understand CI/CD pipelines, containerization (Docker, Kubernetes), cloud services (AWS, GCP, Azure basics), infrastructure as code (Terraform), and observability (logging, metrics, tracing).\n\nYou don\'t need to be a DevOps engineer — but you need to be cloud-literate.',
      },
      {
        heading: 'Soft Skills That Separate 10x Engineers',
        body: 'Technical skills get you in the door. Soft skills determine how far you go:\n\n• Clear written communication (design docs, RFCs)\n• Stakeholder management\n• Mentoring junior engineers\n• Estimation and project planning\n• Saying no strategically',
      },
      {
        heading: 'How to Build These Skills Fast',
        body: 'Use RightStep\'s Software Engineering path — structured into focused modules covering DSA, system design, cloud, and behavioral skills. Combined with weekly mentor sessions, our users typically see measurable skill improvement within 60 days.',
      },
    ],
    related: [1, 5, 3],
  },
  {
    id: 3,
    title: 'Mentor or Self-Learn? The Honest Answer Nobody Gives',
    cat: 'Mentorship',
    date: 'March 15, 2025',
    read: '4 min',
    views: 2100,
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    author: {
      name: 'Dr. Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80&fit=crop&crop=face',
      role: 'ML Engineer @ Microsoft',
      bio: 'Dr. Priya is an ML engineer at Microsoft and a PhD in Computer Science. She has mentored 189 engineers and data scientists through career transitions on RightStep.',
      articles: 19,
      followers: '21.7K',
    },
    tags: ['Mentorship', 'Learning', 'Career', 'Self-Improvement'],
    tableOfContents: [
      'The Self-Learning Trap',
      'When Self-Learning Wins',
      'When Mentorship Is Essential',
      'The Hybrid Approach',
      'How to Choose Your Mentor',
    ],
    content: [
      { heading: 'The Self-Learning Trap', body: 'Self-learning feels empowering. You control the pace, the content, the schedule. But there\'s a hidden cost: you don\'t know what you don\'t know. Spending 3 months learning the wrong framework, building projects nobody cares about, or preparing for the wrong interview format — these are self-learning traps that cost people years of their career.' },
      { heading: 'When Self-Learning Wins', body: 'Self-learning is excellent for foundational knowledge, exploring new technologies, building side projects for curiosity, and consuming content at your own pace. If you\'re a self-motivated learner with clear goals and a strong ability to self-assess, you can get very far independently.' },
      { heading: 'When Mentorship Is Essential', body: 'Mentorship becomes critical at three inflection points:\n\n1. Career transitions — when you\'re changing domains and need insider knowledge\n2. Plateaus — when you\'ve been stuck at the same level for 6+ months\n3. Interview preparation — especially for top-tier companies where domain-specific knowledge matters enormously\n\nIn these moments, a mentor compresses years of trial and error into weeks of focused guidance.' },
      { heading: 'The Hybrid Approach', body: 'The most effective learners use both. Self-learn the fundamentals, then use a mentor to validate direction, fill blind spots, and open doors. At RightStep, we structure this as: 70% structured self-learning + 30% mentor-guided problem solving.' },
      { heading: 'How to Choose Your Mentor', body: 'Three things matter above all else: relevance (they\'ve done what you want to do), availability (they can commit consistent time), and communication style (their teaching style matches your learning style). Use our mentor filter on RightStep to find the right fit based on all three.' },
    ],
    related: [1, 4, 2],
  },
  {
    id: 4,
    title: 'The Deep Work Method: How to Study 3x More Effectively',
    cat: 'Productivity',
    date: 'March 10, 2025',
    read: '6 min',
    views: 1680,
    img: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?w=1200&q=80',
    author: {
      name: 'Ananya Iyer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&q=80&fit=crop&crop=face',
      role: 'VP Engineering',
      bio: 'Ananya is a VP of Engineering with 14 years of experience across fintech and SaaS. She writes about deep work, learning systems, and engineering leadership.',
      articles: 33,
      followers: '18.9K',
    },
    tags: ['Productivity', 'Deep Work', 'Study', 'Focus'],
    tableOfContents: ['What Is Deep Work?', 'The 90-Minute Rule', 'Eliminating Cognitive Load', 'Building a Deep Work Routine', 'Measuring Your Sessions'],
    content: [
      { heading: 'What Is Deep Work?', body: 'Deep work, coined by Cal Newport, is professional activity performed in a state of distraction-free concentration that pushes your cognitive capabilities to their limit. For learners and engineers, this translates to: zero notifications, a clear task, a timer, and your full attention.' },
      { heading: 'The 90-Minute Rule', body: 'Human concentration operates in 90-minute ultradian cycles. Work with your biology: 90 minutes of deep focus, then a 20-minute break. Repeat twice per day. That\'s 3 hours of genuine deep work — more productive than 8 hours of distracted effort.' },
      { heading: 'Eliminating Cognitive Load', body: 'Before every deep work session: close all tabs except the one you need, put your phone in another room, write down the single deliverable for the session, and set a visible countdown timer. The goal is to remove every decision that isn\'t the work itself.' },
      { heading: 'Building a Deep Work Routine', body: 'Consistency matters more than duration. Start with 45-minute sessions and build up. Time-block your calendar for deep work the way you\'d block for an important meeting. Treat it as sacred — because it is.' },
      { heading: 'Measuring Your Sessions', body: 'Track two things daily: deep work hours and output quality (did you complete the session\'s deliverable?). After two weeks, you\'ll see clear patterns. RightStep\'s progress tracker includes a deep work log so you can measure this alongside your learning milestones.' },
    ],
    related: [1, 3, 6],
  },
  {
    id: 5,
    title: 'FAANG Interview Prep: A Complete 3-Month Plan',
    cat: 'Interview',
    date: 'March 5, 2025',
    read: '9 min',
    views: 5200,
    img: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&q=80',
    author: {
      name: 'Rahul Mehta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&fit=crop&crop=face',
      role: 'SDE @ Google',
      bio: 'Rahul is a senior software engineer at Google with 8 years of experience. He has helped 200+ engineers crack FAANG interviews through structured preparation.',
      articles: 28,
      followers: '34.2K',
    },
    tags: ['Interview', 'FAANG', 'Career', 'Tech'],
    tableOfContents: ['The 3-Month Breakdown', 'Month 1: Foundation', 'Month 2: Depth', 'Month 3: Mock & Apply', 'Common Mistakes to Avoid'],
    content: [
      { heading: 'The 3-Month Breakdown', body: 'Getting into FAANG requires three things: knowledge depth (DSA, system design), interview-specific skills (communication, structured problem-solving), and strategic application (timing, referrals, positioning). Each month targets one of these.' },
      { heading: 'Month 1: Foundation', body: 'Weeks 1–2: Complete arrays, strings, hashmaps, and two pointers. Weeks 3–4: Trees, graphs, and recursion. Do LeetCode Easy problems in bulk — 100 problems minimum. The goal is pattern recognition, not perfection.' },
      { heading: 'Month 2: Depth', body: 'Weeks 5–6: Dynamic programming and backtracking (the hardest part — budget extra time). Weeks 7–8: System design basics — design Twitter, design a URL shortener, design WhatsApp. Read "Designing Data-Intensive Applications" in parallel.' },
      { heading: 'Month 3: Mock & Apply', body: 'Weeks 9–10: Full mock interviews — 3 per week. Get a mentor on RightStep for live feedback. Weeks 11–12: Apply to target companies, fine-tune your resume, activate your referral network. Apply to your safety companies first to calibrate and build interview confidence.' },
      { heading: 'Common Mistakes to Avoid', body: '1. Over-studying and under-practicing (you need reps, not just reading)\n2. Not practicing communication out loud (interviewers care how you think, not just the answer)\n3. Ignoring behavioral interviews (FAANG scores them heavily with structured frameworks like STAR)\n4. Applying too early before the skills are solid' },
    ],
    related: [2, 1, 3],
  },
  {
    id: 6,
    title: 'From Engineer to Product Manager: My Transition Story',
    cat: 'Career',
    date: 'February 28, 2025',
    read: '5 min',
    views: 1920,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    author: {
      name: 'Aditya Kumar',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80&fit=crop&crop=face',
      role: 'PM @ Flipkart',
      bio: 'Aditya transitioned from software engineering to product management after 4 years as an SDE. He is now a Product Manager at Flipkart and writes about career transitions and product strategy.',
      articles: 15,
      followers: '9.6K',
    },
    tags: ['Career', 'Product Management', 'Transition', 'Growth'],
    tableOfContents: ['Why I Left Engineering', 'The Skills That Transferred', 'What I Had to Learn From Scratch', 'How I Got My First PM Role', 'Advice for Aspiring PMs'],
    content: [
      { heading: 'Why I Left Engineering', body: 'After 4 years of writing great code, I realized my energy was always going toward "why are we building this?" rather than "how do we build this?" That was the signal I needed. I wanted to shape the product, not just implement it.' },
      { heading: 'The Skills That Transferred', body: 'Engineering gave me enormous advantages as a PM: technical credibility with my engineering team, the ability to quickly assess feasibility, deep understanding of technical debt trade-offs, and data literacy. Don\'t underestimate these — many PMs without engineering backgrounds struggle here.' },
      { heading: 'What I Had to Learn From Scratch', body: 'User empathy, stakeholder management, product strategy frameworks, prioritization methods (RICE, MoSCoW), and — most painfully — letting go of implementation details. PMs don\'t control the "how." That\'s a mindset shift that took me 6 months.' },
      { heading: 'How I Got My First PM Role', body: 'I used the APM (Associate Product Manager) route at a mid-sized startup. Key moves: built a product portfolio (3 case studies), got a referral from my engineering manager, and spent 3 months on RightStep\'s PM path which included mock PM interviews with actual PMs from top companies.' },
      { heading: 'Advice for Aspiring PMs', body: 'Don\'t wait until you\'re ready. Build case studies now. Start talking to users now. Volunteer to write PRDs for your current team. The transition happens at the intersection of doing PM work before having the title.' },
    ],
    related: [1, 3, 4],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Article not found</h2>
          <Link to="/blog" className="text-green-500 hover:underline">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const related = posts.filter(p => post.related.includes(p.id));

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-green-500/90 text-white text-xs font-semibold rounded-full">{post.cat}</span>
            <span className="text-slate-300 text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> {post.read} read</span>
            <span className="text-slate-300 text-xs flex items-center gap-1"><Eye className="w-3 h-3" /> {post.views.toLocaleString()} views</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">{post.title}</h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-green-500 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/blog" className="hover:text-green-500 transition-colors">Blog</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground truncate max-w-xs">{post.title}</span>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          {/* Article */}
          <article>
            {/* Author & meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
              <div className="flex items-center gap-3">
                <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <p className="font-semibold text-foreground">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" /> {post.date}
              </div>
            </div>

            {/* Sharing */}
            <div className="flex items-center gap-2 mb-8">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                <Share2 className="w-4 h-4" /> Share:
              </span>
              <button
                onClick={shareOnTwitter}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] text-xs font-medium rounded-lg transition-colors border border-[#1DA1F2]/20"
              >
                <Twitter className="w-3.5 h-3.5" /> Twitter
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2] text-xs font-medium rounded-lg transition-colors border border-[#0A66C2]/20"
              >
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-muted/80 text-muted-foreground text-xs font-medium rounded-lg transition-colors ml-auto">
                <Bookmark className="w-3.5 h-3.5" /> Save
              </button>
            </div>

            {/* Article content */}
            <div className="prose-custom space-y-8">
              {post.content.map((section, i) => (
                <div key={i} id={`section-${i}`}>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3 leading-tight">
                    {section.heading}
                  </h2>
                  <div className="text-muted-foreground leading-relaxed text-base space-y-3">
                    {section.body.split('\n\n').map((para, j) => (
                      <p key={j} className="whitespace-pre-line">{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-border">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-lg hover:bg-green-500/10 hover:text-green-500 transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share again */}
            <div className="mt-8 p-5 bg-muted/50 rounded-2xl border border-border flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-foreground text-sm">Found this helpful?</p>
                <p className="text-muted-foreground text-xs">Share it with someone who needs it.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={shareOnTwitter} className="flex items-center gap-1.5 px-4 py-2 bg-[#1DA1F2] text-white text-xs font-medium rounded-lg hover:bg-[#1DA1F2]/90 transition-colors">
                  <Twitter className="w-3.5 h-3.5" /> Share on Twitter
                </button>
                <button onClick={shareOnLinkedIn} className="flex items-center gap-1.5 px-4 py-2 bg-[#0A66C2] text-white text-xs font-medium rounded-lg hover:bg-[#0A66C2]/90 transition-colors">
                  <Linkedin className="w-3.5 h-3.5" /> Share on LinkedIn
                </button>
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-10 p-6 bg-card border border-border rounded-2xl">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-green-500" /> About the Author
              </h3>
              <div className="flex items-start gap-4">
                <img src={post.author.avatar} alt={post.author.name} className="w-16 h-16 rounded-2xl object-cover shrink-0" />
                <div>
                  <p className="font-bold text-foreground">{post.author.name}</p>
                  <p className="text-sm text-green-500 mb-2">{post.author.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{post.author.bio}</p>
                  <div className="flex gap-4 text-sm">
                    <span className="text-muted-foreground"><span className="font-semibold text-foreground">{post.author.articles}</span> articles</span>
                    <span className="text-muted-foreground"><span className="font-semibold text-foreground">{post.author.followers}</span> followers</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Table of Contents */}
            <div className="sticky top-24 space-y-6">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-green-500" /> Table of Contents
                </h3>
                <nav className="space-y-2">
                  {post.tableOfContents.map((item, i) => (
                    <a
                      key={i}
                      href={`#section-${i}`}
                      className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-green-500 transition-colors py-1 group"
                    >
                      <span className="w-5 h-5 rounded-md bg-muted text-xs flex items-center justify-center font-medium shrink-0 group-hover:bg-green-500/10 group-hover:text-green-500 transition-colors">
                        {i + 1}
                      </span>
                      {item}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Article stats */}
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-semibold text-foreground mb-4">Article Info</h3>
                <div className="space-y-3">
                  {[
                    { icon: Clock, label: 'Read time', val: post.read },
                    { icon: Eye, label: 'Total views', val: post.views.toLocaleString() },
                    { icon: Calendar, label: 'Published', val: post.date },
                    { icon: Star, label: 'Rating', val: '4.9 / 5' },
                  ].map(s => (
                    <div key={s.label} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1.5"><s.icon className="w-3.5 h-3.5" /> {s.label}</span>
                      <span className="font-medium text-foreground">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white">
                <h3 className="font-bold mb-2">Ready to take action?</h3>
                <p className="text-green-50 text-sm mb-4">Start your personalized learning path on RightStep today.</p>
                <Link to="/register" className="block text-center bg-white text-green-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-green-50 transition-colors">
                  Get Started Free
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-10 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(rel => (
              <Link to={`/blog/${rel.id}`} key={rel.id} className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/5 transition-all block">
                <div className="h-40 overflow-hidden">
                  <img src={rel.img} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">{rel.cat}</span>
                    <span className="text-muted-foreground text-xs ml-auto flex items-center gap-1"><Clock className="w-3 h-3" /> {rel.read}</span>
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-green-500 transition-colors text-sm leading-snug">{rel.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back to blog */}
        <div className="mt-10 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-muted hover:bg-muted/80 text-foreground text-sm font-medium rounded-xl transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
