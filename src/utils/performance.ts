// =============================================
// ADVANCED PERFORMANCE UTILITIES
// =============================================

import { PERFORMANCE } from "@/constants";

// =============================================
// BUNDLE OPTIMIZATION
// =============================================

/**
 * Dynamic import with error handling and loading states
 */
export async function loadComponent<T>(
  importFn: () => Promise<{ default: T }>,
  fallback?: T,
): Promise<T> {
  try {
    const module = await importFn();
    return module.default;
  } catch (error) {
    console.error("Failed to load component:", error);
    if (fallback) {
      return fallback;
    }
    throw error;
  }
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string): void {
  if (typeof document === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;
  link.crossOrigin = "anonymous";
  document.head.appendChild(link);
}

/**
 * Prefetch non-critical resources
 */
export function prefetchResource(href: string): void {
  if (typeof document === "undefined") return;

  const link = document.createElement("link");
  link.rel = "prefetch";
  link.href = href;
  document.head.appendChild(link);
}

// =============================================
// VIRTUAL SCROLLING UTILITIES
// =============================================

interface VirtualScrollOptions {
  itemHeight: number;
  overscan?: number;
  containerHeight: number;
  totalItems: number;
}

interface VirtualScrollResult {
  startIndex: number;
  endIndex: number;
  visibleItems: number;
  offset: number;
}

/**
 * Calculate virtual scroll parameters
 */
export function calculateVirtualScroll(
  scrollTop: number,
  options: VirtualScrollOptions,
): VirtualScrollResult {
  const { itemHeight, overscan = 5, containerHeight, totalItems } = options;

  const visibleItems = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    totalItems - 1,
    startIndex + visibleItems + overscan * 2,
  );

  return {
    startIndex,
    endIndex,
    visibleItems,
    offset: startIndex * itemHeight,
  };
}

// =============================================
// INTERSECTION OBSERVER UTILITIES
// =============================================

/**
 * Create optimized intersection observer
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {},
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: "50px",
    threshold: [0, 0.1, 0.5, 1],
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
}

/**
 * Lazy load images with intersection observer
 */
export function createLazyImageObserver(): IntersectionObserver {
  return createIntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.removeAttribute("data-src");
          img.classList.remove("lazy");
        }
      }
    });
  });
}

// =============================================
// CRITICAL PATH OPTIMIZATION
// =============================================

/**
 * Critical CSS injection
 */
export function injectCriticalCSS(css: string): void {
  if (typeof document === "undefined") return;

  const style = document.createElement("style");
  style.textContent = css;
  style.setAttribute("data-critical", "true");
  document.head.insertBefore(style, document.head.firstChild);
}

/**
 * Non-critical CSS loading
 */
export function loadNonCriticalCSS(href: string): void {
  if (typeof document === "undefined") return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.media = "print";
  link.onload = () => {
    link.media = "all";
  };
  document.head.appendChild(link);
}

// =============================================
// MEMORY OPTIMIZATION
// =============================================

/**
 * Object pool for reducing garbage collection
 */
export class ObjectPool<T> {
  private pool: T[] = [];
  private createFn: () => T;
  private resetFn?: (obj: T) => void;

  constructor(createFn: () => T, resetFn?: (obj: T) => void) {
    this.createFn = createFn;
    this.resetFn = resetFn;
  }

  get(): T {
    if (this.pool.length > 0) {
      return this.pool.pop()!;
    }
    return this.createFn();
  }

  release(obj: T): void {
    if (this.resetFn) {
      this.resetFn(obj);
    }
    this.pool.push(obj);
  }

  clear(): void {
    this.pool.length = 0;
  }
}

/**
 * Weak reference cache for memory-safe caching
 */
export class WeakCache<K extends object, V> {
  private cache = new WeakMap<K, V>();

  get(key: K): V | undefined {
    return this.cache.get(key);
  }

  set(key: K, value: V): void {
    this.cache.set(key, value);
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  delete(key: K): boolean {
    return this.cache.delete(key);
  }
}

// =============================================
// PERFORMANCE MONITORING
// =============================================

interface PerformanceEntry {
  name: string;
  startTime: number;
  duration?: number;
}

class PerformanceMonitor {
  private entries: Map<string, PerformanceEntry> = new Map();
  private observers: PerformanceObserver[] = [];

  /**
   * Start measuring performance
   */
  start(name: string): void {
    this.entries.set(name, {
      name,
      startTime: performance.now(),
    });
  }

  /**
   * End measuring performance
   */
  end(name: string): number | undefined {
    const entry = this.entries.get(name);
    if (!entry) return undefined;

    const duration = performance.now() - entry.startTime;
    entry.duration = duration;

    // Log slow operations
    if (duration > 16.67) {
      // Slower than 60fps
      console.warn(`Slow operation detected: ${name} took ${duration}ms`);
    }

    return duration;
  }

  /**
   * Measure function execution time
   */
  measure<T>(name: string, fn: () => T): T {
    this.start(name);
    try {
      const result = fn();
      this.end(name);
      return result;
    } catch (error) {
      this.end(name);
      throw error;
    }
  }

  /**
   * Get performance metrics
   */
  getMetrics(): Record<string, number> {
    const metrics: Record<string, number> = {};
    this.entries.forEach((entry, name) => {
      if (entry.duration !== undefined) {
        metrics[name] = entry.duration;
      }
    });
    return metrics;
  }

  /**
   * Clear all entries
   */
  clear(): void {
    this.entries.clear();
  }

  /**
   * Monitor Core Web Vitals
   */
  observeWebVitals(): void {
    if (typeof PerformanceObserver === "undefined") return;

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log("LCP:", lastEntry.startTime);
    });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log("FID:", entry.processingStart - entry.startTime);
      });
    });

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      console.log("CLS:", clsValue);
    });

    try {
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      fidObserver.observe({ entryTypes: ["first-input"] });
      clsObserver.observe({ entryTypes: ["layout-shift"] });

      this.observers.push(lcpObserver, fidObserver, clsObserver);
    } catch (error) {
      console.warn("Performance observers not supported:", error);
    }
  }

  /**
   * Cleanup observers
   */
  disconnect(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// =============================================
// BUNDLE ANALYSIS UTILITIES
// =============================================

/**
 * Analyze bundle size in development
 */
export function analyzeBundleSize(): void {
  if (process.env.NODE_ENV !== "development") return;

  const scripts = document.querySelectorAll("script[src]");
  let totalSize = 0;

  scripts.forEach(async (script) => {
    const src = (script as HTMLScriptElement).src;
    try {
      const response = await fetch(src);
      const size = parseInt(response.headers.get("content-length") || "0");
      totalSize += size;
      console.log(
        `Script: ${src.split("/").pop()} - ${(size / 1024).toFixed(2)}KB`,
      );
    } catch (error) {
      console.warn("Failed to analyze script size:", src);
    }
  });

  console.log(`Total bundle size: ${(totalSize / 1024).toFixed(2)}KB`);
}

// =============================================
// NETWORK OPTIMIZATION
// =============================================

/**
 * Optimize fetch requests with caching
 */
export function createOptimizedFetch() {
  const cache = new Map<string, Promise<Response>>();

  return function optimizedFetch(
    url: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const cacheKey = `${url}:${JSON.stringify(options)}`;

    // Return cached promise if available
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)!;
    }

    // Create and cache new request
    const request = fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        "Cache-Control": "public, max-age=3600",
      },
    });

    cache.set(cacheKey, request);

    // Clean up failed requests
    request.catch(() => {
      cache.delete(cacheKey);
    });

    return request;
  };
}

// =============================================
// FRAME BUDGET MANAGEMENT
// =============================================

/**
 * Schedule work within frame budget
 */
export function scheduleWork<T>(work: () => T, deadline?: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeRemaining = deadline || 16.67; // 60fps budget

    if ("requestIdleCallback" in window) {
      requestIdleCallback(
        (idleDeadline) => {
          if (idleDeadline.timeRemaining() > timeRemaining) {
            try {
              resolve(work());
            } catch (error) {
              reject(error);
            }
          } else {
            // Reschedule if not enough time
            scheduleWork(work, deadline).then(resolve, reject);
          }
        },
        { timeout: 5000 },
      );
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        try {
          resolve(work());
        } catch (error) {
          reject(error);
        }
      }, 0);
    }
  });
}

/**
 * Batch DOM operations for better performance
 */
export function batchDOMOperations(operations: (() => void)[]): void {
  requestAnimationFrame(() => {
    operations.forEach((op) => op());
  });
}

// =============================================
// SERVICE WORKER UTILITIES
// =============================================

/**
 * Register service worker with error handling
 */
export async function registerServiceWorker(
  scriptURL: string,
): Promise<ServiceWorkerRegistration | null> {
  if (!("serviceWorker" in navigator)) {
    console.warn("Service Worker not supported");
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.register(scriptURL);
    console.log("Service Worker registered:", registration);
    return registration;
  } catch (error) {
    console.error("Service Worker registration failed:", error);
    return null;
  }
}

/**
 * Update service worker and reload page
 */
export async function updateServiceWorker(): Promise<void> {
  if (!("serviceWorker" in navigator)) return;

  const registration = await navigator.serviceWorker.getRegistration();
  if (registration) {
    await registration.update();
    if (registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  }
}

// Initialize performance monitoring in development
if (process.env.NODE_ENV === "development") {
  performanceMonitor.observeWebVitals();
}
