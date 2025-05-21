"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FEATURES =  [
    {
        id: 1,
        title: "CUSTOM ENTERPRISE PLATFORMS",
        description: "Tailored software solutions for financial operations, analytics, and internal process automation.",
      },
  
    {
      id: 2,
      title: "CRM & CLIENT MANAGEMENT SYSTEMS",
      description: "Custom CRMs designed for financial institutions to streamline client onboarding, KYC, and relationship management.",
    },
    {
      id: 3,
      title: "BLOCKCHAIN & SMART CONTRACTS",
      description: "Developing secure blockchain-based solutions, from smart contracts to digital asset platforms and DeFi apps.",
    },
    {
        id: 4,
        title: "FINTECH PLATFORM DEVELOPMENT",
        description: "We build scalable and compliant platforms for digital banking, payments, lending, and wealth management.",
      },

    {
      id: 5,
      title: "API INTEGRATIONS & INFRASTRUCTURE",
      description: "Secure integration with banking APIs, payment gateways, and third-party financial data providers.",
    },
 
    {
      id: 7,
      title: "MOBILE & WEB APPLICATIONS",
      description: "User-friendly mobile and web applications for financial services, ensuring a seamless user experience.",
    },

  ];

export default function Services() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const featuresRef = useRef(null);
  
  const featureItemsRef = useRef([]);
  const featureIdsRef = useRef([]);
  const featureDotsRef = useRef([]);
  const featureTitlesRef = useRef([]);
  const featureDescsRef = useRef([]);
  
  const mainTl = useRef(null);
  const featureTls = useRef([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const ctx = gsap.context(() => {
      mainTl.current = gsap.timeline();
      mainTl.current.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: 'power2.out',
      });
      
   
      const idElements = featureIdsRef.current.filter(Boolean);
      const dotElements = featureDotsRef.current.filter(Boolean);
      const titleElements = featureTitlesRef.current.filter(Boolean);
      const descElements = featureDescsRef.current.filter(Boolean);
      const featureItems = featureItemsRef.current.filter(Boolean);
      
      // Create one ScrollTrigger per feature item (better than DOM queries)
      featureItems.forEach((item, index) => {
        featureTls.current[index] = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          }
        });
        
        // Group related elements for the feature
        const elements = [
          idElements[index], 
          dotElements[index], 
          titleElements[index], 
          descElements[index]
        ].filter(Boolean);
        
        // Animate with stagger
        featureTls.current[index].fromTo(
          elements,
          { x: 100, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.8, 
            ease: 'power3.out',
            stagger: 0.1,
            clearProps: 'transform' // Improves performance after animation
          }
        );
      });
    }, sectionRef); 
    return () => {
      ctx.revert(); // More efficient cleanup that handles all animations in context
      if (mainTl.current) mainTl.current.kill();
      featureTls.current.forEach(tl => tl && tl.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="flex flex-col md:flex-row bg-black text-white min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 p-6 pl-14">
        <h3 className="text-lg font-medium mb-2"> STRATEGY & ARCHITECTURE</h3>
        <h3 className="text-lg font-medium mb-2"> PRODUCT DESIGN</h3>
        <h3 className="text-lg font-medium"> INFRASTRUCTURE & DEPLOYMENT</h3>
      </aside>

      {/* Main content */}
      <main ref={containerRef} className="w-full md:w-3/4 py-14 px-20 md:pr-8">
        {/* Heading */}
        <div className="mb-20">
          <h1 className="text-4xl font-medium leading-tight">
            — Simplicity through research,<br />
            design and strategy
          </h1>
        </div>

        {/* Features grid */}
        <section ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {FEATURES.map((feature, index) => (
            <div 
              key={feature.id} 
              className="feature-item mb-6"
              ref={el => featureItemsRef.current[index] = el}
            >
              <div 
                className="feature-id mb-2 text-lg"
                ref={el => featureIdsRef.current[index] = el}
              >
                {feature.id}
              </div>
              <h2 className="flex items-center text-3xl mb-4 font-medium">
                <span 
                  className="text-green-500 mr-2"
                  ref={el => featureDotsRef.current[index] = el}
                >
                  •
                </span>
                <span 
                  className="feature-title"
                  ref={el => featureTitlesRef.current[index] = el}
                >
                  {feature.title}
                </span>
              </h2>
              <p 
                className="text-gray-400 pr-4"
                ref={el => featureDescsRef.current[index] = el}
              >
                {feature.description}
              </p>
              {feature.id === '02' && (
                <div className="border-t border-gray-800 w-full mt-16 md:hidden" />
              )}
            </div>
          ))}
        </section>

        {/* Divider */}
        <div className="border-t border-gray-800 w-full mt-16 mb-16 hidden md:block" />
      </main>
    </div>
  );
}