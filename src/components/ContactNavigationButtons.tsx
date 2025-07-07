import React, { useEffect, useState, useCallback, useMemo, memo } from "react";
import { SlotMachineButton } from "@/components/SlotMachineButton";
import { Play, User, Camera, FileText, Mail, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

// Types
interface NavigationButton {
  id: string;
  text: string;
  icon: React.ComponentType<{ className?: string }>;
  alternatives: readonly string[];
  to?: string;
  href?: string;
  external?: boolean;
  variant?: "outline" | "default";
  className?: string;
}

interface ContactNavigationButtonsProps {
  slotMachineOptions: Record<string, readonly string[]>;
}

// Constants
const AUTO_LOOP_INTERVAL = 3000;
const USER_INTERACTION_TIMEOUT = 3000;
const SCROLL_DEBOUNCE_TIME = 300;
const BUTTON_HEIGHT_WITH_GAP = 40;

// Optimized Button Renderer Component
const ButtonRenderer = memo<{
  button: NavigationButton;
  isActive: boolean;
}>(({ button, isActive }) => {
  const buttonElement = useMemo(
    () => (
      <SlotMachineButton
        originalText={button.text}
        icon={button.icon}
        alternatives={button.alternatives}
        variant={button.variant}
        size="sm"
        showUnderline={true}
        className={`${button.className || ""} transition-all duration-500 ${
          isActive ? "scale-105 opacity-100" : "opacity-70 scale-95"
        }`}
      />
    ),
    [button, isActive],
  );

  if (button.href) {
    return (
      <a
        href={button.href}
        target={button.external ? "_blank" : undefined}
        rel={button.external ? "noopener noreferrer" : undefined}
        className="block focus:outline-none"
        aria-label={`${button.text} - ${button.external ? "Opens in new tab" : ""}`}
      >
        {buttonElement}
      </a>
    );
  }

  return (
    <Link
      to={button.to || "/"}
      className="block focus:outline-none"
      aria-label={`Go to ${button.text} page`}
    >
      {buttonElement}
    </Link>
  );
});

ButtonRenderer.displayName = "ButtonRenderer";

// Custom hook for navigation state management
const useNavigationState = (buttonsLength: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const navigateUp = useCallback(() => {
    if (isScrolling) return;
    setIsScrolling(true);
    setCurrentIndex((prev) => (prev - 1 + buttonsLength) % buttonsLength);
    setIsUserInteracting(true);
    setTimeout(() => setIsScrolling(false), SCROLL_DEBOUNCE_TIME);
  }, [isScrolling, buttonsLength]);

  const navigateDown = useCallback(() => {
    if (isScrolling) return;
    setIsScrolling(true);
    setCurrentIndex((prev) => (prev + 1) % buttonsLength);
    setIsUserInteracting(true);
    setTimeout(() => setIsScrolling(false), SCROLL_DEBOUNCE_TIME);
  }, [isScrolling, buttonsLength]);

  return {
    currentIndex,
    setCurrentIndex,
    isUserInteracting,
    setIsUserInteracting,
    isScrolling,
    navigateUp,
    navigateDown,
  };
};

// Main component
export const ContactNavigationButtons = memo<ContactNavigationButtonsProps>(
  ({ slotMachineOptions }) => {
    // Memoize navigation buttons to prevent recreation
    const navigationButtons: NavigationButton[] = useMemo(
      () => [
        {
          id: "music",
          text: "MUSIC",
          icon: Play,
          alternatives: slotMachineOptions.music || [],
          to: "/music",
          variant: "ghost",
        },
        {
          id: "instagram",
          text: "INSTAGRAM",
          icon: Camera,
          alternatives: slotMachineOptions.bio || [], // Using bio key for Instagram content
          href: "https://www.instagram.com/hiddn.hills/",
          external: true,
          variant: "ghost",
        },
        {
          id: "gallery",
          text: "VISUALS",
          icon: Camera,
          alternatives: slotMachineOptions.gallery || [],
          to: "/gallery",
          variant: "ghost",
        },
        {
          id: "links",
          text: "ALL LINKS",
          icon: ExternalLink,
          alternatives: slotMachineOptions.links || [],
          href: "https://linktr.ee/hiddnhills",
          external: true,
          variant: "ghost",
          className: "",
        },
      ],
      [slotMachineOptions],
    );

    const {
      currentIndex,
      setCurrentIndex,
      isUserInteracting,
      setIsUserInteracting,
      isScrolling,
      navigateUp,
      navigateDown,
    } = useNavigationState(navigationButtons.length);

    // Auto-loop effect
    useEffect(() => {
      if (isUserInteracting) return;

      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % navigationButtons.length);
      }, AUTO_LOOP_INTERVAL);

      return () => clearInterval(interval);
    }, [navigationButtons.length, isUserInteracting, setCurrentIndex]);

    // Resume auto-rotation after user stops interacting
    useEffect(() => {
      if (!isUserInteracting) return;

      const timeout = setTimeout(() => {
        setIsUserInteracting(false);
      }, USER_INTERACTION_TIMEOUT);

      return () => clearTimeout(timeout);
    }, [isUserInteracting, setIsUserInteracting]);

    // Optimized wheel handler
    const handleWheel = useCallback(
      (e: React.WheelEvent) => {
        // Only intercept significant scroll amounts
        if (Math.abs(e.deltaY) > 20) {
          e.preventDefault();
          if (e.deltaY > 0) {
            navigateDown();
          } else {
            navigateUp();
          }
        }
      },
      [navigateDown, navigateUp],
    );

    // Optimized keyboard handler
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            navigateUp();
            break;
          case "ArrowDown":
            e.preventDefault();
            navigateDown();
            break;
          case "Home":
            e.preventDefault();
            setCurrentIndex(0);
            setIsUserInteracting(true);
            break;
          case "End":
            e.preventDefault();
            setCurrentIndex(navigationButtons.length - 1);
            setIsUserInteracting(true);
            break;
          default:
            break;
        }
      },
      [
        navigateUp,
        navigateDown,
        setCurrentIndex,
        setIsUserInteracting,
        navigationButtons.length,
      ],
    );

    // Memoize scroll indicator styles
    const scrollIndicatorStyle = useMemo(() => {
      const heightPercentage = 100 / navigationButtons.length;
      const topPercentage =
        (currentIndex / Math.max(navigationButtons.length - 1, 1)) *
        (100 - heightPercentage);

      return {
        height: `${heightPercentage}%`,
        top: `${topPercentage}%`,
      };
    }, [currentIndex, navigationButtons.length]);

    // Memoize transform style
    const transformStyle = useMemo(
      () => ({
        transform: `translateY(-${currentIndex * BUTTON_HEIGHT_WITH_GAP}px)`,
      }),
      [currentIndex],
    );

    // Memoize button list to prevent unnecessary re-renders
    const buttonList = useMemo(() => {
      const doubledButtons = [...navigationButtons, ...navigationButtons];
      return doubledButtons.map((button, index) => {
        const originalIndex = index % navigationButtons.length;
        const isActive = originalIndex === currentIndex;
        return (
          <div
            key={`${button.id}-${index}`}
            className="min-h-[36px] flex items-center"
          >
            <ButtonRenderer button={button} isActive={isActive} />
          </div>
        );
      });
    }, [navigationButtons, currentIndex]);

    return (
      <div className="pt-4">
        <div className="flex items-start gap-3">
          {/* Vertical Scroll Bar Indicator */}
          <div className="flex flex-col items-center pt-2" aria-hidden="true">
            <div className="h-[120px] w-0.5 bg-white/10 rounded-full relative">
              {/* Scroll thumb */}
              <div
                className="w-1 bg-white/60 rounded-full transition-all duration-500 ease-out absolute -left-0.25"
                style={scrollIndicatorStyle}
              />
            </div>
            {/* Position indicator */}
            <div className="text-white/40 text-xs mt-2 font-light">
              {currentIndex + 1}/{navigationButtons.length}
            </div>
          </div>

          {/* Navigation Buttons Container */}
          <div
            className="h-[120px] overflow-hidden relative select-none flex-1 focus:outline-none"
            onWheel={handleWheel}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="listbox"
            aria-label="Navigation buttons - use arrow keys or scroll to navigate"
            aria-activedescendant={`nav-button-${navigationButtons[currentIndex]?.id}`}
          >
            {/* Looping buttons container */}
            <div
              className="flex flex-col gap-2 items-end transition-transform duration-500 ease-out"
              style={transformStyle}
            >
              {buttonList}
            </div>
          </div>
        </div>

        {/* Screen reader announcements */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {`Currently viewing ${navigationButtons[currentIndex]?.text || "Unknown"} button, ${currentIndex + 1} of ${navigationButtons.length}`}
        </div>
      </div>
    );
  },
);

ContactNavigationButtons.displayName = "ContactNavigationButtons";
