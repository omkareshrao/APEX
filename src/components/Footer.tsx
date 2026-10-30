import React from 'react';
import { RacingCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: RacingCategory) => void;
  onViewSaved: () => void;
  savedCount: number;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onViewSaved,
  savedCount,
}) => {
  return (
    <footer className="border-t border-white/10 bg-[#07090f] py-12 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Manifesto */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-600 text-white flex items-center justify-center font-bold text-xs">
                ▲
              </div>
              <div className="text-xl font-black italic font-display text-white uppercase tracking-tighter">
                APEX // RACING LAB
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Armor for racers, tuners & apex pursuers. Built with 480–520 GSM loopback cotton,
              wind-tunnel hood contours, and high-tensile flexible inks celebrating Formula 1,
              JDM legends, and track-day supercars.
            </p>
            <div className="text-[11px] font-mono text-red-500 font-bold uppercase tracking-wider">
              Circuit-Bred Motorsport Division · All Rights Reserved
            </div>
          </div>

          {/* Directory */}
          <div className="md:col-span-3 space-y-2">
            <div className="font-bold text-white uppercase text-xs font-mono tracking-wider">
              Race Grid Classes
            </div>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li>
                <button
                  onClick={() => onSelectCategory('Formula 1 & Grand Prix')}
                  className="hover:text-red-400 transition-colors"
                >
                  Formula 1 & Grand Prix
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Supercars & Hypercars')}
                  className="hover:text-red-400 transition-colors"
                >
                  Supercars & Hypercars
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('JDM & Tuner Legends')}
                  className="hover:text-red-400 transition-colors"
                >
                  JDM & Tuner Legends
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Track & Muscle')}
                  className="hover:text-red-400 transition-colors"
                >
                  Track & Muscle
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Limited Edition')}
                  className="text-amber-400 hover:text-amber-300 transition-colors font-bold"
                >
                  Limited Run Colorways
                </button>
              </li>
              <li>
                <button onClick={onViewSaved} className="hover:text-white transition-colors">
                  Saved Racing Vault ({savedCount})
                </button>
              </li>
            </ul>
          </div>

          {/* Logistics & Hub */}
          <div className="md:col-span-4 space-y-2">
            <div className="font-bold text-white uppercase text-xs font-mono tracking-wider">
              Paddock Logistics
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Express trackside dispatch worldwide. Free delivery on orders over $60 / 1,000 BDT.
              Every garment is pre-shrunk and color-locked for thermal racing longevity.
            </p>
            <div className="pt-2 text-[11px] text-gray-400 space-y-1 font-mono">
              <div>
                <strong>Paddock Hub:</strong> 25-Rowshan Manzil, Chameli Bagh, Shantinagar, Dhaka
              </div>
              <div>
                <strong>Support:</strong> easyonline330@gmail.com
              </div>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 font-mono">
          <div>© {new Date().getFullYear()} APEX RACING DIVISION. ONE THINK · ONE GOAL.</div>
          <div className="flex items-center gap-4 text-gray-400">
            <span>Pre-Shrunk Loopback Fleece</span>
            <span>·</span>
            <span>High-RPM Elastic Inks</span>
            <span>·</span>
            <span>30-Day Track Exchange</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
