import React from 'react';

export const HeritageTimeline: React.FC = () => {
  return (
    <section id="milestones" className="relative w-full py-20 bg-[#070e1d]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-[#00d9ff] font-bold mb-2 block">
            Engineering Heritage
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-[#dce2f7] uppercase tracking-tight mb-3">
            A Decade of Elevating NCR's Skyline
          </h2>
          <p className="text-sm text-[#bbc9ce] leading-relaxed">
            From high-precision Manesar robotic manufacturing to servicing the most intricate mixed-use skyscrapers in Northern India.
          </p>
        </div>

        {/* Vertical Continuous Timeline */}
        <div className="relative max-w-4xl mx-auto py-4">
          {/* Central Luminous Pipeline Guide */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#00d9ff] via-[#ffb700] to-[#00d9ff] opacity-40" />

          {/* 2014 */}
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 group">
            <div className="w-full md:w-5/12 pl-12 md:pl-0 md:text-right md:pr-8 mb-2 md:mb-0">
              <span className="font-headline text-3xl font-extrabold text-[#00d9ff] block">2014</span>
              <h3 className="font-headline text-base font-bold text-white uppercase mb-1">
                Manesar Robotics Plant
              </h3>
              <p className="text-xs text-[#bbc9ce] leading-relaxed">
                Inauguration of the 120,000 sq ft smart fabrication facility equipped with robotic laser chassis cutters and PMSM calibration test towers.
              </p>
            </div>
            {/* Center Node Indicator */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#191f2f] border border-[#00d9ff]/50 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform z-10">
              <span className="w-3 h-3 rounded-full bg-[#00d9ff]" />
            </div>
            <div className="w-full md:w-5/12 pl-12 md:pl-8">
              <div className="p-2.5 rounded bg-[#141b2b] border border-[#2c3e50] inline-block">
                <span className="text-[11px] font-bold text-[#00d9ff] uppercase tracking-wider">
                  120k Sq Ft Production Hub
                </span>
              </div>
            </div>
          </div>

          {/* 2017 */}
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 group">
            <div className="w-full md:w-5/12 pl-12 md:pl-0 md:text-right md:pr-8 order-1 md:order-1 mb-2 md:mb-0">
              <div className="p-2.5 rounded bg-[#141b2b] border border-[#2c3e50] inline-block">
                <span className="text-[11px] font-bold text-[#ffb700] uppercase tracking-wider">
                  50-Story Speed Record
                </span>
              </div>
            </div>
            {/* Center Node Indicator */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#191f2f] border border-[#ffb700]/50 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform z-10">
              <span className="w-3 h-3 rounded-full bg-[#ffb700]" />
            </div>
            <div className="w-full md:w-5/12 pl-12 md:pl-8 order-2 md:order-2">
              <span className="font-headline text-3xl font-extrabold text-[#ffb700] block">2017</span>
              <h3 className="font-headline text-base font-bold text-white uppercase mb-1">
                Cyber City Landmark
              </h3>
              <p className="text-xs text-[#bbc9ce] leading-relaxed">
                Commissioning of NCR’s first high-speed twin-cabin traction elevator in Gurugram, cutting vertical transit cycle times by 44%.
              </p>
            </div>
          </div>

          {/* 2020 */}
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 group">
            <div className="w-full md:w-5/12 pl-12 md:pl-0 md:text-right md:pr-8 mb-2 md:mb-0">
              <span className="font-headline text-3xl font-extrabold text-[#00d9ff] block">2020</span>
              <h3 className="font-headline text-base font-bold text-white uppercase mb-1">
                Aether-IoT Destination Dispatch
              </h3>
              <p className="text-xs text-[#bbc9ce] leading-relaxed">
                Proprietary patent granted for cloud-connected touchless call terminals and predictive wear monitoring algorithm across commercial corridors.
              </p>
            </div>
            {/* Center Node Indicator */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#191f2f] border border-[#00d9ff]/50 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform z-10">
              <span className="w-3 h-3 rounded-full bg-[#00d9ff]" />
            </div>
            <div className="w-full md:w-5/12 pl-12 md:pl-8">
              <div className="p-2.5 rounded bg-[#141b2b] border border-[#2c3e50] inline-block">
                <span className="text-[11px] font-bold text-[#00d9ff] uppercase tracking-wider">
                  Patent: Aether-Dispatch 2.0
                </span>
              </div>
            </div>
          </div>

          {/* 2022 */}
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between mb-16 group">
            <div className="w-full md:w-5/12 pl-12 md:pl-0 md:text-right md:pr-8 order-1 md:order-1 mb-2 md:mb-0">
              <div className="p-2.5 rounded bg-[#141b2b] border border-[#2c3e50] inline-block">
                <span className="text-[11px] font-bold text-[#ffb700] uppercase tracking-wider">
                  IGBC Green Innovation Award
                </span>
              </div>
            </div>
            {/* Center Node Indicator */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#191f2f] border border-[#ffb700]/50 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform z-10">
              <span className="w-3 h-3 rounded-full bg-[#ffb700]" />
            </div>
            <div className="w-full md:w-5/12 pl-12 md:pl-8 order-2 md:order-2">
              <span className="font-headline text-3xl font-extrabold text-[#ffb700] block">2022</span>
              <h3 className="font-headline text-base font-bold text-white uppercase mb-1">
                Zero Net-Loss Traction
              </h3>
              <p className="text-xs text-[#bbc9ce] leading-relaxed">
                Elevare awarded the National Green Architecture Trophy for regenerative drive systems feeding kinetic energy back to solar building arrays.
              </p>
            </div>
          </div>

          {/* 2024 */}
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between group">
            <div className="w-full md:w-5/12 pl-12 md:pl-0 md:text-right md:pr-8 mb-2 md:mb-0">
              <span className="font-headline text-3xl font-extrabold text-[#00d9ff] block">2024</span>
              <h3 className="font-headline text-base font-bold text-white uppercase mb-1">
                850+ NCR Installations
              </h3>
              <p className="text-xs text-[#bbc9ce] leading-relaxed">
                Reached 850 live active cabins operating across Delhi, Noida, and Gurugram with a validated safety record of zero critical failures.
              </p>
            </div>
            {/* Center Node Indicator */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#191f2f] border border-[#00d9ff] flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform z-10">
              <span className="w-3 h-3 rounded-full bg-[#00d9ff] animate-ping" />
            </div>
            <div className="w-full md:w-5/12 pl-12 md:pl-8">
              <div className="p-2.5 rounded bg-[#141b2b] border border-[#2c3e50] inline-block">
                <span className="text-[11px] font-bold text-[#00d9ff] uppercase tracking-wider">
                  100% Redundant Safety Record
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
