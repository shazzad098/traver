
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left - Images Collage */}
          <div className="relative flex gap-6">
            <div className="flex flex-col gap-6 pt-12">
               <img 
                src="https://picsum.photos/seed/dest1/300/400" 
                alt="Destination" 
                className="w-48 h-64 object-cover rounded-[2.5rem] shadow-2xl -rotate-6 transform hover:rotate-0 transition-transform duration-500"
              />
               <img 
                src="https://picsum.photos/seed/dest2/300/400" 
                alt="Destination" 
                className="w-48 h-64 object-cover rounded-[2.5rem] shadow-2xl rotate-3 transform hover:rotate-0 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col gap-6">
               <img 
                src="https://picsum.photos/seed/dest3/300/400" 
                alt="Destination" 
                className="w-64 h-80 object-cover rounded-[3rem] shadow-2xl translate-y-6 hover:scale-105 transition-transform duration-500"
              />
               <img 
                src="https://picsum.photos/seed/dest4/300/400" 
                alt="Destination" 
                className="w-64 h-80 object-cover rounded-[3rem] shadow-2xl translate-y-6 hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-orange-500 font-bold tracking-widest text-xs uppercase">About Us</span>
              <div className="h-0.5 w-12 bg-orange-500"></div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6 font-heading">
              We Recommend <br />
              <span className="italic text-orange-500">Beautiful</span> Destinations <br />
              Every Month
            </h2>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed font-medium">
              Let's choose your dream destinations here we provide many destinations and we offer the best destinations every week.
            </p>

            <div className="flex flex-wrap gap-12 bg-orange-50 p-10 rounded-[2.5rem] border border-orange-100">
              <div className="text-center">
                <p className="text-4xl font-extrabold text-gray-900 mb-1 font-heading">2000+</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Explorers</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-extrabold text-gray-900 mb-1 font-heading">100+</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Destinations</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-extrabold text-gray-900 mb-1 font-heading">20+</p>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Years Exp.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
