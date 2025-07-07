import React, { Suspense, lazy, useEffect, memo } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  performanceMonitor,
  scheduleWork,
  preloadResource,
} from "@/utils/performance";
import { GlobalAudioPlayer } from "@/components/GlobalAudioPlayer";

// Simplified lazy loading to fix loading issues
const Index = lazy(() => import("./pages/Index"));
const Bio = lazy(() => import("./pages/Bio"));
const Music = lazy(() => import("./pages/Music"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Press = lazy(() => import("./pages/Press"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Optimized query client configuration
const QUERY_CLIENT_CONFIG = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount: number, error: any) => {
        // Don't retry on 4xx errors except 408, 429
        if (
          error?.status >= 400 &&
          error?.status < 500 &&
          error?.status !== 408 &&
          error?.status !== 429
        ) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      networkMode: "online",
    },
    mutations: {
      retry: 1,
      networkMode: "online",
    },
  },
};

// Create optimized query client
const queryClient = new QueryClient(QUERY_CLIENT_CONFIG);

// Optimized loading component with performance hints
const PageLoader = memo(() => {
  useEffect(() => {
    // Preload critical fonts during loading
    preloadResource(
      "https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap",
      "style",
    );
  }, []);

  return (
    <div className="min-h-screen bg-artistic-charcoal flex items-center justify-center">
      <div className="text-white/60 text-sm tracking-wider">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-white/40 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-white/40 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
});

PageLoader.displayName = "PageLoader";

// Error Boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-artistic-charcoal flex items-center justify-center">
          <div className="text-center text-white/80">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-artistic-pearl text-black rounded hover:bg-artistic-silver transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Optimized App Routes with performance monitoring
const AppRoutes = memo(() => {
  useEffect(() => {
    // Start performance monitoring
    performanceMonitor.start("app-render");

    // Preload likely next pages based on user behavior
    const preloadTimer = setTimeout(() => {
      // Preload most likely visited pages
      import("./pages/Music");
      import("./pages/Gallery");
    }, 2000);

    return () => {
      performanceMonitor.end("app-render");
      clearTimeout(preloadTimer);
    };
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/music" element={<Music />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/press" element={<Press />} />
        <Route path="/contact" element={<Contact />} />
        {/* Catch-all route - keep last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

AppRoutes.displayName = "AppRoutes";

// Main App component
const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
          <GlobalAudioPlayer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
