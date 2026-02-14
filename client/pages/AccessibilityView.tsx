
import React from 'react';
import { 
  Eye, Type, Headphones, Keyboard, MousePointerClick, 
  FileText, Settings, Globe, LifeBuoy, MessageSquare, 
  ShieldCheck, Zap, ArrowRight, CheckCircle 
} from 'lucide-react';

const AccessibilityView: React.FC = () => {
  const accessibilityFeatures = [
    { 
      icon: <Eye />, 
      title: "Visual Support", 
      desc: "We provide high-contrast text ratios (at least 4.5:1) and support browser-based zooming up to 200% without loss of functionality.",
      color: "bg-orange-50 text-orange-600"
    },
    { 
      icon: <Keyboard />, 
      title: "Keyboard Only", 
      desc: "Our platform is fully navigable using only a keyboard. We use logical tab orders and visible focus indicators.",
      color: "bg-blue-50 text-blue-600"
    },
    { 
      icon: <Headphones />, 
      title: "Screen Readers", 
      desc: "Full support for ARIA labels and semantic HTML, ensuring screen readers like NVDA and VoiceOver can interpret all content.",
      color: "bg-emerald-50 text-emerald-600"
    },
    { 
      icon: <MousePointerClick />, 
      title: "Clickable Areas", 
      desc: "All interactive elements have a minimum target size of 44x44 pixels to ensure ease of use for those with motor impairments.",
      color: "bg-purple-50 text-purple-600"
    },
    { 
      icon: <FileText />, 
      title: "Alt Text", 
      desc: "Every meaningful image on Traver includes descriptive alternative text to provide context for non-visual users.",
      color: "bg-rose-50 text-rose-600"
    },
    { 
      icon: <Zap />, 
      title: "Motion Control", 
      desc: "We respect 'prefers-reduced-motion' settings. Complex animations can be disabled or minimized through system settings.",
      color: "bg-amber-50 text-amber-600"
    }
  ];

  const standards = [
    { title: "WCAG 2.1 AA", desc: "Our primary target for all web development and design." },
    { title: "ARIA 1.1", desc: "Using advanced attributes for complex interactive components." },
    { title: "Semantic HTML5", desc: "Building with meaningful tags for machine readability." }
  ];

  return (
    <div className="font-sans animate-fade-in-up overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <span className="text-orange-500 font-bold tracking-[0.2em] text-sm uppercase mb-6 block">Inclusivity Matters</span>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8 font-heading leading-tight">
              Travel Should Be <br /> Accessible To <span className="text-orange-500 italic">Everyone</span>
            </h1>
            <p className="text-gray-500 text-xl font-medium max-w-3xl leading-relaxed">
              At Traver, we believe that exploring the world shouldn't be limited by physical or cognitive barriers. We are committed to digital excellence for all our users.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles (POUR) */}
      <section className="py-24 bg-gray-50 rounded-[4rem] mx-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {[
              { label: "Perceivable", desc: "Information and UI components must be presentable to users in ways they can perceive." },
              { label: "Operable", desc: "User interface components and navigation must be operable by all input methods." },
              { label: "Understandable", desc: "Information and the operation of the user interface must be easy to comprehend." },
              { label: "Robust", desc: "Content must be robust enough to be interpreted by a wide variety of user agents." },
            ].map((p, i) => (
              <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50">
                 <span className="text-4xl font-black text-orange-100 mb-4 block font-heading">{i + 1}</span>
                 <h3 className="text-xl font-black text-gray-900 mb-3 font-heading">{p.label}</h3>
                 <p className="text-sm text-gray-400 font-medium leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-black text-gray-900 mb-4 font-heading">Our Accessibility Features</h2>
            <p className="text-gray-500 font-medium">Specific technical enhancements we've built into the platform.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {accessibilityFeatures.map((f, i) => (
              <div key={i} className="group p-10 bg-white rounded-[3.5rem] border border-gray-100 hover:shadow-2xl hover:border-orange-100 transition-all duration-500">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${f.color} group-hover:scale-110 transition-transform`}>
                   {React.cloneElement(f.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-4 font-heading">{f.title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts Table */}
      <section className="py-24 bg-gray-900 rounded-[5rem] mx-4 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[100px]"></div>
        <div className="max-w-5xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <Keyboard className="w-12 h-12 text-orange-500 mx-auto mb-6" />
            <h2 className="text-4xl font-black font-heading mb-4">Quick Navigation</h2>
            <p className="text-gray-400">Use these keyboard shortcuts for a faster experience.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { key: "Tab", action: "Navigate between interactive elements" },
              { key: "Enter / Space", action: "Activate buttons or open links" },
              { key: "Esc", action: "Close popups, dropdowns, or calendars" },
              { key: "Arrow Keys", action: "Navigate through sliders or date pickers" },
              { key: "H", action: "Jump to the next major heading" },
              { key: "L", action: "Quickly access the Login screen" },
            ].map((s, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 group hover:bg-white/10 transition-colors">
                <span className="font-bold text-gray-300">{s.action}</span>
                <kbd className="px-3 py-1 bg-orange-500 rounded-lg text-xs font-black shadow-lg shadow-orange-500/20">{s.key}</kbd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-8 font-heading">Our Technical Commitment</h2>
              <div className="space-y-8">
                 {standards.map((s, i) => (
                   <div key={i} className="flex gap-6 group">
                      <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all shrink-0">
                         <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="text-xl font-black text-gray-900 mb-1">{s.title}</h4>
                         <p className="text-gray-500 font-medium">{s.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-12 rounded-[4rem] border border-gray-100">
               <h3 className="text-2xl font-black text-gray-900 mb-6 font-heading">Continuous Improvement</h3>
               <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                 Web accessibility is an ongoing journey. We perform manual audits every month using screen readers and automated tools to catch any new issues that may arise during platform updates.
               </p>
               <div className="p-8 bg-white rounded-3xl border border-gray-100 flex items-center gap-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                     <Settings className="w-8 h-8 text-orange-500 animate-spin-slow" />
                  </div>
                  <div>
                     <p className="text-sm font-black text-gray-900 uppercase tracking-widest">Last Audit Date</p>
                     <p className="text-orange-500 font-bold">February 14, 2025</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support / Feedback Callout */}
      <section className="py-32 bg-orange-50 rounded-[4rem] mx-4 mb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-100 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
           <LifeBuoy className="w-16 h-16 text-orange-500 mx-auto mb-8" />
           <h2 className="text-5xl font-black text-gray-900 mb-6 font-heading">Encountered A Barrier?</h2>
           <p className="text-gray-500 text-lg font-medium mb-12">
             If you are having trouble accessing any part of our website, we want to hear from you. Your feedback helps us build a more inclusive travel platform for everyone.
           </p>
           <div className="flex flex-wrap justify-center gap-6">
              <button className="px-12 py-5 bg-gray-900 text-white font-black rounded-2xl shadow-xl hover:bg-orange-500 transition-all flex items-center gap-3">
                 <Mail className="w-5 h-5" /> Email Accessibility Team
              </button>
              <button className="px-12 py-5 bg-white text-gray-900 font-black rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all flex items-center gap-3">
                 <MessageSquare className="w-5 h-5" /> Submit Feedback
              </button>
           </div>
        </div>
      </section>
    </div>
  );
};

/* Extra icons/styles */
const Mail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

export default AccessibilityView;
