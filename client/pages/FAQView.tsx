
import React, { useState } from 'react';
import { Plus, Minus, Search } from 'lucide-react';

const FAQView: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: "How do I cancel my booking?", a: "You can cancel your booking directly from your account dashboard. Most bookings offer free cancellation up to 48 hours before the trip." },
    { q: "Are there any hidden fees?", a: "No, the price you see on the checkout page is exactly what you pay. We are committed to complete transparency." },
    { q: "Can I book for a large group?", a: "Yes, for groups larger than 12 people, please contact our support center for custom group rates and arrangements." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay for your convenience." },
    { q: "How can I become a verified guide?", a: "You can apply through our Partner page. We require certification and a background check for all our verified guides." },
  ];

  return (
    <div className="animate-fade-in-up py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black text-gray-900 mb-6">Common Questions</h1>
          <p className="text-gray-500 font-medium text-lg">Everything you need to know about traveling with Traver.</p>
          
          <div className="mt-12 relative max-w-xl mx-auto">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
             <input type="text" placeholder="Search for answers..." className="w-full pl-16 pr-6 py-5 bg-gray-50 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all font-medium" />
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-[2rem] overflow-hidden transition-all">
               <button 
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full px-10 py-8 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
               >
                  <span className="text-xl font-bold text-gray-800">{faq.q}</span>
                  <div className={`p-2 rounded-xl transition-all ${openIdx === i ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-500'}`}>
                    {openIdx === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
               </button>
               <div className={`transition-all duration-500 overflow-hidden ${openIdx === i ? 'max-h-[300px] bg-gray-50/50' : 'max-h-0'}`}>
                  <p className="px-10 py-8 text-gray-500 leading-relaxed font-medium border-t border-gray-100">{faq.a}</p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQView;
