import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    MapPin,
    Users,
    Plus,
    Trash2,
    TrendingUp,
    DollarSign,
    Briefcase,
    Loader2,
    X,
    Search,
    Settings,
    Bell
} from 'lucide-react';
import { Page, User } from '../App';
import { API } from '../api';

interface AdminViewProps {
    user: User | null;
    navigateTo: (page: Page) => void;
}

const AdminView: React.FC<AdminViewProps> = ({ user, navigateTo }) => {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'destinations' | 'users'>('dashboard');
    const [stats, setStats] = useState({ users: 0, bookings: 0, revenue: 0 });
    const [destinationList, setDestinationList] = useState<any[]>([]);
    const [userList, setUserList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    const [newDest, setNewDest] = useState({
        name: '',
        location: '',
        category: 'Island',
        price: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigateTo('home');
            return;
        }
        fetchData();
    }, [user, activeTab, navigateTo]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'dashboard') {
                const data = await API.getAdminStats();
                setStats(data);
            } else if (activeTab === 'destinations') {
                const data = await API.getAllDestinations();
                setDestinationList(data);
            } else if (activeTab === 'users') {
                const data = await API.getAllUsers();
                setUserList(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddDestination = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await API.addDestination(newDest);
            setShowAddModal(false);
            setNewDest({ name: '', location: '', category: 'Island', price: '', description: '', image: '' });
            fetchData();
        } catch (error) {
            alert("Failed to add destination");
        }
    };

    const handleUpdateRole = async (targetUserId: string, currentRole: string) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        if (!window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;

        try {
            await API.updateUserRole(targetUserId, newRole);
            fetchData();
        } catch (error: any) {
            alert(error.message || "Failed to update role");
        }
    };

    if (!user || user.role !== 'admin') return null;

    const NavItems = [
        { id: 'dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
        { id: 'destinations', icon: <MapPin />, label: 'Destinations' },
        { id: 'users', icon: <Users />, label: 'User Management' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            <div className="w-64 bg-slate-900 flex flex-col fixed h-full z-20">
                <div className="h-20 flex items-center px-6 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="bg-orange-500 w-9 h-9 rounded-lg flex items-center justify-center text-white">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-white tracking-tight">Admin Panel</h2>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Globe Express</p>
                        </div>
                    </div>
                </div>

                <div className="flex-grow py-6 px-3 space-y-1">
                    {NavItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as any)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm transition-all ${activeTab === item.id ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
                        >
                            {React.cloneElement(item.icon, { className: "w-5 h-5" })}
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={() => navigateTo('home')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
                    >
                        <X className="w-5 h-5" /> Back to Website
                    </button>
                </div>
            </div>

            <div className="flex-grow ml-64">
                <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-8">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-semibold text-slate-800 capitalize">{activeTab}</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none w-64"
                            />
                        </div>

                        <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
                        </button>

                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <img src={user?.avatar} className="w-9 h-9 rounded-full object-cover" alt="Admin" />
                            <div className="text-sm">
                                <p className="font-semibold text-slate-700">{user?.name}</p>
                                <p className="text-xs text-slate-400">Administrator</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8">
                    {loading ? (
                        <div className="h-[60vh] flex flex-col items-center justify-center text-slate-400">
                            <Loader2 className="w-10 h-10 animate-spin mb-3 text-orange-500" />
                            <p className="text-sm font-medium">Loading data...</p>
                        </div>
                    ) : (
                        <div className="animate-fade-in">
                            {activeTab === 'dashboard' && (
                                <div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-3 bg-blue-50 rounded-lg text-blue-500">
                                                    <Users className="w-6 h-6" />
                                                </div>
                                                <span className="flex items-center text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">
                                                    <TrendingUp className="w-3 h-3 mr-1" /> 12%
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-500 mb-1">Total Users</p>
                                            <p className="text-3xl font-bold text-slate-800">{stats.users}</p>
                                        </div>

                                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-3 bg-orange-50 rounded-lg text-orange-500">
                                                    <Briefcase className="w-6 h-6" />
                                                </div>
                                                <span className="flex items-center text-xs font-medium text-green-500 bg-green-50 px-2 py-1 rounded-full">
                                                    <TrendingUp className="w-3 h-3 mr-1" /> 8%
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-500 mb-1">Total Bookings</p>
                                            <p className="text-3xl font-bold text-slate-800">{stats.bookings}</p>
                                        </div>

                                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-3 bg-emerald-50 rounded-lg text-emerald-500">
                                                    <DollarSign className="w-6 h-6" />
                                                </div>
                                                <span className="flex items-center text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded-full">
                                                    <TrendingUp className="w-3 h-3 mr-1 rotate-180" /> 3%
                                                </span>
                                            </div>
                                            <p className="text-sm text-slate-500 mb-1">Revenue</p>
                                            <p className="text-3xl font-bold text-slate-800">${stats.revenue}</p>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                                        <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
                                        <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-lg text-slate-400 text-sm">
                                            Activity chart or list goes here
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'destinations' && (
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-800">All Destinations</h2>
                                            <p className="text-sm text-slate-400">Manage your travel spots</p>
                                        </div>
                                        <button
                                            onClick={() => setShowAddModal(true)}
                                            className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-orange-600 shadow-sm transition-colors"
                                        >
                                            <Plus className="w-4 h-4" /> Add Destination
                                        </button>
                                    </div>

                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {destinationList.map((dest: any) => (
                                            <div key={dest._id} className="bg-white rounded-xl border border-slate-200 overflow-hidden group hover:border-orange-200 transition-all">
                                                <div className="h-44 relative overflow-hidden">
                                                    <img src={dest.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                                    <div className="absolute top-3 right-3">
                                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-slate-600 text-[10px] font-bold uppercase tracking-wider shadow-sm">{dest.category}</span>
                                                    </div>
                                                </div>
                                                <div className="p-5">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="text-base font-semibold text-slate-800">{dest.name}</h3>
                                                        <span className="text-sm font-bold text-orange-500">{dest.price}</span>
                                                    </div>
                                                    <p className="text-xs text-slate-400 flex items-center gap-1 mb-4">
                                                        <MapPin className="w-3 h-3" /> {dest.location}
                                                    </p>
                                                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                                        <button className="text-xs font-semibold text-slate-500 hover:text-orange-500 transition-colors">Edit</button>
                                                        <button className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'users' && (
                                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                                    <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                                        <div>
                                            <h2 className="text-lg font-semibold text-slate-800">User Management</h2>
                                            <p className="text-sm text-slate-400">A list of all registered users</p>
                                        </div>
                                        <button className="text-sm font-medium text-slate-500 hover:text-slate-700">
                                            Export Data
                                        </button>
                                    </div>
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-slate-50 border-b border-slate-100 text-left">
                                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
                                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {userList.map((usr: any) => (
                                                <tr key={usr._id} className="hover:bg-slate-50/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <img src={usr.avatar} className="w-9 h-9 rounded-full object-cover" alt={usr.name} />
                                                            <span className="text-sm font-medium text-slate-700">{usr.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-500">{usr.email}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${usr.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-600'}`}>
                                                            {usr.role || 'user'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-500">{usr.joinedDate}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                onClick={() => handleUpdateRole(usr._id, usr.role || 'user')}
                                                                title={usr.role === 'admin' ? "Demote to User" : "Promote to Admin"}
                                                                disabled={usr._id === user?.id || (usr as any)._id === (user as any)._id}
                                                                className={`p-1.5 rounded-md transition-all ${usr.role === 'admin' ? 'text-purple-400 hover:bg-purple-50 hover:text-purple-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'} disabled:opacity-30 disabled:cursor-not-allowed`}
                                                            >
                                                                <Settings className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {showAddModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white max-w-xl w-full rounded-2xl shadow-2xl relative animate-scale-up overflow-hidden">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">Add New Destination</h2>
                                <p className="text-xs text-slate-400">Fill details to publish a new spot</p>
                            </div>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="p-1.5 hover:bg-slate-200 rounded-md transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        <form onSubmit={handleAddDestination} className="p-6 space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Bali"
                                        value={newDest.name}
                                        onChange={(e) => setNewDest({ ...newDest, name: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Location</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Indonesia"
                                        value={newDest.location}
                                        onChange={(e) => setNewDest({ ...newDest, location: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Category</label>
                                    <select
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-orange-500 appearance-none"
                                        value={newDest.category}
                                        onChange={(e) => setNewDest({ ...newDest, category: e.target.value })}
                                    >
                                        <option>Island</option>
                                        <option>Mountain</option>
                                        <option>City</option>
                                        <option>Beach</option>
                                        <option>Forest</option>
                                        <option>Desert</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Price</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. $200"
                                        value={newDest.price}
                                        onChange={(e) => setNewDest({ ...newDest, price: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Image URL</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="https://..."
                                    value={newDest.image}
                                    onChange={(e) => setNewDest({ ...newDest, image: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Description</label>
                                <textarea
                                    rows={3}
                                    required
                                    placeholder="Short description..."
                                    value={newDest.description}
                                    onChange={(e) => setNewDest({ ...newDest, description: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                                ></textarea>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 text-sm font-semibold bg-orange-500 text-white rounded-lg hover:bg-orange-600 shadow-sm transition-colors"
                                >
                                    Publish Destination
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminView;