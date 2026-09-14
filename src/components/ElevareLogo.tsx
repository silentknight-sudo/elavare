import React from 'react';

interface ElevareLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const ElevareLogo: React.FC<ElevareLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl md:text-2xl',
    lg: 'text-3xl md:text-4xl'
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.18em]',
    md: 'text-[10px] tracking-[0.22em]',
    lg: 'text-xs tracking-[0.28em]'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Elevator Icon */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} shrink-0`}>
        {/* Left and right guide rails */}
        <div className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-[#2C3E50] rounded-full" />
        <div className="absolute right-0 top-0 bottom-0 w-[2.5px] bg-[#2C3E50] rounded-full" />
        
        {/* Central dashed vertical cable line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1.5px] border-l border-dashed border-[#00d9ff] opacity-80" />

        {/* Moving Cabin with Up Arrow */}
        <div className="relative z-10 w-[72%] h-[72%] rounded-[6px] bg-gradient-to-b from-[#192338] to-[#0c1322] border border-[#00d9ff]/50 shadow-[0_0_12px_rgba(0,217,255,0.35)] flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-[65%] h-[65%] text-[#ffb700] fill-current drop-shadow-[0_0_4px_rgba(255,183,0,0.8)]"
          >
            <path d="M12 4L4 12H9V20H15V12H20L12 4Z" />
          </svg>
        </div>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className={`font-headline font-extrabold uppercase leading-none tracking-tight flex items-baseline ${textSizes[size]}`}>
          <span className="text-white">ELEVA</span>
          <span className="text-[#00d9ff]">R</span>
          <span className="text-[#ffb700]">E</span>
        </div>
        {showSubtitle && (
          <span className={`text-[#859398] uppercase font-semibold mt-1 font-headline ${subtitleSizes[size]}`}>
            Elevate Every Journey
          </span>
        )}
      </div>
    </div>
  );
};
