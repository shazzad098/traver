
import React from 'react';
import { 
  Compass, ShieldCheck, Zap, Globe, Heart, Headphones, 
  CreditCard, Users, Smartphone, Map, Bell, CloudLightning,
  Search, Palette, CheckCircle, Gift
} from 'lucide-react';

const FeaturesView: React.FC = () => {
  const allFeatures = [
    { title: "24/7 Concierge", desc: "Our dedicated support team is available around the clock to assist with any travel emergencies.", icon: <Headphones />, color: "bg-blue-50 text-blue-500" },
    { title: "Verified Places", desc: "Every single destination and hotel on our platform is hand-picked and personally verified by our experts.", icon: <ShieldCheck />, color: "bg-emerald-50 text-emerald-500" },
    { title: "Smart Itinerary", desc: "Let our AI-powered planner build your perfect schedule based on your interests and travel pace.", icon: <Zap />, color: "bg-amber-50 text-amber-500" },
    { title: "Local Guides", desc: "Connect with certified local guides who know the hidden gems that tourists usually miss.", icon: <Compass />, color: "bg-orange-50 text-orange-500" },
    { title: "Eco-Friendly", desc: "We prioritize green travel options and donate 5% of profits to environmental conservation projects.", icon: <Globe />, color: "bg-cyan-50 text-cyan-500" },
    { title: "Flexible Booking", desc: "Change your plans last minute without heavy fees. We offer 48-hour free cancellation on most bookings.", icon: <Heart />, color: "bg-rose-50 text-rose-500" },
    { title: "Digital Wallet", desc: "Manage payments and rewards in one place with our secure encrypted travel wallet.", icon: <CreditCard />, color: "bg-indigo-50 text-indigo-500" },
    { title: "Group Discounts", desc: "Traveling with friends? Unlock special group rates and shared itinerary management tools.", icon: <Users />, color: "bg-purple-50 text-purple-500" },
    { title: "Mobile Ready", desc: "Access your tickets, maps, and guides offline with our award-winning mobile application.", icon: <Smartphone />, color: "bg-gray-50 text-gray-900" },
    { title: "Custom Maps", desc: "Interactive 3D maps that work offline and highlight your specific interests and saved spots.", icon: <Map />, color: "bg-orange-50 text-orange-600" },
    { title: "Real-time Alerts", desc: "Stay informed with instant notifications about flight changes, weather alerts, and local news.", icon: <Bell />, color: "bg-yellow-50 text-yellow-600" },
    { title: "Weather Forecast", desc: "Advanced hyper-local weather predictions to help you pack and plan activities perfectly.", icon: <CloudLightning />, color: "bg-sky-50 text-sky-500" },
  ];

  const steps = [
    { title: "Search", desc: "Browse thousands of verified destinations.", icon: <Search /> },
    { title: "Customize", desc: "Add activities and tailor to your style.", icon: <Palette /> },
    { title: "Book", desc: "Secure checkout with instant confirmation.", icon: <CheckCircle /> },
    { title: "Enjoy", desc: "Travel with 24/7 support at your side.", icon: <Gift /> },
  ];

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative animate-fade-in-up">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-50"></div>
              <img 
                src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=1000" 
                className="rounded-[4rem] shadow-2xl relative z-10 border-8 border-white" 
                alt="Travel Features" 
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 z-20 animate-bounce-slow">
                 <p className="text-3xl font-black text-orange-500 font-heading">50+</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Exclusive Features</p>
              </div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-4 block">Unmatched Quality</span>
              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-tight font-heading">
                Why Choose <span className="text-orange-500 italic">Traver</span> Over the Rest?
              </h1>
              <p className="text-gray-500 text-lg mb-10 leading-relaxed font-medium">
                We're not just a booking site. We're your travel partner. We provide the tools and support you need to make every journey a once-in-a-lifetime experience.
              </p>
              <button className="px-10 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-orange-500 transition-all shadow-xl shadow-gray-200">
                Download Feature List
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - "How it Works" */}
      <section className="py-24 bg-gray-50 rounded-[5rem] mx-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-gray-900 mb-4 font-heading">How It Works</h2>
            <p className="text-gray-500 font-medium max-w-xl mx-auto">Our seamless process ensures you spend less time planning and more time exploring.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-orange-100 via-orange-300 to-orange-100 -z-0"></div>
            
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 text-center animate-fade-in-up" style={{ animationDelay: `${0.1 * i}s` }}>
                <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-gray-200 border-4 border-gray-50 group hover:border-orange-200 transition-all">
                   <div className="text-orange-500 group-hover:scale-110 transition-transform">
                      {React.cloneElement(step.icon as React.ReactElement<any>, { className: "w-10 h-10" })}
                   </div>
                </div>
                <h4 className="text-xl font-black text-gray-900 mb-3 font-heading">{step.title}</h4>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-4 block">Our Capabilities</span>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 font-heading">Explore Every Tool <br/> We've <span className="text-orange-500">Built For You</span></h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allFeatures.map((f, i) => (
              <div 
                key={i} 
                className="bg-white p-10 rounded-[3.5rem] border border-gray-100 hover:shadow-2xl transition-all group animate-fade-in-up" 
                style={{ animationDelay: `${0.05 * i}s` }}
              >
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 ${f.color} group-hover:scale-110 transition-transform shadow-lg shadow-current/10`}>
                  {React.cloneElement(f.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                </div>
                <h4 className="text-2xl font-black text-gray-800 mb-4 font-heading group-hover:text-orange-500 transition-colors">{f.title}</h4>
                <p className="text-gray-500 leading-relaxed font-medium">{f.desc}</p>
                <div className="mt-8 pt-8 border-t border-gray-50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                   <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Read documentation</span>
                   <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                      <Zap className="w-4 h-4" />
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 mb-24">
        <div className="bg-gray-900 rounded-[4rem] p-12 md:p-20 text-white overflow-hidden relative">
           <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[120px]"></div>
           <div className="relative z-10 grid lg:grid-cols-2 gap-20">
              <div>
                 <h2 className="text-4xl font-black mb-8 leading-tight font-heading">We Put People <br/> <span className="text-orange-500">Before</span> Profits.</h2>
                 <p className="text-gray-400 font-medium mb-12 text-lg">Traditional agencies take a cut and leave. We build the platform that stays with you every kilometer of your journey.</p>
                 <div className="space-y-6">
                    {['No hidden commission fees', 'Human-verified safety standards', 'Direct connection to local guides'].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                         <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-white" />
                         </div>
                         <span className="font-bold text-gray-200">{item}</span>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-8 border border-white/10">
                 <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="space-y-4">
                       <div className="h-40 bg-orange-500 rounded-3xl flex items-center justify-center text-center p-6">
                          <p className="text-sm font-black uppercase tracking-widest">99.9% <br/> Uptime</p>
                       </div>
                       <div className="h-60 bg-white/10 rounded-3xl flex items-center justify-center text-center p-6">
                          <p className="text-sm font-black uppercase tracking-widest">AI <br/> Integrated</p>
                       </div>
                    </div>
                    <div className="space-y-4 pt-8">
                       <div className="h-60 bg-white/10 rounded-3xl flex items-center justify-center text-center p-6">
                          <p className="text-sm font-black uppercase tracking-widest">256-bit <br/> Security</p>
                       </div>
                       <div className="h-40 bg-white/10 rounded-3xl flex items-center justify-center text-center p-6">
                          <p className="text-sm font-black uppercase tracking-widest">Global <br/> CDN</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-32 text-center">
         <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-4xl font-black text-gray-900 mb-8 font-heading">Still Have Questions?</h2>
            <p className="text-gray-500 font-medium mb-12">Our travel specialists are ready to show you how Traver can change the way you see the world.</p>
            <div className="flex flex-wrap justify-center gap-6">
               <button className="px-12 py-5 bg-orange-500 text-white font-black rounded-2xl shadow-2xl shadow-orange-100 hover:bg-orange-600 transition-all">Get Started Free</button>
               <button className="px-12 py-5 bg-white text-gray-900 border border-gray-100 font-black rounded-2xl hover:bg-gray-50 transition-all">Talk to Sales</button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default FeaturesView;
