
import React, { useState } from 'react';
import { Star, Heart } from 'lucide-react';

const FeedbackView: React.FC = () => {
  const [rating, setRating] = useState(0);

  return (
    <div className="animate-fade-in-up py-24 bg-white flex items-center justify-center min-h-[80vh]">
      <div className="max-w-2xl w-full mx-auto px-4 text-center">
        <div className="bg-orange-50 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 text-orange-500 shadow-xl shadow-orange-100 animate-bounce">
           <Heart className="w-12 h-12 fill-orange-500" />
        </div>
        <h1 className="text-5xl font-black text-gray-900 mb-6">We Value Your <span className="text-orange-500">Feedback</span></h1>
        <p className="text-gray-500 text-lg font-medium mb-16">How was your experience with Traver? We're constantly improving to make your travel dreams come true.</p>

        <div className="bg-gray-50 p-12 rounded-[4rem] border border-gray-100">
           <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Rate Your Experience</p>
           <div className="flex justify-center gap-4 mb-12">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setRating(star)}
                  className={`p-3 rounded-2xl transition-all ${rating >= star ? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-gray-200 hover:text-orange-200'}`}
                >
                  <Star className={`w-8 h-8 ${rating >= star ? 'fill-white' : ''}`} />
                </button>
              ))}
           </div>

           <div className="text-left space-y-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block ml-6">Your Comments</label>
              <textarea 
                placeholder="Tell us what you loved or what we can improve..." 
                className="w-full h-40 px-8 py-6 rounded-[2.5rem] bg-white border border-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-200 font-medium"
              ></textarea>
           </div>

           <button 
            className="w-full mt-10 py-5 bg-orange-500 text-white font-black rounded-2xl shadow-2xl shadow-orange-100 hover:bg-orange-600 transition-all active:scale-95"
            onClick={() => alert("Thank you for your feedback!")}
           >
             Submit Feedback
           </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackView;
