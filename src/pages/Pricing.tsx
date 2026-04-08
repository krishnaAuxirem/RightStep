import { Link } from 'react-router-dom';
import { Check, Zap, Star, ChevronRight } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 999,
    annualPrice: 799,
    desc: 'Perfect for getting started with structured learning',
    color: 'border-border',
    badge: '',
    btnClass: 'border-2 border-border text-foreground hover:border-green-500 hover:text-green-500',
    features: [
      '2 Active Learning Paths',
      'Goal Tracking Dashboard',
      'Community Forum Access',
      'Email Support',
      '5 AI Recommendations/month',
      'Basic Progress Analytics',
    ],
  },
  {
    name: 'Pro',
    price: 2499,
    annualPrice: 1999,
    desc: 'For serious learners committed to career growth',
    color: 'border-green-500',
    badge: 'Most Popular',
    btnClass: 'bg-green-500 text-white hover:bg-green-400',
    features: [
      'Unlimited Learning Paths',
      '2 Mentor Sessions/month',
      'Advanced Progress Analytics',
      'Priority Support (24hr)',
      'Unlimited AI Recommendations',
      'Verified Certificates',
      'Resume Review (1x/month)',
      'Interview Prep Resources',
    ],
  },
  {
    name: 'Elite',
    price: 5999,
    annualPrice: 4799,
    desc: 'Maximum support for rapid career transformation',
    color: 'border-blue-500',
    badge: 'Best Value',
    btnClass: 'bg-blue-600 text-white hover:bg-blue-500',
    features: [
      'Everything in Pro',
      '8 Mentor Sessions/month',
      'Dedicated Career Coach',
      '1-on-1 Resume Review',
      'Mock Interviews (4x/month)',
      'Job Placement Support',
      'LinkedIn Profile Optimization',
      'Referral Network Access',
    ],
  },
];

const comparisons = [
  { feature: 'Learning Paths', starter: '2', pro: 'Unlimited', elite: 'Unlimited' },
  { feature: 'Mentor Sessions/month', starter: '0', pro: '2', elite: '8' },
  { feature: 'AI Recommendations', starter: '5/month', pro: 'Unlimited', elite: 'Unlimited' },
  { feature: 'Progress Analytics', starter: 'Basic', pro: 'Advanced', elite: 'Advanced' },
  { feature: 'Career Coach', starter: '✗', pro: '✗', elite: '✓' },
  { feature: 'Certificates', starter: '✗', pro: '✓', elite: '✓' },
  { feature: 'Job Placement Support', starter: '✗', pro: '✗', elite: '✓' },
  { feature: 'Support', starter: 'Email', pro: 'Priority 24hr', elite: 'Dedicated' },
];

const faqs = [
  { q: 'Can I switch plans?', a: 'Yes, upgrade or downgrade anytime. Billing is adjusted proportionally.' },
  { q: 'Is there a free trial?', a: 'Yes! All plans include a 14-day free trial with no credit card required.' },
  { q: 'How do mentor sessions work?', a: 'Book sessions directly through the platform. You choose the mentor, time, and topic.' },
  { q: 'What payment methods are accepted?', a: 'UPI, Credit/Debit cards, Net Banking, and EMI options for Indian users.' },
];

const Pricing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-80 h-80 bg-green-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full text-sm font-medium mb-4">Pricing</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Simple, <span className="text-gradient">Transparent</span> Pricing
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto">
            No hidden fees. Cancel anytime. Invest in yourself and see the ROI.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div key={i} className={`relative p-6 bg-card rounded-2xl border-2 ${plan.color} ${i === 1 ? 'scale-105 shadow-2xl shadow-green-500/10' : ''} card-hover`}>
                {plan.badge && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full text-xs font-bold text-white ${i === 1 ? 'bg-green-500' : 'bg-blue-500'}`}>
                    {plan.badge}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.desc}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">₹{plan.price.toLocaleString()}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">₹{plan.annualPrice.toLocaleString()}/month billed annually</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className={`block text-center font-semibold py-3 rounded-xl transition-all ${plan.btnClass}`}>
                  Start Free Trial
                </Link>
                <p className="text-xs text-muted-foreground text-center mt-3">No credit card required</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">
            Compare <span className="text-gradient">Plans</span>
          </h2>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left px-5 py-4 text-foreground font-semibold">Features</th>
                    {plans.map(p => (
                      <th key={p.name} className={`text-center px-4 py-4 font-bold ${p.name === 'Pro' ? 'text-green-500' : 'text-foreground'}`}>{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {comparisons.map((row, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 text-foreground">{row.feature}</td>
                      {[row.starter, row.pro, row.elite].map((val, j) => (
                        <td key={j} className={`px-4 py-3.5 text-center ${val === '✗' ? 'text-red-400' : val === '✓' ? 'text-green-500' : 'text-muted-foreground'} font-medium`}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">What Subscribers Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Ananya S.', role: 'Pro subscriber • SDE @ Amazon', text: 'The Pro plan paid for itself in the first month. Got my Amazon offer 4 months after joining.', stars: 5 },
              { name: 'Karthik N.', role: 'Elite subscriber • PM @ Swiggy', text: 'The career coach sessions were incredible. My resume went from 0 callbacks to 5 interviews in 2 weeks.', stars: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.stars)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-10">Pricing FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-green-500 to-emerald-600">
        <div className="max-w-3xl mx-auto text-center">
          <Zap className="w-10 h-10 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">Start Your Free 14-Day Trial Today</h2>
          <p className="text-green-50 mb-8">No credit card required. Cancel anytime.</p>
          <Link to="/register" className="inline-block px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-green-50 transition-colors">
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
