import React from 'react';
import { Gauge, Zap, Shield, Flame } from 'lucide-react';

export const SpecsSection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: '480–520 GSM Loopback Cotton',
      weight: 'Thermal Armor',
      desc: 'Sourced from long-staple ring-spun combed yarn. The heavyweight loopback weave traps heat in chilly pit lanes while remaining breathable under pressure.',
      icon: Gauge,
    },
    {
      num: '02',
      title: 'Wind-Tunnel Aerodynamic Cut',
      weight: 'Sculptured Silhouette',
      desc: 'Ergonomic forward-pitch drop-shoulder seams and dual-layer stiffened hood contour engineered to stay structured without collapsing around the helmet line.',
      icon: Zap,
    },
    {
      num: '03',
      title: 'High-RPM Flexible Screenprint',
      weight: 'Track-Tested Inks',
      desc: 'Formulated with elastomeric binders that stretch and flex without cracking, preserving intricate chassis blueprints and sponsor typography across 100+ wash cycles.',
      icon: Flame,
    },
    {
      num: '04',
      title: 'Pit-Lane Bar-Tack Stitching',
      weight: 'Heavy Industrial Tension',
      desc: 'Every stress point—from the kangaroo pouch corners to the sleeve cuff junctions—is fortified with industrial bar-tack anchors for unrelenting durability.',
      icon: Shield,
    },
  ];

  return (
    <section id="specs" className="py-16 border-t border-white/10 bg-[#090c12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <span>MOTORSPORT ENGINEERING // 4 BENCHMARKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black italic font-heading text-white uppercase tracking-tight">
              Paddock Craftsmanship Specs
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md">
            Built for trackside mechanics, canyon drivers, and relentless automotive enthusiasts.
            Every seam is tested to withstand real-world abuse.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="p-6 rounded-xl border border-white/10 bg-[#121622] flex flex-col justify-between space-y-4 hover:border-red-500/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-red-500">{pillar.num}</span>
                    <Icon className="w-4 h-4 text-gray-400" />
                  </div>
                  <h3 className="text-base font-bold text-white font-heading mb-1">
                    {pillar.title}
                  </h3>
                  <div className="text-xs font-mono font-bold text-cyan-400 mb-3">
                    {pillar.weight}
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
