import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Cog, Contact, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({
    title,
    abbreviation,
    expanded,
    description,
    icon,
}) => {
    const textRef = useRef(null);
    const expandedRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        gsap.set(expandedRef.current, { 
            x: '-100%',
            opacity: 0  // Initially hide expanded text
        });
    }, []);

    
    const handleExpandEnter = () => {
        const tl = gsap.timeline();
        tl.to(textRef.current, {
            x: '100%',
            opacity: 0,  
            duration: 0.4,
            ease: 'power2.inOut'
        })
        .to(expandedRef.current, {
            x: '0%',
            opacity: 1,  
            duration: 0.4,
            ease: 'power2.inOut'
        }, 0.2); 
    };
    
    const handleExpandLeave = () => {
        const tl = gsap.timeline();
        tl.to(expandedRef.current, {
            x: '-100%',
            opacity: 0,  
            duration: 0.4,
            ease: 'power2.inOut'
        })
        .to(textRef.current, {
            x: '0%',
            opacity: 1,  
            duration: 0.4,
            ease: 'power2.inOut'
        }, 0.2);  
    };

    return (
        <div
            ref={cardRef}
            className="w-full md:flex-1 p-4 sm:p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-700 cursor-pointer transition-all duration-300"
            onMouseEnter={handleExpandEnter}
            onMouseLeave={handleExpandLeave}
        >
            <div className="flex items-center mb-8">
                <div className="w-6 h-6 mr-4 text-white">{icon}</div>
                <span className="text-xs font-medium tracking-widest text-gray-400">{title}</span>
            </div>

            <div className="relative overflow-hidden mb-4 select-none h-16 sm:h-20">
                <div ref={textRef} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white pointer-events-none">
                    {abbreviation}
                </div>
                <div 
                    ref={expandedRef} 
                    className="absolute top-0 left-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white pointer-events-none"
                >
                    {expanded}
                </div>
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        </div>
    );
};

const ArrowIcon = () => (
    <svg viewBox="0 0 24 24">
        <polyline points="8,4 16,12 8,20" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
);
const CrownIcon = () => (
    <svg viewBox="0 0 24 24">
        <path d="M4 12l2-4 4 8 4-8 2 4z" fill="currentColor" />
    </svg>
);

const Process = () => {
    const servicesRef = useRef(null);
    const cardRefs = useRef([]);

    const services = [
        {
            title: 'DESIGN',
            abbreviation: 'DES',
            expanded: 'DESIGN',
            description: 'Unique, thoughtfully designed interfaces to reinforce your business authority.',
            icon: <Target />
        },
        {
            title: 'DEVELOP',
            abbreviation: 'DEV',
            expanded: 'DEVELOP',
            description: 'User-friendly back offices to make content management a breeze.',
            icon: <Code />
        },
        {
            title: 'ENGAGE',
            abbreviation: 'ENG',
            expanded: 'ENGAGE',
            description: 'Engaging user experiences that turn visitors into customers.',
            icon: <Cog />
        },
        {
            title: 'EXPAND',
            abbreviation: 'EXP',
            expanded: 'EXPAND',
            description: 'Scale your digital presence across multiple channels and platforms.',
            icon: <ArrowIcon />
        },
        {
            title: 'CONQUER',
            abbreviation: 'CON',
            expanded: 'CONQUER',
            description: 'Dominate your market with strategic positioning and execution.',
            icon: <CrownIcon />
        },
    ];

    useEffect(() => {
        const handleMediaChange = (mq) => {
            if (mq.matches) {
                // Desktop animation
                cardRefs.current.forEach((card, index) => {
                    if (!card || index < 2) return; // Skip first 2 cards

                    gsap.fromTo(
                        card,
                        { x: 200, opacity: 0 },
                        {
                            x: 0,
                            opacity: 1,
                            scrollTrigger: {
                                trigger: servicesRef.current,
                                start: 'top 80%',
                                toggleActions: 'play none none none'
                            },
                            duration: 1,
                            ease: 'power2.out',
                            delay: (index - 2) * 0.3
                        }
                    );
                });
            } else {
                // Mobile animation
                cardRefs.current.forEach((card, index) => {
                    if (!card) return;

                    gsap.fromTo(
                        card,
                        { y: 50, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 90%',
                                toggleActions: 'play none none none'
                            },
                            duration: 0.8,
                            ease: 'power2.out',
                            delay: index * 0.2
                        }
                    );
                });
            }
        };

        const mq = window.matchMedia('(min-width: 768px)');
        handleMediaChange(mq);
        
        const listener = (e) => handleMediaChange(e.target);
        mq.addEventListener('change', listener);
        
        return () => {
            mq.removeEventListener('change', listener);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="flex flex-col min-h-screen p-4 sm:p-8">
                <div className="pt-16 sm:pt-24 md:pt-32 mb-12 sm:mb-16">
                    <div className="text-xs font-medium tracking-widest text-gray-400 mb-6 sm:mb-8">Built on Process.<br/> Driven by Innovation</div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight max-w-6xl">
                        We blend thoughtful design with{" "}
                        <span className="block mt-2">robust software development practices</span>
                        <span className="block mt-2">to build solutions that drive your success</span>
                    </h1>
                </div>

                <div ref={servicesRef} className="flex-1 flex items-end mt-8 sm:mt-12 md:mt-16">
                    <div className="w-full">
                        <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap">
                            {services.map((service, index) => (
                                <div
                                    key={service.title}
                                    ref={(el) => { cardRefs.current[index] = el; }}
                                    className="w-full md:w-1/2 lg:w-auto lg:flex-1"
                                >
                                    <ServiceCard
                                        title={service.title}
                                        abbreviation={service.abbreviation}
                                        expanded={service.expanded}
                                        description={service.description}
                                        icon={service.icon}
                                        index={index}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Process;