
import React, { useState } from 'react';
import { Mail, ArrowUpRight, Check, Send, Loader2 } from 'lucide-react';
import { API } from '../api';

const SupportView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyWebsite: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.submitSupport(formData);
      alert("Message sent successfully! We will get back to you soon.");
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyWebsite: '',
        message: ''
      });
    } catch (error: any) {
      alert(error.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const CheckItem = ({ text }: { text: string }) => (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full border border-orange-500 flex items-center justify-center shrink-0">
        <Check className="w-3 h-3 text-orange-500 stroke-[3]" />
      </div>
      <span className="text-gray-700 font-medium text-sm">{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff5f2] via-white to-[#f0f7ff] pt-24 lg:pt-32 pb-16 lg:pb-24 font-sans">
      <div className="max-w-7xl mx-auto px-5 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left Column: Content */}
          <div className="space-y-10 lg:space-y-12">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#0f172a] mb-6 lg:mb-8 font-heading leading-tight">
                How can We Help?
              </h1>
              <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed mb-8 lg:mb-10">
                Get in touch with our sales and support teams for demos, onboarding support, or product questions.
              </p>

              <div className="space-y-4">
                <CheckItem text="Request a demo" />
                <CheckItem text="Learn which plan is right for your team" />
                <CheckItem text="Get onboarding help" />
              </div>
            </div>

            {/* Bottom Cards */}
            <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
              <div className="bg-white/60 backdrop-blur-sm p-6 lg:p-8 rounded-[2rem] border border-white shadow-sm hover:shadow-md transition-shadow group">
                <h3 className="text-lg font-bold text-gray-900 mb-2 lg:mb-3">General communication</h3>
                <p className="text-gray-500 text-xs lg:text-sm font-medium mb-5 lg:mb-6 leading-relaxed">
                  For other queries, please get in touch with us via email.
                </p>
                <div className="flex items-center gap-2 text-gray-800 font-bold text-xs lg:text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>hello@traver.com</span>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm p-6 lg:p-8 rounded-[2rem] border border-white shadow-sm hover:shadow-md transition-shadow group">
                <h3 className="text-lg font-bold text-gray-900 mb-2 lg:mb-3">Documentation</h3>
                <p className="text-gray-500 text-xs lg:text-sm font-medium mb-5 lg:mb-6 leading-relaxed">
                  Get an overview of our features, integrations, and how to use them.
                </p>
                <button className="flex items-center gap-1.5 text-gray-800 font-bold text-xs lg:text-sm hover:text-orange-500 transition-colors">
                  See Docs <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="bg-white p-6 md:p-8 lg:p-12 rounded-[2rem] lg:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100">
            <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-8 lg:mb-10">Contact our sales team</h2>

            <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">First name</label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    type="text"
                    placeholder="John"
                    className="w-full px-5 py-3.5 lg:py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 text-sm font-semibold text-gray-800 placeholder:text-gray-300 transition-all"
                    required
                  />
                </div>
                <div className="relative">
                  <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Last name</label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Doe"
                    className="w-full px-5 py-3.5 lg:py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 text-sm font-semibold text-gray-800 placeholder:text-gray-300 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Email address</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="contact@example.com"
                  className="w-full px-5 py-3.5 lg:py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 text-sm font-semibold text-gray-800 placeholder:text-gray-300 transition-all"
                  required
                />
              </div>

              <div className="relative">
                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Phone number</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="+1 123 456 789"
                  className="w-full px-5 py-3.5 lg:py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 text-sm font-semibold text-gray-800 placeholder:text-gray-300 transition-all"
                />
              </div>

              <div className="relative">
                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Company website</label>
                <input
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  type="url"
                  placeholder="traver.travel"
                  className="w-full px-5 py-3.5 lg:py-4 bg-white border border-gray-100 rounded-xl focus:outline-none focus:border-orange-500 text-sm font-semibold text-gray-800 placeholder:text-gray-300 transition-all"
                />
              </div>

              <div className="relative">
                <label className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Your message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your project..."
                  rows={4}
                  className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 text-sm font-semibold text-gray-800 placeholder:text-gray-300 transition-all resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 lg:py-5 bg-[#1e293b] text-white font-bold rounded-2xl hover:bg-[#0f172a] transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send Message <Send className="w-4 h-4" /></>}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SupportView;
