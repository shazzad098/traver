import React from 'react';
import { Handshake, Building2, Rocket } from 'lucide-react';

const PartnerView: React.FC = () => {
  return (
    <div className="animate-fade-in-up py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gray-900 rounded-[5rem] px-8 py-24 text-center text-white relative overflow-hidden mb-24">
           <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 blur-[120px]"></div>
           <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Partner with <span className="text-orange-500">Traver</span></h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto font-medium mb-12">Join our network of 500+ global partners and reach millions of active travelers looking for their next stay.</p>
              <button className="px-12 py-5 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/20">Become a Partner</button>
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { title: "Hotels & Stays", icon: <Building2 />, desc: "List your property and manage bookings through our advanced dashboard." },
            { title: "Influencers", icon: <Rocket />, desc: "Join our affiliate program and earn rewards for sharing your adventures." },
            { title: "Travel Agencies", icon: <Handshake />, desc: "Offer your tour packages to a broader audience on our platform." },
          ].map((card, i) => (
            <div key={i} className="bg-gray-50 p-12 rounded-[3.5rem] border border-gray-100 hover:shadow-2xl transition-all hover:bg-white">
               <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-orange-500 mb-8 shadow-xl shadow-orange-100">
                  {/* Fixed TypeScript error by adding <any> to ReactElement type to allow className prop injection */}
                  {React.cloneElement(card.icon as React.ReactElement<any>, { className: "w-10 h-10" })}
               </div>
               <h3 className="text-2xl font-black text-gray-900 mb-4">{card.title}</h3>
               <p className="text-gray-500 font-medium leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerView;