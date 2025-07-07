// =============================================
// SHARED TYPES
// =============================================

import { LucideIcon } from "lucide-react";

// Base component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Navigation types
export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  external?: boolean;
  to?: string;
  gradientHover: string;
}

export interface NavigationButton {
  id: string;
  text: string;
  icon: LucideIcon;
  alternatives: string[];
  to?: string;
  href?: string;
  external?: boolean;
  variant?: "outline" | "default";
  className?: string;
}

// Page layout types
export interface PageLayoutProps extends BaseComponentProps {
  leftMarqueeItems?: readonly string[];
  rightMarqueeItems?: readonly string[];
}

// Marquee types
export type MarqueeSpeed = "slow" | "normal" | "fast";
export type MarqueeDirection = "up" | "down";

export interface VerticalMarqueeProps extends BaseComponentProps {
  items: readonly string[];
  speed?: MarqueeSpeed;
  direction?: MarqueeDirection;
  itemClassName?: string;
  pauseOnHover?: boolean;
}

// Slot machine types
export interface SlotMachineButtonProps extends BaseComponentProps {
  originalText: string;
  icon: LucideIcon;
  alternatives: readonly string[];
  onClick?: () => void;
  href?: string;
  external?: boolean;
  variant?: "outline" | "default";
  size?: "sm" | "lg";
}

export interface LoopingNavigationButtonsProps {
  slotMachineOptions: Record<string, readonly string[]>;
  includeButtons?: string[];
}

// Gallery types
export interface Photo {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  year: string;
  aspectRatio: number;
}

export interface PhotoLayout {
  photo: Photo;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ViewportDimensions {
  width: number;
  height: number;
}

// Music types
export interface Track {
  id: string;
  title: string;
  spotifyId: string;
  appleId: string;
  year: string;
}

export interface MusicSection {
  id: string;
  type: "hero" | "platforms" | "latest" | "discography" | "stats";
  title?: string;
  content: React.ReactNode;
}

// Error types
export interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
}

// Animation types
export type AnimationDuration = "quick" | "fast" | "normal" | "slow" | "slower";

export interface AnimationConfig {
  duration: AnimationDuration;
  easing?: string;
  delay?: number;
}

// Theme types
export type ColorVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";

export interface ThemeColors {
  artistic: Record<string, string>;
  semantic: Record<string, string>;
}

// Utility types
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type WithOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

// Event handler types
export type EventHandler<T = Event> = (event: T) => void;
export type KeyboardEventHandler = EventHandler<React.KeyboardEvent>;
export type MouseEventHandler = EventHandler<React.MouseEvent>;
export type WheelEventHandler = EventHandler<React.WheelEvent>;

// API types (for future use)
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface ApiError {
  status: number;
  message: string;
  code?: string;
}

// Form types (for future use)
export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  validation?: (value: string) => string | undefined;
}

export interface FormData {
  [key: string]: string | number | boolean;
}

// Route types
export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
  title?: string;
  description?: string;
}

// SEO types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
}

// Media query types
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export interface MediaQueryConfig {
  breakpoint: Breakpoint;
  query: string;
}

// Performance monitoring types
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  errorCount: number;
}

// Accessibility types
export interface A11yProps {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  role?: string;
  tabIndex?: number;
}

// Generic event types
export interface CustomEvent<T = any> {
  type: string;
  payload: T;
  timestamp: number;
}

// Component state types
export type LoadingState = "idle" | "loading" | "success" | "error";

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
