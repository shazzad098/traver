
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
    <footer id="footer" className="relative bg-black pt-12 pb-8 overflow-hidden font-sans">
      {/* Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-700"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        }}
      >
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Middle Section: Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 max-w-6xl mx-auto">
          {/* About Column */}
          <div className="bg-white/[0.04] backdrop-blur-xl rounded-[2rem] p-6 lg:p-7 hover:bg-white/[0.07] transition-all duration-500 group">
            <h4 className="text-[13px] sm:text-[15px] font-black text-white mb-4 lg:mb-6 uppercase tracking-widest font-heading group-hover:text-[#ff7235] transition-colors">About</h4>
            <ul className="space-y-3 lg:space-y-4">
              <li><button onClick={() => navigateTo('about')} className="text-gray-400 hover:text-white transition-colors text-[13px] sm:text-[14px] font-medium text-left">About Us</button></li>
              <li><button onClick={() => navigateTo('features')} className="text-gray-400 hover:text-white transition-colors text-[13px] sm:text-[14px] font-medium text-left">Features</button></li>
              <li><button onClick={() => navigateTo('new')} className="text-gray-400 hover:text-white transition-colors text-[13px] sm:text-[14px] font-medium text-left">New</button></li>
              <li><button onClick={() => navigateTo('careers')} className="text-gray-400 hover:text-white transition-colors text-[13px] sm:text-[14px] font-medium text-left">Careers</button></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="bg-white/[0.04] backdrop-blur-xl rounded-[2rem] p-6 lg:p-7 hover:bg-white/[0.07] transition-all duration-500 group">
            <h4 className="text-[13px] sm:text-[15px] font-black text-white mb-4 lg:mb-6 uppercase tracking-widest font-heading group-hover:text-[#ff7235] transition-colors">Company</h4>
            <ul className="space-y-3 lg:space-y-4">
              <li><button onClick={() => navigateTo('our-team')} className="text-gray-400 hover:text-white transition-colors text-[13px] sm:text-[14px] font-medium text-left">Our Team</button></li>
              <li><button onClick={() => navigateTo('partner')} className="text-gray-400 hover:text-white transition-colors text-[13px] sm:text-[14px] font-medium text-left">Partner with Us</button></li>
              <li><button onClick={() => navigateTo('faq')} className="text-gray-400 hover:text-white transition-colors text-[13px] sm:text-[14px] font-medium text-left">FAQ</button></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="bg-white/[0.04] backdrop-blur-xl rounded-[2rem] p-6 lg:p-7 hover:bg-white/[0.07] transition-all duration-500 group">
            <h4 className="text-[13px] sm:text-[15px] font-black text-white mb-4 lg:mb-6 uppercase tracking-widest font-heading group-hover:text-[#ff7235] transition-colors">Support</h4>
            <ul className="space-y-3 lg:space-y-4">
              <li><button onClick={() => navigateTo('account')} className="text-gray-400 hover:text-white transition-colors text-[13px] sm:text-[14px] font-medium text-left">Account</button></li>
              <li><button onClick={() => navigateTo('support')} className="text-gray-400 hover:text-white transition-colors text-[13px] sm:text-[14px] font-medium text-left">Support Center</button></li>
              <li><button onClick={() => navigateTo('feedback')} className="text-gray-400 hover:text-white transition-colors text-[13px] sm:text-[14px] font-medium text-left">Feedback</button></li>
              <li><button onClick={() => navigateTo('contact')} className="text-gray-400 hover:text-white transition-colors text-[13px] sm:text-[14px] font-medium text-left">Contact Us</button></li>
              <li><button onClick={() => navigateTo('accessibility')} className="text-gray-400 hover:text-white transition-colors text-[13px] sm:text-[14px] font-medium text-left">Accessibility</button></li>
            </ul>
          </div>

          {/* Social Media Column */}
          <div className="bg-white/[0.04] backdrop-blur-xl rounded-[2rem] p-6 lg:p-7 hover:bg-white/[0.07] transition-all duration-500 group">
            <h4 className="text-[13px] sm:text-[15px] font-black text-white mb-4 lg:mb-6 uppercase tracking-widest font-heading group-hover:text-[#ff7235] transition-colors">Social</h4>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#" className="bg-white/10 p-3 rounded-2xl text-gray-400 hover:bg-[#ff7235] hover:text-white hover:scale-110 transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-2xl text-gray-400 hover:bg-[#ff7235] hover:text-white hover:scale-110 transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-2xl text-gray-400 hover:bg-[#ff7235] hover:text-white hover:scale-110 transition-all duration-300 hidden sm:inline-flex">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 text-center md:text-left">
          <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">
            <span className="text-sm leading-none align-middle mr-1">©</span> 2025 Traver. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
