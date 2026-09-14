import React from 'react';
import { ElevareLogo } from './ElevareLogo';
import { MapPin, Phone, Mail, ShieldCheck, Award } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="w-full bg-[#070e1d] border-t border-[#2c3e50] text-[#bbc9ce] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <ElevareLogo size="md" />
            <p className="text-xs text-[#859398] leading-relaxed max-w-sm">
              Pioneering high-velocity vertical mobility, German surgical kinematics, and AI-governed
              destination dispatch across prestigious NCR high-rises and mission-critical infrastructure.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 rounded bg-[#141b2b] border border-[#2c3e50] text-[10px] font-bold text-[#00d9ff] uppercase">
                BIS IS 14665
              </span>
              <span className="px-2.5 py-1 rounded bg-[#141b2b] border border-[#2c3e50] text-[10px] font-bold text-[#ffb700] uppercase">
                EN 81-20/50 TIER 1
              </span>
              <span className="px-2.5 py-1 rounded bg-[#141b2b] border border-[#2c3e50] text-[10px] font-bold text-[#dce2f7] uppercase">
                SEISMIC ZONE IV & V
              </span>
            </div>
          </div>

          {/* Hubs Col */}
          <div>
            <h4 className="font-headline text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#00d9ff]" />
              <span>NCR Engineering Hubs</span>
            </h4>
            <ul className="text-xs space-y-2.5 text-[#859398]">
              <li>
                <span className="font-bold text-white block">Gurugram Cyber City:</span>
                Tower C, Sector 29, Gurugram 122002
              </li>
              <li>
                <span className="font-bold text-white block">Noida Tech Hub:</span>
                Sector 62, Noida, UP 201309
              </li>
              <li>
                <span className="font-bold text-white block">Manesar Robotics Plant:</span>
                Sector 8, IMT Manesar, Haryana
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-headline text-xs font-bold text-white uppercase tracking-wider mb-3">
              Vertical Architectures
            </h4>
            <ul className="text-xs space-y-2 text-[#859398]">
              <li>
                <a href="#elevators-and-systems" className="hover:text-[#00d9ff] transition-colors">
                  Veloce-X Ultra Traction
                </a>
              </li>
              <li>
                <a href="#elevators-and-systems" className="hover:text-[#00d9ff] transition-colors">
                  Titan-Pro Heavy Cargo
                </a>
              </li>
              <li>
                <a href="#elevators-and-systems" className="hover:text-[#00d9ff] transition-colors">
                  Aether-Smart Dispatch
                </a>
              </li>
              <li>
                <a href="#elevators-and-systems" className="hover:text-[#00d9ff] transition-colors">
                  Aura-Prestige Penthouse
                </a>
              </li>
              <li>
                <a href="#consultation-calc" className="hover:text-[#ffb700] transition-colors">
                  CAD & BIM Revit Downloads
                </a>
              </li>
            </ul>
          </div>

          {/* 24/7 Hotline Col */}
          <div>
            <h4 className="font-headline text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#ffb700]" />
              <span>24/7 Rapid Dispatch</span>
            </h4>
            <p className="text-xs text-[#859398] mb-3 leading-relaxed">
              Dedicated field engineering command guaranteeing sub-18 minute arrival for emergency support across Delhi-NCR.
            </p>
            <div className="p-3 rounded-lg bg-[#141b2b] border border-[#2c3e50] space-y-1">
              <span className="text-[10px] text-[#859398] uppercase block">Toll-Free Emergency</span>
              <span className="text-sm font-bold text-[#ffb700] block">+91 1800-ELEVATE</span>
              <span className="text-[10px] text-[#00d9ff] block">dispatch@elevaretransit.in</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 border-t border-[#2c3e50] flex flex-col sm:flex-row items-center justify-between text-xs text-[#859398] gap-4">
          <p>© 2026 ELEVARE Vertical Mobility Technologies Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:text-white cursor-pointer">Security Standards</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span
              onClick={onOpenAdmin}
              className="hover:text-white cursor-pointer transition-colors"
              title="Audit Logs"
            >
              EN 81-20 Audit Logs
            </span>
            <span>•</span>
            <span
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-[#00d9ff] cursor-pointer hover:underline"
              title="System Status"
            >
              <span className="w-2 h-2 rounded-full bg-[#00d9ff] animate-ping" />
              <span>All 850 Hoistways Nominal</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
