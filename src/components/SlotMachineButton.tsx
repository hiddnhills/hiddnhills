import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Types
interface SlotMachineButtonProps {
  originalText: string;
  icon: React.ComponentType<{ className?: string }>;
  alternatives: string[];
  onClick?: () => void;
  href?: string;
  external?: boolean;
  variant?: "outline" | "default";
  size?: "sm" | "lg";
  className?: string;
  children?: React.ReactNode;
  showUnderline?: boolean;
}

// Constants
const SPIN_INTERVAL = 80; // ms
const MIN_SPIN_DURATION = 500; // ms
const MAX_SPIN_DURATION = 1000; // ms
const BLUR_TRANSITION_DURATION = 100; // ms

// Custom hook for slot machine logic
const useSlotMachine = (originalText: string, alternatives: string[]) => {
  const [currentText, setCurrentText] = useState(originalText);
  const [isSpinning, setIsSpinning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize all options to prevent recreation
  const allOptions = useMemo(
    () => [originalText, ...alternatives],
    [originalText, alternatives],
  );

  // Cleanup function
  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Start spinning animation
  const startSpinning = useCallback(() => {
    if (isSpinning || allOptions.length <= 1) return;

    setIsSpinning(true);
    let index = 0;

    // Fast cycling effect
    intervalRef.current = setInterval(() => {
      index = (index + 1) % allOptions.length;
      setCurrentText(allOptions[index]);
    }, SPIN_INTERVAL);

    // Stop after a random duration
    const stopDelay =
      Math.random() * (MAX_SPIN_DURATION - MIN_SPIN_DURATION) +
      MIN_SPIN_DURATION;
    timeoutRef.current = setTimeout(() => {
      cleanup();
      setCurrentText(originalText);
      setIsSpinning(false);
    }, stopDelay);
  }, [isSpinning, allOptions, originalText, cleanup]);

  // Stop spinning animation
  const stopSpinning = useCallback(() => {
    cleanup();
    setCurrentText(originalText);
    setIsSpinning(false);
  }, [cleanup, originalText]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    currentText,
    isSpinning,
    startSpinning,
    stopSpinning,
  };
};

// Main SlotMachineButton component
export const SlotMachineButton = memo<SlotMachineButtonProps>(
  ({
    originalText,
    icon: Icon,
    alternatives,
    onClick,
    href,
    external,
    variant = "ghost",
    size = "sm",
    className,
    children,
    showUnderline = false,
  }) => {
    const { currentText, isSpinning, startSpinning, stopSpinning } =
      useSlotMachine(originalText, alternatives);

    // Memoize button classes
    const buttonClassName = useMemo(
      () =>
        cn(
          "text-white/80 hover:text-white bg-transparent border-none outline-none font-light",
          "px-3 py-2 text-xs tracking-[1px] uppercase transition-all duration-300 min-h-[44px] touch-manipulation",
          "focus:outline-none focus:ring-0 focus:border-none",
          showUnderline && [
            "underline decoration-white/40 hover:decoration-white underline-offset-4",
            "decoration-1 hover:decoration-2",
          ],
          className,
        ),
      [className, showUnderline],
    );

    // Memoize text span classes
    const textClassName = useMemo(() => cn("transition-all duration-300"), []);

    // Memoize button content
    const buttonContent = useMemo(
      () => (
        <Button
          variant={variant}
          size={size}
          className={buttonClassName}
          onClick={onClick}
          aria-label={originalText}
        >
          <Icon className="mr-2 h-3 w-3" aria-hidden="true" />
          <span className={textClassName}>{originalText}</span>
          {children}
        </Button>
      ),
      [
        variant,
        size,
        buttonClassName,
        onClick,
        startSpinning,
        stopSpinning,
        originalText,
        alternatives.length,
        Icon,
        textClassName,
        currentText,
        children,
      ],
    );

    // Handle different link types
    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${originalText} in new tab`}
          >
            {buttonContent}
          </a>
        );
      }
      // For internal links, return button content directly
      // (Should be wrapped with Link component by parent)
      return buttonContent;
    }

    return buttonContent;
  },
);

SlotMachineButton.displayName = "SlotMachineButton";
