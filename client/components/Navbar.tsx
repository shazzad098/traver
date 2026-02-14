
import React, { useState, useEffect } from 'react';
import { Plane, LogOut, User as UserIcon, Menu, X, ChevronRight, Briefcase } from 'lucide-react';
import { Page, User } from '../App';

interface NavbarProps {
  currentPage: Page;
  navigateTo: (page: Page, id?: string) => void;
  user: User | null;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, navigateTo, user, logout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const navItems: { label: string; id: Page }[] = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Destinations', id: 'destinations' },
    { label: 'Features', id: 'features' },
    { label: 'Support', id: 'support' },
  ];

  const handleNavigate = (page: Page) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      navigateTo(page);
    }, 300);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[120] transition-all duration-500 ${isMobileMenuOpen ? 'bg-transparent' : 'bg-black/40 backdrop-blur-xl border-b border-white/5'} font-sans`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20 lg:h-24">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group relative z-[130]"
              onClick={() => handleNavigate('home')}
            >
              <div className="bg-orange-500 w-9 h-9 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Plane className="w-4 h-4 lg:w-5 lg:h-5 text-white transform -rotate-45" />
              </div>
              <span className={`text-lg lg:text-xl font-black tracking-tight font-heading uppercase transition-colors duration-500 ${isMobileMenuOpen ? 'text-white' : 'text-white'}`}>
                Globe Express
              </span>
            </div>

            {/* Desktop Nav Items */}
            <div className="hidden lg:flex items-center space-x-10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`text-[10px] font-black transition-all hover:text-orange-500 relative py-1 uppercase tracking-[0.2em] ${currentPage === item.id ? 'text-orange-500' : 'text-white/80 hover:text-white'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop Auth / Profile */}
            <div className="hidden lg:flex items-center gap-6">
              {!user ? (
                <div className="flex items-center gap-8">
                  <button
                    onClick={() => handleNavigate('login')}
                    className="text-[11px] font-black text-white hover:text-orange-500 transition-all uppercase tracking-[0.2em]"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleNavigate('signup')}
                    className="px-8 py-3.5 bg-orange-500 text-white text-[11px] font-black rounded-full hover:bg-white hover:text-orange-500 transition-all shadow-lg shadow-orange-500/20 uppercase tracking-[0.2em] scale-100 hover:scale-105 active:scale-95"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-3 group"
                  >
                    <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-white/20 group-hover:border-orange-50 transition-all" alt="Profile" />
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-4 w-60 bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-50 p-2 z-[100] animate-fade-in-up">
                      <div className="px-5 py-4 border-b border-gray-50 mb-2">
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Signed in as</p>
                        <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                      </div>
                      {user.role === 'admin' && (
                        <button
                          onClick={() => { handleNavigate('admin'); setShowDropdown(false); }}
                          className="w-full flex items-center gap-3 px-5 py-4 text-[12px] font-black text-orange-500 hover:bg-orange-50 rounded-2xl transition-all uppercase tracking-widest"
                        >
                          <Briefcase className="w-4 h-4" /> Admin Panel
                        </button>
                      )}
                      <button
                        onClick={() => { handleNavigate('account'); setShowDropdown(false); }}
                        className="w-full flex items-center gap-3 px-5 py-4 text-[12px] font-black text-gray-500 hover:bg-orange-50 hover:text-orange-500 rounded-2xl transition-all uppercase tracking-widest"
                      >
                        <UserIcon className="w-4 h-4" /> My Profile
                      </button>
                      <button
                        onClick={() => { logout(); setShowDropdown(false); }}
                        className="w-full flex items-center gap-3 px-5 py-4 text-[12px] font-black text-red-400 hover:bg-red-50 rounded-2xl transition-all uppercase tracking-widest"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              className="lg:hidden p-2 text-white hover:text-orange-500 transition-all relative z-[130]"
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Full screen, premium feel */}
      <div
        className={`lg:hidden fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.8,0,0.2,1)] z-[115] ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="flex flex-col h-full p-8 pt-32 gap-2 overflow-y-auto">
          {navItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`flex items-center justify-between w-full py-5 group transition-all duration-700 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              style={{ transitionDelay: `${idx * 70}ms` }}
            >
              <div className="flex items-center gap-6">
                <span className={`text-[11px] font-black transition-all ${currentPage === item.id ? 'text-orange-500' : 'text-gray-600'
                  }`}>
                  0{idx + 1}
                </span>
                <span className={`text-3xl font-black font-heading tracking-tight transition-colors ${currentPage === item.id ? 'text-orange-500' : 'text-white'
                  }`}>
                  {item.label}
                </span>
              </div>
              <ChevronRight className={`w-6 h-6 transition-all duration-500 ${currentPage === item.id ? 'text-orange-500 opacity-100' : 'text-gray-800 opacity-0 group-hover:opacity-100'
                }`} />
            </button>
          ))}

          {/* Auth Actions at the bottom */}
          <div className={`mt-auto pb-12 transition-all duration-700 delay-[400ms] ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
            {!user ? (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleNavigate('login')}
                  className="py-5 bg-white/5 border border-white/10 text-white font-black rounded-3xl hover:bg-white/10 transition-all text-[11px] uppercase tracking-[0.2em]"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNavigate('signup')}
                  className="py-5 bg-orange-500 text-white font-black rounded-3xl hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 text-[11px] uppercase tracking-[0.2em]"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => handleNavigate('account')}
                  className="w-full flex items-center justify-center gap-3 py-5 bg-white/5 border border-white/10 text-white font-black rounded-[2rem]"
                >
                  <UserIcon className="w-5 h-5 text-orange-500" /> Account Settings
                </button>
                <button
                  onClick={logout}
                  className="w-full py-5 text-red-400 font-black rounded-[2rem] border border-red-400/20 flex items-center justify-center gap-3"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            )}
            <div className="mt-12 text-center">
              <p className="text-[10px] font-black text-gray-700 uppercase tracking-[0.4em]">Globe Express Travel</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
