
import { User } from './App';

const API_URL = 'https://traver-backend.onrender.com';

export interface Destination {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: string;
  image: string;
}

const getHeaders = () => {
  const token = localStorage.getItem('traver_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'x-auth-token': token } : {})
  };
};

export const API = {
  // --- AUTHENTICATION ---
  signup: async (userData: { name: string; email: string; password: string }): Promise<{ token: string, user: User }> => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Signup failed');

    localStorage.setItem('traver_token', data.token);
    return data;
  },

  login: async (credentials: { email: string; password: string }): Promise<{ token: string, user: User }> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');

    localStorage.setItem('traver_token', data.token);
    return data;
  },

  // --- SAVED PLACES ---
  toggleSavePlace: async (userId: string, place: Destination): Promise<boolean> => {
    const response = await fetch(`${API_URL}/user/saved-places`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(place),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to toggle saved place');

    return data.saved;
  },

  getSavedPlaces: async (userId: string): Promise<Destination[]> => {
    const response = await fetch(`${API_URL}/user/saved-places`, {
      headers: getHeaders(),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to get saved places');

    return data;
  },

  // --- PROFILE UPDATE ---
  updateProfile: async (userId: string, updates: Partial<User>): Promise<User> => {
    const response = await fetch(`${API_URL}/user/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update profile');

    return data;
  },

  // --- BOOKINGS ---
  bookDestination: async (bookingData: any): Promise<any> => {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Booking failed');

    return data;
  },

  getMyBookings: async (): Promise<any[]> => {
    const response = await fetch(`${API_URL}/bookings`, {
      headers: getHeaders(),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to get bookings');

    return data;
  },

  // --- DESTINATIONS ---
  getAllDestinations: async (): Promise<any[]> => {
    const response = await fetch(`${API_URL}/destinations`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch destinations');
    return data;
  },

  addDestination: async (destData: any): Promise<any> => {
    const response = await fetch(`${API_URL}/destinations`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(destData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to add destination');
    return data;
  },

  // --- ADMIN ---
  getAllUsers: async (): Promise<any[]> => {
    const response = await fetch(`${API_URL}/admin/users`, {
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch users');
    return data;
  },

  getAdminStats: async (): Promise<any> => {
    const response = await fetch(`${API_URL}/admin/stats`, {
      headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch stats');
    return data;
  },

  updateUserRole: async (userId: string, role: string): Promise<any> => {
    const response = await fetch(`${API_URL}/admin/users/${userId}/role`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ role }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update user role');
    return data;
  },

  // --- SUPPORT ---
  submitSupport: async (supportData: any): Promise<any> => {
    const response = await fetch(`${API_URL}/support`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(supportData),
    });

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      data = await response.json();
    } else {
      const text = await response.text();
      throw new Error(text || 'Server Error');
    }

    if (!response.ok) throw new Error(data?.message || 'Failed to submit support message');
    return data;
  }
};

// Keep MockAPI for compatibility if needed, but we'll use API
export const MockAPI = API;
