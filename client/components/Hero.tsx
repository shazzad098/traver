
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  number: string;
  mapUrl: string;
}

const destinations: Destination[] = [
  {
    id: '01',
    name: 'SAINT ANTÖNIEN',
    location: 'Switzerland Alps',
    description: 'Experience the breathtaking beauty of the Swiss Alps in Saint Antönien, where jagged peaks meet serene valleys and traditional alpine culture.',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=2000',
    number: '01',
    mapUrl: 'https://www.google.com/maps/place/St+Ant%C3%B6nien,+Switzerland/@46.9764954,9.7507245,21333m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4784adb296ef29bf:0xd02bfa947750d98b!8m2!3d46.9695874!4d9.8142825!16s%2Fm%2F026f7mc?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '02',
    name: 'NAGANO PREFECTURE',
    location: 'Japan Alps',
    description: 'Discover the mystical Nagano Prefecture, home to the Japanese Alps and the famous snow monkeys of Jigokudani Monkey Park.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2000',
    number: '02',
    mapUrl: 'https://www.google.com/maps/place/Nagano,+Japan/@36.1094153,136.7125271,404153m/data=!3m2!1e3!4b1!4m6!3m5!1s0x601d012318c98c6b:0x25c2b4f04bf0b94!8m2!3d36.1543941!4d137.9218204!16zL20vMDE4amsy?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '03',
    name: 'MARRAKECH MERZOUGA',
    location: 'Sahara Desert - Morocco',
    description: 'Journey into the heart of the Sahara. Marrakech and the golden dunes of Merzouga offer a magical blend of ancient culture and endless horizons.',
    image: 'https://images.unsplash.com/photo-1509059852496-f3822ae057bf?auto=format&fit=crop&q=80&w=2000',
    number: '03',
    mapUrl: 'https://www.google.com/maps/dir/Marrakesh,+Morocco/Merzouga,+Morocco/@31.8672704,-7.325064,424854m/data=!3m2!1e3!4b1!4m13!4m12!1m5!1m1!1s0xdafee8d96179e51:0x5950b6534f87adb8!2m2!1d-7.9898258!2d31.6225224!1m5!1m1!1s0xd973c279834dfe5:0x5639fab2b5de4a44!2m2!1d-4.013361!2d31.0801676?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '04',
    name: 'YOSEMITE PARK',
    location: 'Sierra Nevada - United States',
    description: 'Iconic granite cliffs, towering sequoias, and plunging waterfalls. Yosemite National Park is the crown jewel of the American wilderness.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000',
    number: '04',
    mapUrl: 'https://www.google.com/maps/place/Yosemite+National+Park/@37.8533919,-119.880755,98748m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8096f09df58aecc5:0x2d249c2ced8003fe!8m2!3d37.8651011!4d-119.5383294!16zL20vMGNfeTg?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D'
  },
  {
    id: '05',
    name: 'GÖREME VALLEY',
    location: 'Cappadocia - Turkey',
    description: 'A fairy-tale landscape of fairy chimneys and ancient cave dwellings. Witness the sunrise over Cappadocia as hundreds of balloons take flight.',
    image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&q=80&w=2000',
    number: '05',
    mapUrl: 'https://www.google.com/maps/place/Goreme+Valley+Cave+House/@38.6430718,34.8185893,3053m/data=!3m1!1e3!4m13!1m2!2m1!1sG%C3%96REME+VALLEY!3m9!1s0x152a67d7e229e9eb:0xa01e683b5d67c70e!5m2!4m1!1i2!8m2!3d38.6457328!4d34.8284869!15sCg5Hw5ZSRU1FIFZBTExFWVoQIg5nw7ZyZW1lIHZhbGxleZIBBWhvdGVsmgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDJ0YVdWVkhhRE5VTUhSSFdsVk5NazR6UmpGV1dHOHpXVEpOTWxGWFl4QULgAQD6AQQISBA1!16s%2Fg%2F11b73m7jlh?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D'
  }
];

