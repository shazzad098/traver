
import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  // We use a single background image and position it for each grid item to create the "split" effect.
  const splitImageUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000";

  // Grid layout mapping for the right side (based on the user's reference image structure)
  // Each item has a specific grid area and background position to align with the others.
  const gridCells = [
    { area: "col-start-1 col-end-3 row-start-1 row-end-3", pos: "0% 0%", rounded: "rounded-tl-[3rem] rounded-br-[3rem]" },
    { area: "col-start-3 col-end-4 row-start-1 row-end-2", pos: "50% 0%", rounded: "rounded-2xl" },
    { area: "col-start-4 col-end-5 row-start-1 row-end-3", pos: "100% 0%", rounded: "rounded-tr-[3rem] rounded-bl-[3rem]" },
    { area: "col-start-3 col-end-4 row-start-2 row-end-3", pos: "50% 33%", rounded: "rounded-2xl" },
    { area: "col-start-1 col-end-2 row-start-3 row-end-4", pos: "0% 66%", rounded: "rounded-2xl" },
    { area: "col-start-2 col-end-4 row-start-3 row-end-4", pos: "33% 66%", rounded: "rounded-2xl" },
    { area: "col-start-4 col-end-5 row-start-3 row-end-4", pos: "100% 66%", rounded: "rounded-2xl" },
    { area: "col-start-1 col-end-1 row-start-4 row-end-5", pos: "0% 100%", rounded: "rounded-bl-[3rem]" },
    { area: "col-start-2 col-end-4 row-start-4 row-end-5", pos: "50% 100%", rounded: "rounded-2xl" },
    { area: "col-start-4 col-end-5 row-start-4 row-end-5", pos: "100% 100%", rounded: "rounded-br-[3rem]" },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content - Testimonial Card */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-orange-500 font-bold tracking-widest text-sm uppercase">What They Say</span>
              <div className="h-0.5 w-12 bg-orange-500"></div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-12 leading-tight">
              What Our Customer <br /> Say About Us
            </h2>

            <div className="relative bg-[#fff9f1] p-10 rounded-[2.5rem] border border-orange-50 group hover:shadow-xl transition-all duration-500">
               {/* Large Quote Icon positioned in corner */}
               <div className="absolute top-8 right-10 text-orange-200 group-hover:text-orange-300 transition-colors">
                  <Quote className="w-16 h-16 opacity-40" />
               </div>
               
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gray-200 overflow-hidden border-4 border-white shadow-md">
                    <img src="https://i.pravatar.cc/150?u=park" className="w-full h-full object-cover" alt="Park Tayeng" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Park Tayeng</h4>
                    <p className="text-sm text-gray-500 font-semibold">Travel Enthusiast</p>
                  </div>
               </div>

               <p className="text-gray-600 text-lg leading-relaxed mb-8 relative z-10 font-medium">
                 "This platform is very helpful because there are many beautiful destinations here and this platform really helps me in finding beautiful destinations and also very good service so I really like to use Traver when I want to go travelling with my family."
               </p>

               <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
               </div>
            </div>
          </div>

          {/* Right Content - Split Image Grid */}
          <div className="relative p-4 rounded-[3.5rem] border-[3px] border-[#a3bffa] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             <div className="grid grid-cols-4 grid-rows-4 gap-3 h-[550px] relative">
                {gridCells.map((cell, idx) => (
                  <div 
                    key={idx} 
                    className={`${cell.area} ${cell.rounded} overflow-hidden hover:scale-[1.03] transition-transform duration-500 shadow-sm`}
                    style={{
                      backgroundImage: `url(${splitImageUrl})`,
                      backgroundSize: '400% 400%', // Matching our 4x4 logic
                      backgroundPosition: cell.pos,
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                ))}

                {/* Overlapping Glassmorphism Circles - from the first ref image */}
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/2 flex -space-x-12 opacity-80 pointer-events-none">
                  <div className="w-24 h-24 rounded-full border-2 border-white/60 bg-white/20 backdrop-blur-sm"></div>
                  <div className="w-24 h-24 rounded-full border-2 border-white/60 bg-white/20 backdrop-blur-sm"></div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
