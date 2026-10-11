"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface HeroCanvas3DProps {
  className?: string;
}

export default function HeroCanvas3D({ className = "" }: HeroCanvas3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.8;
    camera.position.x = 0.5; // subtly offset towards the right for editorial balance

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Refined Outer Architectural Wireframe (Icosahedron)
    const outerGeo = new THREE.IcosahedronGeometry(1.75, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8, // Slate / platinum
      wireframe: true,
      roughness: 0.15,
      metalness: 0.85,
      transparent: true,
      opacity: 0.55,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    group.add(outerMesh);

    // 2. Refined Solid Geometric Core (Dodecahedron)
    const coreGeo = new THREE.DodecahedronGeometry(1.05, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.25,
      metalness: 0.9,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    group.add(coreMesh);

    // 3. Subtle Orbiting Ring
    const ringGeo = new THREE.TorusGeometry(2.3, 0.012, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x71717a,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.6;
    group.add(ringMesh);

    // 4. Subtle Ambient Particle Halo
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 2.4 + (Math.random() - 0.5) * 0.6;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.7;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xa1a1aa,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(5, 6, 5);
    scene.add(dirLight);

    const softFillLight = new THREE.PointLight(0x38bdf8, 1.2, 12);
    softFillLight.position.set(-4, -2, 3);
    scene.add(softFillLight);

    // Interactive pointer handling
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseX = x;
      mouseY = y;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotY += deltaX * 0.007;
        targetRotX += deltaY * 0.007;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mouseup", onPointerUp);

    // Touch events for mobile
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mouseX = (t.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(t.clientY / window.innerHeight) * 2 + 1;
      }
    };
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        if (cr.width > 0 && cr.height > 0) {
          width = cr.width;
          height = cr.height;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });
    resizeObserver.observe(container);

    // Visibility Observer to pause WebGL render loop when scrolled offscreen
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    visibilityObserver.observe(container);

    // Animation Loop
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return; // Zero GPU wasted when not on screen!

      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Ambient rotation
      group.rotation.y += 0.0035;
      group.rotation.x += 0.0018;

      if (!isDragging) {
        targetRotY += (mouseX * 0.5 - targetRotY) * 0.035;
        targetRotX += (-mouseY * 0.5 - targetRotX) * 0.035;
      }

      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, group.rotation.y + targetRotY * 0.02, 0.08);
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotX, 0.05);

      coreMesh.rotation.y = -elapsedTime * 0.35;
      particles.rotation.y = elapsedTime * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchmove", onTouchMove);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      outerGeo.dispose();
      outerMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full select-none cursor-grab active:cursor-grabbing ${className}`}
    />
  );
}
