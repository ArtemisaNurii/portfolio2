import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Members from './Members';
gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 25, label: 'SKILLED MEMBERS' },
  { value: 6, label: 'YEARS OF GROWTH' },
  { value: 20, label: 'SATISFIED CLIENTS', plus: true }
];

function Team() {
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const headingRef = useRef(null);
  const statsRef = useRef(null);
  
  const mainTl = useRef(null);
  const statsTl = useRef([]);
  
  const [statCounters, setStatCounters] = useState(STATS.map(() => 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      mainTl.current = gsap.timeline();
      
      mainTl.current.from(leftColumnRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
      
      mainTl.current.from(headingRef.current.children, {
        x: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      }, "-=0.5"); 
      
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        animation: mainTl.current,
        toggleActions: 'play none none reverse'
      });
      
      STATS.forEach((_, index) => {
        const statItem = statsRef.current.children[index];
        
        statsTl.current[index] = gsap.timeline({
          scrollTrigger: {
            trigger: statItem,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            onEnter: () => animateStatCounter(index, STATS[index].value),
            onLeaveBack: () => setStatCounters(prev => {
              const newState = [...prev];
              newState[index] = 0;
              return newState;
            })
          }
        });
        
        statsTl.current[index].from(statItem, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      });
    }, sectionRef); 
    

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (mainTl.current) mainTl.current.kill();
      statsTl.current.forEach(tl => tl && tl.kill());
    };
  }, []);

  const animateStatCounter = (index, targetValue) => {
    const duration = 2;
    const fps = 30;
    const frames = duration * fps;
    let frame = 0;
    
    const countInterval = setInterval(() => {
      frame++;
      const progress = frame / frames;
      const currentValue = Math.ceil(progress * targetValue);
      
      setStatCounters(prev => {
        const newState = [...prev];
        newState[index] = currentValue;
        return newState;
      });
      
      if (frame >= frames) clearInterval(countInterval);
    }, 1000 / fps);
    
    return () => clearInterval(countInterval);
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-white text-black py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div ref={leftColumnRef} className="md:pr-12">
            <div className="text-xl font-medium mb-4">
              WE HAVE DRIVEN RESULTS FOR OVER<br />
              20+  GLOBAL BUSINESSES IN THE<br />
              PAST 06 YEARS OF TEAM EXPERIENCE.
            </div>
            <a href="#about" className="inline-block mt-4 text-md font-medium border-b-2 border-black pb-1">
              Our Team
            </a>
          </div>
          
          {/* Right column - headline */}
          <div ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
            <div className="headline-part">25 minds.</div>
            <div className="headline-part">Building through</div>
            <div className="headline-part">trust, growth, and innovation.</div>
          </div>
        </div>
        
        {/* Stats section */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mb-32">
          {STATS.map((stat, index) => (
            <div key={index} className="stat-item text-center">
              <div className="stat-number text-7xl md:text-8xl lg:text-9xl font-medium mb-2">
                {statCounters[index]}{stat.plus ? '+' : ''}
              </div>
              <div className="stat-label text-lg md:text-xl">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
      <div className="w-full h-px bg-gray-300 mt-16 mb-16 hidden md:block"></div>
<Members />
    </div>
  );
}

export default Team;