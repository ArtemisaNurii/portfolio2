// import { motion } from 'framer-motion';
// import { useRef } from "react";
// import useNavbarContext from "../contexts/useNavbarContext";
// import RotatingText from "../global/RotatingText";
// import ScrollOpacity from "../global/ScrollOpacity";
// import SlideIn from "../global/SlideIn";
// import useCursor from "../hooks/useCursor";
// import useDevice from "../hooks/useDevice";
// import Marquee from "./Marquee";

// const Hero = () => {
//     const { navlinksLeft } = useNavbarContext();
//     const { width: deviceWidth } = useDevice();
//     const heroRef = useRef(null);
//     const { setCursorType, setCursorContext, setCursorLabel } = useCursor();

//     return (
//         <section
//             ref={heroRef}
//             onMouseEnter={() => {
//                 setCursorType("hovered");
//                 setCursorContext("hero");
//                 setCursorLabel("Explore");
//             }}
//             onMouseLeave={() => {
//                 setCursorType("default");
//                 setCursorContext("");
//                 setCursorLabel("");
//             }}
//             className="relative overflow-hidden w-full h-[100dvh] lg:h-screen flex items-center lg:px-desktop-h will-change-transform bg-black "
//             style={{ backfaceVisibility: "hidden" }}
//         >
//             <motion.div
//                 className="flex flex-col gap-y-[20px] absolute left-[20px] lg:left-1/2 lg:-translate-x-1/2 text-myWhite"
//                 style={
//                     deviceWidth > 1023 && navlinksLeft < deviceWidth / 3
//                         ? { left: `${navlinksLeft}px`, transform: "none" }
//                         : {}
//                 }
//             >
//              <ScrollOpacity>
//             <div className="text-left">
//               {/* Top Line - Codevider */}
//               <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold pl-10 lg:pl-20 mb-4">
//                 Codevider
//               </h1>
          
//               {/* Bottom Line - Innovating Through + RotatingText */}
//               <h2 className="text-3xl sm:text-4xl md:text-5xl flex items-center gap-3 pl-10 lg:pl-20  font-black">
//                 <span>Innovating Through</span>
//                 <div className="relative inline-block overflow-hidden">
//                   <RotatingText
//                     texts={['Code', 'Impact', 'Ideas']}
//                     mainClassName="px-3 md:px-4 bg-myAccent text-myBlack py-1 md:py-2 font-black"
//                     staggerFrom="last"
//                     initial={{ y: "100%" }}
//                     animate={{ y: 0 }}
//                     exit={{ y: "-120%" }}
//                     staggerDuration={0.025}
//                     transition={{ type: "spring", damping: 30, stiffness: 400 }}
//                     rotationInterval={2000}
//                   />
//                 </div>
//               </h2>
//             </div>
//           </ScrollOpacity>

//                 <ScrollOpacity>
//                     <SlideIn delay={0.15}>
//                         <span className="block text-25-body w-[70%] lg:w-full">
//                             Building future-ready software with precision, passion, and purpose.
//                         </span>
//                     </SlideIn>
//                 </ScrollOpacity>
//             </motion.div>

//             <div className="absolute bottom-0 left-0 w-full mb-16">
//                 <Marquee>
//                     <div className="flex items-center gap-x-[50px] md:gap-x-[100px] opacity-[0.25]">
//                         <h2 className="text-large-m md:text-large-d text-nowrap text-myWhite">
//                             Codevider
//                         </h2>
//                         <span className="block h-[15px] md:h-[20px] w-[120px] md:w-[200px] bg-myWhite rounded-[4px] mr-[50px] md:mr-[100px] translate-y-[100%]" />
//                     </div>
//                 </Marquee>
//             </div>
//         </section>
//     );
// };



