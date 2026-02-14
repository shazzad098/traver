
import React from 'react';
import { Briefcase, MapPin, DollarSign } from 'lucide-react';

const CareersView: React.FC = () => {
  const jobs = [
    { title: "Senior Travel Consultant", type: "Full-time", loc: "Remote", pay: "$60k - $80k" },
    { title: "Frontend Engineer (React)", type: "Full-time", loc: "Singapore / Remote", pay: "$80k - $120k" },
    { title: "Regional Manager - SEA", type: "Contract", loc: "Bangkok", pay: "$50k - $70k" },
    { title: "Customer Success Lead", type: "Full-time", loc: "London", pay: "$55k - $75k" },
  ];

  return (
    <div className="animate-fade-in-up py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          <div>
            <h1 className="text-5xl font-black text-gray-900 mb-8">Join Our Global <br/><span className="text-orange-500">Adventure</span></h1>
            <p className="text-gray-500 text-lg font-medium leading-relaxed mb-10">We are a team of explorers, engineers, and storytellers on a mission to make world travel accessible to everyone. We offer flexible work, travel credits, and a culture of curiosity.</p>
            <button className="px-10 py-5 bg-orange-500 text-white font-bold rounded-2xl shadow-xl shadow-orange-100 hover:bg-orange-600 transition-all">View All Positions</button>
          </div>
          <div className="relative">
             <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" className="rounded-[3rem] shadow-2xl rotate-3" alt="Team" />
             <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                <p className="text-3xl font-black text-orange-500">4.9/5</p>
                <p className="text-xs font-bold text-gray-400 uppercase">Glassdoor Rating</p>
             </div>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 mb-12">Open Opportunities</h2>
        <div className="space-y-6">
          {jobs.map((job, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 hover:border-orange-200 transition-all flex flex-col md:flex-row justify-between items-center gap-6 group">
              <div className="flex items-center gap-6">
                 <div className="bg-gray-50 p-4 rounded-2xl group-hover:bg-orange-50 transition-colors">
                   <Briefcase className="w-6 h-6 text-orange-500" />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                   <div className="flex flex-wrap gap-4 mt-1">
                      <span className="flex items-center gap-1 text-xs font-bold text-gray-400"><MapPin className="w-3 h-3"/> {job.loc}</span>
                      <span className="flex items-center gap-1 text-xs font-bold text-orange-400"><DollarSign className="w-3 h-3"/> {job.pay}</span>
                      <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-wider">{job.type}</span>
                   </div>
                 </div>
              </div>
              <button className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl group-hover:bg-orange-500 transition-all">Apply Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareersView;
