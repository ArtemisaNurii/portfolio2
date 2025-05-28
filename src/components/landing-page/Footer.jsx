// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import image from '../../assets/images/image.jpg';
// import CustomButton from '../../components/buttons/CustomButton';
// import useDevice from '../../components/hooks/useDevice';
// import useNavbarContext from '../contexts/useNavbarContext';
// import SlideIn from '../global/SlideIn';
// import { COMPANY_EMAIL, EMAIL_SUBJECT, myEase1, myEase2 } from '../utility/constants';
// import observeElement from '../utility/customObserver';
// import Marquee from './Marquee';

// const Footer = () => {
//     const { socials, copyEmail, emailCopied } = useNavbarContext();
//     const copyBoxRef = useRef();
//     const containerRef = useRef();
//     const copyButtonRef = useRef();
//     const [trackCursor, setTrackCursor] = useState(false);
//     const { width: deviceWidth } = useDevice();
//     let revertInstance = useRef(null);
//     const bordersRef = useRef([]);

//     useEffect(() => {
//         const copyButton = copyButtonRef.current;
//         const borders = bordersRef.current;

//         if (!(borders && copyButton)) return;
//         gsap.set(borders, { clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)" });

//         const animateBorders = () => {
//             gsap.to(borders, {
//                 clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//                 duration: 1,
//                 ease: myEase2,
//                 stagger: .1
//             })
//         }

//         observeElement(copyButton, animateBorders);
//     }, [])

//     const moveHandler = (e) => {
//         const copyBox = copyBoxRef.current;
//         const button = copyButtonRef.current;

//         if (!button || !copyBox) return;

//         if (revertInstance.current) {
//             gsap.set(copyBox, { clearProps: 'all' });
//         }

//         const boxX = gsap.quickTo(copyBox, "left", { duration: .4, ease: "power3.out" });
//         const boxY = gsap.quickTo(copyBox, "top", { duration: .4, ease: "power3.out" });

//         const rect = button.getBoundingClientRect();
//         const { clientX, clientY } = e;

//         let relX = clientX - rect.left;
//         let relY = clientY - rect.top;

//         boxX(relX);
//         boxY(relY);
//     }

//     useGSAP(() => {
//         const copyBox = copyBoxRef.current;
//         const button = copyButtonRef.current;
//         if (deviceWidth < 1023 || !button || !copyBox) return;

//         if (trackCursor) {
//             revertInstance.current = null;
//             button.addEventListener("mousemove", moveHandler);
//         } else {
//             button.removeEventListener("mousemove", moveHandler);
//             if (revertInstance.current) return;
//             revertInstance.current = gsap.to(copyBox, { left: "25%", top: 0, duration: .8, delay: .4, ease: myEase1 });
//         }
//         // Cleanup event listener
//         return () => {
//             if (button) {
//                 button.removeEventListener("mousemove", moveHandler);
//             }
//         }

//     }, { scope: containerRef, dependencies: [trackCursor, deviceWidth] })

//     const handleClick = () => {
//         if (emailCopied) return;
//         copyEmail();
//     }

//     const openEmail = () => {
//         window.location.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;
//     }

//     return (
//         <>
         

//             <footer ref={containerRef} className='overflow-hidden h-full lg:h-[50vh] w-full px-mobile lg:px-desktop-h flex flex-col justify-between pb-[30px] lg:pb-[50px] bg-myBlack  text-white'>

//                 <div className='flex flex-col lg:flex-row justify-between gap-y-[60px] lg:gap-y-[unset] mb-[60px] lg:mb-[unset]'>
//                     {/* "LETS BUILD" ===TEXT=== */}
//                     <div className='text-45-title lg:text-60-title flex flex-wrap items-center gap-x-[10px] w-[78%] md:w-[50%] xl:w-[40%] 2xl:w-[30%]'>
//                         <SlideIn>
//                             <span> Let's Build </span>
//                         </SlideIn>

//                         <SlideIn>
//                             <span className='w-[90px] h-[50px] hidden overflow-hidden lg:inline-block'>
//                                 <img
//                                     className='w-full h-full object-cover'
//                                     src={image}
//                                     alt="small-headshot"
//                                 />
//                             </span>
//                         </SlideIn>

//                         <SlideIn delay={.10}>
//                             <div className='flex items-center gap-x-[10px] lg:inline-block'>
//                                 <span className='w-[90px] h-[50px] overflow-hidden inline-block lg:hidden'>
//                                     <img
//                                         className='w-full h-full object-cover'
//                                         src={image}
//                                         alt="small-headshot" />
//                                 </span>
//                                 <span> Something </span>
//                             </div>
//                         </SlideIn>

//                         <SlideIn delay={.10}>
//                             <span> Unreal </span>
//                         </SlideIn>
//                     </div>

//                     {/* MOBILE COPY EMAIL */}
//                     <div className='inline-block lg:hidden'>
//                         <CustomButton
//                             text={COMPANY_EMAIL} // Use constant
//                             full={true}
//                             handleClick={openEmail}
//                         />
//                     </div>

//                     {/* SOCIAL LINKS */}
//                     <div className='basis-[30%]' >
//                         <div className='flex justify-between mb-[35px] text-14-body opacity-40'>
//                             <SlideIn>
//                                 <span>Socials</span>
//                             </SlideIn>
//                             <SlideIn>
//                                 <span>/02</span>
//                             </SlideIn>
//                         </div>
//                         <div className='flex justify-between text-16-body'>
//                             {
//                                 socials.map((item, i) => (
//                                     <SlideIn key={i} delay={.05 * i}>
//                                         <Link key={i} to={item.link} target='_blank'>{item.title}</Link>
//                                     </SlideIn>
//                                 ))
//                             }
//                         </div>
//                     </div>
//                 </div>

//                 {/* MOBILE BORDER-LINE */}
//                 <span className='w-full h-[1px] top-0 left-0 bg-myBlack opacity-25 block mb-[30px] lg:hidden' />

//                 {/* DESKTOP COPY EMAIL */}
//                 <button
//                     ref={copyButtonRef}
//                     onClick={handleClick}
//                     onMouseEnter={(e) => { setTrackCursor(true); moveHandler(e) }}
//                     onMouseLeave={() => setTrackCursor(false)}
//                     className={`relative w-full h-[90px] justify-center transition-opacity duration-[400ms] ${emailCopied ? "opacity-40" : ""} hidden lg:flex`}>

//                     <span ref={(el) => bordersRef.current[0] = el} className='absolute w-full h-[1px] top-0 left-0 bg-myWhite opacity-40' />

//                     <span className='flex items-center gap-x-[5px] text-25-body'>
//                         <span>{COMPANY_EMAIL}</span> {/* Use constant */}
//                     </span>

//                     <span ref={(el) => bordersRef.current[1] = el} className='absolute w-full h-[1px] bottom-0 left-0 bg-myWhite opacity-40' />

//                     <div ref={copyBoxRef}
//                         className='h-[70px] w-[70px] bg-myBlack border-1 border-myGray flex justify-center items-center absolute top-0 translate-[-50%] left-[25%] pointer-events-none'>
//                         Copy
//                     </div>
//                 </button>
//                 <Marquee>
//                 <div className="flex items-center gap-x-[50px] md:gap-x-[100px] opacity-[0.25]">
//                     <h2 className="text-large-m md:text-large-d whitespace-nowrap">Contact Us</h2>
//                     <span className="block h-[15px] md:h-[20px] w-[120px] md:w-[200px] bg-myBlack mr-[50px] md:mr-[100px] translate-y-[100%]" />
//                 </div>
//             </Marquee>
//                 {/* COPYRIGHTS STUFF */}
//                 <div className='w-full flex justify-between'>
//                     <SlideIn>
//                         <span>{new Date().getFullYear()}</span>
//                     </SlideIn>
//                     <SlideIn>
//                         <span>All Rights Reserved ©</span>
//                     </SlideIn>
//                 </div>
//             </footer>
//         </>
//     )
// }

// export default Footer;
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitLineText from '../global/SplitLineText';

gsap.registerPlugin(ScrollTrigger);

const COMPANY_EMAIL = 'hello@codevider.com';

