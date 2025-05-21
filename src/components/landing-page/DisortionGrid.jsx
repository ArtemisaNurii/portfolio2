import { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragmentShader = `
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;
uniform vec4 resolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 offset = texture2D(uDataTexture, vUv);
  
  // Improved sampling with subtle distortion
  vec2 distortion = offset.rg * 0.03; // Reduced from 0.02 for smoother effect
  
  // Apply slight blur by sampling multiple points
  vec4 color = texture2D(uTexture, uv - distortion);
  color += texture2D(uTexture, uv - distortion * 0.8) * 0.2;
  color += texture2D(uTexture, uv - distortion * 0.6) * 0.1;
  color = color / 1.3; // Normalize
  
  gl_FragColor = color;
}`;

const GridDistortion = ({
  grid = 25, // Increased from 15 for smoother distortion
  mouse = 0.2, // Increased from 0.1 for wider effect
  strength = 0.12, // Reduced from 0.15 for subtlety
  relaxation = 0.95, // Increased from 0.9 for smoother transitions
  easing = 0.08, // Added easing parameter
  imageSrc,
  className = ''
}) => {
  const containerRef = useRef(null);
  const imageAspectRef = useRef(1);
  const cameraRef = useRef(null);
  const initialDataRef = useRef(null);
  const mouseStateRef = useRef({ 
    x: 0, y: 0, 
    targetX: 0, targetY: 0, 
    prevX: 0, prevY: 0, 
    vX: 0, vY: 0,
    isActive: false
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(0, 0, 0, 0, -1000, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;

    const uniforms = {
      time: { value: 0 },
      resolution: { value: new THREE.Vector4() },
      uTexture: { value: null },
      uDataTexture: { value: null },
    };

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageSrc, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter; // Added for smoother scaling
      imageAspectRef.current = texture.image.width / texture.image.height;
      uniforms.uTexture.value = texture;
      handleResize();
    });

    const size = grid;
    const data = new Float32Array(4 * size * size);
    for (let i = 0; i < size * size; i++) {
      data[i * 4] = 0;
      data[i * 4 + 1] = 0;
    }

    initialDataRef.current = new Float32Array(data);

    const dataTexture = new THREE.DataTexture(
      data,
      size,
      size,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    dataTexture.needsUpdate = true;
    uniforms.uDataTexture.value = dataTexture;

    const material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms,
      vertexShader,
      fragmentShader,
    });
    const geometry = new THREE.PlaneGeometry(1, 1, size - 1, size - 1);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const handleResize = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const containerAspect = width / height;
      const imageAspect = imageAspectRef.current;

      renderer.setSize(width, height);

      const scale = Math.max(containerAspect / imageAspect, 1);
      plane.scale.set(imageAspect * scale, scale, 1);

      const frustumHeight = 1;
      const frustumWidth = frustumHeight * containerAspect;
      camera.left = -frustumWidth / 2;
      camera.right = frustumWidth / 2;
      camera.top = frustumHeight / 2;
      camera.bottom = -frustumHeight / 2;
      camera.updateProjectionMatrix();

      uniforms.resolution.value.set(width, height, 1, 1);
    };

    const mouseState = mouseStateRef.current;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      // Store target position for smoother transition
      mouseState.targetX = (e.clientX - rect.left) / rect.width;
      mouseState.targetY = 1 - (e.clientY - rect.top) / rect.height;
      mouseState.isActive = true;
    };

    const handleMouseEnter = () => {
      mouseState.isActive = true;
    };

    const handleMouseLeave = () => {
      mouseState.isActive = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    handleResize();

    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.time.value += 0.05;

      // Smooth mouse position with easing
      if (mouseState.isActive) {
        mouseState.x += (mouseState.targetX - mouseState.x) * easing;
        mouseState.y += (mouseState.targetY - mouseState.y) * easing;
      } else {
        mouseState.x += (0.5 - mouseState.x) * easing * 0.5;
        mouseState.y += (0.5 - mouseState.y) * easing * 0.5;
      }
      
      // Calculate velocity with smoothing
      mouseState.vX = (mouseState.x - mouseState.prevX) * 0.5 + mouseState.vX * 0.5;
      mouseState.vY = (mouseState.y - mouseState.prevY) * 0.5 + mouseState.vY * 0.5;
      mouseState.prevX = mouseState.x;
      mouseState.prevY = mouseState.y;

      const data = dataTexture.image.data;
      
      // Apply relaxation with improved physics
      for (let i = 0; i < size * size; i++) {
        data[i * 4] *= relaxation;
        data[i * 4 + 1] *= relaxation;
      }

      const gridMouseX = size * mouseState.x;
      const gridMouseY = size * mouseState.y;
      const maxDist = size * mouse;

      // Apply distortion with smoother falloff
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const distance = Math.sqrt(Math.pow(gridMouseX - i, 2) + Math.pow(gridMouseY - j, 2));
          if (distance < maxDist) {
            const index = 4 * (i + size * j);
            // Quadratic falloff for smoother transition
            const power = 1 - Math.pow(distance / maxDist, 2);
            
            // Apply velocity-based distortion
            data[index] += strength * 100 * mouseState.vX * power;
            data[index + 1] -= strength * 100 * mouseState.vY * power;
          }
        }
      }

      dataTexture.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      dataTexture.dispose();
      if (uniforms.uTexture.value) uniforms.uTexture.value.dispose();
    };
  }, [grid, mouse, strength, relaxation, easing, imageSrc]);

  return <div ref={containerRef} className={`w-full h-full overflow-hidden ${className}`} />;
};

export default GridDistortion;