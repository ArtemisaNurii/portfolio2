// import React, { useRef, useState, useEffect } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment } from "@react-three/drei";
// import { gsap } from "gsap";
// import DiscobrainModel from "./FloatBlob";

// const AnimatedGlobe = ({ onRotate }) => {
//   const groupRef = useRef();

//   useEffect(() => {
//     if (groupRef.current) {
//       groupRef.current.position.set(0, -4, 0);
//       groupRef.current.scale.set(0.3, 0.3, 0.3);
      
//       // Set initial opacity to 0 for all materials
//       groupRef.current.traverse((child) => {
//         if (child.material) {
//           child.material.transparent = true;
//           child.material.opacity = 0;
//         }
//       });
      
//       // Fade in animation
//       gsap.to({}, {
//         duration: 1.8,
//         ease: "power2.out",
//         delay: 0.2,
//         onUpdate: function() {
//           const progress = this.progress();
//           groupRef.current.traverse((child) => {
//             if (child.material) {
//               child.material.opacity = progress;
//             }
//           });
//         }
//       });
      
//       // Scale animation
//       gsap.to(groupRef.current.scale, {
//         x: 1,
//         y: 1, 
//         z: 1,
//         duration: 2.2,
//         ease: "back.out(1.2)",
//         delay: 0.4
//       });
//     }
//   }, []);

//   const handleClick = (e) => {
//     e.stopPropagation();
//     if (groupRef.current) {
//       onRotate();
//       gsap.to(groupRef.current.rotation, {
//         y: groupRef.current.rotation.y + Math.PI * 2,
//         duration: 1.5,
//         ease: "power2.inOut"
//       });
//     }
//   };

//   return (
//     <group 
//       ref={groupRef} 
//       onClick={handleClick}
//       style={{ cursor: 'pointer' }}
//     >
//       <DiscobrainModel />
//     </group>
//   );
// };

// const BlobScene = () => {
//   const canvasRef = useRef(null);
//   const controlsRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkDevice = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkDevice();
//     window.addEventListener("resize", checkDevice);
//     return () => window.removeEventListener("resize", checkDevice);
//   }, []);

//   const handleBlobRotate = () => {
//     if (controlsRef.current) {
//       controlsRef.current.autoRotate = false;
//       setTimeout(() => {
//         if (controlsRef.current) {
//           controlsRef.current.autoRotate = true;
//         }
//       }, 1500);
//     }
//   };

//   return (
//     <div className="w-full h-screen bg-transparent" style={{ position: "relative" }}>
//       <Canvas
//         ref={canvasRef}
//         camera={{ position: [0, 8, 10], fov: isMobile ? 60 : 50 }}
//         style={{
//           background: "linear-gradient bg-gradient-to-b from-black/70 via-black/40 to-transparent z-0",
//         }}
//       >
//         <ambientLight intensity={0.3} />
//         <pointLight position={[10, 10, 10]} intensity={1} color="#00FFFF" />
//         <pointLight position={[-10, -10, -10]} intensity={0.7} color="#00BFFF" />
//         <pointLight position={[0, 5, 0]} intensity={0.8} color="#40E0D0" />
        
//         <AnimatedGlobe onRotate={handleBlobRotate} />
        
//         <OrbitControls
//           ref={controlsRef}
//           enableZoom={false}
//           enablePan={false}
//           autoRotate
//           autoRotateSpeed={0.3}
//           maxPolarAngle={Math.PI / 2}
//           minPolarAngle={Math.PI / 3}
//         />
        
//         <Environment preset="studio" />
//       </Canvas>
//     </div>
//   );
// };

// export default BlobScene;