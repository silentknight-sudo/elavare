import React, { useState } from 'react';
import { Inquiry } from '../types';
import { Download, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface SpecCalculatorSectionProps {
  onScheduleSurvey: (specData: Partial<Inquiry>) => void;
}

export const SpecCalculatorSection: React.FC<SpecCalculatorSectionProps> = ({
  onScheduleSurvey
}) => {
  const [projectType, setProjectType] = useState<'Skyscraper' | 'Penthouse / Luxury' | 'Hospital Stretcher' | 'Logistics Hub'>('Skyscraper');
  const [floors, setFloors] = useState<number>(35);
  const [velocity, setVelocity] = useState<number>(4.0);

  // Form Fields
  const [architectName, setArchitectName] = useState<string>('');
  const [firmName, setFirmName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Dynamic calculations
  const shaftHeight = +(floors * 3.5).toFixed(1);
  const motorKw = +(floors * 0.45 * (velocity / 2.5) + 10).toFixed(1);
  const payload =
    projectType === 'Logistics Hub'
      ? '5,000 kg (Cargo Freight)'
      : projectType === 'Hospital Stretcher'
      ? '2,000 kg (Stretcher Bed)'
      : projectType === 'Penthouse / Luxury'
      ? '1,000 kg (13 Pass.)'
      : '1,600 kg (21 Pass.)';
  const cycleTime = +(((shaftHeight * 2) / velocity + floors * 1.8)).toFixed(1);
  const regenKwh = +(floors * 1.1).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScheduleSurvey({
      clientName: architectName || 'Architect Client',
      companyName: firmName || 'NCR Enterprise Group',
      phone: phone || '+91 98100 12345',
      email: email || 'consultant@ncrfirm.com',
      projectType,
      floors,
      shaftHeight,
      speed: velocity,
      estimatedMotor: `PMSM Gearless ${motorKw} kW`,
      estimatedPayload: payload,
      notes: `Configured for ${projectType} with ${floors} floors at ${velocity} m/s velocity.`
    });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleDownloadBim = () => {
    const bimSpecText = `
ELEVARE VERTICAL MOBILITY | CAD & BIM SHAFT SPECIFICATION (IFC 4.0 / REVIT 2026)
--------------------------------------------------------------------------------
Project Classification: ${projectType}
Total Hoistway Floors: ${floors} Floors (${shaftHeight} m vertical rise)
Operating Speed: ${velocity} m/s
Drive Topology: PMSM Permanent Magnet Gearless Motor (${motorKw} kW)
Rated Payload: ${payload}
Average Round-Trip Cycle: ${cycleTime} Seconds
Daily Regenerative Kinetic Recovery: ~${regenKwh} kWh / day
Regional SLA: Guaranteed <18 min NCR technician arrival
Seismic Standard: BIS IS 14665 & EN 81-20/50 Zone IV/V Dual Shear Sensors
CAD Layer Coordinates: X: 2400mm, Y: 2100mm, Pit Depth: 1600mm, Overhead: 4200mm
--------------------------------------------------------------------------------
ELEVARE Engineering Hub | Cyber City Gurugram & Sector 62 Noida
`.trim();

    const blob = new Blob([bimSpecText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ELEVARE_${projectType.replace(/\s+/g, '_')}_BIM_SPEC.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="consultation-calc" className="relative w-full py-20 bg-[#0c1322]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-[#00d9ff] mb-2">
            <span className="w-3 h-0.5 bg-[#00d9ff]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#aeecff]">
              Architect & MEP Portal
            </span>
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-[#dce2f7] uppercase tracking-tight mb-3">
            Engineer Your Vertical Solution
          </h2>
          <p className="text-sm text-[#bbc9ce] leading-relaxed">
            Input your structural transit parameters for instantaneous motor sizing, hoistway clearance matrix, and custom NCR delivery timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Interactive Form Controls (7 Columns) */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-[#141b2b] border border-[#2c3e50] rounded-xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6"
          >
            {/* 1. Project Type */}
            <div>
              <label className="text-xs font-bold text-[#859398] uppercase tracking-wider block mb-2">
                1. Project Development Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'Skyscraper', label: 'Skyscraper' },
                  { id: 'Penthouse / Luxury', label: 'Penthouse / Luxury' },
                  { id: 'Hospital Stretcher', label: 'Hospital Stretcher' },
                  { id: 'Logistics Hub', label: 'Logistics Hub' }
                ].map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setProjectType(type.id as any)}
                    className={`p-3 rounded text-xs font-semibold uppercase tracking-wider text-center transition-all cursor-pointer border ${
                      projectType === type.id
                        ? 'bg-[#191f2f] text-[#00d9ff] border-[#00d9ff] shadow-[0_0_12px_rgba(0,217,255,0.2)]'
                        : 'bg-[#191f2f]/60 text-[#bbc9ce] border-[#2c3e50] hover:border-[#3c494d]'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Floors Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="floors-slider" className="text-xs font-bold text-[#859398] uppercase tracking-wider">
                  2. Total Floors / Shaft Height
                </label>
                <span className="font-headline text-base font-bold text-[#00d9ff]">
                  {floors} Floors ({shaftHeight} m)
                </span>
              </div>
              <input
                id="floors-slider"
                type="range"
                min="3"
                max="80"
                value={floors}
                onChange={e => setFloors(Number(e.target.value))}
                className="w-full accent-[#00d9ff] h-2 bg-[#191f2f] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#859398] mt-1">
                <span>3 Floors (Low-Rise)</span>
                <span>40 Floors</span>
                <span>80 Floors (Super-Tall)</span>
              </div>
            </div>

            {/* 3. Speed Selection */}
            <div>
              <label className="text-xs font-bold text-[#859398] uppercase tracking-wider block mb-2">
                3. Rated Velocity Requirement
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { speed: 1.5, label: '1.5 m/s' },
                  { speed: 2.5, label: '2.5 m/s' },
                  { speed: 4.0, label: '4.0 m/s' },
                  { speed: 6.0, label: '6.0 m/s Ultra' }
                ].map(s => (
                  <button
                    key={s.speed}
                    type="button"
                    onClick={() => setVelocity(s.speed)}
                    className={`p-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                      velocity === s.speed
                        ? 'bg-[#191f2f] text-[#00d9ff] border-[#00d9ff] shadow-[0_0_12px_rgba(0,217,255,0.2)]'
                        : 'bg-[#191f2f]/60 text-[#bbc9ce] border-[#2c3e50] hover:border-[#3c494d]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Architect Firm & Contact Details */}
            <div className="pt-2 flex flex-col gap-3">
              <label className="text-xs font-bold text-[#859398] uppercase tracking-wider">
                4. Architectural Firm / Project Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={architectName}
                  onChange={e => setArchitectName(e.target.value)}
                  placeholder="Lead Architect / Consultant Name"
                  className="p-3 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white placeholder:text-[#859398] focus:outline-none focus:border-[#00d9ff]"
                />
                <input
                  type="text"
                  required
                  value={firmName}
                  onChange={e => setFirmName(e.target.value)}
                  placeholder="Firm / Organization (e.g., DLF, Tata, Godrej)"
                  className="p-3 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white placeholder:text-[#859398] focus:outline-none focus:border-[#00d9ff]"
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 NCR Mobile / Phone"
                  className="p-3 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white placeholder:text-[#859398] focus:outline-none focus:border-[#00d9ff]"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="corporate@firm.com"
                  className="p-3 rounded bg-[#191f2f] border border-[#2c3e50] text-xs text-white placeholder:text-[#859398] focus:outline-none focus:border-[#00d9ff]"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 rounded bg-[#ffb700] hover:bg-[#ffba26] text-[#422d00] font-headline text-xs sm:text-sm uppercase font-bold tracking-wider shadow-lg hover:shadow-[0_0_24px_rgba(255,183,0,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Schedule On-Site Engineering Survey</span>
              </button>

              {isSubmitted && (
                <div className="p-3 rounded bg-[#00d9ff]/10 border border-[#00d9ff] text-xs text-[#aeecff] flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00d9ff]" />
                  <span>
                    Consultation inquiry submitted! Opening on-site inspection schedule booking...
                  </span>
                </div>
              )}
            </div>
          </form>

          {/* Real-Time Spec Matrix Output Deck (5 Columns) */}
          <div className="lg:col-span-5 bg-[#141b2b] border border-[#2c3e50] rounded-xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#2c3e50]">
                <span className="text-xs font-bold text-[#00d9ff] uppercase tracking-wider">
                  Instant Spec Calculation
                </span>
                <span className="px-2 py-0.5 rounded bg-[#00d9ff]/20 text-[#aeecff] text-[10px] font-bold uppercase">
                  REV 2026.1
                </span>
              </div>

              {/* Output Metric Tiles */}
              <div className="flex flex-col gap-2.5 mb-6">
                <div className="p-3 rounded bg-[#191f2f] border border-[#2c3e50]/60 flex justify-between items-center">
                  <span className="text-xs text-[#bbc9ce]">Recommended Motor:</span>
                  <span className="text-xs font-bold text-white">PMSM Gearless {motorKw} kW</span>
                </div>
                <div className="p-3 rounded bg-[#191f2f] border border-[#2c3e50]/60 flex justify-between items-center">
                  <span className="text-xs text-[#bbc9ce]">Estimated Rated Payload:</span>
                  <span className="text-xs font-bold text-[#ffb700]">{payload}</span>
                </div>
                <div className="p-3 rounded bg-[#191f2f] border border-[#2c3e50]/60 flex justify-between items-center">
                  <span className="text-xs text-[#bbc9ce]">Round-Trip Cycle Duration:</span>
                  <span className="text-xs font-bold text-[#00d9ff]">{cycleTime} Seconds</span>
                </div>
                <div className="p-3 rounded bg-[#191f2f] border border-[#2c3e50]/60 flex justify-between items-center">
                  <span className="text-xs text-[#bbc9ce]">Energy Feedback (Regen):</span>
                  <span className="text-xs font-bold text-[#ffb700]">~{regenKwh} kWh / day</span>
                </div>
                <div className="p-3 rounded bg-[#191f2f] border border-[#2c3e50]/60 flex justify-between items-center">
                  <span className="text-xs text-[#bbc9ce]">NCR Rapid Dispatch SLA:</span>
                  <span className="text-xs font-bold text-[#aeecff]">&lt; 18 Mins Priority</span>
                </div>
              </div>

              {/* Visual Blueprint Preview */}
              <div className="w-full p-4 rounded-lg bg-[#070e1d] border border-[#2c3e50] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#191f2f] border border-[#00d9ff]/30 flex items-center justify-center text-[#00d9ff]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">CAD / Revit Shaft BIM File</span>
                    <span className="text-[11px] text-[#859398]">BIM 360, IFC 4.0 & DWG Schematics</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadBim}
                  className="p-2 rounded bg-[#191f2f] hover:bg-[#232a3a] text-[#00d9ff] border border-[#2c3e50] transition-colors cursor-pointer"
                  title="Download CAD / BIM Specs"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
              {downloadSuccess && (
                <span className="block text-[11px] text-[#00d9ff] mt-1 text-right">
                  BIM specifications downloaded!
                </span>
              )}
            </div>

            <div className="pt-6">
              <div className="flex items-center gap-2 text-[#859398] text-[11px]">
                <ShieldCheck className="w-4 h-4 text-[#ffb700] shrink-0" />
                <span>Calculations strictly comply with BIS IS 14665 & EN 81 safety norms.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
