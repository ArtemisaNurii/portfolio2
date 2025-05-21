import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import innovate from '../../assets/images/innovate.png';
import image2 from '../../assets/images/image2.png';
import image3 from '../../assets/images/image3.png';
import image4 from '../../assets/images/image4.png';
import image5 from '../../assets/images/image5.png';
import GridDistortion from './DisortionGrid';

const slider1 = [
  { color: '#21242b', src: image2 },
  { color: '#21242b', src: innovate },

  { color: '#21242b', src: image3 },

  { color: '#21242b', src: image4 }
];

const slider2 = [
  { color: '#21242b', src: image5 },
  { color: '#21242b', src: image4 },
  { color: '#21242b', src: image2 },
  { color: '#21242b', src: innovate }
];

export default function SlidingImages() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <div
      ref={container}
      className="relative mt-24 sm:mt-32 md:mt-40 lg:mt-48 bg-myWhite z-10 px-4 sm:px-6 md:px-8 overflow-hidden"
    >
      {/* First sliding track */}
      <motion.div
        style={{ x: x1 }}
        className="flex gap-4 sm:gap-6 md:gap-8 w-[200vw] sm:w-[150vw] md:w-[120vw] -translate-x-1/2 sm:-translate-x-1/3 md:-translate-x-[10vw]"
      >
        {slider1.map((project, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 h-[60vw] sm:h-[40vw] md:h-[20vw] flex items-center justify-center"
            style={{ backgroundColor: project.color }}
          >
            <GridDistortion
              imageSrc={project.src}
              grid={20}
              mouse={0.5}
              strength={0.15}
              relaxation={0.9}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </motion.div>

      {/* Second sliding track */}
      <motion.div
        style={{ x: x2 }}
        className="flex gap-4 sm:gap-6 md:gap-8 w-[200vw] sm:w-[150vw] md:w-[120vw] -translate-x-1/2 sm:-translate-x-1/3 md:-translate-x-[10vw] mt-8 md:mt-12"
      >
        {slider2.map((project, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 h-[60vw] sm:h-[40vw] md:h-[20vw] flex items-center justify-center"
            style={{ backgroundColor: project.color }}
          >
            <GridDistortion
              imageSrc={project.src}
              grid={20}
              mouse={0.5}
              strength={0.15}
              relaxation={0.9}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </motion.div>

      {/* Reveal shape at bottom */}
      <motion.div
        style={{ height }}
        className="relative mt-12 sm:mt-16 md:mt-20"
      >
        <div
          className="absolute rounded-bl-[50%] rounded-br-[50%] shadow-lg bg-myWhite z-10"
          style={{
            height: '1550%',
            width: '120%',
            left: '-10%'
          }}
        />
      </motion.div>
    </div>
  );
}
