
import React, { useEffect, useRef, useState } from 'react';
import { Target, History, Users as UsersIcon, Award, Globe, Heart, ShieldCheck, Zap, ArrowRight, Instagram, Twitter, Linkedin, CheckCircle } from 'lucide-react';

const AboutView: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const stats = [
    { label: "Happy Travelers", value: "2M+", icon: <UsersIcon className="w-6 h-6" /> },
    { label: "Destinations", value: "150+", icon: <Globe className="w-6 h-6" /> },
    { label: "Local Partners", value: "500+", icon: <Heart className="w-6 h-6" /> },
    { label: "Years Excellence", value: "12+", icon: <Award className="w-6 h-6" /> },
  ];

  const values = [
    { title: "Trust & Safety", desc: "Every partner is manually verified by our team to ensure your safety and comfort.", icon: <ShieldCheck />, color: "bg-emerald-50 text-emerald-500" },
    { title: "Authenticity", desc: "We focus on real local experiences, not just the typical tourist traps.", icon: <Target />, color: "bg-orange-50 text-orange-500" },
    { title: "Innovation", desc: "Using AI and smart tech to make planning your trip as effortless as dreaming about it.", icon: <Zap />, color: "bg-blue-50 text-blue-500" },
    { title: "Sustainability", desc: "We are committed to preserving the planet's beauty through eco-friendly tourism.", icon: <Globe />, color: "bg-cyan-50 text-cyan-500" },
  ];

  const team = [
    { name: "Sarah Jenkins", role: "CEO & Founder", img: "https://i.pravatar.cc/300?u=sarah", bio: "Former flight lead with 15 years in luxury tourism." },
    { name: "Michael Chen", role: "Head of Operations", img: "https://i.pravatar.cc/300?u=mike", bio: "Ensuring every logistics detail is perfect for your stay." },
    { name: "Elena Rodriguez", role: "Creative Director", img: "https://i.pravatar.cc/300?u=elena", bio: "Designing the visual stories that inspire your next trip." },
    { name: "David Park", role: "Chief Technology", img: "https://i.pravatar.cc/300?u=david", bio: "Leading the engineering team behind the Traver app." },
  ];

  const timelineSteps = [
    { year: "2012", title: "The First Step", desc: "Started as a small local tour provider in Bali with just 2 guides and a shared dream." },
    { year: "2016", title: "Digital Transformation", desc: "Launched our first web platform, reaching travelers in over 20 countries across Asia." },
    { year: "2020", title: "Resilience & Growth", desc: "Doubled down on safety standards and sustainable travel during the global pandemic." },
    { year: "2024", title: "The Next Frontier", desc: "Reached 2 million travelers and expanded our network to every continent." },
  ];

  // Scroll logic for Timeline
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const centerLine = viewportHeight / 2;

      // Progress Calculation
      const startTrigger = rect.top;
      const timelineHeight = rect.height;
      const progress = Math.max(0, Math.min(1, (centerLine - startTrigger) / timelineHeight));
      setScrollProgress(progress);

      // Active Items Calculation
      const newActiveIndices: number[] = [];
      const steps = timelineRef.current.querySelectorAll('.timeline-step');
      steps.forEach((step, index) => {
        const stepRect = step.getBoundingClientRect();
        // Item is active if its center is near the viewport center
        const itemCenter = stepRect.top + stepRect.height / 2;
        if (itemCenter < centerLine + 100 && itemCenter > centerLine - 100) {
          newActiveIndices.push(index);
        }
      });
      setActiveIndices(newActiveIndices);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="animate-fade-in-up">
              <span className="text-orange-500 font-bold tracking-[0.2em] text-sm uppercase mb-6 block">Our Story</span>
              <h1 className="text-6xl lg:text-8xl font-black text-gray-900 mb-8 leading-[1.1] font-heading">
                We Live For <br />
                <span className="text-orange-500 italic">Adventure</span> & Discovery.
              </h1>
              <p className="text-gray-500 text-xl font-medium leading-relaxed max-w-xl mb-12">
                Since 2012, Traver has been more than just a booking site. We're a community of dreamers and explorers dedicated to making travel the best part of life.
              </p>
              <div className="flex flex-wrap gap-6">
                 <button className="px-10 py-5 bg-gray-900 text-white font-black rounded-2xl hover:bg-orange-500 transition-all shadow-2xl shadow-gray-200">Our Mission</button>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center animate-pulse">
                       <Zap className="w-5 h-5 text-orange-500" />
                    </div>
                    <span className="font-bold text-gray-400 text-sm uppercase tracking-widest">Est. 2012</span>
                 </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-100 rounded-full blur-[100px] opacity-60"></div>
              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-6 pt-12">
                    <img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=600" className="rounded-[3rem] shadow-2xl h-80 w-full object-cover" alt="Adventure" />
                    <div className="bg-orange-500 p-8 rounded-[3rem] text-white">
                       <p className="text-4xl font-black mb-2 font-heading">12Y</p>
                       <p className="text-xs font-bold uppercase tracking-widest opacity-80">Experience</p>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div className="bg-gray-100 p-8 rounded-[3rem] text-gray-800">
                       <p className="text-4xl font-black mb-2 font-heading">2M+</p>
                       <p className="text-xs font-bold uppercase tracking-widest opacity-50">Explorers</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600" className="rounded-[3rem] shadow-2xl h-80 w-full object-cover" alt="Beach" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gray-50 mx-4 rounded-[4rem]">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-6 p-6 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                   <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-xl shadow-gray-100">
                      {stat.icon}
                   </div>
                   <div>
                      <p className="text-3xl font-black text-gray-900 font-heading">{stat.value}</p>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative animate-fade-in-up">
               <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=1000" className="rounded-[4rem] shadow-3xl border-8 border-white" alt="Mission" />
               <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-50 animate-bounce-slow">
                  <Heart className="w-12 h-12 text-rose-500 fill-rose-500" />
               </div>
            </div>
            
            <div className="order-1 lg:order-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-orange-500 font-bold tracking-[0.2em] text-sm uppercase mb-6 block">Our Core Drive</span>
              <h2 className="text-5xl font-black text-gray-900 mb-8 leading-tight font-heading">
                We're on a mission to <br /> make the <span className="text-orange-500">World</span> feel smaller.
              </h2>
              <p className="text-gray-500 text-lg font-medium leading-relaxed mb-10">
                We believe that travel is the ultimate form of education. It breaks down barriers, fosters empathy, and reminds us that no matter where we come from, we all share one beautiful home.
              </p>
              
              <div className="space-y-6">
                {[
                  "We manually verify every single location in our catalog.",
                  "Our platform is built to support local economies directly.",
                  "We provide 24/7 human support for every traveler."
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                       <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-32 bg-gray-900 rounded-[5rem] mx-4 overflow-hidden relative text-white">
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
           <div className="text-center mb-24">
              <span className="text-orange-500 font-bold tracking-[0.2em] text-sm uppercase mb-4 block">Our DNA</span>
              <h2 className="text-5xl font-black font-heading">The Values That Guide Us</h2>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <div key={i} className="p-10 rounded-[3.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                   <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 ${v.color} group-hover:scale-110 transition-transform`}>
                      {React.cloneElement(v.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                   </div>
                   <h4 className="text-2xl font-black mb-4 font-heading">{v.title}</h4>
                   <p className="text-gray-400 font-medium leading-relaxed">{v.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-24">
              <div className="max-w-2xl">
                 <span className="text-orange-500 font-bold tracking-[0.2em] text-sm uppercase mb-4 block">Leadership</span>
                 <h2 className="text-5xl font-black text-gray-900 font-heading">Meet the Minds Behind <span className="text-orange-500">Traver</span></h2>
              </div>
              <p className="text-gray-500 font-medium lg:max-w-xs">A group of diverse explorers working together to redefine global travel.</p>
           </div>

           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {team.map((member, i) => (
                <div key={i} className="group animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                   <div className="relative mb-8 aspect-[4/5] overflow-hidden rounded-[3rem] border-8 border-gray-50 group-hover:border-orange-50 transition-all duration-700">
                      <img src={member.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" alt={member.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 gap-4">
                         <div className="flex gap-3">
                            <button className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl hover:bg-orange-500 transition-colors text-white">
                               <Linkedin className="w-4 h-4" />
                            </button>
                            <button className="p-2.5 bg-white/20 backdrop-blur-md rounded-xl hover:bg-orange-500 transition-colors text-white">
                               <Twitter className="w-4 h-4" />
                            </button>
                         </div>
                      </div>
                   </div>
                   <h3 className="text-2xl font-black text-gray-900 mb-2 font-heading">{member.name}</h3>
                   <p className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-4">{member.role}</p>
                   <p className="text-gray-500 font-medium text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-48 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative">
           <div className="text-center mb-32">
              <span className="text-orange-500 font-bold tracking-[0.2em] text-sm uppercase mb-4 block">Our Journey</span>
              <h2 className="text-5xl font-black text-gray-900 font-heading">The Traver Evolution</h2>
           </div>
           
           <div ref={timelineRef} className="relative space-y-32">
              {/* Static Background Line */}
              <div className="absolute left-[50%] top-0 bottom-0 w-1.5 bg-gray-200 -translate-x-1/2 hidden lg:block rounded-full"></div>
              
              {/* Dynamic Progress Line */}
              <div 
                className="absolute left-[50%] top-0 w-1.5 bg-orange-500 -translate-x-1/2 hidden lg:block rounded-full transition-all duration-300 ease-out"
                style={{ height: `${scrollProgress * 100}%`, boxShadow: '0 0 15px rgba(249, 115, 22, 0.4)' }}
              >
                 {/* Glowing Light Cursor */}
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-4 border-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,1)]">
                   <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-75"></div>
                 </div>
              </div>

              {timelineSteps.map((step, i) => {
                const isActive = activeIndices.includes(i);
                return (
                  <div 
                    key={i} 
                    className={`timeline-step flex flex-col lg:flex-row items-center gap-12 relative transition-all duration-700 ease-in-out ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} ${isActive ? 'scale-105' : 'scale-95 opacity-40 grayscale'}`}
                  >
                     <div className="lg:w-1/2 flex justify-center lg:justify-end lg:pr-24 lg:odd:pr-0 lg:even:pl-24">
                        <div className={`p-12 rounded-[4rem] transition-all duration-700 relative overflow-hidden ${isActive ? 'bg-white shadow-3xl shadow-orange-100/50 border-orange-200' : 'bg-white/50 border-transparent'} border-2 max-w-md`}>
                           {/* Background Sparkle for active card */}
                           {isActive && <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-50"></div>}
                           
                           <span className={`text-6xl font-black mb-6 block font-heading transition-colors duration-700 ${isActive ? 'text-orange-500' : 'text-gray-200'}`}>{step.year}</span>
                           <h4 className={`text-3xl font-black mb-4 font-heading transition-colors duration-700 ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>{step.title}</h4>
                           <p className={`font-medium leading-relaxed transition-colors duration-700 ${isActive ? 'text-gray-500' : 'text-gray-300'}`}>{step.desc}</p>
                        </div>
                     </div>
                     
                     {/* Static Year Dot for Mobile/Small Screen */}
                     <div className={`w-10 h-10 rounded-full border-8 border-white shadow-xl relative z-10 hidden lg:block transition-all duration-700 ${isActive ? 'bg-orange-500 scale-125' : 'bg-gray-300 scale-100'}`}></div>
                     
                     <div className="lg:w-1/2"></div>
                  </div>
                );
              })}
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 text-center bg-white">
        <div className="max-w-4xl mx-auto px-4">
           <h2 className="text-5xl font-black text-gray-900 mb-8 font-heading">Ready to Start Your <span className="text-orange-500">Journey</span> With Us?</h2>
           <p className="text-gray-500 text-lg font-medium mb-12 max-w-2xl mx-auto">Whether you're looking for a peaceful getaway or an adrenaline-packed adventure, we're here to guide you every step of the way.</p>
           <button className="px-12 py-5 bg-orange-500 text-white font-black rounded-2xl shadow-2xl shadow-orange-100 hover:bg-orange-600 transition-all flex items-center justify-center gap-3 mx-auto group">
              Join Traver Today <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
           </button>
        </div>
      </section>
    </div>
  );
};

export default AboutView;
