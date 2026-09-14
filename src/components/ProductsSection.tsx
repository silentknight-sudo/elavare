import React, { useState } from 'react';
import { ElevatorProduct, ElevatorCategory } from '../types';
import { Star, Shield, Sparkles, Award, ArrowUpRight } from 'lucide-react';

interface ProductsSectionProps {
  products: ElevatorProduct[];
  onSelectProduct: (product: ElevatorProduct) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  products,
  onSelectProduct
}) => {
  const [activeFilter, setActiveFilter] = useState<ElevatorCategory>('all');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const filteredProducts = products.filter(product => {
    if (activeFilter === 'all') return true;
    return product.category === activeFilter;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 6;
    const rotateY = (x / (rect.width / 2)) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section id="elevators-and-systems" className="relative w-full py-20 bg-[#070e1d]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[#00d9ff] mb-2">
              <span className="w-3 h-0.5 bg-[#00d9ff]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#aeecff]">
                Engineered Portfolio
              </span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-[#dce2f7] uppercase tracking-tight">
              Vertical Systems Built to Transcend
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-[#141b2b] p-1.5 rounded-lg border border-[#2c3e50]/70">
            {[
              { id: 'all', label: 'All Specs' },
              { id: 'commercial', label: 'Commercial' },
              { id: 'residential', label: 'Luxury Living' },
              { id: 'industrial', label: 'Heavy Logistics' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as ElevatorCategory)}
                className={`px-4 py-1.5 rounded text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-[#00d9ff] text-[#001f26] font-bold shadow-md'
                    : 'text-[#bbc9ce] hover:text-[#dce2f7] hover:bg-[#191f2f]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Perspective Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const isHovered = hoveredCardId === product.id;

            return (
              <div
                key={product.id}
                onMouseMove={e => handleMouseMove(e, product.id)}
                onMouseEnter={() => setHoveredCardId(product.id)}
                onMouseLeave={e => {
                  handleMouseLeave(e);
                  setHoveredCardId(null);
                }}
                className="group relative bg-[#141b2b] rounded-xl overflow-hidden p-5 flex flex-col justify-between border border-[#2c3e50] shadow-xl transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,217,255,0.14)] hover:border-[#00d9ff]/50"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                {/* Top accent datum bar */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
                    product.category === 'commercial'
                      ? 'from-[#00d9ff] to-[#ffb700]'
                      : product.category === 'residential'
                      ? 'from-[#ffb700] to-[#ffdea9]'
                      : 'from-[#ffb700] to-[#00d9ff]'
                  }`}
                />

                <div>
                  {/* Image Container with Speed Badge */}
                  <div className="relative w-full h-52 rounded-lg overflow-hidden mb-4 bg-[#191f2f] border border-[#2c3e50]/60">
                    <img
                      src={product.imageUrl}
                      alt={product.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded bg-[#070e1d]/85 backdrop-blur-md border border-[#2c3e50]/80">
                      <span className="text-[11px] font-bold text-[#00d9ff] uppercase">
                        {product.speed}
                      </span>
                    </div>
                  </div>

                  {/* Drive Type & Badge */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-[#859398] uppercase tracking-wider">
                      {product.driveType}
                    </span>
                    <span className="flex items-center gap-1 text-[#ffb700] text-[11px] font-semibold">
                      {product.category === 'commercial' ? (
                        <Star className="w-3.5 h-3.5 fill-current" />
                      ) : product.category === 'residential' ? (
                        <Award className="w-3.5 h-3.5" />
                      ) : (
                        <Shield className="w-3.5 h-3.5" />
                      )}
                      <span>{product.badge}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-headline text-lg font-bold text-white uppercase tracking-tight mb-2 group-hover:text-[#00d9ff] transition-colors">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#bbc9ce] mb-4 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Specs Box & Action Button */}
                <div className="pt-3 bg-[#191f2f]/70 p-3 rounded-lg border border-[#2c3e50]/50 mt-2">
                  <div className="flex justify-between text-[#bbc9ce] text-[11px] mb-1">
                    <span>{product.keySpecs[0]?.label}:</span>
                    <span className="font-bold text-white">{product.keySpecs[0]?.value}</span>
                  </div>
                  <div className="flex justify-between text-[#bbc9ce] text-[11px] mb-3">
                    <span>{product.keySpecs[1]?.label}:</span>
                    <span className="font-bold text-[#00d9ff]">{product.keySpecs[1]?.value}</span>
                  </div>

                  <button
                    onClick={() => onSelectProduct(product)}
                    className="w-full py-2 px-3 rounded bg-[#232a3a] hover:bg-[#00d9ff] hover:text-[#001f26] text-[#00d9ff] text-xs font-headline uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Configure {product.name.split(' ')[0]}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
