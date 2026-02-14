import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactView: React.FC = () => {
  return (
    <div className="animate-fade-in-up py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          
          <div className="space-y-12">
             <div>
                <span className="text-orange-500 font-bold tracking-widest text-sm uppercase mb-4 block">Get In Touch</span>
                <h1 className="text-6xl font-black text-gray-900 mb-8 leading-tight">Let's Talk About <br/>Your Next <span className="text-orange-500">Trip</span></h1>
                <p className="text-gray-500 text-xl font-medium leading-relaxed">Our travel experts are ready to help you plan your perfect getaway. Whether it's a honeymoon, a family trip, or a solo adventure, we've got you covered.</p>
             </div>

             <div className="grid sm:grid-cols-2 gap-10">
                {[
                  { icon: <Phone />, title: "Phone", val: "+1 (555) 000-0000" },
                  { icon: <Mail />, title: "Email", val: "hello@traver.com" },
                  { icon: <MapPin />, title: "Address", val: "123 Adventure St, Singapore" },
                  { icon: <Clock />, title: "Hours", val: "24/7 Support" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 min-w-[3rem] bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                      {/* Fixed TypeScript error by adding <any> to ReactElement type to allow className prop injection */}
                      {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider">{item.title}</h4>
                      <p className="text-gray-500 font-medium">{item.val}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-gray-50 p-12 rounded-[4rem] border border-gray-100 shadow-2xl shadow-gray-100/50">
             <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Your Name</label>
                      <input type="text" placeholder="John Doe" className="w-full px-8 py-5 rounded-2xl bg-white border border-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-200 font-medium" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                      <input type="email" placeholder="john@example.com" className="w-full px-8 py-5 rounded-2xl bg-white border border-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-200 font-medium" />
                   </div>
                </div>
                <div className="space-y-3">
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Subject</label>
                   <select className="w-full px-8 py-5 rounded-2xl bg-white border border-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-200 font-medium text-gray-500">
                      <option>General Inquiry</option>
                      <option>Booking Problem</option>
                      <option>Partner Request</option>
                      <option>Feedback</option>
                   </select>
                </div>
                <div className="space-y-3">
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">Message</label>
                   <textarea placeholder="Tell us how we can help..." className="w-full h-40 px-8 py-6 rounded-3xl bg-white border border-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-200 font-medium"></textarea>
                </div>
                <button className="w-full py-5 bg-orange-500 text-white font-black rounded-2xl shadow-2xl shadow-orange-100 hover:bg-orange-600 transition-all">Send Message</button>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactView;