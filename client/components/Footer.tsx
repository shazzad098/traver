
import React, { useState } from 'react';
import { Plane, Send, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Page } from '../App';

interface FooterProps {
  navigateTo: (page: Page, id?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    alert(`Subscribed ${email} to our newsletter!`);
    setEmail('');
  };

  return (
    <footer id="footer" className="bg-[#fcfcfc] pt-20 pb-12 border-t border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section: Logo & Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigateTo('home')}
          >
            <div className="bg-[#ff7235] w-10 h-10 rounded-full flex items-center justify-center shadow-lg shadow-orange-100 group-hover:scale-110 transition-transform">
              <Plane className="w-5 h-5 text-white transform -rotate-45" />
            </div>
            <span className="text-2xl font-black tracking-tight text-gray-900 font-heading">Traver</span>
          </div>

          {/* Newsletter Input */}
          <form onSubmit={handleSubscribe} className="relative w-full max-w-[400px]">
            <div className="flex items-center bg-white border border-gray-200 rounded-xl px-4 py-2 hover:border-gray-300 transition-colors focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-200">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-none focus:outline-none w-full text-[13px] font-semibold text-gray-700 placeholder:text-gray-300 py-1"
                required
              />
              <button
                type="submit"
                className="bg-[#ff7235] p-2 rounded-lg hover:bg-orange-600 transition-all active:scale-90 ml-2"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </form>
        </div>

        {/* Divider Line */}
        <div className="h-[1px] w-full bg-gray-100 mb-16"></div>

        {/* Middle Section: Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          {/* About Column */}
          <div>
            <h4 className="text-[15px] font-black text-gray-900 mb-8 uppercase tracking-widest font-heading">About</h4>
            <ul className="space-y-4">
              <li><button onClick={() => navigateTo('about')} className="text-gray-500 hover:text-[#ff7235] transition-colors text-[14px] font-medium text-left">About Us</button></li>
              <li><button onClick={() => navigateTo('features')} className="text-gray-500 hover:text-[#ff7235] transition-colors text-[14px] font-medium text-left">Features</button></li>
              <li><button onClick={() => navigateTo('new')} className="text-gray-500 hover:text-[#ff7235] transition-colors text-[14px] font-medium text-left">New</button></li>
              <li><button onClick={() => navigateTo('careers')} className="text-gray-500 hover:text-[#ff7235] transition-colors text-[14px] font-medium text-left">Careers</button></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-[15px] font-black text-gray-900 mb-8 uppercase tracking-widest font-heading">Company</h4>
            <ul className="space-y-4">
              <li><button onClick={() => navigateTo('our-team')} className="text-gray-500 hover:text-[#ff7235] transition-colors text-[14px] font-medium text-left">Our Team</button></li>
              <li><button onClick={() => navigateTo('partner')} className="text-gray-500 hover:text-[#ff7235] transition-colors text-[14px] font-medium text-left">Partner with Us</button></li>
              <li><button onClick={() => navigateTo('faq')} className="text-gray-500 hover:text-[#ff7235] transition-colors text-[14px] font-medium text-left">FAQ</button></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-[15px] font-black text-gray-900 mb-8 uppercase tracking-widest font-heading">Support</h4>
            <ul className="space-y-4">
              <li><button onClick={() => navigateTo('account')} className="text-gray-500 hover:text-[#ff7235] transition-colors text-[14px] font-medium text-left">Account</button></li>
              <li><button onClick={() => navigateTo('support')} className="text-gray-500 hover:text-[#ff7235] transition-colors text-[14px] font-medium text-left">Support Center</button></li>
              <li><button onClick={() => navigateTo('feedback')} className="text-gray-500 hover:text-[#ff7235] transition-colors text-[14px] font-medium text-left">Feedback</button></li>
              <li><button onClick={() => navigateTo('contact')} className="text-gray-500 hover:text-[#ff7235] transition-colors text-[14px] font-medium text-left">Contact Us</button></li>
              <li><button onClick={() => navigateTo('accessibility')} className="text-gray-500 hover:text-[#ff7235] transition-colors text-[14px] font-medium text-left">Accessibility</button></li>
            </ul>
          </div>

          {/* Social Media Column */}
          <div>
            <h4 className="text-[15px] font-black text-gray-900 mb-8 uppercase tracking-widest font-heading">Social</h4>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[#ff7235] hover:opacity-80 transition-opacity">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#ff7235] hover:opacity-80 transition-opacity">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#ff7235] hover:opacity-80 transition-opacity">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-10 border-t border-gray-100">
          <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">
            <span className="text-sm leading-none align-middle mr-1">©</span> 2025 Traver. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
