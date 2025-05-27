"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const POSITIONS = [
  {
    id: 'react-dev',
    title: 'SENIOR REACT DEVELOPER',
    department: 'DEVELOPMENT / REMOTE'
  },
  {
    id: 'ux-designer',
    title: 'UX/UI DESIGNER',
    department: 'DESIGN / HYBRID'
  },
  {
    id: 'product-manager',
    title: 'PRODUCT MANAGER',
    department: 'PRODUCT / REMOTE'
  }
];

export default function Positions() {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const leftSideRef = useRef(null);
  const headingRef = useRef(null);
  const openPositionsRef = useRef(null);
  const positionsContainerRef = useRef(null);
  const masterTl = useRef(null);

  const handlePositionClick = (position) => {
    const encodedTitle = encodeURIComponent(position.title);
    navigate(`/application?position=${encodedTitle}&id=${position.id}`);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      masterTl.current = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 25%",
          end: "bottom bottom",
          scrub: false,
          toggleActions: "play none none none"
        }
      });

      // Left-side badge & intro
      masterTl.current.from(
        leftSideRef.current.querySelectorAll('h3'),
        { y: 30, opacity: 0, stagger: 0.15, duration: 0.8 }
      );

      // Main heading animation
      masterTl.current.from(
        headingRef.current,
        { y: 40, opacity: 0, duration: 1 },
        "-=0.3"
      );

      // Open Positions heading
      masterTl.current.from(
        openPositionsRef.current,
        { y: 40, opacity: 0, duration: 0.8 },
        "-=0.2"
      );

      // Position items animation
      const positionItems = positionsContainerRef.current.querySelectorAll('.position-item');
      masterTl.current.from(
        positionItems,
        { y: 30, opacity: 0, stagger: 0.25, duration: 0.7, clearProps: 'transform' },
        "-=0.4"
      );

      // Hover effects
      positionItems.forEach(item => {
        const hoverTl = gsap.timeline({ paused: true });
        const fillBar = item.querySelector('.fill-bar');
        const arrow = item.querySelector('.arrow-icon');

        hoverTl
          .to(item, { backgroundColor: 'rgba(0, 0, 0, 0.05)', scale: 1.01, duration: 0.3, transformOrigin: 'left center' }, 0)
          .to(fillBar, { width: '100%', duration: 0.4, ease: 'power2.out' }, 0)
          .to(arrow, { x: 10, opacity: 1, duration: 0.3 }, 0.1);

        item.addEventListener('mouseenter', () => hoverTl.play());
        item.addEventListener('mouseleave', () => hoverTl.reverse());
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      id="#Career"
      ref={sectionRef}
      className="flex flex-col lg:flex-row min-h-screen text-white bg-black"
    >
      {/* Left Side */}
      <div className="w-full lg:w-1/3 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 flex items-start">
        <div ref={leftSideRef} className="lg:sticky lg:top-20 w-full">
          <div className="hero-badge inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
            WE'RE HIRING
          </div>
          <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-4 leading-relaxed font-sans">
            ARE YOU EXCEPTIONAL TALENT?
            <br />
            WE'RE ALWAYS LOOKING FOR THE BEST OUT THERE
          </h3>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-2/3 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 lg:pr-28">
        <h1
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-medium mb-8 sm:mb-12 md:mb-16 leading-tight"
        >
          - We're engineers, designers, and problem-solvers, working as one to create smart, lasting solutions.
        </h1>

        <h2
          ref={openPositionsRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-medium mb-12 sm:mb-16 md:mb-20 leading-tight"
        >
          * OPEN POSITIONS
        </h2>

        <div ref={positionsContainerRef} className="space-y-6 sm:space-y-8">
          {POSITIONS.map((position) => (
            <div
              key={position.id}
              className="position-item border-t border-transparent py-6 sm:py-8 cursor-pointer relative group"
              onClick={() => handlePositionClick(position)}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-2 leading-tight pr-4 sm:pr-0">
                    {position.title}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base">
                    {position.department}
                  </p>
                </div>
                <div className="flex-shrink-0 self-start sm:self-center">
                  <span className="arrow-icon opacity-0 group-hover:opacity-100 transform translate-x-0 font-bold transition-all duration-300">
                    <MoveUpRight size={32} className="sm:w-11 sm:h-11" />
                  </span>
                </div>
              </div>
              <div className="absolute bottom-1 left-0 h-[1px] w-0 bg-white fill-bar transition-all duration-400"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
