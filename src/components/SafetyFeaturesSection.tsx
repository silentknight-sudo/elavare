import React, { useState, useEffect } from 'react';
import { TelemetryNode } from '../types';
import { TELEMETRY_NODES } from '../data/initialData';
import { Gavel, Cpu, Leaf, MapPin, ArrowRight, Activity, ShieldAlert, CheckCircle2, RotateCw } from 'lucide-react';

export const SafetyFeaturesSection: React.FC = () => {
  const [nodes, setNodes] = useState<TelemetryNode[]>(TELEMETRY_NODES);
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);
  const [isSimulatingArd, setIsSimulatingArd] = useState<boolean>(false);
  const [ardSuccessMessage, setArdSuccessMessage] = useState<string | null>(null);

  const activeNode = nodes[activeNodeIndex];

  // Dynamic telemetry jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prevNodes =>
        prevNodes.map((node, i) => {
          if (i !== activeNodeIndex) return node;
          const speedOffset = (Math.random() - 0.5) * 0.08;
          const tempOffset = (Math.random() - 0.5) * 0.2;
          const vibOffset = (Math.random() - 0.5) * 0.005;
          const energyAddition = Math.random() * 0.04;

          return {
            ...node,
            speed: Math.max(0, +(node.speed + speedOffset).toFixed(2)),
            temperature: +(node.temperature + tempOffset).toFixed(1),
            vibration: Math.max(0.01, +(node.vibration + vibOffset).toFixed(2)),
            energyRecycled: +(node.energyRecycled + energyAddition).toFixed(1)
          };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [activeNodeIndex]);

  const handleTestArd = () => {
    setIsSimulatingArd(true);
    setArdSuccessMessage('Simulating power-cut... ARD Lithium Pack activated! Cabin smoothly docking to nearest Level 25.');

    setTimeout(() => {
      setIsSimulatingArd(false);
      setArdSuccessMessage('ARD Test Complete: Level docking accomplished in 4.2 seconds. Brake latency: 0.018s. Passed EN 81-20/50 audit.');
      setTimeout(() => setArdSuccessMessage(null), 6000);
    }, 3500);
  };

  return (
    <section id="engineering-and-safety" className="relative w-full py-20 bg-[#141b2b]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#ffb700] mb-2">
              <span className="w-3 h-0.5 bg-[#ffb700]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffdb9f]">
                Kinetic Safety Regimes
              </span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-[#dce2f7] uppercase tracking-tight">
              Certified Fail-Safe Architecture
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#bbc9ce] leading-relaxed">
            Engineered for seismic zone IV & V across Delhi-NCR with quadruple-layer electrical
            redundancy and sub-millisecond physical overspeed brakes.
          </p>
        </div>

        {/* 4 Major Safety Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Feature 1 */}
          <div className="p-6 rounded-xl bg-[#191f2f] border border-[#2c3e50] shadow-lg flex flex-col justify-between group hover:border-[#00d9ff]/50 hover:bg-[#1e273b] transition-all">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#232a3a] flex items-center justify-center text-[#00d9ff] mb-4 group-hover:scale-110 transition-transform">
                <Gavel className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-base font-bold text-white uppercase mb-2">
                Mission-Critical Safety
              </h3>
              <p className="text-xs text-[#bbc9ce] leading-relaxed mb-4">
                Progressive safety gear with quad overspeed governors, seismic shear-wave triggers, and lithium Automatic Rescue Device (ARD).
              </p>
            </div>
            <div className="text-[#00d9ff] text-xs uppercase font-semibold flex items-center gap-1.5 pt-2 border-t border-[#2c3e50]/40">
              <span>EN 81-20/50 Tier 1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-xl bg-[#191f2f] border border-[#2c3e50] shadow-lg flex flex-col justify-between group hover:border-[#ffb700]/50 hover:bg-[#1e273b] transition-all">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#232a3a] flex items-center justify-center text-[#ffb700] mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-base font-bold text-white uppercase mb-2">
                Smart IoT Cloud Brain
              </h3>
              <p className="text-xs text-[#bbc9ce] leading-relaxed mb-4">
                Telemetry continuously sampled at 10ms intervals. AI cable friction diagnostics prevent 98% of unscheduled down-time before it occurs.
              </p>
            </div>
            <div className="text-[#ffb700] text-xs uppercase font-semibold flex items-center gap-1.5 pt-2 border-t border-[#2c3e50]/40">
              <span>Machine-Learning Core</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-xl bg-[#191f2f] border border-[#2c3e50] shadow-lg flex flex-col justify-between group hover:border-[#00d9ff]/50 hover:bg-[#1e273b] transition-all">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#232a3a] flex items-center justify-center text-[#aeecff] mb-4 group-hover:scale-110 transition-transform">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-base font-bold text-white uppercase mb-2">
                Eco-Kinetic Regeneration
              </h3>
              <p className="text-xs text-[#bbc9ce] leading-relaxed mb-4">
                Bi-directional regenerative drives harness descent and deceleration gravity, channeling clean electrical power directly back to building mains.
              </p>
            </div>
            <div className="text-[#00d9ff] text-xs uppercase font-semibold flex items-center gap-1.5 pt-2 border-t border-[#2c3e50]/40">
              <span>42% Power Recovery</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-xl bg-[#191f2f] border border-[#2c3e50] shadow-lg flex flex-col justify-between group hover:border-[#ffb700]/50 hover:bg-[#1e273b] transition-all">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#232a3a] flex items-center justify-center text-[#ffdea9] mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-headline text-base font-bold text-white uppercase mb-2">
                24/7 Rapid NCR Support
              </h3>
              <p className="text-xs text-[#bbc9ce] leading-relaxed mb-4">
                Field engineering response hubs deployed across Cyber City Gurugram, Sector 62 Noida, and Okhla Phase III with guaranteed sub-18 minute arrival.
              </p>
            </div>
            <div className="text-[#ffb700] text-xs uppercase font-semibold flex items-center gap-1.5 pt-2 border-t border-[#2c3e50]/40">
              <span>Sub-18 Min Guarantee</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Live Hoistway Telemetry Deck with Node Switcher */}
        <div className="w-full bg-[#0c1322] border border-[#2c3e50] rounded-xl p-6 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 mb-5 border-b border-[#2c3e50] gap-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d9ff] opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00d9ff]" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-headline text-sm uppercase font-bold text-white tracking-wider">
                    {activeNode.name}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00d9ff]/20 text-[#00d9ff]">
                    FLOOR {activeNode.currentFloor} ({activeNode.direction})
                  </span>
                </div>
                <span className="text-[11px] text-[#859398]">{activeNode.location} • Hub Connected</span>
              </div>
            </div>

            {/* Node Switcher & ARD Simulation Button */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex bg-[#141b2b] p-1 rounded-lg border border-[#2c3e50]">
                {nodes.map((n, idx) => (
                  <button
                    key={n.id}
                    onClick={() => setActiveNodeIndex(idx)}
                    className={`px-3 py-1 rounded text-xs font-semibold uppercase transition-colors cursor-pointer ${
                      activeNodeIndex === idx
                        ? 'bg-[#232a3a] text-[#00d9ff]'
                        : 'text-[#859398] hover:text-white'
                    }`}
                  >
                    Node {idx + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handleTestArd}
                disabled={isSimulatingArd}
                className="px-3.5 py-1.5 rounded bg-[#191f2f] hover:bg-[#232a3a] border border-[#00d9ff]/40 text-[#00d9ff] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSimulatingArd ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Engaging ARD...</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-3.5 h-3.5 text-[#ffb700]" />
                    <span>Simulate ARD Trigger</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ARD Simulation Feedback Banner */}
          {ardSuccessMessage && (
            <div className="mb-5 p-3.5 rounded-lg bg-[#00d9ff]/10 border border-[#00d9ff]/40 flex items-center gap-2.5 text-xs text-[#aeecff]">
              <CheckCircle2 className="w-4 h-4 text-[#00d9ff] shrink-0" />
              <span>{ardSuccessMessage}</span>
            </div>
          )}

          {/* 4 Dynamic Gauges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Speed Gauge */}
            <div className="p-4 rounded-lg bg-[#141b2b] border border-[#2c3e50]/70 flex flex-col">
              <span className="text-[11px] font-semibold text-[#859398] uppercase tracking-wider mb-1">
                Instantaneous Velocity
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-headline text-3xl font-extrabold text-[#00d9ff]">
                  {activeNode.speed.toFixed(2)}
                </span>
                <span className="text-xs font-mono text-[#859398]">m/s</span>
              </div>
              <svg className="w-full h-8 mt-3 text-[#00d9ff]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 24">
                <path d="M0 18 Q 20 6, 40 14 T 80 4 L 100 12" strokeLinecap="round" />
              </svg>
            </div>

            {/* Temp Gauge */}
            <div className="p-4 rounded-lg bg-[#141b2b] border border-[#2c3e50]/70 flex flex-col">
              <span className="text-[11px] font-semibold text-[#859398] uppercase tracking-wider mb-1">
                PMSM Core Temp
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-headline text-3xl font-extrabold text-[#ffb700]">
                  {activeNode.temperature.toFixed(1)}
                </span>
                <span className="text-xs font-mono text-[#859398]">°C (Nominal)</span>
              </div>
              <svg className="w-full h-8 mt-3 text-[#ffb700]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 24">
                <path d="M0 12 Q 25 10, 50 14 T 75 11 L 100 13" strokeLinecap="round" />
              </svg>
            </div>

            {/* Vibration Gauge */}
            <div className="p-4 rounded-lg bg-[#141b2b] border border-[#2c3e50]/70 flex flex-col">
              <span className="text-[11px] font-semibold text-[#859398] uppercase tracking-wider mb-1">
                Vibration Damping
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-headline text-3xl font-extrabold text-[#00d9ff]">
                  {activeNode.vibration.toFixed(2)}
                </span>
                <span className="text-xs font-mono text-[#859398]">m/s²</span>
              </div>
              <svg className="w-full h-8 mt-3 text-[#00d9ff]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 24">
                <path d="M0 15 Q 30 14, 60 16 T 90 15 L 100 15" strokeLinecap="round" />
              </svg>
            </div>

            {/* Energy Recycled Gauge */}
            <div className="p-4 rounded-lg bg-[#141b2b] border border-[#2c3e50]/70 flex flex-col">
              <span className="text-[11px] font-semibold text-[#859398] uppercase tracking-wider mb-1">
                Eco Kinetic Recycled
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-headline text-3xl font-extrabold text-[#ffb700]">
                  {activeNode.energyRecycled.toFixed(1)}
                </span>
                <span className="text-xs font-mono text-[#859398]">kWh Today</span>
              </div>
              <svg className="w-full h-8 mt-3 text-[#ffb700]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 100 24">
                <path d="M0 20 Q 35 15, 65 8 T 100 3" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
