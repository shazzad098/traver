import React from 'react';
import { Sparkles, Timer, Zap } from 'lucide-react';

const NewView: React.FC = () => {
  const news = [
    { title: "Limited 50% Off Summer Vibe", date: "Expires in 2 days", icon: <Timer />, color: "bg-blue-500" },
    { title: "New Route: Maldives Island Hopping", date: "Just launched", icon: <Zap />, color: "bg-orange-500" },
    { title: "Premium Membership Rewards", date: "Available now", icon: <Sparkles />, color: "bg-purple-500" },
  ];

  return (
    <div className="animate-fade-in-up py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">What's New at Traver</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">Stay updated with our latest routes, limited offers, and platform features designed to enhance your journey.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {news.map((item, i) => (
            <div key={i} className="bg-white p-10 rounded-[3rem] border border-gray-100 hover:shadow-2xl transition-all group">
              <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform`}>
                {/* Fixed TypeScript error by adding <any> to ReactElement type to allow className prop injection */}
                {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-orange-500 font-bold text-sm uppercase tracking-widest">{item.date}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 rounded-[4rem] overflow-hidden relative h-[400px]">
          <img src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Banner" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-8">
             <div className="max-w-xl">
               <h2 className="text-4xl font-black text-white mb-6">Discover Undiscovered Paths</h2>
               <p className="text-white/80 font-medium mb-8">We've just added 50+ remote locations to our catalog. Be the first to explore the hidden beauty of the world.</p>
               <button className="px-10 py-4 bg-white text-gray-900 font-bold rounded-2xl hover:bg-orange-500 hover:text-white transition-all">Explore Catalog</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewView;