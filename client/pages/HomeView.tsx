
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Destinations from '../components/Destinations';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import { Page } from '../App';
import { Destination } from '../api';

interface HomeViewProps {
  navigateTo: (page: Page) => void;
  onSavePlace: (place: Destination) => void;
  savedPlaces: Destination[];
}

const HomeView: React.FC<HomeViewProps> = ({ navigateTo, onSavePlace, savedPlaces }) => {
  return (
    <div className="animate-fade-in">
      <Hero />
      <About />
      <Features />
      <Destinations onSavePlace={onSavePlace} savedPlaces={savedPlaces} navigateTo={navigateTo} />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default HomeView;
