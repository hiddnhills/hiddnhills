import React, { memo, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { VerticalMarquee } from "@/components/VerticalMarquee";
import { FloatingAstronaut } from "@/components/FloatingAstronaut";

// Types
interface PageLayoutProps {
  children: React.ReactNode;
  leftMarqueeItems?: string[];
  rightMarqueeItems?: string[];
}

// Constants - Default marquee content
const DEFAULT_LEFT_MARQUEE_ITEMS = [
  "UNDERGROUND",
  "VISIONARY",
  "ARTIST",
  "CREATOR",
  "AUTHENTIC",
  "RAW",
  "MUSIC",
  "CULTURE",
  "EXPRESSION",
  "TRUTH",
] as const;

const DEFAULT_RIGHT_MARQUEE_ITEMS = [
  "LAS VEGAS",
  "SINCE 2016",
  "HIP-HOP",
  "INDEPENDENT",
  "ORIGINAL",
  "PURE",
  "SUBSTANCE",
  "ARTISTRY",
  "VISION",
  "LEGACY",
] as const;

// Shared marquee styles
const MARQUEE_CONTAINER_CLASSES =
  "fixed top-0 bottom-0 w-8 z-10 pointer-events-none";
const MARQUEE_ITEM_CLASSES =
  "text-white/20 hover:text-white/40 transition-colors duration-300";
const MARQUEE_CLASSES = "h-full py-20";

// Optimized Marquee wrapper component
const MarqueeContainer = memo<{
  items: string[];
  position: "left" | "right";
  speed: "slow" | "normal";
  direction: "up" | "down";
}>(({ items, position, speed, direction }) => {
  const containerClasses = useMemo(
    () => `${MARQUEE_CONTAINER_CLASSES} ${position}-6`,
    [position],
  );

  return (
    <div className={containerClasses}>
      <VerticalMarquee
        items={items}
        speed={speed}
        direction={direction}
        className={MARQUEE_CLASSES}
        itemClassName={MARQUEE_ITEM_CLASSES}
      />
    </div>
  );
});

MarqueeContainer.displayName = "MarqueeContainer";

// Main PageLayout component
export const PageLayout = memo<PageLayoutProps>(
  ({
    children,
    leftMarqueeItems = DEFAULT_LEFT_MARQUEE_ITEMS,
    rightMarqueeItems = DEFAULT_RIGHT_MARQUEE_ITEMS,
  }) => {
    // Memoize marquee items to prevent unnecessary re-renders
    const leftItems = useMemo(() => leftMarqueeItems, [leftMarqueeItems]);
    const rightItems = useMemo(() => rightMarqueeItems, [rightMarqueeItems]);

    return (
      <div className="min-h-screen w-full text-white relative overflow-hidden pb-20">
        {/* Accessibility skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black p-2 rounded z-50 focus:outline-none focus:ring-2 focus:ring-artistic-pearl"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>

        {/* Navigation */}
        <Navigation />

        {/* Floating Astronaut Background */}
        <FloatingAstronaut />

        {/* Side Marquees */}
        <MarqueeContainer
          items={leftItems}
          position="left"
          speed="slow"
          direction="up"
        />

        <MarqueeContainer
          items={rightItems}
          position="right"
          speed="normal"
          direction="down"
        />

        {/* Main content */}
        <main id="main-content" className="relative z-20" role="main">
          {children}
        </main>
      </div>
    );
  },
);

PageLayout.displayName = "PageLayout";
