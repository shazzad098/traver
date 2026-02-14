import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, SlidersHorizontal, ArrowRight, Heart, Calendar, Loader2 } from 'lucide-react';
import { Page } from '../App';
import { Destination, API } from '../api';

interface DestinationsViewProps {
  onSavePlace: (place: Destination) => void;
  savedPlaces: Destination[];
  navigateTo: (page: Page, id?: string) => void;
}

const DestinationsView: React.FC<DestinationsViewProps> = ({ onSavePlace, savedPlaces, navigateTo }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [destinations, setDestinations] = useState<(Destination & { cat: string; desc: string; rating: string })[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Beach', 'Mountain', 'City', 'Forest', 'Desert', 'Island'];

  const mockDestinations: (Destination & { cat: string; desc: string; rating: string })[] = [
    { id: 'v1', name: "Nusa Penida", cat: "Island", price: "$180", rating: "4.9", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRev7BjPnv9aeNeI3ongoEBN_bhl4C4XxhnAg&s", location: "Bali, Indonesia", desc: "Explore the iconic Kelingking Beach and crystal clear waters." },
    { id: 'v2', name: "Swiss Alps", cat: "Mountain", price: "$450", rating: "5.0", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800", location: "Switzerland", desc: "Experience world-class skiing and breathtaking views." },
    { id: 'v3', name: "Tokyo City", cat: "City", price: "$320", rating: "4.8", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800", location: "Japan", desc: "A blend of traditional culture and futuristic tech." },
    { id: 'v4', name: "Maldives", cat: "Beach", price: "$550", rating: "4.9", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800", location: "Indian Ocean", desc: "Luxury overwater villas and pristine turquoise lagoons." },
    { id: 'v5', name: "Phi Phi Islands", cat: "Beach", price: "$210", rating: "4.7", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800", location: "Thailand", desc: "Stunning cliffs and vibrant nightlife by the sea." },
    { id: 'v6', name: "Amazon Rainforest", cat: "Forest", price: "$300", rating: "4.8", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800", location: "Brazil", desc: "The world's largest tropical rainforest full of wildlife." },
    { id: 'v7', name: "Black Forest", cat: "Forest", price: "$280", rating: "4.6", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=800", location: "Germany", desc: "Dense, evergreen forests and picturesque villages." },
    { id: 'v8', name: "Sahara Desert", cat: "Desert", price: "$150", rating: "4.7", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=800", location: "Morocco", desc: "Camel trekking under the stars in golden dunes." },
    { id: 'v9', name: "Dubai Desert Safari", cat: "Desert", price: "$400", rating: "4.9", image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?auto=format&fit=crop&q=80&w=800", location: "UAE", desc: "Thrilling dune bashing and traditional Bedouin camps." },
    { id: 'v10', name: "Paris", cat: "City", price: "$380", rating: "4.9", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800", location: "France", desc: "The city of love, lights, and the iconic Eiffel Tower." },
    { id: 'v11', name: "Santorini", cat: "Island", price: "$420", rating: "4.9", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800", location: "Greece", desc: "Famous white-washed buildings with stunning sunsets." },
  ];

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const apiDestinations = await API.getAllDestinations();
      const formattedApiDests = apiDestinations.map((d: any) => ({
        id: d._id,
        name: d.name,
        location: d.location,
        price: d.price,
        rating: d.rating || "5.0",
        image: d.image,
        cat: d.category,
        desc: d.description
      }));
      setDestinations([...formattedApiDests, ...mockDestinations]);
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
      setDestinations(mockDestinations);
    } finally {
      setLoading(false);
    }
  };

  const isSaved = (id: string) => savedPlaces.some(p => p.id === id);

  const filteredDestinations = activeCategory === 'All'
    ? destinations
    : destinations.filter(dest => dest.cat === activeCategory);

  const visibleDestinations = filteredDestinations.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(6);
  };

  return (
    <div className="animate-fade-in font-sans">
      <section className="bg-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-6 font-heading">Our World Catalog</h1>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${activeCategory === cat ? 'bg-orange-500 text-white shadow-xl scale-105' : 'bg-gray-50 text-gray-400 hover:text-orange-500'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-32">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="w-12 h-12 animate-spin mb-4 text-orange-500" />
            <p className="font-bold">Syncing latest destinations...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {visibleDestinations.map((dest) => (
                <div key={dest.id} className="group bg-white rounded-[3.5rem] overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-700">
                  <div className="relative h-80 overflow-hidden">
                    <img src={dest.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={dest.name} />
                    <button
                      onClick={() => onSavePlace(dest)}
                      className={`absolute top-6 left-6 p-4 rounded-3xl backdrop-blur-md transition-all ${isSaved(dest.id) ? 'bg-orange-500 text-white' : 'bg-white/40 text-white hover:bg-white/60'}`}
                    >
                      <Heart className={`w-5 h-5 ${isSaved(dest.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div className="p-10">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-black text-gray-900 font-heading">{dest.name}</h3>
                      <span className="text-2xl font-black text-orange-500">{dest.price}</span>
                    </div>
                    <p className="text-gray-500 font-medium mb-8 line-clamp-2">{dest.desc}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => navigateTo('destination-details', dest.id)}
                        className="py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-gray-800 transition-all uppercase tracking-widest text-[9px]"
                      >
                        Explore
                      </button>
                      <button
                        onClick={() => navigateTo('booking', dest.id)}
                        className="py-4 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 transition-all uppercase tracking-widest text-[9px] shadow-lg shadow-orange-500/20"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < filteredDestinations.length && (
              <div className="text-center mt-16">
                <button
                  onClick={loadMore}
                  className="px-12 py-5 bg-gray-900 text-white font-black rounded-2xl hover:bg-orange-500 transition-all uppercase tracking-widest text-sm flex items-center gap-3 mx-auto group"
                >
                  View More Destinations
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default DestinationsView;