
import React, { useEffect, useState } from 'react';
import { MapPin, Star, Calendar, Users, Heart, ArrowLeft, Share2, ShieldCheck, Coffee, Wifi, Car, Mountain, AlertCircle } from 'lucide-react';
import { Destination } from '../api';
import { Page } from '../App';

interface DestinationDetailsViewProps {
    destinationId: string;
    onBack: () => void;
    onSavePlace: (place: Destination) => void;
    savedPlaces: Destination[];
    isLoggedIn: boolean;
    navigateTo: (page: Page) => void;
}

// In a real app, this would come from an API or shared constant
const ALL_DESTINATIONS = [
    { id: 'v1', name: "Nusa Penida", cat: "Island", price: "$180", rating: "4.9", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRev7BjPnv9aeNeI3ongoEBN_bhl4C4XxhnAg&s", location: "Bali, Indonesia", desc: "Explore the iconic Kelingking Beach and crystal clear waters." },
    { id: 'v2', name: "Swiss Alps", cat: "Mountain", price: "$450", rating: "5.0", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=1200", location: "Switzerland", desc: "Experience world-class skiing and breathtaking views." },
    { id: 'v3', name: "Tokyo City", cat: "City", price: "$320", rating: "4.8", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1200", location: "Japan", desc: "A blend of traditional culture and futuristic tech." },
    { id: 'v4', name: "Maldives", cat: "Beach", price: "$550", rating: "4.9", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200", location: "Indian Ocean", desc: "Luxury overwater villas and pristine turquoise lagoons." },
    { id: 'v5', name: "Phi Phi Islands", cat: "Beach", price: "$210", rating: "4.7", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=1200", location: "Thailand", desc: "Stunning cliffs and vibrant nightlife by the sea." },
    { id: 'v6', name: "Amazon Rainforest", cat: "Forest", price: "$300", rating: "4.8", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=1200", location: "Brazil", desc: "The world's largest tropical rainforest full of wildlife." },
    { id: 'v7', name: "Black Forest", cat: "Forest", price: "$280", rating: "4.6", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1200", location: "Germany", desc: "Dense, evergreen forests and picturesque villages." },
    { id: 'v8', name: "Sahara Desert", cat: "Desert", price: "$150", rating: "4.7", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=1200", location: "Morocco", desc: "Camel trekking under the stars in golden dunes." },
    { id: 'v9', name: "Dubai Desert Safari", cat: "Desert", price: "$400", rating: "4.9", image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?auto=format&fit=crop&q=80&w=1200", location: "UAE", desc: "Thrilling dune bashing and traditional Bedouin camps." },
    { id: 'v10', name: "Paris", cat: "City", price: "$380", rating: "4.9", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1200", location: "France", desc: "The city of love, lights, and the iconic Eiffel Tower." },
    { id: 'v11', name: "Santorini", cat: "Island", price: "$420", rating: "4.9", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200", location: "Greece", desc: "Famous white-washed buildings with stunning sunsets." },

    // From Destinations component
    { id: 'd1', name: "Karangan Beach", location: "Labuan Bajo, Indonesia", price: "$200", rating: "4.8", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200", desc: "A hidden gem in Labuan Bajo with white sand and crystal clear water." },
    { id: 'd2', name: "Kepunuh Beach", location: "Bali, Indonesia", price: "$250", rating: "4.5", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1200", desc: "Serene beach atmosphere in Bali, perfect for sunsets." },
    { id: 'd3', name: "Kucubung Beach", location: "Labuan Bajo, Indonesia", price: "$350", rating: "4.9", image: "https://finnsbeachclub.com/wp-content/uploads/2024/08/AF1QipPzcmH-ICDw7Jsg2L0plcr9M_Mk6fNiJSFS30f0w1200-768x512.webp", desc: "Pristine beach with amazing snorkeling spots." },
    { id: 'd4', name: "Raja Ampat", location: "West Papua, Indonesia", price: "$450", rating: "4.9", image: "https://cf.bstatic.com/xdata/images/hotel/max500/633326998.jpg?k=2112efc00c0e63cb03b75d488c1212a122b631fbe89f943ae261a1f9feada18c&o=&hp=1", desc: "The last paradise on earth, home to the most diverse marine life." },
    { id: 'd5', name: "Santorini", location: "Cyclades, Greece", price: "$600", rating: "4.8", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200", desc: "Breathtaking views of the Aegean Sea and iconic blue-domed churches." },
    { id: 'd6', name: "Kyoto Gardens", location: "Kyoto, Japan", price: "$300", rating: "4.7", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&q=80&w=1200", desc: "Traditional Zen gardens and beautiful cherry blossoms." },
    { id: 'd7', name: "Machu Picchu", location: "Cusco Region, Peru", price: "$500", rating: "4.9", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=1200", desc: "Ancient Incan citadel high in the Andes mountains." },
    { id: 'd8', name: "Bora Bora", location: "French Polynesia", price: "$800", rating: "5.0", image: "https://images.unsplash.com/photo-1532408840957-031d8034aeef?auto=format&fit=crop&q=80&w=1200", desc: "The ultimate luxury getaway with overwater bungalows." },
    { id: 'd9', name: "Maldives Islands", location: "Male, Maldives", price: "$700", rating: "4.8", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200", desc: "World-famous turquoise waters and luxurious island resorts." },
];

const DestinationDetailsView: React.FC<DestinationDetailsViewProps> = ({ destinationId, onBack, onSavePlace, savedPlaces, isLoggedIn, navigateTo }) => {
    const dest = ALL_DESTINATIONS.find(d => d.id === destinationId) || ALL_DESTINATIONS[0];
    const isSaved = savedPlaces.some(p => p.id === dest.id);

    const [activeTab, setActiveTab] = useState('Overview');
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBooking = () => {
        if (!isLoggedIn) {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                navigateTo('login');
            }, 3000);
            return;
        }
        navigateTo('booking');
    };

    return (
        <div className="animate-fade-in font-sans min-h-screen bg-gray-50 pb-20">
            {/* Login Notification Pop-up */}
            {showNotification && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] animate-fade-in-up">
                    <div className="bg-white border-2 border-orange-500 rounded-3xl p-6 shadow-[0_20px_50px_rgba(255,114,53,0.3)] flex items-center gap-4 min-w-[320px]">
                        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500">
                            <AlertCircle className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                            <p className="text-gray-900 font-black uppercase tracking-widest text-[10px] mb-1">Attention Required</p>
                            <p className="text-sm font-bold text-gray-600">Please login first to continue..</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Header */}
            <div className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

                {/* Top Actions */}
                <div className="absolute top-8 left-0 right-0 px-6 lg:px-12 flex justify-between items-center z-20">
                    <button
                        onClick={onBack}
                        className="p-4 rounded-3xl bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/40 transition-all"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div className="flex gap-4">
                        <button className="p-4 rounded-3xl bg-white/20 backdrop-blur-md border border-white/20 text-white hover:bg-white/40 transition-all">
                            <Share2 className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => onSavePlace(dest as any)}
                            className={`p-4 rounded-3xl backdrop-blur-md border border-white/20 transition-all ${isSaved ? 'bg-orange-500 text-white border-orange-500' : 'bg-white/20 text-white hover:bg-white/40'}`}
                        >
                            <Heart className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Hero Title */}
                <div className="absolute bottom-12 left-0 right-0 px-6 lg:px-12 z-20">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-4 py-1.5 rounded-full bg-orange-500 text-white text-xs font-black uppercase tracking-widest whitespace-nowrap">
                            {dest.location.split(',')[1] || dest.location}
                        </span>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold">
                            <Star className="w-4 h-4 fill-orange-400 text-orange-400 border-none" />
                            {dest.rating}
                        </div>
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black text-white font-heading drop-shadow-2xl">{dest.name}</h1>
                    <p className="flex items-center gap-2 text-white/80 font-bold mt-4">
                        <MapPin className="w-5 h-5 text-orange-400" /> {dest.location}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-10 relative z-30">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[3.5rem] p-10 shadow-xl border border-gray-100">
                            {/* Tabs */}
                            <div className="flex gap-8 border-b border-gray-100 mb-10 overflow-x-auto pb-2">
                                {['Overview', 'Amenities', 'Reviews', 'Polices'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`text-sm font-black uppercase tracking-widest pb-4 transition-all relative whitespace-nowrap ${activeTab === tab ? 'text-gray-900 border-b-2 border-orange-500' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {activeTab === 'Overview' && (
                                <div className="space-y-10">
                                    <div>
                                        <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-wider">About this place</h2>
                                        <p className="text-gray-600 font-medium leading-[2] text-lg">
                                            {dest.desc} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                        {[
                                            { icon: <Coffee />, label: 'Breakfast', value: 'Included' },
                                            { icon: <Wifi />, label: 'Wi-Fi', value: 'High Speed' },
                                            { icon: <Car />, label: 'Parking', value: 'Free' },
                                            { icon: <ShieldCheck />, label: 'Security', value: '24/7' },
                                        ].map((item, idx) => (
                                            <div key={idx} className="bg-gray-50 rounded-3xl p-6 flex flex-col items-center text-center group hover:bg-orange-50 transition-colors">
                                                <div className="text-orange-500 mb-4 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                                                <p className="text-sm font-bold text-gray-800">{item.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-8 bg-orange-500 rounded-[2.5rem] text-white flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                                <Mountain className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black uppercase tracking-widest opacity-80">Local Guide</p>
                                                <p className="text-xl font-black">Expert-led tours included</p>
                                            </div>
                                        </div>
                                        <button className="px-8 py-3 bg-white text-orange-500 font-black rounded-2xl hover:bg-gray-100 transition-colors uppercase tracking-widest text-xs">
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[3.5rem] p-10 shadow-xl border border-gray-100 sticky top-32">
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <p className="text-gray-400 font-black uppercase tracking-widest text-xs mb-1">Total Starting From</p>
                                    <p className="text-4xl font-black text-gray-900">{dest.price}<span className="text-sm text-gray-400 font-bold ml-2">/ person</span></p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Dates</p>
                                    <div className="flex items-center gap-3 text-gray-800 font-bold">
                                        <Calendar className="w-5 h-5 text-orange-500" />
                                        <span>Jan 24 - Jan 31, 2024</span>
                                    </div>
                                </div>
                                <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Guests</p>
                                    <div className="flex items-center gap-3 text-gray-800 font-bold">
                                        <Users className="w-5 h-5 text-orange-500" />
                                        <span>2 Persons</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleBooking}
                                className="w-full py-6 bg-gray-900 text-white font-black rounded-[2rem] hover:bg-orange-500 transition-all uppercase tracking-[0.2em] text-sm shadow-xl hover:shadow-orange-500/20 mb-6"
                            >
                                Book This Journey
                            </button>

                            <p className="text-center text-gray-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                                <ShieldCheck className="w-4 h-4" /> Best Price Guaranteed
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationDetailsView;
