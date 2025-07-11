// =============================================
// BUILD OPTIMIZATION UTILITIES
// =============================================

import {
  performanceMonitor,
  injectCriticalCSS,
  registerServiceWorker,
} from "./performance";

// Critical CSS content (inline to avoid FOUC)
const CRITICAL_CSS = `
  /* Critical path CSS - inlined for zero render blocking */
  html { font-family: system-ui, sans-serif; }
  body { margin: 0; background: rgb(64,64,64); color: white; }
  .min-h-screen { min-height: 100vh; }
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .text-center { text-align: center; }
  .animate-pulse { animation: pulse 2s infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
`;

// =============================================
// RUNTIME OPTIMIZATIONS
// =============================================

/**
 * Initialize all performance optimizations
 */
export async function initializeOptimizations(): Promise<void> {
  try {
    // 1. Inject critical CSS immediately
    if (typeof document !== "undefined") {
      injectCriticalCSS(CRITICAL_CSS);
    }

    // 2. Register service worker for caching
    if (process.env.NODE_ENV === "production") {
      await registerServiceWorker("/sw.js");
    }

    // 3. Preload critical resources
    preloadCriticalResources();

    // 4. Setup performance monitoring
    if (process.env.NODE_ENV === "development") {
      performanceMonitor.observeWebVitals();
    }

    // 5. Optimize font loading
    optimizeFontLoading();

    // 6. Setup resource hints
    setupResourceHints();

    // 7. Initialize lazy loading
    initializeLazyLoading();

    console.log("✅ Performance optimizations initialized");
  } catch (error) {
    console.error("Failed to initialize optimizations:", error);
  }
}

/**
 * Preload critical resources for better Core Web Vitals
 */
function preloadCriticalResources(): void {
  if (typeof document === "undefined") return;

  const criticalResources = [
    {
      href: "https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap",
      as: "style",
    },
    {
      href: "https://cdn.builder.io/api/v1/assets/0dd1a1ded0234fbb9d750f1dcd8d1bea/img_1191-539871?format=webp&width=800",
      as: "image",
    },
  ];

  criticalResources.forEach(({ href, as }) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = as;
    if (as === "style") {
      link.onload = () => {
        link.rel = "stylesheet";
      };
    }
    document.head.appendChild(link);
  });
}

/**
 * Optimize font loading to prevent layout shifts
 */
function optimizeFontLoading(): void {
  if (typeof document === "undefined") return;

  // Font display swap for better performance
  const fontStylesheet = document.createElement("style");
  fontStylesheet.textContent = `
    @font-face {
      font-family: 'Alex Brush';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url('https://fonts.gstatic.com/s/alexbrush/v22/SZc83FzrJKuqFbwMKk6EhUXz6w.woff2') format('woff2');
    }
  `;
  document.head.appendChild(fontStylesheet);
}

/**
 * Setup resource hints for better loading performance
 */
function setupResourceHints(): void {
  if (typeof document === "undefined") return;

  const resourceHints = [
    { href: "https://cdn.builder.io", rel: "dns-prefetch" },
    { href: "https://fonts.googleapis.com", rel: "dns-prefetch" },
    { href: "https://fonts.gstatic.com", rel: "dns-prefetch" },
    { href: "https://open.spotify.com", rel: "dns-prefetch" },
    { href: "https://music.apple.com", rel: "dns-prefetch" },
    { href: "https://distrokid.com", rel: "dns-prefetch" },
  ];

  resourceHints.forEach(({ href, rel }) => {
    const link = document.createElement("link");
    link.rel = rel;
    link.href = href;
    document.head.appendChild(link);
  });
}

/**
 * Initialize lazy loading for images
 */
function initializeLazyLoading(): void {
  if (typeof window === "undefined" || !("IntersectionObserver" in window))
    return;

  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          if (src) {
            img.src = src;
            img.removeAttribute("data-src");
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        }
      });
    },
    {
      rootMargin: "50px 0px",
      threshold: 0.01,
    },
  );

  // Observe all lazy images
  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// =============================================
// BUNDLE OPTIMIZATION
// =============================================

/**
 * Tree shaking helper - dynamic imports for code splitting
 */
