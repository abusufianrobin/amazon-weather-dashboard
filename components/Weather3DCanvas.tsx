'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

interface WeatherProps {
  temp: number;
  condition: string;
}

function AnimatedSphere({ temp, condition }: WeatherProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    if (meshRef.current) {
      const targetScale = temp > 20 ? 1.3 : 1.0;
      gsap.to(meshRef.current.scale, {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        duration: 1.2,
        ease: 'power2.out',
      });
    }
  }, [temp]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.15;
    }
  });

  const lowerCond = condition ? condition.toLowerCase() : '';
  const isRain = lowerCond.includes('rain') || lowerCond.includes('drizzle');
  const isSnow = lowerCond.includes('snow') || lowerCond.includes('ice');
  
  let sphereColor = '#ff9900'; // Amazon Orange (default sunny/warm)
  if (isRain) sphereColor = '#2563eb';
  else if (isSnow) sphereColor = '#38bdf8';
  else if (temp <= 15) sphereColor = '#06b6d4';

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]} scale={1}>
      <MeshDistortMaterial
        color={sphereColor}
        attach="material"
        distort={0.45}
        speed={2.5}
        roughness={0.2}
        metalness={0.7}
      />
    </Sphere>
  );
}

export default function Weather3DCanvas({ temp, condition }: WeatherProps) {
  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl relative">
      <div className="absolute top-4 left-4 z-10 bg-slate-950/80 backdrop-blur border border-slate-700/60 px-3 py-1 rounded-full text-xs font-semibold text-amber-400">
        3D Atmosphere Visualization
      </div>
      <Canvas camera={{ position: [0, 0, 3.5] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <AnimatedSphere temp={temp} condition={condition} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
}