import { useRef } from "react";
import useNavbarContext from "../contexts/useNavbarContext";
import RotatingText from "../global/RotatingText";
import ScrollOpacity from "../global/ScrollOpacity";
import SlideIn from "../global/SlideIn";
import useCursor from "../hooks/useCursor";
import useDevice from "../hooks/useDevice";
import Marquee from "./Marquee";
import Beams from "./Beams";
// import Squares from "../global/Squares";
const Hero = () => {
    const { navlinksLeft } = useNavbarContext();
    const { width: deviceWidth } = useDevice();
    const heroRef = useRef(null);
    const { setCursorType, setCursorContext, setCursorLabel } = useCursor();

    return (
        <section
            ref={heroRef}
            onMouseEnter={() => {
                setCursorType("hovered");
                setCursorContext("hero");
                setCursorLabel("Explore");
            }}
            onMouseLeave={() => {
                setCursorType("default");
                setCursorContext("");
                setCursorLabel("");
            }}
            className="overflow-hidden w-full h-[100dvh] lg:h-screen lg:pl-12 flex items-center lg:px-desktop-h  relative will-change-transform"
            style={{ backfaceVisibility: "hidden" }}
        >
            <div className="absolute inset-0 z-0">
            <Beams
    beamWidth={3}
    beamHeight={15}
    beamNumber={12}
    lightColor="#E0FFFF"
    speed={2}
    noiseIntensity={1.75}
    scale={0.2}
    rotation={0}
  />
            </div>

            <div
                className="flex flex-col gap-y-[20px] absolute left-[20px] lg:left-1/2 lg:-translate-x-1/2 text-myWhite"
                style={
                    deviceWidth > 1023 && navlinksLeft < deviceWidth / 3
                        ? { left: `${navlinksLeft}px`, transform: "none" }
                        : {}
                }
            ><ScrollOpacity>
            <div className="text-left">
              {/* Top Line - Codevider */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold pl-10 lg:pl-20 mb-4">
                Codevider
              </h1>
          
              {/* Bottom Line - Innovating Through + RotatingText */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl flex items-center gap-3 pl-10 lg:pl-20  font-black">
                <span>Innovating Through</span>
                <div className="relative inline-block overflow-hidden">
                  <RotatingText
                    texts={['Code', 'Impact', 'Ideas']}
                    mainClassName="px-3 md:px-4 bg-myAccent text-myBlack py-1 md:py-2 font-black"
                    staggerFrom="last"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                  />
                </div>
              </h2>
            </div>
          </ScrollOpacity>
          

                <ScrollOpacity>
                    <SlideIn delay={0.15}>
                        <span className="block text-25-body w-[70%] pl-10 lg:pl-20 lg:w-full">
                            Building future-ready software with precision, passion, and purpose.
                        </span>
                    </SlideIn>
                </ScrollOpacity>
            </div>

            <div className="absolute bottom-0 left-0 w-full">
                <Marquee>
                    <div className="flex items-center gap-x-[50px] md:gap-x-[100px] opacity-[0.25]">
                        <h2 className="text-large-m md:text-large-d text-nowrap text-myWhite">
                            Codevider
                        </h2>
                        <span className="block h-[15px] md:h-[20px] w-[120px] md:w-[200px] bg-myWhite rounded-[4px] mr-[50px] md:mr-[100px] translate-y-[100%]" />
                    </div>
                </Marquee>
            </div>
        </section>
    );
};

export default Hero;


// import React, { useState, useEffect } from 'react';
// import BlobScene from './BlobScene';

// const Hero = () => {
//   const [currentWord, setCurrentWord] = useState(0);
//   const words = ['innovation', 'performance', 'growth'];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentWord((prev) => (prev + 1) % words.length);
//     }, 2500);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative  bg-black text-white overflow-hidden">
//       {/* Background Globe - Responsive */}
//       <div className="absolute bottom-0 left-1/2 cursor-pointer transform -translate-x-1/2 translate-y-1/2 z-10">
//         <div className="w-[100vw] h-[100vw] max-w-[1200px] max-h-[1200px] min-w-[320px] min-h-[320px] sm:w-[80vw] sm:h-[80vw] md:w-[900px] md:h-[900px] lg:w-[1200px] lg:h-[1200px]">
//           <BlobScene />
//         </div>
//       </div>

//       {/* Hero Content - Responsive */}
//       <div className="relative z-20 flex flex-col items-center justify-start text-center px-4 sm:px-6 md:px-12 min-h-screen pt-32 sm:pt-36 md:pt-40 lg:pt-44">
//         <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight mb-20 sm:mb-6">
//           Codevider
//         </h1>
                
//         <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-300 font-light max-w-4xl">
//           building for{' '}
//           <span
//             key={currentWord}
//             className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-900 animate-fade-in"
//           >
//             {words[currentWord]}
//           </span>
//         </h3>
//       </div>
//     </section>
//   );
// };

// export default Hero;




