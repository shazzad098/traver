
import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Calendar,
    Users,
    ShieldCheck,
    CreditCard,
    User,
    Mail,
    Phone,
    MapPin,
    Loader2,
    CheckCircle2,
    Lock,
    Smartphone,
    Globe,
    ChevronRight,
    Wallet
} from 'lucide-react';
import { Page } from '../App';
import { Destination, API } from '../api';

interface BookingViewProps {
    destinationId: string;
    navigateTo: (page: Page) => void;
    onBack: () => void;
}

const ALL_DESTINATIONS = [
    { id: 'v1', name: "Nusa Penida", cat: "Island", price: "$180", rating: "4.9", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRev7BjPnv9aeNeI3ongoEBN_bhl4C4XxhnAg&s", location: "Bali, Indonesia" },
    { id: 'v2', name: "Swiss Alps", cat: "Mountain", price: "$450", rating: "5.0", image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=1200", location: "Switzerland" },
    { id: 'v3', name: "Tokyo City", cat: "City", price: "$320", rating: "4.8", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1200", location: "Japan" },
    { id: 'v4', name: "Maldives", cat: "Beach", price: "$550", rating: "4.9", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200", location: "Indian Ocean" },
    { id: 'v5', name: "Phi Phi Islands", cat: "Beach", price: "$210", rating: "4.7", image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=1200", location: "Thailand" },
    { id: 'v6', name: "Amazon Rainforest", cat: "Forest", price: "$300", rating: "4.8", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=1200", location: "Brazil" },
    { id: 'v7', name: "Black Forest", cat: "Forest", price: "$280", rating: "4.6", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1200", location: "Germany" },
    { id: 'v8', name: "Sahara Desert", cat: "Desert", price: "$150", rating: "4.7", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=1200", location: "Morocco" },
    { id: 'v9', name: "Dubai Desert Safari", cat: "Desert", price: "$400", rating: "4.9", image: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?auto=format&fit=crop&q=80&w=1200", location: "UAE" },
    { id: 'v10', name: "Paris", cat: "City", price: "$380", rating: "4.9", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1200", location: "France" },
    { id: 'v11', name: "Santorini", cat: "Island", price: "$420", rating: "4.9", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200", location: "Greece" },
    { id: 'd1', name: "Karangan Beach", location: "Labuan Bajo, Indonesia", price: "$200", rating: "4.8", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200" },
    { id: 'd2', name: "Kepunuh Beach", location: "Bali, Indonesia", price: "$250", rating: "4.5", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=1200" },
    { id: 'd3', name: "Kucubung Beach", location: "Labuan Bajo, Indonesia", price: "$350", rating: "4.9", image: "https://finnsbeachclub.com/wp-content/uploads/2024/08/AF1QipPzcmH-ICDw7Jsg2L0plcr9M_Mk6fNiJSFS30f0w1200-768x512.webp" },
    { id: 'd4', name: "Raja Ampat", location: "West Papua, Indonesia", price: "$450", rating: "4.9", image: "https://cf.bstatic.com/xdata/images/hotel/max500/633326998.jpg?k=2112efc00c0e63cb03b75d488c1212a122b631fbe89f943ae261a1f9feada18c&o=&hp=1" },
    { id: 'd5', name: "Santorini", location: "Cyclades, Greece", price: "$600", rating: "4.8", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1200" },
    { id: 'd6', name: "Kyoto Gardens", location: "Kyoto, Japan", price: "$300", rating: "4.7", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&q=80&w=1200" },
    { id: 'd7', name: "Machu Picchu", location: "Cusco Region, Peru", price: "$500", rating: "4.9", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=1200" },
    { id: 'd8', name: "Bora Bora", location: "French Polynesia", price: "$800", rating: "5.0", image: "https://images.unsplash.com/photo-1532408840957-031d8034aeef?auto=format&fit=crop&q=80&w=1200" },
    { id: 'd9', name: "Maldives Islands", location: "Male, Maldives", price: "$700", rating: "4.8", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200" },
];

const BookingView: React.FC<BookingViewProps> = ({ destinationId, navigateTo, onBack }) => {
    const dest = ALL_DESTINATIONS.find(d => d.id === destinationId) || ALL_DESTINATIONS[0];

    const [step, setStep] = useState<1 | 2>(1);
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'bkash' | 'paypal'>('card');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        guests: '2',
        date: '',
        specialRequests: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvv: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const totalPrice = parseInt(dest.price.replace('$', '')) + 45;
            await API.bookDestination({
                ...formData,
                destinationId: dest.id,
                destinationName: dest.name,
                totalPrice: totalPrice,
                paymentMethod: paymentMethod
            });
            setSuccess(true);
            setTimeout(() => {
                navigateTo('account');
            }, 3000);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 pt-24">
                <div className="max-w-md w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-gray-100 animate-fade-in">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 mx-auto mb-8">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4 font-heading">Payment Successful!</h2>
                    <p className="text-gray-500 font-bold mb-8">Your journey to {dest.name} has been secured. Pack your bags!</p>
                    <button
                        onClick={() => navigateTo('account')}
                        className="w-full py-5 bg-orange-500 text-white font-black rounded-full transition-all uppercase tracking-[0.2em] text-[11px]"
                    >
                        View My Booking
                    </button>
                </div>
            </div>
        );
    }

    const priceNum = parseInt(dest.price.replace('$', ''));
    const totalPrice = priceNum + 45;

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-24 animate-fade-in font-sans">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* Header & Steps */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
                    <div>
                        <button
                            onClick={step === 1 ? onBack : () => setStep(1)}
                            className="flex items-center gap-2 text-gray-400 font-black text-[10px] mb-4 hover:text-orange-500 transition-all uppercase tracking-widest"
                        >
                            <ArrowLeft className="w-4 h-4" /> {step === 1 ? "Back to Details" : "Back to Details"}
                        </button>
                        <h1 className="text-4xl lg:text-5xl font-black text-gray-900 font-heading">
                            {step === 1 ? "Traveler Info" : "Secure Payment"}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all ${step === 1 ? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}>
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black italic">01</span>
                            <span className="text-xs font-black uppercase tracking-widest">Informaton</span>
                        </div>
                        <div className="w-8 h-[2px] bg-gray-200"></div>
                        <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all ${step === 2 ? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}>
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black italic">02</span>
                            <span className="text-xs font-black uppercase tracking-widest">Payment</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">

                        {step === 1 ? (
                            <form onSubmit={handleNext} className="bg-white rounded-[3rem] p-10 lg:p-14 shadow-xl border border-gray-100 animate-fade-in">
                                <p className="text-gray-400 font-bold mb-10 uppercase tracking-widest text-xs">Fill in your information to secure your spot</p>

                                <div className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Full Name</label>
                                            <div className="relative group">
                                                <input
                                                    name="fullName"
                                                    type="text"
                                                    required
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    placeholder="John Doe"
                                                    className="w-full bg-gray-50 rounded-2xl border border-gray-100 px-6 py-4 font-bold text-gray-900 focus:outline-none focus:border-orange-500 transition-all"
                                                />
                                                <User className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Email Address</label>
                                            <div className="relative group">
                                                <input
                                                    name="email"
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="john@example.com"
                                                    className="w-full bg-gray-50 rounded-2xl border border-gray-100 px-6 py-4 font-bold text-gray-900 focus:outline-none focus:border-orange-500 transition-all"
                                                />
                                                <Mail className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Phone Number</label>
                                            <div className="relative group">
                                                <input
                                                    name="phone"
                                                    type="tel"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+1 234 567 890"
                                                    className="w-full bg-gray-50 rounded-2xl border border-gray-100 px-6 py-4 font-bold text-gray-900 focus:outline-none focus:border-orange-500 transition-all"
                                                />
                                                <Phone className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Preferred Date</label>
                                            <div className="relative group">
                                                <input
                                                    name="date"
                                                    type="date"
                                                    required
                                                    value={formData.date}
                                                    onChange={handleChange}
                                                    className="w-full bg-gray-50 rounded-2xl border border-gray-100 px-6 py-4 font-bold text-gray-900 focus:outline-none focus:border-orange-500 transition-all"
                                                />
                                                <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Special Requests (Optional)</label>
                                        <textarea
                                            name="specialRequests"
                                            rows={4}
                                            value={formData.specialRequests}
                                            onChange={handleChange}
                                            placeholder="Any dietary requirements or specific needs?"
                                            className="w-full bg-gray-50 rounded-3xl border border-gray-100 px-6 py-4 font-bold text-gray-900 focus:outline-none focus:border-orange-500 transition-all resize-none"
                                        ></textarea>
                                    </div>

                                    <div className="pt-6">
                                        <button
                                            type="submit"
                                            className="w-full py-6 bg-gray-900 text-white font-black rounded-full transition-all uppercase tracking-[0.2em] text-sm shadow-xl flex items-center justify-center gap-3 group"
                                        >
                                            Continue to Payment <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-8 animate-fade-in-up">
                                {/* Select Method */}
                                <div className="bg-white rounded-[3rem] p-10 lg:p-14 shadow-xl border border-gray-100">
                                    <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-wider">Select Payment Method</h3>

                                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                                        {[
                                            { id: 'card', name: 'Credit Card', icon: <CreditCard />, color: 'blue' },
                                            { id: 'bkash', name: 'bKash / Mobile', icon: <Smartphone />, color: 'pink' },
                                            { id: 'paypal', name: 'PayPal', icon: <Globe />, color: 'indigo' }
                                        ].map((method) => (
                                            <button
                                                key={method.id}
                                                onClick={() => setPaymentMethod(method.id as any)}
                                                className={`p-6 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 group ${paymentMethod === method.id ? 'border-orange-500 bg-orange-50/50 shadow-inner' : 'border-gray-50 bg-gray-50 hover:bg-white hover:border-orange-200'}`}
                                            >
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${paymentMethod === method.id ? 'bg-orange-500 text-white shadow-lg' : 'bg-white text-gray-400 group-hover:bg-orange-100 group-hover:text-orange-500'}`}>
                                                    {React.cloneElement(method.icon as any, { className: "w-6 h-6" })}
                                                </div>
                                                <span className={`text-[11px] font-black uppercase tracking-widest ${paymentMethod === method.id ? 'text-orange-600' : 'text-gray-400'}`}>{method.name}</span>
                                            </button>
                                        ))}
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        {paymentMethod === 'card' && (
                                            <div className="space-y-6 animate-fade-in">
                                                <div className="space-y-3">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Card Number</label>
                                                    <div className="relative">
                                                        <input
                                                            name="cardNumber"
                                                            type="text"
                                                            required
                                                            value={formData.cardNumber}
                                                            onChange={handleChange}
                                                            placeholder="0000 0000 0000 0000"
                                                            className="w-full bg-gray-50 rounded-2xl border border-gray-100 px-6 py-4 font-bold text-gray-900 focus:outline-none focus:border-orange-500 transition-all"
                                                        />
                                                        <Lock className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Expiry Date</label>
                                                        <input
                                                            name="cardExpiry"
                                                            type="text"
                                                            required
                                                            value={formData.cardExpiry}
                                                            onChange={handleChange}
                                                            placeholder="MM / YY"
                                                            className="w-full bg-gray-50 rounded-2xl border border-gray-100 px-6 py-4 font-bold text-gray-900 focus:outline-none focus:border-orange-500 transition-all font-mono"
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">CVV</label>
                                                        <input
                                                            name="cardCvv"
                                                            type="password"
                                                            required
                                                            maxLength={3}
                                                            value={formData.cardCvv}
                                                            onChange={handleChange}
                                                            placeholder="***"
                                                            className="w-full bg-gray-50 rounded-2xl border border-gray-100 px-6 py-4 font-bold text-gray-900 focus:outline-none focus:border-orange-500 transition-all font-mono"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {paymentMethod === 'bkash' && (
                                            <div className="bg-pink-50/50 rounded-3xl p-8 border border-pink-100 text-center animate-fade-in">
                                                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-pink-200">
                                                    <Smartphone className="w-8 h-8" />
                                                </div>
                                                <h4 className="text-lg font-black text-pink-600 mb-4 font-heading">bKash Payment</h4>
                                                <p className="text-gray-500 font-medium text-sm mb-6 px-10">You will be redirected to the secure bKash payment gateway to authorize this transaction.</p>
                                                <div className="space-y-3 max-w-xs mx-auto text-left">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-400 ml-4">bKash Number</label>
                                                    <input
                                                        type="tel"
                                                        placeholder="017XX XXX XXX"
                                                        className="w-full bg-white rounded-2xl border border-pink-100 px-6 py-4 font-bold text-gray-900 focus:outline-none focus:border-pink-500 transition-all"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {paymentMethod === 'paypal' && (
                                            <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100 text-center animate-fade-in">
                                                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-blue-200">
                                                    <Globe className="w-8 h-8" />
                                                </div>
                                                <h4 className="text-lg font-black text-blue-700 mb-4 font-heading">PayPal Checkout</h4>
                                                <p className="text-gray-500 font-medium text-sm mb-6 px-10">Login to your PayPal account to complete the payment for your journey.</p>
                                                <button type="button" className="px-10 py-4 bg-[#0070ba] text-white font-black rounded-2xl hover:bg-[#005ea6] transition-all uppercase tracking-widest text-[10px]">
                                                    Login to PayPal
                                                </button>
                                            </div>
                                        )}

                                        <div className="pt-6">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full py-6 bg-orange-500 text-white font-black rounded-full transition-all uppercase tracking-[0.2em] text-sm shadow-[0_20px_40px_rgba(249,115,22,0.3)] hover:shadow-orange-500/50 flex items-center justify-center gap-3 active:scale-[0.98]"
                                            >
                                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Pay ${totalPrice}.00 Now <ShieldCheck className="w-5 h-5" /></>}
                                            </button>
                                            <p className="text-center text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
                                                <Lock className="w-3 h-3 text-green-500" /> Payment data is encrypted and secure
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100 sticky top-32 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-[40px] -mr-16 -mt-16"></div>

                            <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-wider relative z-10">Trip Summary</h3>

                            <div className="flex gap-4 mb-8">
                                <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-lg border-2 border-white">
                                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-sm font-black text-gray-900 mb-1">{dest.name}</p>
                                    <p className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                                        <MapPin className="w-3 h-3 text-orange-500" /> {dest.location}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-bold">Base Price</span>
                                    <span className="text-gray-900 font-black">{dest.price}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400 font-bold">Security & Taxes</span>
                                    <span className="text-gray-900 font-black">$45.00</span>
                                </div>
                                <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Total Amount</span>
                                    <span className="text-2xl font-black text-orange-500">
                                        ${totalPrice}.00
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-3xl p-6 space-y-4">
                                <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                                    <Wallet className="w-4 h-4 text-orange-500" /> No Hidden Fees
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                                    <Calendar className="w-4 h-4 text-blue-500" /> Booked for: {formData.date || "Selected Date"}
                                </div>
                                <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                                    <Users className="w-4 h-4 text-purple-500" /> Group Size: {formData.guests} Persons
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingView;
