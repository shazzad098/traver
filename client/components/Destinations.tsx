
import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Users, Calendar, Star, ChevronLeft, ChevronRight, Plus, Minus, Heart, ArrowRight } from 'lucide-react';
import { Destination } from '../api';
import { Page } from '../App';

interface DestinationsProps {
  onSavePlace: (place: Destination) => void;
  savedPlaces: Destination[];
  navigateTo: (page: Page, id?: string) => void;
}

const Destinations: React.FC<DestinationsProps> = ({ onSavePlace, savedPlaces, navigateTo }) => {
  const [destLocation, setDestLocation] = useState('');
  const [personCount, setPersonCount] = useState(1);
  const [showPersonPicker, setShowPersonPicker] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | null>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(new Date(Date.now() + 86400000 * 7));
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  const personPickerRef = useRef<HTMLDivElement>(null);
  const checkInRef = useRef<HTMLDivElement>(null);
  const checkOutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (personPickerRef.current && !personPickerRef.current.contains(event.target as Node)) setShowPersonPicker(false);
      if (checkInRef.current && !checkInRef.current.contains(event.target as Node)) setShowCheckInPicker(false);
      if (checkOutRef.current && !checkOutRef.current.contains(event.target as Node)) setShowCheckOutPicker(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const destinationList: Destination[] = [
    { id: 'd1', name: "Karangan Beach", location: "Labuan Bajo, Indonesia", price: "$200", rating: "4.8", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400" },
    { id: 'd2', name: "Kepunuh Beach", location: "Bali, Indonesia", price: "$250", rating: "4.5", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=400" },
    { id: 'd3', name: "Kucubung Beach", location: "Labuan Bajo, Indonesia", price: "$350", rating: "4.9", image: "https://finnsbeachclub.com/wp-content/uploads/2024/08/AF1QipPzcmH-ICDw7Jsg2L0plcr9M_Mk6fNiJSFS30f0w1200-768x512.webp" },
    { id: 'd4', name: "Raja Ampat", location: "West Papua, Indonesia", price: "$450", rating: "4.9", image: "https://cf.bstatic.com/xdata/images/hotel/max500/633326998.jpg?k=2112efc00c0e63cb03b75d488c1212a122b631fbe89f943ae261a1f9feada18c&o=&hp=1" },
    { id: 'd5', name: "Santorini", location: "Cyclades, Greece", price: "$600", rating: "4.8", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=400" },
    { id: 'd6', name: "Kyoto Gardens", location: "Kyoto, Japan", price: "$300", rating: "4.7", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&q=80&w=400" },
    { id: 'd7', name: "Machu Picchu", location: "Cusco Region, Peru", price: "$500", rating: "4.9", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=400" },
    { id: 'd8', name: "Bora Bora", location: "French Polynesia", price: "$800", rating: "5.0", image: "https://images.unsplash.com/photo-1532408840957-031d8034aeef?auto=format&fit=crop&q=80&w=400" },
    { id: 'd9', name: "Maldives Islands", location: "Male, Maldives", price: "$700", rating: "4.8", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=400" },
  ];

  const isSaved = (id: string) => savedPlaces.some(p => p.id === id);

  return (
    <section id="destinations" className="py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 font-heading">Explore Your Dream Destination</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">Save your favorites and plan the ultimate journey with our curated world catalog.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {destinationList.map((dest) => (
            <div key={dest.id} className="group bg-white rounded-[3rem] overflow-hidden border border-gray-50 hover:shadow-2xl transition-all duration-500 relative">
              <div className="relative h-72 overflow-hidden">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <button
                  onClick={() => onSavePlace(dest)}
                  className={`absolute top-5 left-5 p-3 rounded-2xl backdrop-blur-md border border-white/30 transition-all ${isSaved(dest.id) ? 'bg-orange-500 text-white' : 'bg-white/40 text-white hover:bg-white/60'}`}
                >
                  <Heart className={`w-5 h-5 ${isSaved(dest.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-black text-gray-800 mb-2">{dest.name}</h3>
                    <p className="flex items-center gap-2 text-gray-400 font-bold text-sm mb-2"><MapPin className="w-4 h-4" /> {dest.location}</p>
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                      <span className="text-sm font-black text-gray-700">{dest.rating}</span>
                    </div>
                  </div>
                  <div className="bg-orange-50 px-4 py-2 rounded-xl text-orange-500 font-black">{dest.price}</div>
                </div>
                <button
                  onClick={() => navigateTo('destination-details', dest.id)}
                  className="w-full mt-6 py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-orange-500 transition-all uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 group"
                >
                  Explore Destination
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
