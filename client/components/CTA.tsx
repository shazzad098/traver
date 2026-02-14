
import React from 'react';
import { Sparkles } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-orange-500 rounded-[4rem] px-8 py-24 text-center relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(249,115,22,0.4)]">
          {/* Explosive Doodles */}
          <div className="absolute top-10 left-10 text-white/20 animate-float">
            <svg width="100" height="100" viewBox="0 0 100 100">
               <path d="M50 0 L55 45 L100 50 L55 55 L50 100 L45 55 L0 50 L45 45 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute bottom-10 right-10 text-white/20 animate-float" style={{ animationDelay: '1s' }}>
            <svg width="80" height="80" viewBox="0 0 100 100">
               <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
            </svg>
          </div>
          
          <div className="relative z-10 text-white">
            <div className="flex justify-center mb-8">
               <div className="p-5 bg-white/10 backdrop-blur-md rounded-3xl animate-bounce-slow">
                  <Sparkles className="w-12 h-12 text-white" />
               </div>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black leading-tight mb-8 font-heading">
              Don't Miss The <span className="text-orange-200 italic">50%</span> <br /> Discount & Explore
            </h2>
            <p className="text-orange-50/80 mb-12 max-w-2xl mx-auto font-medium text-xl leading-relaxed">
              We have many special offers especially for you. Start your beautiful journey with our premium travel packages.
            </p>
            <button className="px-16 py-6 bg-white text-orange-500 font-black rounded-[2rem] hover:bg-orange-50 transition-all shadow-2xl shadow-black/10 hover:scale-105 active:scale-95 text-lg">
              Get Started Now
            </button>

            {/* Scribble Doodle Under Button */}
            <div className="flex justify-center mt-6">
              <svg width="200" height="20" viewBox="0 0 200 20" className="text-white/40">
                <path className="doodle-path" d="M0,10 Q50,0 100,10 T200,10" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