export const dynamicImports = {
  // Lazy load non-critical components that actually exist
  loadTooltip: () => import("@/components/ui/tooltip").catch(() => null),
  loadDialog: () => import("@/components/ui/dialog").catch(() => null),
  loadDropdown: () => import("@/components/ui/dropdown-menu").catch(() => null),

  // Example pattern for future heavy libraries (commented out)
  // loadChartLibrary: () => import("chart.js").catch(() => null),
  // loadAnimationLibrary: () => import("framer-motion").catch(() => null),
  // loadUtilityLibrary: () => import("lodash-es").catch(() => null),
};

/**
 * Conditional polyfill loading
 */
export async function loadPolyfills(): Promise<void> {
  const polyfillsNeeded = [];

  // Check for IntersectionObserver support
  if (!("IntersectionObserver" in window)) {
    // Provide a simple fallback instead of importing polyfill
    console.warn("IntersectionObserver not supported, using fallback");
    (window as any).IntersectionObserver = class {
      constructor(callback: any) {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }

  // Check for ResizeObserver support
  if (!("ResizeObserver" in window)) {
    // Provide a simple fallback instead of importing polyfill
    console.warn("ResizeObserver not supported, using fallback");
    (window as any).ResizeObserver = class {
      constructor(callback: any) {}
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  }

  // Check for requestIdleCallback support
  if (!("requestIdleCallback" in window)) {
    window.requestIdleCallback = (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions,
    ) => {
      const start = Date.now();
      return setTimeout(() => {
        callback({
          didTimeout: false,
          timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
        });
      }, 1);
    };

    window.cancelIdleCallback = (id: number) => {
      clearTimeout(id);
    };
  }

  if (polyfillsNeeded.length > 0) {
    await Promise.all(polyfillsNeeded);
    console.log("✅ Polyfills loaded");
  }
}

// =============================================
// PERFORMANCE MONITORING
// =============================================

/**
 * Report Core Web Vitals to analytics
 */
export function reportWebVitals(metric: any): void {
  // In production, send to analytics service
  if (process.env.NODE_ENV === "production") {
    // Example: Google Analytics
    // gtag('event', metric.name, {
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   event_category: 'Web Vitals',
    //   event_label: metric.id,
    //   non_interaction: true,
    // });

    console.log("Web Vital:", metric);
  }
}

/**
 * Monitor long tasks that block the main thread
 */
export function monitorLongTasks(): void {
  if (typeof PerformanceObserver === "undefined") return;

  try {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 50) {
          console.warn(`Long task detected: ${entry.duration}ms`);
          // Report to analytics in production
          if (process.env.NODE_ENV === "production") {
            reportWebVitals({
              name: "Long Task",
              value: entry.duration,
              id: `long-task-${Date.now()}`,
            });
          }
        }
      });
    });

    observer.observe({ entryTypes: ["longtask"] });
  } catch (error) {
    console.warn("Long task monitoring not supported:", error);
  }
}

/**
 * Monitor memory usage
 */
export function monitorMemoryUsage(): void {
  if (!("memory" in performance)) return;

  const checkMemory = () => {
    const memory = (performance as any).memory;
    const usedPercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;

    if (usedPercent > 80) {
      console.warn(`High memory usage: ${usedPercent.toFixed(1)}%`);
    }
  };

  // Check memory every 30 seconds
  setInterval(checkMemory, 30000);
}

// =============================================
// CRITICAL RESOURCE LOADING
// =============================================

/**
 * Load critical CSS asynchronously after initial paint
 */
export function loadCriticalCSS(): void {
  if (typeof document === "undefined") return;

  requestIdleCallback(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/critical.css";
    link.media = "print";
    link.onload = () => {
      link.media = "all";
    };
    document.head.appendChild(link);
  });
}

/**
 * Preconnect to external domains
 */
export function setupPreconnections(): void {
  if (typeof document === "undefined") return;

  const domains = [
    "https://cdn.builder.io",
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
  ];

  domains.forEach((domain) => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = domain;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
}

// =============================================
// INITIALIZATION
// =============================================

/**
 * Initialize all optimizations when DOM is ready
 */
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeOptimizations);
  } else {
    initializeOptimizations();
  }
}

// Load polyfills early
loadPolyfills();

// Setup performance monitoring
if (process.env.NODE_ENV === "development") {
  monitorLongTasks();
  monitorMemoryUsage();
}
