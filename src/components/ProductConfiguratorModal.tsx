import React, { useState } from 'react';
import { ElevatorProduct } from '../types';
import { X, Check, Download, Zap, Shield, Sparkles, Building2, Layers } from 'lucide-react';

interface ProductConfiguratorModalProps {
  product: ElevatorProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onBookSurvey: (configuredProduct: {
    product: ElevatorProduct;
    finish: string;
    lighting: string;
    floors: number;
    hasAiDispatch: boolean;
    totalEstimatedPrice: number;
  }) => void;
}

export const ProductConfiguratorModal: React.FC<ProductConfiguratorModalProps> = ({
  product,
  isOpen,
  onClose,
  onBookSurvey
}) => {
  if (!isOpen || !product) return null;

  const [selectedFinish, setSelectedFinish] = useState<string>(product.availableFinishes[0] || 'Standard');
  const [selectedLighting, setSelectedLighting] = useState<'cyan' | 'gold' | 'daylight'>('cyan');
  const [floorCount, setFloorCount] = useState<number>(30);
  const [doorType, setDoorType] = useState<'telescopic' | 'center_opening' | 'glass_panoramic'>('center_opening');
  const [hasAiDispatch, setHasAiDispatch] = useState<boolean>(true);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Price calculation
  const basePrice = product.basePriceInr;
  const finishPrice = selectedFinish.includes('Gold') || selectedFinish.includes('Statuario') ? 450000 : selectedFinish.includes('Cyber') ? 320000 : 150000;
  const floorAddition = Math.max(0, floorCount - 10) * 85000;
  const aiPrice = hasAiDispatch ? 350000 : 0;
  const totalPrice = basePrice + finishPrice + floorAddition + aiPrice;

  const formatInr = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleDownloadBIM = () => {
    const specContent = `
================================================================================
ELEVARE VERTICAL MOBILITY TECHNOLOGIES LTD.
ARCHITECTURAL & STRUCTURAL SPECIFICATION MATRIX (REV 2026.1)
================================================================================
System Model: ${product.name}
Category: ${product.category.toUpperCase()}
Drive System: ${product.driveType}
Rated Velocity: ${product.speed}
Rated Capacity: ${product.capacity}
Acoustic Vibration Level: ${product.decibel}

PROJECT PARAMETERS:
- Configured Floors / Landings: ${floorCount}
- Hoistway Travel Height: ${(floorCount * 3.5).toFixed(1)} Meters
- Cabin Finish Selected: ${selectedFinish}
- Hoistway Door Interface: ${doorType.replace('_', ' ').toUpperCase()}
- Ambience Lighting: ${selectedLighting.toUpperCase()} GLOW
- IoT Neural Destination Dispatch: ${hasAiDispatch ? 'ENABLED (Aether-Dispatch 2.0)' : 'DISABLED'}
- Safety Regimes: EN 81-20/50 Tier 1 + BIS IS 14665 Compliance
- Seismic Resistance: Zone IV & V Certified Shear-Wave Tripping

INDICATIVE COMMERCIAL ESTIMATE:
- Base Machine & Guide Chassis: ${formatInr(basePrice)}
- Architectural Finish Pack: ${formatInr(finishPrice)}
- Multi-Floor Hoistway Modular Extensions: ${formatInr(floorAddition)}
- Neural Cloud Terminal Package: ${formatInr(aiPrice)}
--------------------------------------------------------------------------------
ESTIMATED SYSTEM TOTAL: ${formatInr(totalPrice)} (Ex-Works NCR Hub)
================================================================================
Generated for MEP & Structural Architects | Elevare Technical Portal
Gurugram Hub: Cyber City Sector 29 | Noida Hub: Sector 62 Tech Corridor
Emergency Hotline: +91 (NCR) ELEVATE
================================================================================
`.trim();

    const blob = new Blob([specContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ELEVARE_${product.id.toUpperCase()}_SPEC_BIM.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleConfirmBooking = () => {
    onBookSurvey({
      product,
      finish: selectedFinish,
      lighting: selectedLighting,
      floors: floorCount,
      hasAiDispatch,
      totalEstimatedPrice: totalPrice
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-8 rounded-xl bg-[#0c1322] border border-[#2c3e50] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2c3e50] bg-[#141b2b]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#191f2f] border border-[#00d9ff]/30 flex items-center justify-center text-[#00d9ff]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline text-lg font-bold text-white uppercase tracking-tight">
                  {product.name}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#00d9ff]/20 text-[#00d9ff]">
                  {product.badge}
                </span>
              </div>
              <p className="text-xs text-[#859398]">3D Modular Hoistway & Cabin Configurator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#859398] hover:text-white hover:bg-[#191f2f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body (2 Columns) */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-y-auto">
          {/* Left Column: Interactive 3D Visualizer Simulation (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div
              className={`relative w-full h-64 rounded-xl border overflow-hidden p-4 flex flex-col justify-between transition-all duration-500 ${
                selectedLighting === 'cyan'
                  ? 'border-[#00d9ff]/40 shadow-[inset_0_0_40px_rgba(0,217,255,0.15)] bg-gradient-to-b from-[#0e1c2e] to-[#070e1d]'
                  : selectedLighting === 'gold'
                  ? 'border-[#ffb700]/40 shadow-[inset_0_0_40px_rgba(255,183,0,0.18)] bg-gradient-to-b from-[#211a0c] to-[#070e1d]'
                  : 'border-[#abcae8]/40 shadow-[inset_0_0_40px_rgba(200,220,255,0.12)] bg-gradient-to-b from-[#141b2b] to-[#070e1d]'
              }`}
            >
              {/* Top Status */}
              <div className="flex justify-between items-center z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[#dce2f7]">
                  Cabin Simulation
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#00d9ff]">
                  {product.speed}
                </span>
              </div>

              {/* Simulated 3D Cabin Interior Visual */}
              <div className="relative my-auto flex flex-col items-center justify-center">
                <div
                  className={`w-40 h-36 rounded-lg border flex flex-col items-center justify-between p-2.5 transition-all duration-300 shadow-2xl ${
                    selectedLighting === 'cyan'
                      ? 'border-[#00d9ff] bg-[#142338]/90'
                      : selectedLighting === 'gold'
                      ? 'border-[#ffb700] bg-[#2a2211]/90'
                      : 'border-[#dce2f7] bg-[#191f2f]/90'
                  }`}
                >
                  {/* Ceiling Fixture */}
                  <div
                    className={`w-28 h-2 rounded-full transition-colors ${
                      selectedLighting === 'cyan'
                        ? 'bg-[#00d9ff] shadow-[0_0_12px_#00d9ff]'
                        : selectedLighting === 'gold'
                        ? 'bg-[#ffb700] shadow-[0_0_12px_#ffb700]'
                        : 'bg-white shadow-[0_0_10px_white]'
                    }`}
                  />

                  {/* Rear Wall Custom Finish preview */}
                  <div className="text-center px-2 py-1">
                    <span className="text-[10px] font-bold uppercase text-[#859398] block">Selected Finish</span>
                    <span className="text-xs font-bold text-white block">{selectedFinish}</span>
                  </div>

                  {/* Touch Operating Panel */}
                  <div className="w-full flex justify-between items-end px-2">
                    <div className="w-2.5 h-10 rounded bg-[#2c3e50] border border-[#00d9ff]/50 flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-[#00d9ff] animate-ping" />
                    </div>
                    <span className="text-[9px] font-mono text-[#859398]">{floorCount} Floors</span>
                  </div>
                </div>
              </div>

              {/* Bottom spec pill */}
              <div className="z-10 flex justify-between items-center text-[10px] text-[#bbc9ce] bg-black/60 p-2 rounded backdrop-blur-md">
                <span>Decibel: {product.decibel}</span>
                <span>Payload: {product.capacity}</span>
              </div>
            </div>

            {/* Lighting Ambience Selector */}
            <div>
              <label className="text-xs font-bold text-[#859398] uppercase tracking-wider block mb-2">
                Cabin Ambience Lighting
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedLighting('cyan')}
                  className={`p-2 rounded border text-xs font-semibold uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedLighting === 'cyan'
                      ? 'border-[#00d9ff] bg-[#00d9ff]/15 text-[#00d9ff]'
                      : 'border-[#2c3e50] bg-[#141b2b] text-[#bbc9ce] hover:border-[#3c494d]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00d9ff]" />
                  <span>Electric Cyan</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedLighting('gold')}
                  className={`p-2 rounded border text-xs font-semibold uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedLighting === 'gold'
                      ? 'border-[#ffb700] bg-[#ffb700]/15 text-[#ffb700]'
                      : 'border-[#2c3e50] bg-[#141b2b] text-[#bbc9ce] hover:border-[#3c494d]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffb700]" />
                  <span>Warm Gold</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedLighting('daylight')}
                  className={`p-2 rounded border text-xs font-semibold uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedLighting === 'daylight'
                      ? 'border-white bg-white/10 text-white'
                      : 'border-[#2c3e50] bg-[#141b2b] text-[#bbc9ce] hover:border-[#3c494d]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white" />
                  <span>Daylight 4K</span>
                </button>
              </div>
            </div>

            {/* Download BIM spec */}
            <button
              onClick={handleDownloadBIM}
              className="w-full py-2.5 px-4 rounded border border-[#2c3e50] bg-[#141b2b] hover:bg-[#191f2f] text-xs font-semibold text-[#00d9ff] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{downloadSuccess ? 'Specification BIM Generated!' : 'Download BIM / CAD Specs (TXT)'}</span>
            </button>
          </div>

          {/* Right Column: Customization Form & Real-Time Price (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              {/* Architectural Finish */}
              <div>
                <label className="text-xs font-bold text-[#859398] uppercase tracking-wider block mb-2">
                  1. Architectural Interior Finish
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.availableFinishes.map(finish => (
                    <button
                      key={finish}
                      type="button"
                      onClick={() => setSelectedFinish(finish)}
                      className={`p-2.5 rounded border text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                        selectedFinish === finish
                          ? 'border-[#00d9ff] bg-[#00d9ff]/10 text-white shadow-sm'
                          : 'border-[#2c3e50] bg-[#141b2b] text-[#bbc9ce] hover:border-[#3c494d]'
                      }`}
                    >
                      <span>{finish}</span>
                      {selectedFinish === finish && <Check className="w-3.5 h-3.5 text-[#00d9ff]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floor Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-[#859398] uppercase tracking-wider">
                    2. Hoistway Floors / Shaft Height
                  </label>
                  <span className="text-xs font-bold text-[#00d9ff]">
                    {floorCount} Floors ({(floorCount * 3.5).toFixed(1)} m)
                  </span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="75"
                  value={floorCount}
                  onChange={e => setFloorCount(Number(e.target.value))}
                  className="w-full accent-[#00d9ff] h-2 bg-[#191f2f] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#859398] mt-1">
                  <span>4 Floors (Low-Rise)</span>
                  <span>35 Floors</span>
                  <span>75 Floors (Tower)</span>
                </div>
              </div>

              {/* Door Configuration */}
              <div>
                <label className="text-xs font-bold text-[#859398] uppercase tracking-wider block mb-2">
                  3. Hoistway Door Interface
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'center_opening', label: 'Center Opening' },
                    { id: 'telescopic', label: 'Telescopic Side' },
                    { id: 'glass_panoramic', label: 'Glass Panoramic' }
                  ].map(door => (
                    <button
                      key={door.id}
                      type="button"
                      onClick={() => setDoorType(door.id as any)}
                      className={`p-2 rounded border text-center text-xs font-semibold uppercase transition-all cursor-pointer ${
                        doorType === door.id
                          ? 'border-[#ffb700] bg-[#ffb700]/10 text-[#ffb700]'
                          : 'border-[#2c3e50] bg-[#141b2b] text-[#bbc9ce] hover:border-[#3c494d]'
                      }`}
                    >
                      {door.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Destination Dispatch Option */}
              <div className="p-3 rounded-lg border border-[#2c3e50] bg-[#141b2b] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-[#00d9ff]" />
                  <div>
                    <span className="text-xs font-bold text-white block">Aether-Smart Destination Dispatch</span>
                    <span className="text-[11px] text-[#859398]">Cloud touchless call terminals & 42% queue reduction</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setHasAiDispatch(!hasAiDispatch)}
                  className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                    hasAiDispatch ? 'bg-[#00d9ff]' : 'bg-[#2c3e50]'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${
                      hasAiDispatch ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Bottom Commercial Sizing & CTA */}
            <div className="pt-4 border-t border-[#2c3e50]">
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-xs font-bold text-[#859398] uppercase">Estimated Turnkey Package:</span>
                <div className="text-right">
                  <span className="font-headline text-2xl font-extrabold text-[#ffb700]">
                    {formatInr(totalPrice)}
                  </span>
                  <span className="block text-[10px] text-[#859398]">Includes motor, cabin, and NCR installation SLA</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-4 rounded border border-[#2c3e50] text-[#bbc9ce] hover:text-white hover:bg-[#141b2b] font-headline text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer"
                >
                  Modify Later
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="py-3 px-4 rounded bg-[#ffb700] hover:bg-[#ffba26] text-[#422d00] font-headline text-xs uppercase font-bold tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(255,183,0,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Book On-Site Survey</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
