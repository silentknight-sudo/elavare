import React, { useState } from 'react';
import { ElevareLogo } from './ElevareLogo';
import { Phone, Shield, Activity, Calendar, Menu, X } from 'lucide-react';

interface HeaderNavProps {
  onOpenAdmin?: () => void;
  onOpenBooking: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onOpenAdmin,
  onOpenBooking
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#0c1322]/85 backdrop-blur-xl border-b border-[#2c3e50]/70">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Identity */}
        <a href="#" className="flex items-center">
          <ElevareLogo size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="#elevators-and-systems"
            className="text-xs uppercase font-semibold tracking-wider text-[#bbc9ce] hover:text-[#00d9ff] transition-colors"
          >
            Systems
          </a>
          <a
            href="#engineering-and-safety"
            className="text-xs uppercase font-semibold tracking-wider text-[#bbc9ce] hover:text-[#00d9ff] transition-colors"
          >
            Safety Regimes
          </a>
          <a
            href="#milestones"
            className="text-xs uppercase font-semibold tracking-wider text-[#bbc9ce] hover:text-[#00d9ff] transition-colors"
          >
            Heritage
          </a>
          <a
            href="#consultation-calc"
            className="text-xs uppercase font-semibold tracking-wider text-[#bbc9ce] hover:text-[#00d9ff] transition-colors"
          >
            Spec Calculator
          </a>
        </nav>

        {/* Action Controls & Hotline */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Emergency Hotline */}
          <a
            href="tel:+9118003538283"
            className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141b2b] border border-[#2c3e50] text-[11px] font-bold text-[#ffb700] hover:border-[#ffb700]/50 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 animate-pulse text-[#ffb700]" />
            <span>NCR Rapid: +91 1800-ELEVATE</span>
          </a>

          {/* Book On-Site Survey */}
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 rounded-lg bg-[#ffb700] hover:bg-[#ffba26] text-[#422d00] font-headline text-xs uppercase font-bold tracking-wider shadow-md hover:shadow-[0_0_20px_rgba(255,183,0,0.4)] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Survey</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-[#bbc9ce] hover:text-white hover:bg-[#191f2f] transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#2c3e50] bg-[#0c1322] px-6 py-4 flex flex-col gap-3">
          <a
            href="#elevators-and-systems"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs uppercase font-semibold tracking-wider text-[#bbc9ce] hover:text-[#00d9ff] py-1"
          >
            Systems & Portfolio
          </a>
          <a
            href="#engineering-and-safety"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs uppercase font-semibold tracking-wider text-[#bbc9ce] hover:text-[#00d9ff] py-1"
          >
            Safety Regimes
          </a>
          <a
            href="#milestones"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs uppercase font-semibold tracking-wider text-[#bbc9ce] hover:text-[#00d9ff] py-1"
          >
            Heritage
          </a>
          <a
            href="#consultation-calc"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xs uppercase font-semibold tracking-wider text-[#bbc9ce] hover:text-[#00d9ff] py-1"
          >
            Spec Calculator
          </a>

          <div className="pt-3 border-t border-[#2c3e50] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 rounded bg-[#ffb700] text-[#422d00] font-headline text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book On-Site Engineering Survey</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
