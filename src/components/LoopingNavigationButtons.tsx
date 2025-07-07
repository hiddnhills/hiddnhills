import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
  useRef,
} from "react";
import { SlotMachineButton } from "@/components/SlotMachineButton";
import { Play, User, Camera, FileText, Mail, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { cn, rafThrottle, debounce } from "@/utils";
import { ANIMATION_DURATIONS, EXTERNAL_LINKS } from "@/constants";
import type {
  NavigationButton,
  LoopingNavigationButtonsProps,
  WheelEventHandler,
  KeyboardEventHandler,
} from "@/types";

// Constants
const AUTO_LOOP_INTERVAL = 3000;
const USER_INTERACTION_TIMEOUT = 3000;
const SCROLL_DEBOUNCE_TIME = 300;
const WHEEL_THRESHOLD = 20;
const BUTTON_HEIGHT = 40; // Height + gap in pixels

// Custom hook for navigation state management
const useNavigationState = (buttonsLength: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const lastInteractionRef = useRef<number>(0);

  const navigate = useCallback(
    (direction: "up" | "down") => {
      if (isScrolling) return;

      setIsScrolling(true);
      setCurrentIndex((prevIndex) =>
        direction === "up"
          ? (prevIndex - 1 + buttonsLength) % buttonsLength
          : (prevIndex + 1) % buttonsLength,
      );
      setIsUserInteracting(true);
      lastInteractionRef.current = Date.now();

      setTimeout(() => setIsScrolling(false), SCROLL_DEBOUNCE_TIME);
    },
    [isScrolling, buttonsLength],
  );

  const navigateUp = useCallback(() => navigate("up"), [navigate]);
  const navigateDown = useCallback(() => navigate("down"), [navigate]);

  return {
    currentIndex,
    setCurrentIndex,
    isUserInteracting,
    setIsUserInteracting,
    isScrolling,
    navigateUp,
    navigateDown,
    lastInteractionRef,
  };
};

// Optimized scroll indicator component
const ScrollIndicator = memo<{
  currentIndex: number;
  totalButtons: number;
}>(({ currentIndex, totalButtons }) => {
  const thumbHeight = useMemo(() => 100 / totalButtons, [totalButtons]);
  const thumbPosition = useMemo(
    () => (currentIndex / (totalButtons - 1)) * (100 - thumbHeight),
    [currentIndex, totalButtons, thumbHeight],
  );

  return (
    <div className="flex flex-col items-center pt-2">
      <div className="h-[120px] w-0.5 bg-white/10 rounded-full relative">
        <div
          className="w-1 bg-white/60 rounded-full transition-all duration-500 ease-out absolute -left-0.25"
          style={{
            height: `${thumbHeight}%`,
            top: `${thumbPosition}%`,
          }}
        />
      </div>
      <div className="text-white/40 text-xs mt-2 font-light">
        {currentIndex + 1}/{totalButtons}
      </div>
    </div>
  );
});

ScrollIndicator.displayName = "ScrollIndicator";

// Optimized button renderer
const ButtonRenderer = memo<{
  button: NavigationButton;
  isActive: boolean;
}>(({ button, isActive }) => {
  const buttonClassName = useMemo(
    () =>
      cn(
        "transition-all duration-500",
        isActive ? "scale-105 opacity-100" : "opacity-70 scale-95",
      ),
    [isActive],
  );

  const buttonElement = useMemo(
    () => (
      <SlotMachineButton
        originalText={button.text}
        icon={button.icon}
        alternatives={button.alternatives}
        variant={button.variant}
        size="sm"
        className={cn(button.className, buttonClassName)}
      />
    ),
    [button, buttonClassName],
  );

  if (button.href) {
    return (
      <SlotMachineButton
        key={button.id}
        originalText={button.text}
        icon={button.icon}
        alternatives={button.alternatives}
        href={button.href}
        external={button.external}
        variant={button.variant}
        size="sm"
        className={cn(button.className, buttonClassName)}
      />
    );
  }

  return (
    <Link key={button.id} to={button.to || "/"}>
      {buttonElement}
    </Link>
  );
});

ButtonRenderer.displayName = "ButtonRenderer";

// Main component
export const LoopingNavigationButtons = memo<LoopingNavigationButtonsProps>(
  ({ slotMachineOptions, includeButtons }) => {
    // Memoize navigation buttons to prevent recreation
    const navigationButtons: NavigationButton[] = useMemo(() => {
      const allButtons = [
        {
          id: "music",
          text: "MUSIC",
          icon: Play,
          alternatives: slotMachineOptions.music || [],
          to: "/music",
          variant: "outline",
        },
        {
          id: "bio",
          text: "BIO",
          icon: User,
          alternatives: slotMachineOptions.bio || [],
          to: "/bio",
          variant: "outline",
        },
        {
          id: "gallery",
          text: "VISUALS",
          icon: Camera,
          alternatives: slotMachineOptions.gallery || [],
          to: "/gallery",
          variant: "outline",
        },
        {
          id: "contact",
          text: "CONTACT",
          icon: Mail,
          alternatives: slotMachineOptions.contact || [],
          to: "/contact",
          variant: "outline",
        },
        {
          id: "links",
          text: "ALL LINKS",
          icon: ExternalLink,
          alternatives: slotMachineOptions.links || [],
          href: EXTERNAL_LINKS.linkTree,
          external: true,
          variant: "outline",
          className: "",
        },
      ];

      // Filter buttons if includeButtons prop is provided
      return includeButtons
        ? allButtons.filter((button) => includeButtons.includes(button.id))
        : allButtons;
    }, [slotMachineOptions, includeButtons]);

    const {
      currentIndex,
      setCurrentIndex,
      isUserInteracting,
      setIsUserInteracting,
      isScrolling,
      navigateUp,
      navigateDown,
      lastInteractionRef,
    } = useNavigationState(navigationButtons.length);

    // Auto-loop effect with optimized cleanup
    useEffect(() => {
      const intervalId = setInterval(() => {
        if (!isUserInteracting) {
          setCurrentIndex(
            (prevIndex) => (prevIndex + 1) % navigationButtons.length,
          );
        }
      }, AUTO_LOOP_INTERVAL);

      return () => clearInterval(intervalId);
    }, [navigationButtons.length, isUserInteracting, setCurrentIndex]);

    // Resume auto-rotation after user interaction timeout
    useEffect(() => {
      if (!isUserInteracting) return;

      const timeoutId = setTimeout(() => {
        setIsUserInteracting(false);
      }, USER_INTERACTION_TIMEOUT);

      return () => clearTimeout(timeoutId);
    }, [isUserInteracting, lastInteractionRef.current, setIsUserInteracting]);

    // Optimized wheel event handler
    const handleWheel: WheelEventHandler = useCallback(
      (e) => {
        if (Math.abs(e.deltaY) > WHEEL_THRESHOLD) {
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

    // Optimized keyboard event handler
    const handleKeyDown: KeyboardEventHandler = useCallback(
      (e) => {
        switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            navigateUp();
            break;
          case "ArrowDown":
            e.preventDefault();
            navigateDown();
            break;
        }
      },
      [navigateUp, navigateDown],
    );

    // Memoize rendered buttons to prevent unnecessary re-renders
    const renderedButtons = useMemo(() => {
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

    // Memoize container transform
    const containerTransform = useMemo(
      () => ({
        transform: `translateY(-${currentIndex * BUTTON_HEIGHT}px)`,
      }),
      [currentIndex],
    );

    return (
      <div className="pt-4">
        <div className="flex items-start gap-3">
          {/* Scroll Indicator */}
          <ScrollIndicator
            currentIndex={currentIndex}
            totalButtons={navigationButtons.length}
          />

          {/* Navigation Buttons Container */}
          <div
            className="h-[120px] overflow-hidden relative select-none flex-1"
            onWheel={handleWheel}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="listbox"
            aria-label="Navigation buttons - use arrow keys or scroll to navigate"
            aria-activedescendant={`nav-button-${currentIndex}`}
          >
            {/* Looping buttons container */}
            <div
              className="flex flex-col gap-2 items-end transition-transform duration-500 ease-out"
              style={containerTransform}
            >
              {renderedButtons}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

LoopingNavigationButtons.displayName = "LoopingNavigationButtons";
