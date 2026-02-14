
import React from 'react';
import { Layers, Users, BookmarkCheck } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Lots of Choices",
      desc: "We have provided several choices of destinations and very cheap travelling packages",
      icon: <Layers className="w-6 h-6 text-orange-500" />,
      color: "bg-orange-50"
    },
    {
      title: "Best Tour Guide",
      desc: "We provide professional tour guide and provide and people who understand the place",
      icon: <Users className="w-6 h-6 text-red-500" />,
      color: "bg-red-50"
    },
    {
      title: "Easy Booking",
      desc: "We will also make it easier for users to book tickets or book the place you want",
      icon: <BookmarkCheck className="w-6 h-6 text-amber-500" />,
      color: "bg-amber-50"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-12 items-center">
          
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-orange-500 font-bold tracking-widest text-sm">WHAT WE GIVE</span>
              <div className="h-0.5 w-12 bg-orange-500"></div>
            </div>
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Best Features <br /> For You
            </h2>
            <p className="text-gray-500 leading-relaxed font-medium">
              We provide the best features for those of you who want to travel comfortably with your family.
            </p>
          </div>

          <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="p-8 rounded-[2.5rem] border border-gray-100 hover:shadow-2xl hover:shadow-gray-100 transition-all duration-300 group cursor-pointer">
                <div className={`${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-500 transition-colors">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;
