
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './pages/HomeView';
import AboutView from './pages/AboutView';
import DestinationsView from './pages/DestinationsView';
import FeaturesView from './pages/FeaturesView';
import AccountView from './pages/AccountView';
import SupportView from './pages/SupportView';
import AuthView from './pages/AuthView';
import DestinationDetailsView from './pages/DestinationDetailsView';
import BookingView from './pages/BookingView';
import AdminView from './pages/AdminView';
import NewView from './pages/NewView';
import CareersView from './pages/CareersView';
import OurTeamView from './pages/OurTeamView';
import PartnerView from './pages/PartnerView';
import FAQView from './pages/FAQView';
import FeedbackView from './pages/FeedbackView';
import ContactView from './pages/ContactView';
import AccessibilityView from './pages/AccessibilityView';
import { MockAPI, Destination, API } from './api';

export type Page =
  | 'home' | 'about' | 'destinations' | 'features'
  | 'account' | 'support' | 'login' | 'signup'
  | 'destination-details' | 'booking' | 'admin'
  | 'new' | 'careers' | 'our-team' | 'partner'
  | 'faq' | 'feedback' | 'contact' | 'accessibility';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  type: 'email' | 'google' | 'facebook';
  role?: 'user' | 'admin';
  joinedDate?: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [savedPlaces, setSavedPlaces] = useState<Destination[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('traver_user_session');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      loadSavedPlaces(parsedUser.id);
    }

    const handleHashChange = () => {
      const hashContent = window.location.hash.replace('#', '');
      const [page, queryString] = hashContent.split('?');

      const searchParams = new URLSearchParams(queryString);
      const id = searchParams.get('id');

      const validPages: Page[] = [
        'home', 'about', 'destinations', 'features', 'account', 'support',
        'login', 'signup', 'destination-details', 'booking', 'admin',
        'new', 'careers', 'our-team', 'partner', 'faq', 'feedback', 'contact', 'accessibility'
      ];

      if (validPages.includes(page as Page)) {
        setCurrentPage(page as Page);
        if (id) setSelectedDestinationId(id);
      } else {
        setCurrentPage('home');
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const loadSavedPlaces = async (userId: string) => {
    try {
      const places = await MockAPI.getSavedPlaces(userId);
      setSavedPlaces(places);
    } catch (e) { console.error(e); }
  };

  const handleToggleSave = async (place: Destination) => {
    if (!user) {
      navigateTo('login');
      return;
    }
    try {
      const isSaved = await MockAPI.toggleSavePlace(user.id, place);
      if (isSaved) setSavedPlaces([...savedPlaces, place]);
      else setSavedPlaces(savedPlaces.filter(p => p.id !== place.id));
    } catch (e) { console.error(e); }
  };

  const loginUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('traver_user_session', JSON.stringify(userData));
    loadSavedPlaces(userData.id);
    navigateTo('home');
  };

  const logoutUser = () => {
    setUser(null);
    setSavedPlaces([]);
    localStorage.removeItem('traver_user_session');
    navigateTo('home');
  };

  const navigateTo = (page: Page, id?: string) => {
    if (id) {
      window.location.hash = `${page}?id=${id}`;
    } else {
      window.location.hash = page;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomeView navigateTo={navigateTo} onSavePlace={handleToggleSave} savedPlaces={savedPlaces} />;
      case 'about': return <AboutView />;
      case 'destinations': return <DestinationsView onSavePlace={handleToggleSave} savedPlaces={savedPlaces} navigateTo={navigateTo} />;
      case 'features': return <FeaturesView />;
      case 'account': return <AccountView user={user} logout={logoutUser} savedPlaces={savedPlaces} onToggleSave={handleToggleSave} />;
      case 'support': return <SupportView />;
      case 'new': return <NewView />;
      case 'careers': return <CareersView />;
      case 'our-team': return <OurTeamView />;
      case 'partner': return <PartnerView />;
      case 'faq': return <FAQView />;
      case 'feedback': return <FeedbackView />;
      case 'contact': return <ContactView />;
      case 'accessibility': return <AccessibilityView />;
      case 'login':
      case 'signup': return <AuthView initialMode={currentPage as 'login' | 'signup'} navigateTo={navigateTo} onAuthSuccess={loginUser} />;
      case 'destination-details':
        return <DestinationDetailsView
          destinationId={selectedDestinationId || ''}
          onBack={() => navigateTo('destinations')}
          onSavePlace={handleToggleSave}
          savedPlaces={savedPlaces}
          isLoggedIn={!!user}
          navigateTo={navigateTo}
        />;
      case 'booking':
        return <BookingView
          destinationId={selectedDestinationId || ''}
          navigateTo={navigateTo}
          onBack={() => navigateTo('destination-details', selectedDestinationId || '')}
        />;
      case 'admin':
        return <AdminView
          user={user}
          navigateTo={navigateTo}
        />;
      default: return <HomeView navigateTo={navigateTo} onSavePlace={handleToggleSave} savedPlaces={savedPlaces} />;
    }
  };

  const hideChrome = currentPage === 'login' || currentPage === 'signup';

  return (
    <div className="min-h-screen selection:bg-orange-500/30 selection:text-orange-400 flex flex-col">
      {!hideChrome && <Navbar currentPage={currentPage} navigateTo={navigateTo} user={user} logout={logoutUser} />}
      <main className={`flex-grow ${hideChrome || currentPage === 'home' ? '' : 'pt-24'}`}>
        {renderPage()}
      </main>
      {!hideChrome && <Footer navigateTo={navigateTo} />}
    </div>
  );
};

export default App;
