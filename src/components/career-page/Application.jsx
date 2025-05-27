"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Application() {
  // Mock URL params for demo
  const positionTitle = 'SENIOR REACT DEVELOPER';
  const positionId = 'react-dev';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: positionTitle, 
    positionId: positionId,  
    experience: '',
    portfolio: '',
    message: ''
  });
  
  const [formStep, setFormStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 3;
  
  // Refs for animations
  const progressBarRef = useRef(null);
  const formContainerRef = useRef(null);
  const leftSideRef = useRef(null);
  const headingRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const nextStep = async () => {
    if (formStep < totalSteps) {
      // Animate out current step
      await gsap.to('.form-step', {
        x: -50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
      
      setFormStep(prev => prev + 1);
    }
  };
  
  const prevStep = async () => {
    if (formStep > 1) {
      // Animate out current step
      await gsap.to('.form-step', {
        x: 50,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut"
      });
      
      setFormStep(prev => prev - 1);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log(formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };
  
  // Animate progress bar
  useEffect(() => {
    if (progressBarRef.current) {
      const progress = ((formStep - 1) / (totalSteps - 1)) * 100;
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [formStep]);
  
  
  // Animate form step transitions
  useEffect(() => {
    if (formContainerRef.current) {
      gsap.fromTo('.form-step', 
        { 
          x: formStep > 1 ? 50 : -50, 
          opacity: 0 
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.1
        }
      );
    }
  }, [formStep]);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
  
      // Animate left side first (sidebar)
      tl.from(leftSideRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
  
      // Then animate the right side heading
      tl.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "+=0.2"); // delay after leftSide finishes
  
      // Then animate the intro texts inside right content
      tl.from('.intro-text', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.4");
    });
  
    return () => ctx.revert();
  }, []);
  
  
  const renderFormFields = () => {
    switch(formStep) {
      case 1:
        return (
          <div className="form-step space-y-6 sm:space-y-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-6 sm:mb-10">
              * Personal Information
            </h3>
            
            <div className="form-group">
              <label className="block text-base sm:text-lg mb-2 font-medium">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 focus:border-black hover:border-gray-400 py-3 sm:py-4 outline-none text-base sm:text-lg bg-transparent transition-all duration-300"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="block text-base sm:text-lg mb-2 font-medium">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 focus:border-black hover:border-gray-400 py-3 sm:py-4 outline-none text-base sm:text-lg bg-transparent transition-all duration-300"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="block text-base sm:text-lg mb-2 font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 focus:border-black hover:border-gray-400 py-3 sm:py-4 outline-none text-base sm:text-lg bg-transparent transition-all duration-300"
              />
            </div>
            
            <div className="mt-8 sm:mt-12">
              <button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black text-white text-base sm:text-lg font-medium relative group overflow-hidden"
              >
                <span className="relative z-10">Next Step</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="form-step space-y-6 sm:space-y-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-6 sm:mb-10">
              — Professional Details
            </h3>
            
            <div className="form-group">
              <label className="block text-base sm:text-lg mb-2 font-medium">Position Applied For *</label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 focus:border-black hover:border-gray-400 py-3 sm:py-4 outline-none text-base sm:text-lg bg-transparent transition-all duration-300 appearance-none cursor-pointer"
                required
              >
                <option value="">Select a position</option>
                <option value="SENIOR REACT DEVELOPER">SENIOR REACT DEVELOPER</option>
                <option value="UX/UI DESIGNER">UX/UI DESIGNER</option>
                <option value="PRODUCT MANAGER">PRODUCT MANAGER</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="block text-base sm:text-lg mb-2 font-medium">Years of Experience *</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g., 3-5 years"
                className="w-full border-b-2 border-gray-300 focus:border-black hover:border-gray-400 py-3 sm:py-4 outline-none text-base sm:text-lg bg-transparent transition-all duration-300"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="block text-base sm:text-lg mb-2 font-medium">Portfolio/Website URL</label>
              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                className="w-full border-b-2 border-gray-300 focus:border-black hover:border-gray-400 py-3 sm:py-4 outline-none text-base sm:text-lg bg-transparent transition-all duration-300"
              />
            </div>
            
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button
                type="button"
                onClick={prevStep}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-black text-base sm:text-lg font-medium relative group overflow-hidden hover:bg-black hover:text-white transition-all duration-300"
              >
                <span className="relative z-10">Back</span>
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black text-white text-base sm:text-lg font-medium relative group overflow-hidden"
              >
                <span className="relative z-10">Next Step</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="form-step space-y-6 sm:space-y-8">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-6 sm:mb-10">
              — Additional Information
            </h3>
            
            <div className="form-group">
              <label className="block text-base sm:text-lg mb-2 font-medium">Why do you want to join our team? *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about your motivation and what you can bring to our team..."
                className="w-full border-b-2 border-gray-300 focus:border-black hover:border-gray-400 py-3 sm:py-4 outline-none text-base sm:text-lg bg-transparent transition-all duration-300 resize-none"
                required
              />
            </div>
            
            <div className="form-group mt-6">
              <label className="flex items-start text-base sm:text-lg cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 mr-3 mt-1 accent-black"
                  required
                />
                <span className="leading-relaxed">I agree to the processing of my personal data for recruitment purposes</span>
              </label>
            </div>
            
            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button
                type="button"
                onClick={prevStep}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-black text-base sm:text-lg font-medium relative group overflow-hidden hover:bg-black hover:text-white transition-all duration-300"
              >
                <span className="relative z-10">Back</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-black  text-white text-base sm:text-lg font-medium relative group overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </span>
                {!isSubmitting && (
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
                )}
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  const getHeading = () => {
    if (positionTitle) {
      return `— Apply for ${positionTitle.toLowerCase()} position`;
    }
    return "— Apply for a position and join our exceptional team";
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen text-white bg-black">
      {/* Left Sidebar */}
      <div className="w-full lg:w-1/3 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 flex items-start">
        <div ref={leftSideRef} className="lg:sticky lg:top-20 w-full space-y-8 font-sans">
          <div>
            <h3 className="text-base sm:text-lg font-medium mb-2">JOIN OUR TEAM</h3>
            <h3 className="text-base sm:text-lg font-medium">WE'RE LOOKING FORWARD TO KNOWING YOU</h3>
          </div>
          
          <div className="mt-8 lg:mt-16">
            <div className="text-sm font-medium mb-3">APPLICATION PROGRESS</div>
            <div className="w-full h-2 bg-gray-200 rounded-full relative overflow-hidden">
              <div 
                ref={progressBarRef}
                className="absolute top-0 left-0 h-full bg-black border-white border-1transition-all duration-500 rounded-full"
                style={{ width: '0%' }}
              />
            </div>
            <div className="flex justify-between mt-3 text-sm text-gray-300">
              <span>Step {formStep} of {totalSteps}</span>
              <span>{Math.round(((formStep - 1) / (totalSteps - 1)) * 100)}%</span>
            </div>
          </div>
          <div className="mb-12 sm:mb-16 md:mb-20 text-lg sm:text-xl leading-relaxed space-y-4 sm:space-y-6">
              <p className="intro-text ">* We value your time and appreciate your interest in working with us.</p>
              <p className="intro-text">Please complete the application form below. All fields marked with an asterisk are required.</p>
              <p className="intro-text">Your information will be kept confidential and only used for the recruitment process.</p>
            </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="w-full lg:w-2/3 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 lg:pr-28">
        <h1 
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-medium mb-8 sm:mb-12 md:mb-16 leading-tight"
        >
          {getHeading()}
        </h1>
        
        {!isSubmitted ? (
          <>
           
            
            <div ref={formContainerRef} className="mb-12 sm:mb-20">
              <div onSubmit={handleSubmit}>
                {renderFormFields()}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 sm:py-16 space-y-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Check className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-medium mb-4">Application Received!</h3>
            <p className="text-lg sm:text-xl mb-6 text-gray-600 max-w-2xl mx-auto">
              Thank you for your application for the {formData.position} position. 
              We'll review your application and be in touch soon.
            </p>
            <div className="text-sm text-gray-500">
              Application ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}