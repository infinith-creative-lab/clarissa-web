'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { getAboutContent } from '@/lib/content/provider';
import { Container } from '@/components/layout/Container';
import { Divider } from '@/components/ui/Divider';
import { StoreShowcase } from '@/lib/content/types';

import { MapPinIcon, WhatsAppIcon } from '@/components/ui/Icon';

/* ── Store Card ── */

function StoreCard({ store }: { store: StoreShowcase }) {
  const whatsappUrl = store.whatsapp 
    ? `https://wa.me/${store.whatsapp.replace(/\D/g, '')}` 
    : null;

  return (
    <div className="group flex-shrink-0 w-[300px] md:w-[360px] select-none relative">
      {/* Image */}
      <div className="relative overflow-hidden mb-5" style={{ aspectRatio: '3/4' }}>
        <img
          src={store.image}
          alt={store.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 pointer-events-none"
          loading="lazy"
          draggable={false}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* City badge */}
        <div className="absolute top-4 left-4 px-3 pt-[5px] pb-[7px] bg-white/90 backdrop-blur-sm flex items-center justify-center">
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-neutral-800 leading-none">
            {store.city}
          </span>
        </div>

        {/* Hover frame */}
        <div className="absolute inset-3 border border-white/0 group-hover:border-white/30 transition-all duration-700 pointer-events-none" />

        {/* Center Button Overlay */}
        <div className="absolute inset-0 flex flex-col gap-3 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-30 pointer-events-none">
          {store.mapLink && (
            <a
              href={store.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              onDragStart={(e) => e.preventDefault()}
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              onClick={(e) => {
                const track = e.currentTarget.closest('.touch-pan-y');
                if (track && track.getAttribute('data-dragging') === 'true') {
                  e.preventDefault();
                }
              }}
              className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 bg-white/95 backdrop-blur-sm text-neutral-900 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-brand-50 hover:text-brand-700 transition-all duration-300 transform scale-95 group-hover:scale-100 shadow-xl w-48 justify-center"
            >
              <MapPinIcon className="w-3.5 h-3.5" />
              View on Map
            </a>
          )}

          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onDragStart={(e) => e.preventDefault()}
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              onClick={(e) => {
                const track = e.currentTarget.closest('.touch-pan-y');
                if (track && track.getAttribute('data-dragging') === 'true') {
                  e.preventDefault();
                }
              }}
              className="pointer-events-auto inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-brand-700 transition-all duration-300 transform scale-95 group-hover:scale-100 shadow-xl w-48 justify-center"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              WhatsApp
            </a>
          )}
        </div>

        {/* Store name overlay on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-start pointer-events-none">
          <h3 className="font-heading font-bold text-white text-lg tracking-[0.1em] uppercase leading-snug">
            {store.name}
          </h3>
          <p className="text-white/70 text-xs mt-2 tracking-wide line-clamp-2">
            {store.address}
          </p>
        </div>
      </div>

      {/* Info below image */}
      <div className="px-1">
        <h3 className="font-heading font-bold text-sm tracking-[0.15em] uppercase text-neutral-900 group-hover:text-brand-600 transition-colors duration-300 mb-1">
          {store.name}
        </h3>
        <p className="text-[11px] text-neutral-400 tracking-wide line-clamp-1">
          {store.address}
        </p>
      </div>
    </div>
  );
}

/* ── Store Carousel Section ── */

/**
 * Infinite auto-scrolling carousel with drag/swipe support.
 * No buttons — user drags left/right to browse.
 * Auto-scrolls continuously, pauses on hover & drag.
 */
export function StoreCarousel() {
  const t = useTranslations('about');
  const { storeShowcases } = getAboutContent();
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const scrollPosRef = useRef(0);
  const isPausedRef = useRef(false);
  const [, forceRender] = useState(0);

  // Drag state
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);

  // Duplicate stores for infinite loop
  const duplicatedStores = [...storeShowcases, ...storeShowcases];

  const getHalfWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    return track.scrollWidth / 2;
  }, []);

  // ── Auto-scroll animation loop ──
  const animate = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    if (!isPausedRef.current && !isDraggingRef.current) {
      scrollPosRef.current += 0.5;
      const halfWidth = getHalfWidth();
      if (halfWidth > 0 && scrollPosRef.current >= halfWidth) {
        scrollPosRef.current -= halfWidth;
      }
    }

    track.style.transform = `translateX(-${scrollPosRef.current}px)`;
    animationRef.current = requestAnimationFrame(animate);
  }, [getHalfWidth]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  // ── Mouse drag handlers ──
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = scrollPosRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    forceRender((n) => n + 1);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const delta = dragStartXRef.current - e.clientX;
    
    // Set dragging attribute if moved more than 5px
    if (Math.abs(delta) > 5) {
      trackRef.current?.setAttribute('data-dragging', 'true');
    }

    let newPos = dragStartScrollRef.current + delta;
    const halfWidth = getHalfWidth();
    if (halfWidth > 0) {
      if (newPos < 0) newPos += halfWidth;
      if (newPos >= halfWidth) newPos -= halfWidth;
    }
    scrollPosRef.current = newPos;
  }, [getHalfWidth]);

  const onPointerUp = useCallback(() => {
    isDraggingRef.current = false;
    // Clear dragging attribute after a tiny delay so click handlers can see it
    setTimeout(() => {
      trackRef.current?.removeAttribute('data-dragging');
    }, 50);
    forceRender((n) => n + 1);
  }, []);

  return (
    <section className="relative pb-20 md:pb-32 pt-10 md:pt-16 bg-white overflow-hidden">
      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="text-[10px] font-bold text-brand-600 tracking-[0.5em] uppercase mb-4">
            {t('storesLabel')}
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-[0.1em] uppercase text-neutral-900 leading-tight">
            {t('storesTitle')}
          </h2>
        </div>

        <Divider variant="line" color="brand" className="w-16 mx-0 mb-12" />
      </Container>

      {/* Carousel Track — infinite auto-scroll + drag/swipe */}
      <div
        className="overflow-hidden touch-pan-y"
        style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}
        onMouseEnter={() => { isPausedRef.current = true; }}
        onMouseLeave={() => { isPausedRef.current = false; }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          ref={trackRef}
          className="flex gap-6 md:gap-8 px-4 md:px-[max(2rem,calc((100vw-1280px)/2+2rem))]"
          style={{ willChange: 'transform', transition: 'none' }}
        >
          {duplicatedStores.map((store, index) => (
            <StoreCard key={`${store.id}-${index}`} store={store} />
          ))}
        </div>
      </div>
    </section>
  );
}