const Hero: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
    setTimeout(() => setIsAnimating(false), 1400); // Increased to match the image animation duration
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
    setTimeout(() => setIsAnimating(false), 1400);
  };

  const currentDest = destinations[currentIndex];

  const getNextCards = () => {
    const cards = [];
    for (let i = 1; i <= 3; i++) {
      const idx = (currentIndex + i) % destinations.length;
      cards.push(destinations[idx]);
    }
    return cards;
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-sans">
      {/* Dynamic Background Image with Expansion Animation */}
      <div className="absolute inset-0 z-0">
        {destinations.map((dest, idx) => (
          <div
            key={dest.id}
            className={`absolute inset-0 overflow-hidden ${idx === currentIndex ? 'z-10 block' : 'z-0 hidden'
              }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={dest.image}
              alt={dest.name}
              className={`h-full w-full object-cover transition-transform duration-[1.4s] ease-out ${idx === currentIndex ? 'animate-hero-zoom' : ''
                }`}
            />
          </div>
        ))}
      </div>

      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center h-full pt-24">

          {/* Main Content Area - Animations removed from text to satisfy user request */}
          <div className="text-white max-w-xl">
            <div>
              <p className="text-sm font-bold tracking-[0.3em] uppercase text-orange-400 mb-4 drop-shadow-lg">
                {currentDest.location}
              </p>
            </div>

            <div className="overflow-hidden">
              <h1 className="text-6xl lg:text-[7.5rem] font-black leading-[0.9] mb-8 font-heading drop-shadow-2xl">
                {currentDest.name}
              </h1>
            </div>

            <div>
              <p className="text-gray-200 text-sm font-medium leading-relaxed mb-10 max-w-md opacity-90 drop-shadow-md">
                {currentDest.description}
              </p>

              <div className="flex flex-col gap-8">
                <button
                  onClick={() => window.open(currentDest.mapUrl, '_blank')}
                  className="w-fit flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-orange-500 hover:border-orange-500 transition-all group shadow-xl"
                >
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest">Discover Location</span>
                </button>

                {/* Relocated Navigation Buttons (Below Discover Location) - Animation removed */}
                <div className="flex items-center gap-6">
                  <button
                    onClick={handlePrev}
                    className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all backdrop-blur-md hover:scale-110 active:scale-90"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-orange-500 hover:border-orange-500 transition-all backdrop-blur-md hover:scale-110 active:scale-90"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Counter Area at Bottom - Animation removed */}
        <div className="absolute bottom-10 left-6 right-6 flex justify-end items-end max-w-7xl mx-auto z-30">
          <div className="flex items-center gap-6 text-white">
            <div className="h-[1px] w-24 bg-white/20 relative">
              <div
                className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-1000"
                style={{ width: `${((currentIndex + 1) / destinations.length) * 100}%` }}
              />
            </div>
            <div className="flex items-baseline">
              <span className="text-5xl font-black font-heading leading-none text-orange-400">
                {currentDest.number}
              </span>
              <span className="text-sm font-bold text-white/40 ml-2">/ 05</span>
            </div>
          </div>
        </div>

        {/* Thumbnail Cards Area (Right Bottom Corner) */}
        <div className="absolute bottom-10 right-32 hidden lg:flex items-end gap-6 z-20 mr-12">
          {getNextCards().map((dest, i) => (
            <div
              key={dest.id}
              onClick={() => {
                if (isAnimating) return;
                const targetIndex = destinations.findIndex(d => d.id === dest.id);
                if (targetIndex !== -1) {
                  setIsAnimating(true);
                  setCurrentIndex(targetIndex);
                  setTimeout(() => setIsAnimating(false), 1400);
                }
              }}
              className="relative w-40 h-56 rounded-[2.5rem] overflow-hidden shrink-0 border border-white/10 shadow-2xl cursor-pointer hover:scale-105 transition-all duration-500 group"
            >
              <img src={dest.image} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-6 left-5 right-5">
                <p className="text-[9px] font-black text-orange-400 uppercase tracking-widest mb-1">{dest.location.split('-')[0]}</p>
                <p className="text-[10px] font-black text-white uppercase leading-tight line-clamp-2">{dest.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
