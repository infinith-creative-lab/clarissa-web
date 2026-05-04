"use client";

import { useTranslations } from 'next-intl';
import { getHomeContent } from '@/lib/content/provider';
import { OutletStats } from '@/lib/content/types';
import { Container } from '@/components/layout/Container';
import { useState, useEffect, useRef, useMemo } from 'react';
import { DesignAccents } from '@/components/ui/DesignAccents';

// Import local HIGH-RESOLUTION GeoJSON for Java
import javaHighRes from '@/lib/map/java-highres.json';

/**
 * Enterprise-Grade Counter Component
 */
function Counter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * (end - 1) + 1));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={elementRef}>{count}</span>;
}

export function OutletMap({ 
  stats,
  ctaText,
  ctaLink
}: { 
  stats?: OutletStats;
  ctaText?: string;
  ctaLink?: string;
} = {}) {
  const t = useTranslations('outlets');
  const outletStats = stats || getHomeContent().outletStats;
  const [hoveredStore, setHoveredStore] = useState<string | null>(null);

  // Map Projection Config - Optimized Scale
  const mapConfig = {
    minLng: 104.5,
    maxLng: 115.5,
    minLat: -9.2,
    maxLat: -5.5,
    width: 1000,
    height: 400
  };

  // Convert Lat/Lng to SVG X/Y
  const project = (lng: number, lat: number) => {
    const x = ((lng - mapConfig.minLng) / (mapConfig.maxLng - mapConfig.minLng)) * mapConfig.width;
    const y = mapConfig.height - ((lat - mapConfig.minLat) / (mapConfig.maxLat - mapConfig.minLat)) * mapConfig.height;
    return { x, y };
  };

  // Pre-calculate SVG paths for the map
  const mapPaths = useMemo(() => {
    return javaHighRes.features.map((feature: any, fIdx: number) => {
      const geometry = feature.geometry;
      if (geometry.type === "MultiPolygon") {
        return geometry.coordinates.map((polygon: any, pIdx: number) => {
          // Filter out small stray islands in the far west
          const isStrayInWest = polygon[0].some((c: number[]) => c[0] < 105.1 && c[1] > -6.5);
          if (isStrayInWest) return null;

          return (
            <path
              key={`feature-${fIdx}-poly-${pIdx}`}
              d={polygon[0].map((coord: number[], cIdx: number) => {
                const { x, y } = project(coord[0], coord[1]);
                return `${cIdx === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
              }).join(' ') + ' Z'}
              fill="var(--color-brand-100)"
              opacity={0.6}
              stroke="var(--color-brand-200)"
              strokeWidth="0.5"
              className="transition-all duration-500 hover:fill-brand-200 hover:opacity-100"
            />
          );
        });
      }
      return null;
    });
  }, []);

  return (
    <section className="relative py-12 md:py-16 bg-brand-50 overflow-hidden">
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block text-[10px] font-bold text-brand-600 tracking-[0.4em] uppercase mb-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
            {t('heading_sub') || 'Find Our Store'}
          </div>
          <h2 className="text-4xl md:text-7xl font-heading font-bold tracking-[0.1em] text-neutral-900 mb-8 uppercase leading-tight">
            {t('heading')}
          </h2>
          <div className="w-16 h-1 bg-brand-500 mx-auto rounded-full" />
        </div>

        {/* Pure SVG Map - Slightly Reduced and Nuanced */}
        <div className="relative w-full max-w-5xl mx-auto mb-36">
          <div className="w-full h-auto overflow-visible relative">
            <svg
              viewBox={`0 0 ${mapConfig.width} ${mapConfig.height}`}
              className="w-full h-full"
            >
              <g className="animate-in fade-in zoom-in-95 duration-1000">{mapPaths}</g>

              {outletStats.stores.map((store) => {
                const { x, y } = project(store.lng || 110, store.lat || -7);
                return (
                  <g
                    key={store.id}
                    transform={`translate(${x}, ${y})`}
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredStore(store.id)}
                    onMouseLeave={() => setHoveredStore(null)}
                  >
                    {/* Ripple Effect on Hover */}
                    <circle r={12} fill="var(--color-brand-500)" opacity={0} className="transition-all duration-300 group-hover:opacity-10 animate-pulse" />

                    {/* Teardrop Pin - Refined Style */}
                    <g transform="translate(-10, -22)" className="transition-all duration-500 group-hover:-translate-y-1">
                      <path
                        d="M10 0C4.48 0 0 4.48 0 10c0 7.5 10 16.67 10 16.67S20 17.5 20 10c0-5.52-4.48-10-10-10z"
                        fill={hoveredStore === store.id ? "#000" : "#222"}
                        className="transition-colors duration-300"
                      />
                      <circle cx="10" cy="10" r="3.5" fill="#FFF" />
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Luxury Floating Tooltip */}
          {outletStats.stores.map((store) => {
            const { x, y } = project(store.lng || 110, store.lat || -7);
            return hoveredStore === store.id && (
              <div
                key={`tooltip-${store.id}`}
                className="absolute p-6 bg-white/95 backdrop-blur-md z-50 pointer-events-none rounded-2xl w-64 border border-white animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300"
                style={{
                  boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
                  left: `${(x / mapConfig.width) * 100}%`,
                  top: `${(y / mapConfig.height) * 100}%`,
                  transform: 'translate(-50%, -140%)'
                }}
              >
                <div className="text-[10px] font-bold text-brand-600 tracking-[0.3em] uppercase mb-2">{store.city}</div>
                <div className="text-base font-heading font-bold text-neutral-900 uppercase mb-3 tracking-wide leading-tight border-b border-brand-50 pb-2">
                  {store.name}
                </div>
                <div className="text-[11px] text-neutral-500 leading-relaxed font-medium pt-1">
                  {store.address}
                </div>
                <div className="absolute left-1/2 w-3 h-3 bg-white/95 backdrop-blur-md rotate-45 border-r border-b border-white" style={{ top: 'calc(100% - 6px)', transform: 'translateX(-50%) rotate(45deg)' }} />
              </div>
            )
          })}
        </div>

        {/* Refined Stats Row - Senuansa dengan Category/Event Cards */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center border-y border-neutral-200 py-12 md:py-16">
            <div className="flex-1 w-full text-center border-b border-neutral-200 md:border-b-0 md:border-r py-8 md:py-0">
              <div className="text-6xl md:text-7xl font-heading font-bold text-neutral-900 mb-4 tracking-tighter">
                <Counter end={outletStats.outletCount} />
              </div>
              <div className="text-[10px] tracking-[0.5em] font-bold text-neutral-500 uppercase">{t('outletCount')}</div>
            </div>
            <div className="flex-1 w-full text-center border-b border-neutral-200 md:border-b-0 md:border-r py-8 md:py-0">
              <div className="text-6xl md:text-7xl font-heading font-bold text-neutral-900 mb-4 tracking-tighter">
                <Counter end={outletStats.cityCount} />
              </div>
              <div className="text-[10px] tracking-[0.5em] font-bold text-neutral-500 uppercase">{t('cityCount')}</div>
            </div>
            <div className="flex-1 w-full text-center py-8 md:py-0">
              <div className="text-6xl md:text-7xl font-heading font-bold text-neutral-900 mb-4 tracking-tighter">
                <Counter end={outletStats.provinceCount} />
              </div>
              <div className="text-[10px] tracking-[0.5em] font-bold text-neutral-500 uppercase">{t('provinceCount')}</div>
            </div>
          </div>
          <div className="mt-10 md:mt-12 text-center space-y-6">
            <div className="w-16 h-px bg-brand-200 mx-auto" />
            <p className="text-[11px] tracking-[0.4em] font-bold text-neutral-400 uppercase leading-relaxed max-w-xl mx-auto">
              {t('openHours')}
            </p>
            {ctaText && ctaLink && (
              <div className="pt-8">
                <a href={ctaLink} className="inline-block px-10 py-4 bg-[#D4A0A0] hover:bg-[#C48B7C] text-white font-heading font-medium tracking-widest text-sm uppercase transition-all duration-500 rounded-full shadow-lg hover:shadow-xl">
                  {ctaText}
                </a>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
