import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Linkedin, Twitter, Instagram, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    toast.success('Message sent! We\'ll respond within 24 hours.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-32 hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full text-sm font-medium mb-4">Contact Us</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            We're Here to <span className="text-gradient">Help You</span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto">
            Have questions about RightStep? Our team is ready to help you take your next right step.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Get in Touch</h2>
                <p className="text-muted-foreground">Our team responds within 24 hours on business days.</p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: 'Email', val: 'hello@rightstep.ai', href: 'mailto:hello@rightstep.ai' },
                  { icon: Phone, label: 'Phone', val: '+91 12345 67890', href: 'tel:+911234567890' },
                  { icon: MapPin, label: 'Address', val: 'Koramangala, Bengaluru, Karnataka 560034', href: '#' },
                  { icon: Clock, label: 'Support Hours', val: 'Mon–Sat: 9 AM – 7 PM IST', href: '#' },
                ].map(item => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 p-4 bg-card border border-border rounded-2xl hover:border-green-500/50 transition-colors group"
                  >
                    <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-500 transition-colors">
                      <item.icon className="w-5 h-5 text-green-500 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-medium text-foreground">{item.val}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Follow Us</h3>
                <div className="flex gap-2">
                  {[
                    { icon: Linkedin, href: 'https://linkedin.com', color: 'hover:bg-blue-500' },
                    { icon: Twitter, href: 'https://twitter.com', color: 'hover:bg-sky-400' },
                    { icon: Instagram, href: 'https://instagram.com', color: 'hover:bg-pink-500' },
                  ].map(({ icon: Icon, href, color }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-card border border-border rounded-xl flex items-center justify-center text-muted-foreground ${color} hover:text-white transition-all`}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">We've received your message and will get back to you within 24 hours.</p>
                    <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="btn-primary px-6 py-2.5 text-sm">
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground mb-6">Send Us a Message</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-1.5">Full Name</label>
                        <input
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-green-500 transition-colors"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-1.5">Email</label>
                        <input
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-green-500 transition-colors"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1.5">Subject</label>
                      <select
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground focus:outline-none focus:border-green-500 transition-colors"
                      >
                        <option value="">Select a topic</option>
                        <option>General Inquiry</option>
                        <option>Technical Support</option>
                        <option>Billing & Payments</option>
                        <option>Mentor Application</option>
                        <option>Partnership</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1.5">Message</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-green-500 transition-colors resize-none"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>
                    <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-60">
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <><Send className="w-4 h-4" /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Common Questions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { q: 'How quickly do you respond?', a: 'Within 24 hours on business days. Critical issues within 4 hours.' },
              { q: 'Can I get a product demo?', a: 'Yes! Book a free 30-minute demo with our team anytime.' },
              { q: 'Do you have a WhatsApp support?', a: 'Yes, reach us on WhatsApp at +91 98765 43210 for quick queries.' },
              { q: 'Where are you based?', a: 'Headquartered in Bengaluru, India. We serve users pan-India.' },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{item.q}</h3>
                    <p className="text-muted-foreground text-sm">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