const Footer = () => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [trackCursor, setTrackCursor] = useState(false);

  const copyButtonRef = useRef(null);
  const copyBoxRef = useRef(null);
  const bordersRef = useRef([]);
  const footerRef = useRef(null);

  useEffect(() => {
    const footerEl = footerRef.current;

    gsap.set(footerEl, { y: "100%" });

    gsap.to(footerEl, {
      y: 0,
      ease: "power3.out",
      duration: 4,
      scrollTrigger: {
        trigger: document.body,
        start: "bottom bottom",
        end: "bottom+=100 bottom",
        toggleActions: "play none none reverse"
      }
    });
  }, []);

  const handleClick = () => {
    navigator.clipboard.writeText(COMPANY_EMAIL).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  const moveHandler = (e) => {
    if (trackCursor && copyBoxRef.current) {
      const rect = copyButtonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      copyBoxRef.current.style.left = `${x}px`;
    }
  };

  return (
    <>
      <div
        ref={footerRef}
        className="fixed left-0 right-0 bottom-0 z-50 bg-black text-white"
      >
        {/* CODEVIDER BIG TEXT */}
        <div className="flex flex-col items-center justify-center min-h-screen text-white font-black text-[80px] sm:text-[120px] lg:pt-44 lg:text-[160px] xl:text-[200px] xs:text-6xl leading-none tracking-tighter max-sm:pt-72">
            <SplitLineText        
            text="Let' Get in Touch"
            >  </SplitLineText>
          {/* <DecryptedText
            text="Let's Get in Touch"
            animateOn="view"
            revealDirection="scroll-end"
          /> */}
        </div>

        {/* CONTACT SECTION */}
        <div className="px-8 py-8">
          <div className="flex flex-wrap max-sm:pb-10 gap-6 mb-8 text-xs xl:text-xl uppercase justify-between tracking-wide">
            {['LINKEDIN', 'X (TWITTER)', 'INSTAGRAM', 'FACEBOOK'].map((platform) => (
              <a key={platform} href="#" className="hover:text-white transition-colors cursor-pointer">
                {platform}
              </a>
            ))}
          </div>

          <div className="text-center mb-8">
          <button
  ref={copyButtonRef}
  onClick={handleClick}
  onMouseEnter={(e) => { setTrackCursor(true); moveHandler(e); }}
  onMouseLeave={() => setTrackCursor(false)}
  onMouseMove={moveHandler}
  className={`relative w-full h-[60px] sm:h-[90px] flex justify-center items-center transition-opacity duration-[400ms] ${emailCopied ? "opacity-40" : ""}`}
>
  <span ref={(el) => bordersRef.current[0] = el} className='absolute w-full h-[1px] top-0 left-0 bg-myWhite opacity-40' />
  <span className='flex items-center gap-x-[5px] text-32-body text-sm sm:text-base lg:text-xl'>
    <span>{COMPANY_EMAIL}</span>
  </span>
  <span ref={(el) => bordersRef.current[1] = el} className='absolute w-full h-[1px] bottom-0 left-0 bg-myWhite opacity-40' />
  <div
    ref={copyBoxRef}
    className='h-[50px] w-[50px] sm:h-[70px] sm:w-[70px] bg-myBlack border-1 border-myGray flex justify-center items-center absolute top-0 translate-[-50%] left-[25%] pointer-events-none text-xs sm:text-sm'
  >
    Copy
  </div>
</button>
          </div>
 
          <div className="gap-10 flex justify-between  text-xs mb-8">
            <div>
              <div className="mb-2 xl:text-xl text-white">+355 4567543</div>
              <div className="text-gray-400 xl:text-xl leading-relaxed">
                Barrikada Street<br />
                Tirana, Albania
              </div>
            </div>

            <div>
              <div className="space-y-2 xl:text-xl text-gray-400 uppercase tracking-wide">
                {['WORKS', 'EXPERTISE', 'ABOUT'].map((item) => (
                  <div key={item} className="cursor-pointer hover:text-white transition-colors">{item}</div>
                ))}
              </div>
            </div>

            <div>
              <div className="space-y-2 text-gray-400 xl:text-xl uppercase tracking-wide">
                {['CAREERS', 'CONTACT', 'INSIGHTS'].map((item) => (
                  <div key={item} className="cursor-pointer hover:text-white transition-colors">{item}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-white space-y-2 sm:space-y-0">
            <div>© ALL RIGHTS RESERVED, CODEVIDER 2025</div>
            <div className="flex items-center">
              CODE WITH LOVE
              <span className="text-white ml-1">❤</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
