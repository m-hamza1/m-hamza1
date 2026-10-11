"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Sparkles, Play, Pause, Zap, RefreshCw, Layers } from "lucide-react";

type LabMode = "nebula" | "matrix" | "kinetic";
type ColorPalette = "platinum" | "cyan" | "emerald" | "amber";

const PALETTES: Record<ColorPalette, { name: string; primary: number; secondary: number; accent: string }> = {
  platinum: { name: "Platinum Luxe", primary: 0xe2e8f0, secondary: 0x64748b, accent: "border-white/40 text-white" },
  cyan: { name: "Electric Cyan", primary: 0x38bdf8, secondary: 0x0284c7, accent: "border-sky-400 text-sky-400" },
  emerald: { name: "Neon Emerald", primary: 0x34d399, secondary: 0x059669, accent: "border-emerald-400 text-emerald-400" },
  amber: { name: "Solar Amber", primary: 0xfbbf24, secondary: 0xd97706, accent: "border-amber-400 text-amber-400" },
};

export default function Interactive3DPlayground() {
  const mountRef = useRef<HTMLDivElement>(null);

  // UI Control states
  const [activeMode, setActiveMode] = useState<LabMode>("nebula");
  const [palette, setPalette] = useState<ColorPalette>("platinum");
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [particleDensity, setParticleDensity] = useState<number>(2400);

  // References to keep animation loop decoupled from React state (ZERO re-render loops!)
  const modeRef = useRef<LabMode>(activeMode);
  modeRef.current = activeMode;

  const paletteRef = useRef<ColorPalette>(palette);
  paletteRef.current = palette;

  const rotatingRef = useRef<boolean>(isRotating);
  rotatingRef.current = isRotating;

  // External shockwave trigger reference
  const pulseTriggerRef = useRef<{ active: boolean; time: number; x: number; y: number }>({
    active: false,
    time: 0,
    x: 0,
    y: 0,
  });

  const triggerPulse = useCallback(() => {
    pulseTriggerRef.current = {
      active: true,
      time: performance.now(),
      x: 0,
      y: 0,
    };
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 520;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

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
    renderer.setClearColor(0x000000, 0);

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Master Group for 3D interactions
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Subtle Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // ==========================================
    // 2. MODES GENERATOR
    // ==========================================

    // Mode A: Quantum Gravitational Nebula
    const particleCount = 2800;
    const nebulaGeo = new THREE.BufferGeometry();
    const nebulaPositions = new Float32Array(particleCount * 3);
    const nebulaBasePositions = new Float32Array(particleCount * 3);
    const nebulaVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 2.4;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      nebulaPositions[i * 3] = x;
      nebulaPositions[i * 3 + 1] = y;
      nebulaPositions[i * 3 + 2] = z;

      nebulaBasePositions[i * 3] = x;
      nebulaBasePositions[i * 3 + 1] = y;
      nebulaBasePositions[i * 3 + 2] = z;

      nebulaVelocities[i * 3] = (Math.random() - 0.5) * 0.02;
      nebulaVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      nebulaVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    nebulaGeo.setAttribute("position", new THREE.BufferAttribute(nebulaPositions, 3));
    const nebulaMat = new THREE.PointsMaterial({
      size: 0.045,
      color: PALETTES[paletteRef.current].primary,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const nebulaMesh = new THREE.Points(nebulaGeo, nebulaMat);
    masterGroup.add(nebulaMesh);

    // Mode B: Spatial Wave Grid Matrix
    const gridRes = 36;
    const gridCount = gridRes * gridRes;
    const matrixGeo = new THREE.PlaneGeometry(4.2, 4.2, gridRes - 1, gridRes - 1);
    matrixGeo.rotateX(-Math.PI / 2.5);
    const matrixMat = new THREE.MeshStandardMaterial({
      color: PALETTES[paletteRef.current].primary,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.7,
    });
    const matrixMesh = new THREE.Mesh(matrixGeo, matrixMat);
    matrixMesh.visible = false;
    masterGroup.add(matrixMesh);

    // Mode C: Kinetic Architectural Core
    const kineticGroup = new THREE.Group();
    const coreIcoGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const coreIcoMat = new THREE.MeshStandardMaterial({
      color: PALETTES[paletteRef.current].primary,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.75,
    });
    const coreIcoMesh = new THREE.Mesh(coreIcoGeo, coreIcoMat);
    kineticGroup.add(coreIcoMesh);

    // Concentric Gyro Rings
    const ring1Geo = new THREE.TorusGeometry(1.9, 0.015, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: PALETTES[paletteRef.current].secondary,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    kineticGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.3, 0.012, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    kineticGroup.add(ring2);

    kineticGroup.visible = false;
    masterGroup.add(kineticGroup);

    // ==========================================
    // 3. POINTER & INTERACTION PHYSICS
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotMomentumX = 0;
    let rotMomentumY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouseX = x;
      targetMouseY = y;

      if (isDragging) {
        const dx = e.clientX - prevMouseX;
        const dy = e.clientY - prevMouseY;
        rotMomentumY += dx * 0.006;
        rotMomentumX += dy * 0.006;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      // Trigger tactile shockwave on click
      pulseTriggerRef.current = {
        active: true,
        time: performance.now(),
        x: targetMouseX,
        y: targetMouseY,
      };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousemove", onPointerMove);
    domElement.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mouseup", onPointerUp);

    // Mobile Touch interaction
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
        const rect = container.getBoundingClientRect();
        targetMouseX = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
        targetMouseY = -(((e.touches[0].clientY - rect.top) / rect.height) * 2 - 1);

        pulseTriggerRef.current = {
          active: true,
          time: performance.now(),
          x: targetMouseX,
          y: targetMouseY,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        const rect = container.getBoundingClientRect();
        targetMouseX = ((t.clientX - rect.left) / rect.width) * 2 - 1;
        targetMouseY = -(((t.clientY - rect.top) / rect.height) * 2 - 1);

        if (isDragging) {
          const dx = t.clientX - prevMouseX;
          const dy = t.clientY - prevMouseY;
          rotMomentumY += dx * 0.006;
          rotMomentumX += dy * 0.006;
          prevMouseX = t.clientX;
          prevMouseY = t.clientY;
        }
      }
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Mouse wheel zoom
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = THREE.MathUtils.clamp(camera.position.z + e.deltaY * 0.0035, 3.2, 7.8);
    };
    domElement.addEventListener("wheel", onWheel, { passive: false });

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Visibility Observer to pause rendering when scrolled away
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    visibilityObserver.observe(container);

    // ==========================================
    // 4. ANIMATION & REAL-TIME PHYSICS LOOP
    // ==========================================
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return; // Zero GPU wasted when scrolled away!

      const now = performance.now();
      const elapsedTime = (now - startTime) * 0.001;

      // Smooth pointer interpolation
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Inertia rotation damping
      masterGroup.rotation.y += rotMomentumY;
      masterGroup.rotation.x += rotMomentumX;
      rotMomentumY *= 0.92;
      rotMomentumX *= 0.92;

      // Constant ambient rotation if enabled
      if (rotatingRef.current && !isDragging) {
        masterGroup.rotation.y += 0.004;
        masterGroup.rotation.x += 0.0015;
      }

      // Check current mode visibility
      const currentMode = modeRef.current;
      nebulaMesh.visible = currentMode === "nebula";
      matrixMesh.visible = currentMode === "matrix";
      kineticGroup.visible = currentMode === "kinetic";

      // Color synchronization
      const currentColor = PALETTES[paletteRef.current].primary;
      const secondaryColor = PALETTES[paletteRef.current].secondary;

      // Shockwave calculation
      let shockwaveForce = 0;
      if (pulseTriggerRef.current.active) {
        const pulseElapsed = (now - pulseTriggerRef.current.time) * 0.001;
        if (pulseElapsed < 1.2) {
          shockwaveForce = Math.sin(pulseElapsed * Math.PI) * 1.5;
        } else {
          pulseTriggerRef.current.active = false;
        }
      }

      // Mode 1 Physics: Quantum Gravitational Nebula
      if (currentMode === "nebula") {
        nebulaMat.color.setHex(currentColor);
        const posAttr = nebulaGeo.attributes.position as THREE.BufferAttribute;
        const positions = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          const bx = nebulaBasePositions[idx];
          const by = nebulaBasePositions[idx + 1];
          const bz = nebulaBasePositions[idx + 2];

          // Dynamic magnetic swirl around mouse cursor
          const dx = bx - mouseX * 2.2;
          const dy = by - mouseY * 2.2;
          const distSq = dx * dx + dy * dy + 0.5;
          const gravityPull = 0.025 / distSq;

          positions[idx] = bx + Math.sin(elapsedTime * 1.5 + i) * 0.08 - dx * gravityPull + shockwaveForce * (bx * 0.6);
          positions[idx + 1] = by + Math.cos(elapsedTime * 1.2 + i * 1.2) * 0.08 - dy * gravityPull + shockwaveForce * (by * 0.6);
          positions[idx + 2] = bz + Math.sin(elapsedTime * 0.9 + i * 0.7) * 0.06 + shockwaveForce * (bz * 0.6);
        }
        posAttr.needsUpdate = true;
      }

      // Mode 2 Physics: Spatial Wave Grid Matrix
      else if (currentMode === "matrix") {
        matrixMat.color.setHex(currentColor);
        const posAttr = matrixGeo.attributes.position as THREE.BufferAttribute;
        const positions = posAttr.array as Float32Array;

        for (let i = 0; i < gridCount; i++) {
          const idx = i * 3;
          const gx = positions[idx];
          const gy = positions[idx + 1];

          // Distance from cursor
          const distToMouse = Math.hypot(gx - mouseX * 2, gy - mouseY * 2);
          const wave1 = Math.sin(distToMouse * 4.0 - elapsedTime * 3.0) * 0.28;
          const wave2 = Math.cos(gx * 2.5 + elapsedTime * 1.8) * 0.15;
          const pulse = shockwaveForce * Math.sin(distToMouse * 5.0) * 0.4;

          positions[idx + 2] = wave1 + wave2 + pulse;
        }
        posAttr.needsUpdate = true;
      }

      // Mode 3 Physics: Kinetic Core
      else if (currentMode === "kinetic") {
        coreIcoMat.color.setHex(currentColor);
        ring1Mat.color.setHex(secondaryColor);

        ring1.rotation.z = elapsedTime * 0.8;
        ring2.rotation.x = elapsedTime * 0.5;
        ring2.rotation.y = elapsedTime * 0.6;

        coreIcoMesh.rotation.y = -elapsedTime * 0.4;
        coreIcoMesh.rotation.z = elapsedTime * 0.2;

        const pulseScale = 1 + shockwaveForce * 0.35 + Math.sin(elapsedTime * 2.5) * 0.04;
        coreIcoMesh.scale.set(pulseScale, pulseScale, pulseScale);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      domElement.removeEventListener("mousemove", onPointerMove);
      domElement.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mouseup", onPointerUp);
      domElement.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      domElement.removeEventListener("wheel", onWheel);

      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
      nebulaGeo.dispose();
      nebulaMat.dispose();
      matrixGeo.dispose();
      matrixMat.dispose();
      coreIcoGeo.dispose();
      coreIcoMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-neutral-950/90 backdrop-blur-2xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Realtime Spatial Geometry Lab</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Interactive Three.js Spatial Physics
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 font-light mt-0.5">
            Physics particle attraction, kinetic rotation damping, and procedural topology deforms.
          </p>
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={triggerPulse}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 hover:border-white text-xs font-mono uppercase tracking-wider text-white hover:bg-white/10 transition-all cursor-pointer active:scale-95"
            title="Send gravitational shockwave"
          >
            <Zap className="w-3 h-3 text-amber-300" />
            <span>Shockwave</span>
          </button>

          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-mono uppercase tracking-wider transition-all cursor-pointer active:scale-95 ${
              isRotating
                ? "border-white/20 text-neutral-300 hover:border-white hover:text-white"
                : "border-amber-400/40 text-amber-300 bg-amber-500/10"
            }`}
            title={isRotating ? "Pause auto-rotation" : "Resume auto-rotation"}
          >
            {isRotating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{isRotating ? "Pause" : "Spin"}</span>
          </button>
        </div>
      </div>

      {/* Main Viewport & Control Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* Viewport Canvas (520px height for expansive interactivity) */}
        <div className="lg:col-span-8 relative h-[380px] sm:h-[460px] md:h-[500px] bg-black rounded-xl border border-white/10 overflow-hidden flex items-center justify-center group shadow-inner">
          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
          />

          {/* Interactive Helper Overlay */}
          <div className="absolute bottom-3.5 left-3.5 text-[11px] font-mono text-neutral-400 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2 pointer-events-none select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Hover to Attract • Click to Pulse • Drag to Orbit</span>
          </div>
        </div>

        {/* Control Rail */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Mode Selector */}
          <div>
            <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-neutral-300" />
              <span>Select Topology</span>
            </label>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => setActiveMode("nebula")}
                className={`py-2.5 px-4 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer flex items-center justify-between ${
                  activeMode === "nebula"
                    ? "bg-white text-black font-semibold border-white shadow-lg"
                    : "bg-neutral-950 border-white/10 text-neutral-400 hover:text-white hover:border-white/30"
                }`}
              >
                <span>Quantum Nebula Swarm</span>
                <span className="text-[10px] font-mono opacity-60">2,800 Particles</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode("matrix")}
                className={`py-2.5 px-4 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer flex items-center justify-between ${
                  activeMode === "matrix"
                    ? "bg-white text-black font-semibold border-white shadow-lg"
                    : "bg-neutral-950 border-white/10 text-neutral-400 hover:text-white hover:border-white/30"
                }`}
              >
                <span>Spatial Wave Grid</span>
                <span className="text-[10px] font-mono opacity-60">Procedural Mesh</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode("kinetic")}
                className={`py-2.5 px-4 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer flex items-center justify-between ${
                  activeMode === "kinetic"
                    ? "bg-white text-black font-semibold border-white shadow-lg"
                    : "bg-neutral-950 border-white/10 text-neutral-400 hover:text-white hover:border-white/30"
                }`}
              >
                <span>Kinetic Architectural Core</span>
                <span className="text-[10px] font-mono opacity-60">Wireframe Gyro</span>
              </button>
            </div>
          </div>

          {/* Color Palettes */}
          <div>
            <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2.5">
              Spectral Radiance
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(PALETTES) as ColorPalette[]).map((pKey) => {
                const isSelected = palette === pKey;
                return (
                  <button
                    key={pKey}
                    type="button"
                    onClick={() => setPalette(pKey)}
                    className={`py-2 px-3 rounded-xl text-xs font-mono uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? "border-white bg-white/10 text-white font-semibold"
                        : "border-white/10 bg-neutral-950 text-neutral-400 hover:text-white hover:border-white/30"
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: `#${PALETTES[pKey].primary.toString(16).padStart(6, "0")}` }}
                    />
                    <span className="truncate">{PALETTES[pKey].name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Architecture Notes */}
          <div className="p-4 rounded-xl border border-white/10 bg-neutral-900/40 text-xs font-mono text-neutral-400 space-y-1">
            <div className="text-white font-medium">GPU Buffer Shaders</div>
            <p className="text-neutral-500 font-light leading-relaxed">
              Native WebGL 2.0 pipeline with direct Float32Array transforms. 0% React re-render overhead.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
