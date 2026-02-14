
import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';

const OurTeamView: React.FC = () => {
  const leaders = [
    { name: "Sarah Jenkins", role: "CEO & Founder", bio: "Ex-Google traveler with a passion for island hopping.", img: "https://i.pravatar.cc/300?u=sarah" },
    { name: "Michael Chen", role: "Head of Operations", bio: "Ensuring your flights are always on time.", img: "https://i.pravatar.cc/300?u=mike" },
    { name: "Elena Rodriguez", role: "Chief Content Officer", bio: "The eyes behind our beautiful destinations.", img: "https://i.pravatar.cc/300?u=elena" },
    { name: "David Park", role: "CTO", bio: "Building the engine that powers your dreams.", img: "https://i.pravatar.cc/300?u=david" },
  ];

  return (
    <div className="animate-fade-in-up py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-4 block">Our People</span>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-8">Meet the Dream Team</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">We're a group of travelers, creators, and problem solvers working together to build something beautiful.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {leaders.map((person, i) => (
            <div key={i} className="group">
              <div className="relative mb-8 aspect-square overflow-hidden rounded-[3rem] border-8 border-gray-50 group-hover:border-orange-50 transition-all duration-500">
                 <img src={person.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" alt={person.name} />
                 <div className="absolute inset-0 bg-gradient-to-t from-orange-500/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8 gap-4">
                    <button className="p-3 bg-white rounded-xl hover:scale-110 transition-transform"><Linkedin className="w-5 h-5 text-orange-500" /></button>
                    <button className="p-3 bg-white rounded-xl hover:scale-110 transition-transform"><Twitter className="w-5 h-5 text-orange-500" /></button>
                 </div>
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{person.name}</h3>
              <p className="text-orange-500 font-bold text-sm uppercase tracking-wider mb-4">{person.role}</p>
              <p className="text-gray-400 font-medium text-sm leading-relaxed">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurTeamView;
