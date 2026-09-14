import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, ShieldCheck, Zap } from 'lucide-react';

interface HeroElevator3DProps {
  onExploreClick?: () => void;
  onConfiguratorClick?: () => void;
}

export const HeroElevator3D: React.FC<HeroElevator3DProps> = ({
  onExploreClick,
  onConfiguratorClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [cabinFloor, setCabinFloor] = useState<number>(35);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Clear previous canvas if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00d9ff, 3.2, 55);
    cyanLight.position.set(8, 12, 10);
    scene.add(cyanLight);

    const goldLight = new THREE.PointLight(0xffb700, 2.6, 45);
    goldLight.position.set(-8, -10, 8);
    scene.add(goldLight);

    // Group for entire hoistway shaft
    const shaftGroup = new THREE.Group();
    scene.add(shaftGroup);

    // Materials
    const beamMat = new THREE.MeshStandardMaterial({
      color: 0x2c3e50,
      metalness: 0.85,
      roughness: 0.2
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xffb700,
      metalness: 0.8,
      roughness: 0.25
    });

    const cyanCableMat = new THREE.MeshBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.75
    });

    // 4 Corner Vertical Columns
    const beamGeo = new THREE.CylinderGeometry(0.08, 0.08, 44, 16);
    const cornerPositions = [
      [-4.5, 0, -4.5],
      [4.5, 0, -4.5],
      [-4.5, 0, 4.5],
      [4.5, 0, 4.5]
    ];

    cornerPositions.forEach(([x, y, z]) => {
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(x, y, z);
      shaftGroup.add(beam);
    });

    // Central suspension cables
    [-1.2, 0, 1.2].forEach(x => {
      const cableGeo = new THREE.CylinderGeometry(0.03, 0.03, 44, 8);
      const cable = new THREE.Mesh(cableGeo, cyanCableMat);
      cable.position.set(x, 0, 0);
      shaftGroup.add(cable);
    });

    // Counterweight Frame (on rear)
    const counterweightGroup = new THREE.Group();
    const cwGeo = new THREE.BoxGeometry(3.5, 2.5, 1.0);
    const cwMat = new THREE.MeshStandardMaterial({ color: 0x1f2a3a, metalness: 0.9, roughness: 0.3 });
    const cwMesh = new THREE.Mesh(cwGeo, cwMat);
    counterweightGroup.add(cwMesh);
    counterweightGroup.position.set(0, 0, -5.2);
    shaftGroup.add(counterweightGroup);

    // Glass Elevator Cabin Group
    const cabinGroup = new THREE.Group();
    shaftGroup.add(cabinGroup);

    // Outer glass enclosure
    const glassGeo = new THREE.BoxGeometry(6, 7.5, 6);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a3a52,
      metalness: 0.15,
      roughness: 0.04,
      transmission: 0.88,
      thickness: 1.4,
      transparent: true,
      opacity: 0.58
    });
    const glassBox = new THREE.Mesh(glassGeo, glassMat);
    cabinGroup.add(glassBox);

    // Cabin Wireframe skeleton
    const frameGeo = new THREE.BoxGeometry(6.05, 7.55, 6.05);
    const frameWire = new THREE.WireframeGeometry(frameGeo);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.85
    });
    const frameLine = new THREE.LineSegments(frameWire, lineMat);
    cabinGroup.add(frameLine);

    // Cabin Ceiling & Floor metallic plates
    const plateGeo = new THREE.BoxGeometry(6.2, 0.4, 6.2);
    const floorPlate = new THREE.Mesh(plateGeo, goldAccentMat);
    floorPlate.position.y = -3.8;
    cabinGroup.add(floorPlate);

    const ceilingPlate = new THREE.Mesh(plateGeo, goldAccentMat);
    ceilingPlate.position.y = 3.8;
    cabinGroup.add(ceilingPlate);

    // Interior luxury warm light
    const interiorLight = new THREE.PointLight(0xffe5a3, 3.2, 12);
    interiorLight.position.set(0, 2, 0);
    cabinGroup.add(interiorLight);

    // Interior core pillar / luxury touch terminal
    const pillarGeo = new THREE.CylinderGeometry(0.3, 0.3, 7.2, 16);
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x112233, metalness: 0.9, roughness: 0.1 });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    cabinGroup.add(pillar);

    // Touch Operating Panel in Cabin (Glowing Cyan)
    const copGeo = new THREE.BoxGeometry(0.4, 2.2, 0.08);
    const copMat = new THREE.MeshBasicMaterial({ color: 0x00d9ff });
    const copMesh = new THREE.Mesh(copGeo, copMat);
    copMesh.position.set(1.5, 0, 2.9);
    cabinGroup.add(copMesh);

    // Horizontal Shaft Structural Rings
    for (let y = -18; y <= 18; y += 4.5) {
      const ringGeo = new THREE.BoxGeometry(9.4, 0.15, 9.4);
      const ringWire = new THREE.WireframeGeometry(ringGeo);
      const ring = new THREE.LineSegments(
        ringWire,
        new THREE.LineBasicMaterial({ color: 0x2c3e50, transparent: true, opacity: 0.45 })
      );
      ring.position.y = y;
      shaftGroup.add(ring);
    }

    // Floating Geometric Particles
    const particleCount = 50;
    const particlesGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 20;
      particlePos[i + 1] = (Math.random() - 0.5) * 32;
      particlePos[i + 2] = (Math.random() - 0.5) * 20;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00d9ff,
      size: 0.28,
      transparent: true,
      opacity: 0.85
    });
    const particles = new THREE.Points(particlesGeo, particleMat);
    shaftGroup.add(particles);

    // Interactive Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Clock & Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth elevator vertical movement
      const elevatorY = Math.sin(t * 0.6 * speedMultiplier) * 6.8;
      cabinGroup.position.y = elevatorY;

      // Counterweight moves inversely!
      counterweightGroup.position.y = -elevatorY;

      // Rotate particles subtly
      particles.rotation.y = t * 0.05;

      // Mouse-driven shaft tilt
      targetRotationY = mouseX * 0.45;
      targetRotationX = mouseY * 0.25;

      shaftGroup.rotation.y += (targetRotationY - shaftGroup.rotation.y) * 0.04 + 0.002;
      shaftGroup.rotation.x += (targetRotationX - shaftGroup.rotation.x) * 0.04;

      // Dynamic light pulsations
      cyanLight.intensity = 2.8 + Math.sin(t * 2.0) * 0.9;
      goldLight.intensity = 2.2 + Math.cos(t * 1.5) * 0.7;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [speedMultiplier]);

  return (
    <section className="relative w-full min-h-[940px] flex items-center justify-center overflow-hidden pt-24 pb-16 bg-[#0c1322]">
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0 cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* Atmospheric Depth Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1322]/85 via-[#0c1322]/40 to-[#0c1322] z-10 pointer-events-none" />
      <div className="absolute -top-40 right-1/4 w-[520px] h-[520px] bg-[#00d9ff]/10 rounded-full blur-[140px] pointer-events-none z-10" />
      <div className="absolute bottom-10 left-10 w-[420px] h-[420px] bg-[#ffb700]/10 rounded-full blur-[120px] pointer-events-none z-10" />

      {/* Foreground Hero Content */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 flex flex-col items-center text-center">
        {/* Eyebrow Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141b2b]/90 border border-[#2c3e50]/70 backdrop-blur-xl shadow-xl mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00d9ff] animate-ping" />
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#aeecff]">
            ENGINEERED IN NCR
          </span>
          <span className="text-[#3c494d] font-bold">|</span>
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#ffdb9f]">
            NEXT-GEN VERTICAL MOBILITY
          </span>
          <span className="text-[#3c494d] font-bold">|</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#bbc9ce]">
            EN 81-20/50 COMPLIANT
          </span>
        </div>

        {/* Monumental Headline */}
        <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#dce2f7] tracking-tighter uppercase mb-2 drop-shadow-2xl">
          ELEVARE
        </h1>

        <p className="font-headline text-xl sm:text-2xl text-[#00d9ff] font-semibold tracking-wider uppercase mb-5">
          Elevate Every Journey
        </p>

        {/* Precision Description */}
        <p className="max-w-3xl text-base sm:text-lg text-[#bbc9ce] mb-8 text-center leading-relaxed font-normal">
          Pioneering ultra-velocity traction architectures, surgical German kinematics, and IoT
          destination-dispatch control systems tailored for prestigious NCR high-rises, luxury
          penthouses, and mission-critical commercial hubs.
        </p>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={onExploreClick}
            className="group px-7 py-3.5 rounded bg-[#ffb700] text-[#422d00] font-headline text-sm uppercase font-bold tracking-wider shadow-lg hover:shadow-[0_0_30px_rgba(255,183,0,0.45)] hover:bg-[#ffba26] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Systems</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>

          <button
            onClick={onConfiguratorClick}
            className="px-7 py-3.5 rounded bg-[#232a3a]/80 text-[#00d9ff] border border-[#00d9ff]/40 hover:bg-[#00d9ff] hover:text-[#001f26] backdrop-blur-xl font-headline text-sm uppercase font-bold tracking-wider shadow-lg hover:shadow-[0_0_26px_rgba(0,217,255,0.4)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            <span>Launch 3D Configurator</span>
          </button>
        </div>

        {/* 3D Hoistway Interactive Controls Pill */}
        <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-[#141b2b]/80 border border-[#2c3e50]/80 backdrop-blur-md text-xs text-[#bbc9ce]">
          <Eye className="w-4 h-4 text-[#00d9ff]" />
          <span>Interactive 3D Shaft: Move mouse to orbit view</span>
          <span className="text-[#3c494d]">|</span>
          <button
            onClick={() => setSpeedMultiplier(s => (s === 1 ? 1.75 : s === 1.75 ? 0.5 : 1))}
            className="px-2 py-0.5 rounded bg-[#191f2f] text-[#00d9ff] font-semibold hover:bg-[#232a3a] transition-colors cursor-pointer"
          >
            Speed: {speedMultiplier === 1 ? '1.0x (Normal)' : speedMultiplier === 1.75 ? '1.75x (Express)' : '0.5x (Precision)'}
          </button>
        </div>

        {/* Floating Live Telemetry Stat Bar */}
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-[#141b2b]/75 border border-[#2c3e50]/80 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col items-center justify-center p-3 bg-[#191f2f]/60 rounded border border-[#2c3e50]/50">
            <div className="flex items-baseline gap-1">
              <span className="font-headline text-3xl sm:text-4xl font-extrabold text-[#00d9ff]">10</span>
              <span className="font-headline text-xl font-bold text-[#ffb700]">+</span>
            </div>
            <span className="text-[11px] font-semibold text-[#859398] uppercase tracking-wider text-center mt-1">
              Years Precision Eng.
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 bg-[#191f2f]/60 rounded border border-[#2c3e50]/50">
            <div className="flex items-baseline gap-1">
              <span className="font-headline text-3xl sm:text-4xl font-extrabold text-[#00d9ff]">850</span>
              <span className="font-headline text-xl font-bold text-[#ffb700]">+</span>
            </div>
            <span className="text-[11px] font-semibold text-[#859398] uppercase tracking-wider text-center mt-1">
              NCR Deployments
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 bg-[#191f2f]/60 rounded border border-[#2c3e50]/50">
            <div className="flex items-baseline gap-1">
              <span className="font-headline text-3xl sm:text-4xl font-extrabold text-[#00d9ff]">99.98</span>
              <span className="font-headline text-xl font-bold text-[#00d9ff]">%</span>
            </div>
            <span className="text-[11px] font-semibold text-[#859398] uppercase tracking-wider text-center mt-1">
              Operational Uptime
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3 bg-[#191f2f]/60 rounded border border-[#2c3e50]/50">
            <div className="flex items-baseline gap-1">
              <span className="font-headline text-3xl sm:text-4xl font-extrabold text-[#ffb700]">0.02</span>
              <span className="font-headline text-xl font-bold text-[#ffb700]">s</span>
            </div>
            <span className="text-[11px] font-semibold text-[#859398] uppercase tracking-wider text-center mt-1">
              Smart Brake Latency
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
