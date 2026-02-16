import React, { useEffect, useRef, useState } from 'react';
import {
  Target,
  Users as UsersIcon,
  Award,
  Globe,
  Heart,
  ShieldCheck,
  Zap,
  ArrowRight,
  Twitter,
  Linkedin,
  CheckCircle,
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutView: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const { scrollYProgress: sectionScrollY } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  // Plane animation values (kept)
  const planeX = useTransform(sectionScrollY, [0, 1], ['6vw', '84vw']);
  const planeY = useTransform(sectionScrollY, [0, 1], ['120px', '1050px']);
  const planeRotate = useTransform(sectionScrollY, [0, 0.5, 1], [130, 145, 130]);

  const stats = [
    { label: 'Happy Travelers', value: '2M+', icon: <UsersIcon className="w-5 h-5" /> },
    { label: 'Destinations', value: '150+', icon: <Globe className="w-5 h-5" /> },
    { label: 'Local Partners', value: '500+', icon: <Heart className="w-5 h-5" /> },
    { label: 'Years Excellence', value: '12+', icon: <Award className="w-5 h-5" /> },
  ];

  const values = [
    {
      title: 'Trust & Safety',
      desc: 'Every partner is manually verified by our team to ensure your safety and comfort.',
      icon: <ShieldCheck />,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Authenticity',
      desc: 'We focus on real local experiences, not just the typical tourist traps.',
      icon: <Target />,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      title: 'Innovation',
      desc: 'Using AI and smart tech to make planning your trip effortless.',
      icon: <Zap />,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Sustainability',
      desc: "Committed to preserving the planet's beauty through responsible tourism.",
      icon: <Globe />,
      color: 'bg-cyan-50 text-cyan-600',
    },
  ];

  const team = [
    { name: 'Sarah Jenkins', role: 'CEO & Founder', img: 'https://i.pravatar.cc/300?u=sarah', bio: 'Former flight lead with 15 years in luxury tourism.' },
    { name: 'Michael Chen', role: 'Head of Operations', img: 'https://i.pravatar.cc/300?u=mike', bio: 'Ensuring every logistics detail is perfect for your stay.' },
    { name: 'Elena Rodriguez', role: 'Creative Director', img: 'https://i.pravatar.cc/300?u=elena', bio: 'Designing the visual stories that inspire your next trip.' },
    { name: 'David Park', role: 'Chief Technology', img: 'https://i.pravatar.cc/300?u=david', bio: 'Leading the engineering team behind the Traver app.' },
  ];

  const timelineSteps = [
    { year: '2012', title: 'The First Step', desc: 'Started as a small local tour provider in Bali with just 2 guides and a shared dream.' },
    { year: '2016', title: 'Digital Transformation', desc: 'Launched our first web platform, reaching travelers in over 20 countries across Asia.' },
    { year: '2020', title: 'Resilience & Growth', desc: 'Doubled down on safety standards and sustainable travel during the global pandemic.' },
    { year: '2024', title: 'The Next Frontier', desc: 'Reached 2 million travelers and expanded our network to every continent.' },
  ];

  // Scroll logic for Timeline
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const centerLine = viewportHeight / 2;

      const startTrigger = rect.top;
      const timelineHeight = rect.height;
      const progress = Math.max(0, Math.min(1, (centerLine - startTrigger) / timelineHeight));
      setScrollProgress(progress);

      const newActiveIndices: number[] = [];
      const steps = timelineRef.current.querySelectorAll('.timeline-step');
      steps.forEach((step, index) => {
        const stepRect = step.getBoundingClientRect();
        const itemCenter = stepRect.top + stepRect.height / 2;
        if (itemCenter < centerLine + 90 && itemCenter > centerLine - 90) newActiveIndices.push(index);
      });
      setActiveIndices(newActiveIndices);
    };

    window.addEventListener('scroll', handleScroll, { passive: true } as any);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Consistent section padding
  const SECTION_Y = 'py-16 sm:py-20 lg:py-24';
  const CONTAINER = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

  return (
    <div className="font-sans overflow-x-hidden bg-white text-gray-900">
      {/* Hero */}
      <section className={`relative pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 lg:pb-20 bg-white`}>
        <div className={CONTAINER}>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <span className="text-orange-600 font-semibold tracking-[0.18em] text-xs uppercase mb-4 block">
                Our Story
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                We Live For <br />
                <span className="text-orange-600 italic">Adventure</span> &amp; Discovery.
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mt-5">
                Since 2012, Traver has been more than a booking site. We’re a community of dreamers and explorers dedicated to making travel the best part of life.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <button className="px-7 py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors shadow-sm">
                  Our Mission
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="font-semibold text-gray-500 text-xs uppercase tracking-widest">Est. 2012</span>
                </div>
              </div>
            </div>

            {/* Hero Images */}
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-60" />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-8">
                  <img
                    src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=600"
                    className="rounded-2xl shadow-lg h-64 sm:h-72 w-full object-cover"
                    alt="Adventure"
                  />
                  <div className="bg-orange-600 p-6 rounded-2xl text-white shadow-lg">
                    <p className="text-3xl font-extrabold">12Y</p>
                    <p className="text-xs font-semibold uppercase tracking-widest opacity-90">Experience</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-100 p-6 rounded-2xl text-gray-900 shadow-sm border border-gray-200">
                    <p className="text-3xl font-extrabold">2M+</p>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Explorers</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600"
                    className="rounded-2xl shadow-lg h-64 sm:h-72 w-full object-cover"
                    alt="Beach"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-gray-50 border-y border-gray-100">
        <div className={CONTAINER}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-extrabold">{stat.value}</p>
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={SECTION_Y}>
        <div className={CONTAINER}>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="order-2 lg:order-1 relative">
              <img
                src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=1000"
                className="rounded-3xl shadow-lg border border-gray-100"
                alt="Mission"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-md border border-gray-100">
                <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-orange-600 font-semibold tracking-[0.18em] text-xs uppercase mb-3 block">
                Our Core Drive
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                We’re on a mission to <br />
                make the <span className="text-orange-600">World</span> feel smaller.
              </h2>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mt-5">
                We believe travel is the ultimate education. It breaks barriers, fosters empathy, and reminds us we all share one beautiful home.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  'We manually verify every single location in our catalog.',
                  'Our platform is built to support local economies directly.',
                  'We provide 24/7 human support for every traveler.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-gray-800 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`${SECTION_Y} bg-gray-900 text-white`}>
        <div className={CONTAINER}>
          <div className="text-center mb-12 sm:mb-14">
            <span className="text-orange-500 font-semibold tracking-[0.18em] text-xs uppercase mb-3 block">Our DNA</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">The Values That Guide Us</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${v.color}`}>
                  {React.cloneElement(v.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
                </div>
                <h4 className="text-xl font-extrabold mb-2">{v.title}</h4>
                <p className="text-gray-300 leading-relaxed text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className={SECTION_Y}>
        <div className={CONTAINER}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <span className="text-orange-600 font-semibold tracking-[0.18em] text-xs uppercase mb-3 block">Leadership</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold">
                Meet the Minds Behind <span className="text-orange-600">Traver</span>
              </h2>
            </div>
            <p className="text-gray-600 font-medium lg:max-w-sm leading-relaxed">
              A diverse team of explorers redefining global travel.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="group rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-shadow bg-white">
                <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-2xl border border-gray-100">
                  <img
                    src={member.img}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    alt={member.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div className="flex gap-2">
                      <button className="p-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-orange-600 transition-colors text-white">
                        <Linkedin className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white/20 backdrop-blur-md rounded-lg hover:bg-orange-600 transition-colors text-white">
                        <Twitter className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-extrabold mb-1">{member.name}</h3>
                <p className="text-orange-600 font-semibold text-[11px] uppercase tracking-widest mb-3">{member.role}</p>
                <p className="text-gray-600 font-medium text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 relative overflow-hidden">
        {/* Plane */}
        <motion.div style={{ x: planeX, y: planeY, rotate: planeRotate }} className="absolute z-20 pointer-events-none hidden lg:block">
          <div className="relative">
            <svg
              className="w-14 h-14 text-[#ff7235] filter drop-shadow-[0_20px_18px_rgba(255,114,53,0.30)]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21,16L21,14L13,9L13,3.5C13,2.12 11.88,1 10.5,1C9.12,1 8,2.12 8,3.5L8,9L0,14L0,16L8,13.5L8,19L6,20.5L6,22L10.5,21L15,22L15,20.5L13,19L13,13.5L21,16Z" />
            </svg>

            <div className="absolute -bottom-10 left-[18%] w-[110px] h-[3px] bg-gradient-to-b from-white/25 via-white/10 to-transparent blur-[2px]" />
            <div className="absolute -bottom-10 right-[18%] w-[110px] h-[3px] bg-gradient-to-b from-white/25 via-white/10 to-transparent blur-[2px]" />
          </div>
        </motion.div>

        <div className={CONTAINER}>
          <div className="text-center mb-12 sm:mb-14">
            <span className="text-orange-600 font-semibold tracking-[0.18em] text-xs uppercase mb-3 block">Our Journey</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">The Traver Evolution</h2>
          </div>

          <div ref={timelineRef} className="relative space-y-12 sm:space-y-14 lg:space-y-16">
            {/* Background line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 hidden lg:block rounded-full" />

            {/* Progress line */}
            <div
              className="absolute left-1/2 top-0 w-1 bg-orange-600 -translate-x-1/2 hidden lg:block rounded-full transition-all duration-300"
              style={{ height: `${scrollProgress * 100}%`, boxShadow: '0 0 12px rgba(249, 115, 22, 0.25)' }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-4 border-orange-600 rounded-full shadow-[0_0_14px_rgba(249,115,22,0.8)]" />
            </div>

            {timelineSteps.map((step, i) => {
              const isActive = activeIndices.includes(i);
              return (
                <div
                  key={i}
                  className={`timeline-step flex flex-col lg:flex-row items-center gap-6 lg:gap-10 relative transition-all duration-500 ${
                    i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } ${isActive ? 'opacity-100' : 'opacity-50'}`}
                >
                  <div className="lg:w-1/2 flex justify-center lg:justify-end lg:pr-10 lg:odd:pr-0 lg:even:pl-10">
                    <div
                      className={`p-6 sm:p-7 rounded-2xl border max-w-md w-full transition-all duration-500 ${
                        isActive
                          ? 'bg-white shadow-lg border-orange-200'
                          : 'bg-white/70 border-gray-200'
                      }`}
                    >
                      <span className={`text-4xl font-extrabold mb-3 block ${isActive ? 'text-orange-600' : 'text-gray-300'}`}>
                        {step.year}
                      </span>
                      <h4 className={`text-xl font-extrabold mb-2 ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.title}
                      </h4>
                      <p className={`leading-relaxed text-sm ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-full border-8 border-gray-50 shadow-md relative z-10 hidden lg:block transition-all ${
                      isActive ? 'bg-orange-600 scale-110' : 'bg-gray-300'
                    }`}
                  />

                  <div className="lg:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Ready to Start Your <span className="text-orange-600">Journey</span> With Us?
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Whether you’re looking for a peaceful getaway or an adrenaline-packed adventure, we’re here to guide you every step of the way.
          </p>

          <button className="px-7 py-3.5 bg-orange-600 text-white font-semibold rounded-xl shadow-sm hover:bg-orange-700 transition-colors inline-flex items-center gap-2">
            Join Traver Today <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutView;
