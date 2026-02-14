
import React, { useState } from 'react';
import { User as UserIcon, Settings, Heart, History, LogOut, Mail, Award, MapPin, Trash2 } from 'lucide-react';
import { User } from '../App';
import { Destination, API } from '../api';

interface AccountViewProps {
  user: User | null;
  logout: () => void;
  savedPlaces: Destination[];
  onToggleSave: (place: Destination) => void;
}

const AccountView: React.FC<AccountViewProps> = ({ user, logout, savedPlaces, onToggleSave }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'saved' | 'history'>('profile');
  const [bookings, setBookings] = useState<any[]>([]);
  const [fetchingBookings, setFetchingBookings] = useState(false);

  React.useEffect(() => {
    if (user && activeTab === 'history') {
      fetchBookings();
    }
  }, [activeTab, user]);

  const fetchBookings = async () => {
    setFetchingBookings(true);
    try {
      const data = await API.getMyBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingBookings(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center font-sans animate-fade-in text-center p-6">
        <div className="bg-orange-50 p-8 rounded-full mb-8"><UserIcon className="w-16 h-16 text-orange-500" /></div>
        <h2 className="text-3xl font-black text-gray-900 mb-4 font-heading">No Profile Found</h2>
        <p className="text-gray-500 font-medium mb-10">Please login to view your account details.</p>
        <button onClick={() => window.location.hash = 'login'} className="px-12 py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-xl">Go to Login</button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up py-20 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[3rem] shadow-xl text-center mb-8 border border-gray-100">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-4 border-orange-50">
                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-black text-gray-900 font-heading">{user.name}</h3>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2 flex items-center justify-center gap-2"><Award className="w-3.5 h-3.5 text-orange-500" /> Member since {user.joinedDate || '2025'}</p>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-4 space-y-1">
              {[
                { id: 'profile', icon: <UserIcon />, label: "Profile Info" },
                { id: 'history', icon: <History />, label: "My Bookings" },
                { id: 'saved', icon: <Heart />, label: `Saved (${savedPlaces.length})` },
              ].map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === item.id ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-500 hover:bg-orange-50 hover:text-orange-500'}`}
                >
                  {React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-5 h-5" })}
                  {item.label}
                </button>
              ))}
              <button onClick={logout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-red-400 hover:bg-red-50 transition-all mt-4 border-t border-gray-50 pt-8">
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 lg:p-12 rounded-[4rem] border border-gray-100 shadow-xl min-h-[600px]">

              {activeTab === 'profile' && (
                <div className="animate-fade-in">
                  <h2 className="text-3xl font-black text-gray-900 font-heading mb-12">Personal Details</h2>
                  <div className="grid md:grid-cols-2 gap-10">
                    {[
                      { label: "Full Name", val: user.name, icon: <UserIcon className="w-4 h-4" /> },
                      { label: "Email Address", val: user.email, icon: <Mail className="w-4 h-4" /> },
                      { label: "Account ID", val: (user.id || (user as any)._id || 'N/A').toUpperCase(), icon: <Settings className="w-4 h-4" /> },
                      { label: "Account Type", val: (user.type || 'Email').toUpperCase(), icon: <Award className="w-4 h-4" /> },
                    ].map((field, i) => (
                      <div key={i} className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">{field.label}</label>
                        <div className="flex items-center gap-4 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-800 font-bold overflow-hidden">
                          <div className="text-orange-500 opacity-50 shrink-0">{field.icon}</div>
                          <span className="truncate">{field.val}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'saved' && (
                <div className="animate-fade-in">
                  <h2 className="text-3xl font-black text-gray-900 font-heading mb-8">Saved Destinations</h2>
                  {savedPlaces.length === 0 ? (
                    <div className="py-20 text-center">
                      <Heart className="w-16 h-16 text-gray-100 mx-auto mb-6" />
                      <p className="text-gray-400 font-bold">You haven't saved any places yet.</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      {savedPlaces.map((place) => (
                        <div key={place.id} className="flex gap-5 p-4 bg-gray-50 rounded-3xl border border-gray-100 group">
                          <img src={place.image} className="w-24 h-24 object-cover rounded-2xl shrink-0" alt="" />
                          <div className="flex flex-col justify-center flex-grow">
                            <h4 className="font-bold text-gray-800 mb-1 group-hover:text-orange-500 transition-colors">{place.name}</h4>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mb-3 flex items-center gap-1"><MapPin className="w-3 h-3" /> {place.location}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-orange-500 font-black text-sm">{place.price}</span>
                              <button onClick={() => onToggleSave(place)} className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'history' && (
                <div className="animate-fade-in">
                  <h2 className="text-3xl font-black text-gray-900 font-heading mb-8">My Bookings</h2>
                  {fetchingBookings ? (
                    <div className="py-20 text-center text-orange-500 font-bold">
                      Loading your bookings...
                    </div>
                  ) : bookings.length === 0 ? (
                    <div className="py-20 text-center">
                      <History className="w-16 h-16 text-gray-100 mx-auto mb-6" />
                      <h3 className="text-xl font-bold text-gray-400">No Booking History</h3>
                      <p className="text-gray-300 text-sm mt-2">Start planning your first trip today!</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {bookings.map((booking) => (
                        <div key={booking._id} className="p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm">
                              <MapPin className="w-8 h-8" />
                            </div>
                            <div>
                              <h4 className="font-heading font-black text-gray-900">{booking.destinationName}</h4>
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{booking.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-8">
                            <div className="text-center">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Guests</p>
                              <p className="font-bold text-gray-900">{booking.guests} Persons</p>
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                              <span className="px-3 py-1 bg-green-100 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full">{booking.status}</span>
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Method</p>
                              <p className="font-bold text-gray-900 uppercase text-[10px]">{booking.paymentMethod || 'CARD'}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Paid</p>
                              <p className="text-xl font-black text-orange-500">${booking.totalPrice}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountView;
