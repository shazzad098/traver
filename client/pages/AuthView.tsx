
import React, { useState, useEffect } from 'react';
import { Plane, Mail, Lock, User as UserIcon, ArrowLeft, Loader2, ChevronRight, AlertCircle } from 'lucide-react';
import { Page, User } from '../App';
import { API } from '../api';

interface AuthViewProps {
  initialMode: 'login' | 'signup';
  navigateTo: (page: Page) => void;
  onAuthSuccess: (user: User) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ initialMode, navigateTo, onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setIsSignUp(initialMode === 'signup');
    setError(null);
  }, [initialMode]);

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
    window.location.hash = !isSignUp ? 'signup' : 'login';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let result;
      if (isSignUp) {
        // ২. MockAPI এর বদলে API ব্যবহার করুন
        result = await API.signup(formData);
      } else {
        // ৩. এখানেও API ব্যবহার করুন
        result = await API.login({ email: formData.email, password: formData.password });
      }
      onAuthSuccess(result.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 md:p-6 font-sans overflow-hidden relative">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-5xl w-full flex bg-black/40 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] shadow-[0_0_120px_rgba(249,115,22,0.1)] border border-white/5 overflow-hidden relative min-h-fit md:min-h-[650px]">

        <div
          className={`hidden lg:flex absolute top-0 w-1/2 h-full bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 z-30 flex-col items-center justify-center p-12 text-center transition-all duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] ${isSignUp ? 'left-0' : 'left-1/2'
            }`}
        >
          <div className="relative z-10">
            <div className="mb-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 mx-auto shadow-2xl">
                <Plane className="w-10 h-10 text-white transform -rotate-45" />
              </div>
            </div>
            <h2 className="text-4xl font-black text-white mb-6 font-heading uppercase tracking-tighter">
              {isSignUp ? 'Welcome Back!' : 'Start Your Journey!'}
            </h2>
            <button onClick={toggleMode} className="px-14 py-4 bg-transparent border-2 border-white text-white font-black rounded-full hover:bg-white hover:text-orange-500 transition-all uppercase tracking-[0.2em] text-[10px]">
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>

        <div className="w-full flex relative">
          <div className={`w-full lg:w-1/2 p-10 md:p-12 lg:p-20 flex flex-col justify-center transition-all duration-700 ${isSignUp ? 'hidden lg:flex opacity-0 translate-x-10 pointer-events-none' : 'flex opacity-100 translate-x-0'}`}>
            <button onClick={() => navigateTo('home')} className="flex items-center gap-2 text-gray-500 font-black text-[10px] mb-12 hover:text-white transition-all uppercase tracking-widest"><ArrowLeft className="w-3.5 h-3.5" /> Back Home</button>
            <h1 className="text-4xl font-black text-white mb-10 font-heading">Sign In</h1>

            {error && !isSignUp && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl mb-8 flex items-center gap-3 text-red-400 text-xs font-bold">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative group">
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full bg-transparent border-b border-white/10 py-4 text-white font-medium focus:outline-none focus:border-orange-500 transition-all" required />
                <Mail className="absolute right-0 top-4 w-4 h-4 text-gray-700" />
              </div>
              <div className="relative group">
                <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full bg-transparent border-b border-white/10 py-4 text-white font-medium focus:outline-none focus:border-orange-500 transition-all" required />
                <Lock className="absolute right-0 top-4 w-4 h-4 text-gray-700" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-5 bg-orange-500 text-white font-black rounded-full transition-all uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-white/5 text-center lg:hidden">
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4">Don't have an account?</p>
              <button
                onClick={toggleMode}
                className="px-10 py-3 bg-white/5 border border-white/10 text-white font-black rounded-full hover:bg-orange-500 hover:border-orange-500 transition-all uppercase tracking-[0.2em] text-[9px]"
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className={`w-full lg:w-1/2 p-10 md:p-12 lg:p-20 flex flex-col justify-center transition-all duration-700 ${isSignUp ? 'flex opacity-100 translate-x-0' : 'hidden lg:flex opacity-0 -translate-x-10 pointer-events-none'}`}>
            <button onClick={() => navigateTo('home')} className="flex items-center gap-2 text-gray-500 font-black text-[10px] mb-12 hover:text-white transition-all uppercase tracking-widest"><ArrowLeft className="w-3.5 h-3.5" /> Back Home</button>
            <h1 className="text-4xl font-black text-white mb-10 font-heading">Create Account</h1>

            {error && isSignUp && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl mb-8 flex items-center gap-3 text-red-400 text-xs font-bold">
                <AlertCircle className="w-4 h-4" /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Username" className="w-full bg-transparent border-b border-white/10 py-4 text-white font-medium focus:outline-none focus:border-orange-500 transition-all" required />
                <UserIcon className="absolute right-0 top-4 w-4 h-4 text-gray-700" />
              </div>
              <div className="relative group">
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="w-full bg-transparent border-b border-white/10 py-4 text-white font-medium focus:outline-none focus:border-orange-500 transition-all" required />
                <Mail className="absolute right-0 top-4 w-4 h-4 text-gray-700" />
              </div>
              <div className="relative group">
                <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full bg-transparent border-b border-white/10 py-4 text-white font-medium focus:outline-none focus:border-orange-500 transition-all" required />
                <Lock className="absolute right-0 top-4 w-4 h-4 text-gray-700" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-5 bg-orange-500 text-white font-black rounded-full transition-all uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign Up'}
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-white/5 text-center lg:hidden">
              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4">Already have an account?</p>
              <button
                onClick={toggleMode}
                className="px-10 py-3 bg-white/5 border border-white/10 text-white font-black rounded-full hover:bg-orange-500 hover:border-orange-500 transition-all uppercase tracking-[0.2em] text-[9px]"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
