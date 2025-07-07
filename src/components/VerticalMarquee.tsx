import React, { memo, useMemo } from "react";
import { cn } from "@/lib/utils";

// Types
interface VerticalMarqueeProps {
  items: string[];
  speed?: "slow" | "normal" | "fast";
  direction?: "up" | "down";
  className?: string;
  itemClassName?: string;
  pauseOnHover?: boolean;
}

type AnimationSpeed = "slow" | "normal" | "fast";

// Constants
const SPEED_CLASSES: Record<AnimationSpeed, string> = {
  slow: "animate-marquee-vertical-slow",
  normal: "animate-marquee-vertical",
  fast: "animate-marquee-vertical-fast",
} as const;

const DEFAULT_ITEM_CLASSES =
  "text-white/20 font-normal text-sm tracking-[3px] uppercase transform rotate-90 whitespace-nowrap select-none py-16";

// Optimized MarqueeItem component
const MarqueeItem = memo<{
  item: string;
  index: number;
  prefix: string;
  itemClassName?: string;
}>(({ item, index, prefix, itemClassName }) => (
  <div
    key={`${prefix}-${index}`}
    className={cn(DEFAULT_ITEM_CLASSES, itemClassName)}
  >
    {item}
  </div>
));

MarqueeItem.displayName = "MarqueeItem";

// Main VerticalMarquee component
export const VerticalMarquee = memo<VerticalMarqueeProps>(
  ({
    items,
    speed = "normal",
    direction = "up",
    className,
    itemClassName,
    pauseOnHover = true,
  }) => {
    // Memoize computed values
    const speedClass = useMemo(() => SPEED_CLASSES[speed], [speed]);

    const containerClassName = useMemo(
      () => cn("relative overflow-hidden h-full flex flex-col", className),
      [className],
    );

    const animationClassName = useMemo(
      () =>
        cn(
          "flex flex-col gap-16 will-change-transform",
          speedClass,
          direction === "down" && "reverse",
          pauseOnHover && "hover:pause",
        ),
      [speedClass, direction, pauseOnHover],
    );

    const animationStyle = useMemo(
      () => ({
        animationDirection: direction === "down" ? "reverse" : "normal",
      }),
      [direction],
    );

    // Memoize rendered items to prevent unnecessary re-renders
    const renderedItems = useMemo(
      () => [
        // First set of items
        ...items.map((item, index) => (
          <MarqueeItem
            key={`first-${index}`}
            item={item}
            index={index}
            prefix="first"
            itemClassName={itemClassName}
          />
        )),
        // Duplicate set for seamless loop
        ...items.map((item, index) => (
          <MarqueeItem
            key={`second-${index}`}
            item={item}
            index={index}
            prefix="second"
            itemClassName={itemClassName}
          />
        )),
      ],
      [items, itemClassName],
    );

    // Early return for empty items
    if (!items.length) {
      return <div className={containerClassName} />;
    }

    return (
      <div className={containerClassName}>
        <div className={animationClassName} style={animationStyle}>
          {renderedItems}
        </div>
      </div>
    );
  },
);

VerticalMarquee.displayName = "VerticalMarquee";
