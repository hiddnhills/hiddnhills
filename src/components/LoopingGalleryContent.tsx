import React, {
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import { cn, debounce } from "@/utils";
import { X, Camera, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EXTERNAL_LINKS } from "@/constants";
import type { Photo, ViewportDimensions, PhotoLayout } from "@/types";

// Constants - Mobile Optimized
const LAYOUT_CONFIG = {
  MIN_PHOTO_SIZE: 30,
  MAX_PHOTO_SIZE: 150,
  MAX_PLACEMENT_ATTEMPTS: 80, // Reduced for mobile performance
  OVERLAP_THRESHOLD: 2, // Tighter spacing on mobile
  MIN_VIEWPORT_WIDTH: 240, // Support smaller screens
  SAFE_PADDING: 20,
  ASPECT_RATIO_VARIANCE: 0.3,
} as const;

const Z_INDEX = {
  base: 1,
  content: 10,
  overlay: 20,
} as const;

const ANIMATION_CONFIG = {
  PHOTO_TRANSITION: 600, // Faster on mobile
  HOVER_TRANSITION: 200, // Snappier touch response
  FADE_CYCLE_INTERVAL: 15000, // More frequent on mobile
  STAGGER_DELAY: 60, // Faster loading on mobile
} as const;

// Optimized Photo Component with advanced performance patterns
const PhotoComponent = memo<{
  layout: PhotoLayout;
  isVisible: boolean;
  index: number;
  onPhotoClick: (photo: Photo) => void;
}>(({ layout, isVisible, index, onPhotoClick }) => {
  const containerStyle = useMemo(
    () => ({
      left: `${layout.x}px`,
      top: `${layout.y}px`,
      width: `${layout.width}px`,
      height: `${layout.height}px`,
      transform: "translateZ(0)",
      zIndex: isVisible ? Z_INDEX.content + index : Z_INDEX.base + index,
    }),
    [layout.x, layout.y, layout.width, layout.height, isVisible, index],
  );

  const imageStyle = useMemo(
    () => ({
      aspectRatio: layout.photo.aspectRatio,
      objectFit: "cover" as const,
      willChange: "transform",
    }),
    [layout.photo.aspectRatio],
  );

  const containerClassName = useMemo(
    () =>
      cn(
        "absolute transition-opacity ease-in-out group cursor-pointer will-change-transform hover:z-50 active:z-50 touch-manipulation",
        `duration-${ANIMATION_CONFIG.PHOTO_TRANSITION}`,
        isVisible ? "opacity-100" : "opacity-40",
      ),
    [isVisible],
  );

  const handleClick = useCallback(() => {
    onPhotoClick(layout.photo);
  }, [onPhotoClick, layout.photo]);

  return (
    <div
      className={containerClassName}
      style={containerStyle}
      onClick={handleClick}
    >
      <div className="relative w-full h-full rounded-sm overflow-hidden shadow-xl border border-white/10 bg-black/20 backdrop-blur-sm">
        <img
          src={layout.photo.imageUrl}
          alt={layout.photo.title || "Gallery image"}
          className="w-full h-full object-cover group-hover:scale-105 group-active:scale-105 transition-transform duration-300 ease-out touch-manipulation"
          style={{ ...imageStyle, imageRendering: "high-quality" }}
          loading="lazy"
          decoding="async"
          fetchpriority={isVisible ? "high" : "low"}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            transitionDuration: `${ANIMATION_CONFIG.HOVER_TRANSITION}ms`,
          }}
        />
      </div>
    </div>
  );
});

PhotoComponent.displayName = "PhotoComponent";

// Shuffled gallery photos data (15 images total)
const GALLERY_PHOTOS: readonly Photo[] = [
  {
    id: "photo-7",
    title: "",
    category: "",
    imageUrl:
      "https://cdn.builder.io/api/v1/assets/0dd1a1ded0234fbb9d750f1dcd8d1bea/img_7750-709fb4?format=webp&width=800",
    year: "",
    aspectRatio: 0.75,
  },
  {
    id: "photo-14",
    title: "",
    category: "",
    imageUrl:
      "https://cdn.builder.io/api/v1/assets/0dd1a1ded0234fbb9d750f1dcd8d1bea/untitled-3000-x-3000-px-.png-805314?format=webp&width=800",
    year: "",
    aspectRatio: 1.0,
  },
  {
    id: "photo-4",
    title: "",
    category: "",
    imageUrl:
      "https://cdn.builder.io/api/v1/assets/0dd1a1ded0234fbb9d750f1dcd8d1bea/img_2323-d741ed?format=webp&width=800",
    year: "",
    aspectRatio: 0.75,
  },
  {
    id: "photo-11",
    title: "",
    category: "",
    imageUrl:
      "https://cdn.builder.io/api/v1/assets/0dd1a1ded0234fbb9d750f1dcd8d1bea/img_4557-f7c69d?format=webp&width=800",
    year: "",
    aspectRatio: 0.75,
  },
  {
    id: "photo-2",
    title: "",
    category: "",
    imageUrl:
      "https://cdn.builder.io/api/v1/assets/0dd1a1ded0234fbb9d750f1dcd8d1bea/img_1197-0e2852?format=webp&width=800",
    year: "",
    aspectRatio: 0.75,
  },
  {
    id: "photo-18",
    title: "",
    category: "",
    imageUrl:
      "https://cdn.builder.io/api/v1/assets/0dd1a1ded0234fbb9d750f1dcd8d1bea/img_7654-4ee7a6?format=webp&width=800",
    year: "",
    aspectRatio: 0.8,
  },
  {
    id: "photo-9",
    title: "",
    category: "",
    imageUrl:
      "https://cdn.builder.io/api/v1/assets/0dd1a1ded0234fbb9d750f1dcd8d1bea/img_7753-15685e?format=webp&width=800",
    year: "",
    aspectRatio: 0.75,
  },
  {
    id: "photo-15",
    title: "",
    category: "",
    imageUrl:
      "https://cdn.builder.io/api/v1/assets/0dd1a1ded0234fbb9d750f1dcd8d1bea/untitled-design-1-1eb737?format=webp&width=800",
    year: "",
    aspectRatio: 1.0,
  },
  {
    id: "photo-1",
    title: "",
    category: "",
    imageUrl:
      "https://cdn.builder.io/api/v1/assets/0dd1a1ded0234fbb9d750f1dcd8d1bea/img_1191-539871?format=webp&width=800",
    year: "",
    aspectRatio: 0.75,
  },
  {
    id: "photo-6",
    title: "",
    category: "",
    imageUrl:
      "https://cdn.builder.io/api/v1/assets/0dd1a1ded0234fbb9d750f1dcd8d1bea/img_7749-6ff9b3?format=webp&width=800",
    year: "",
    aspectRatio: 0.75,
  },
  {
    id: "photo-13",
    title: "",
    category: "",
    imageUrl:
      "https://cdn.builder.io/api/v1/assets/0dd1a1ded0234fbb9d750f1dcd8d1bea/img_4427-ce3262?format=webp&width=800",
    year: "",
    aspectRatio: 0.75,
  },
  {
    id: "photo-3",
    title: "",
    category: "",
    imageUrl:
      "https://cdn.builder.io/api/v1/assets/0dd1a1ded0234fbb9d750f1dcd8d1bea/img_2066-d1b872?format=webp&width=800",
    year: "",
    aspectRatio: 1.33,
  },
  {
    id: "photo-17",
    title: "",
    category: "",
    imageUrl:
      "https://cdn.builder.io/api/v1/assets/0dd1a1ded0234fbb9d750f1dcd8d1bea/untitled-design.png-f980f5?format=webp&width=800",
    year: "",
    aspectRatio: 1.0,
  },
  {
    id: "photo-10",
    title: "",
    category: "",
    imageUrl:
      "https://cdn.builder.io/api/v1/assets/0dd1a1ded0234fbb9d750f1dcd8d1bea/img_4382-cd2f20?format=webp&width=800",
    year: "",
    aspectRatio: 0.75,
  },
  {
    id: "photo-5",
    title: "",
    category: "",
    imageUrl:
      "https://cdn.builder.io/api/v1/assets/0dd1a1ded0234fbb9d750f1dcd8d1bea/img_2671-2a3d7a?format=webp&width=800",
    year: "",
    aspectRatio: 0.75,
  },
] as const;

// Custom hook for viewport management - Mobile Optimized
const useViewportDimensions = () => {
  const [viewportDimensions, setViewportDimensions] =
    useState<ViewportDimensions>({ width: 800, height: 600 }); // Default SSR-safe values
  const rafRef = useRef<number>();

  const updateDimensions = useCallback(() => {
    try {
      // Check if window is available (SSR safety)
      if (typeof window === "undefined") return;

      // Enhanced mobile detection and sizing
      const isMobile = window.innerWidth < 640;
      const isSmallMobile = window.innerWidth < 480;
      const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;

      let safePadding = LAYOUT_CONFIG.SAFE_PADDING;
      let headerFooterSpace = 160;

      if (isSmallMobile) {
        safePadding = 8;
        headerFooterSpace = 140;
      } else if (isMobile) {
        safePadding = 12;
        headerFooterSpace = 150;
      } else if (isTablet) {
        safePadding = 16;
        headerFooterSpace = 170;
      }

      const availableWidth = Math.max(
        isMobile ? 240 : LAYOUT_CONFIG.MIN_VIEWPORT_WIDTH,
        window.innerWidth - safePadding,
      );

      // Better mobile height calculation accounting for mobile browsers
      const viewportHeight =
        window.visualViewport?.height || window.innerHeight;
      const availableHeight = Math.max(
        isSmallMobile ? 250 : isMobile ? 280 : isTablet ? 350 : 400,
        viewportHeight - safePadding - headerFooterSpace,
      );

      setViewportDimensions((prev) => {
        if (
          Math.abs(prev.width - availableWidth) > 3 ||
          Math.abs(prev.height - availableHeight) > 3
        ) {
          return { width: availableWidth, height: availableHeight };
        }
        return prev;
      });
    } catch (error) {
      console.warn("Error updating viewport dimensions:", error);
    }
  }, []);

  const throttledUpdate = useMemo(
    () => debounce(updateDimensions, 150),
    [updateDimensions],
  );

  useLayoutEffect(() => {
    updateDimensions();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", throttledUpdate);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", throttledUpdate);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateDimensions, throttledUpdate]);

  return viewportDimensions;
};

// Advanced Tetris layout algorithm
const useTetrisLayout = (
  photos: readonly Photo[],
  viewportWidth: number,
  viewportHeight: number,
): PhotoLayout[] => {
  return useMemo(() => {
    if (!photos.length || viewportWidth <= 0 || viewportHeight <= 0) {
      return [];
    }

    const layouts: PhotoLayout[] = [];
    const occupiedSpaces: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
    }> = [];

    const isSpaceOccupied = (
      x: number,
      y: number,
      width: number,
      height: number,
    ): boolean => {
      return occupiedSpaces.some((space) => {
        const overlap =
          x < space.x + space.width - LAYOUT_CONFIG.OVERLAP_THRESHOLD &&
          x + width > space.x + LAYOUT_CONFIG.OVERLAP_THRESHOLD &&
          y < space.y + space.height - LAYOUT_CONFIG.OVERLAP_THRESHOLD &&
          y + height > space.y + LAYOUT_CONFIG.OVERLAP_THRESHOLD;
        return overlap;
      });
    };

    const calculateScore = (x: number, y: number): number => {
      let score = 0;
      // Prefer higher positions (top of screen)
      score += (viewportHeight - y) * 0.3;
      // Strong preference for center positioning to avoid right-side bias
      const centerDistance = Math.abs(x - viewportWidth / 2);
      score += (viewportWidth / 2 - centerDistance) * 0.5;
      // Add randomization to break ties and create more natural distribution
      score += Math.random() * 5;
      score += occupiedSpaces.length * 10;
      return score;
    };

    // Process photos with smart sizing
    photos.forEach((photo) => {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < LAYOUT_CONFIG.MAX_PLACEMENT_ATTEMPTS) {
        // Enhanced mobile-first photo sizing
        const isMobile = viewportWidth < 640;
        const isSmallMobile = viewportWidth < 480;
        const isTablet = viewportWidth >= 640 && viewportWidth < 1024;

        let minSize = LAYOUT_CONFIG.MIN_PHOTO_SIZE;
        let maxSize = LAYOUT_CONFIG.MAX_PHOTO_SIZE;

        if (isSmallMobile) {
          minSize = 25;
          maxSize = 60;
        } else if (isMobile) {
          minSize = 30;
          maxSize = 75;
        } else if (isTablet) {
          minSize = 45;
          maxSize = 110;
        }

        const baseSize = minSize + Math.random() * (maxSize - minSize);
        const width = Math.round(baseSize);
        const height = Math.round(baseSize / photo.aspectRatio);

        let bestPosition: { x: number; y: number } | null = null;
        let bestScore = -Infinity;

        const stepSize = Math.max(
          isSmallMobile ? 3 : isMobile ? 4 : 5,
          Math.min(width, height) / (isMobile ? 6 : 8),
        );

        // Use alternating scan pattern to avoid left/right bias
        const scanFromLeft = Math.random() > 0.5;

        for (let y = 0; y <= viewportHeight - height; y += stepSize) {
          const xStart = scanFromLeft ? 0 : viewportWidth - width;
          const xEnd = scanFromLeft ? viewportWidth - width : 0;
          const xStep = scanFromLeft ? stepSize : -stepSize;

          for (
            let x = xStart;
            scanFromLeft ? x <= xEnd : x >= xEnd;
            x += xStep
          ) {
            if (
              x >= 0 &&
              x <= viewportWidth - width &&
              !isSpaceOccupied(x, y, width, height)
            ) {
              const score = calculateScore(x, y);
              if (score > bestScore) {
                bestPosition = { x, y };
                bestScore = score;
              }
            }
          }
        }

        if (bestPosition) {
          layouts.push({
            photo,
            x: bestPosition.x,
            y: bestPosition.y,
            width,
            height,
          });

          occupiedSpaces.push({
            x: bestPosition.x,
            y: bestPosition.y,
            width,
            height,
          });

          placed = true;
        }

        attempts++;
      }

      // Emergency placement if needed
      if (!placed) {
        const fallbackSize = LAYOUT_CONFIG.MIN_PHOTO_SIZE;
        const width = fallbackSize;
        const height = Math.round(fallbackSize / photo.aspectRatio);

        const x = Math.random() * Math.max(0, viewportWidth - width);
        const y = Math.random() * Math.max(0, viewportHeight - height);

        layouts.push({
          photo,
          x,
          y,
          width,
          height,
        });
      }
    });

    return layouts;
  }, [photos, viewportWidth, viewportHeight]);
};

export const LoopingGalleryContent = memo(() => {
  try {
    // Early safety check
    if (!GALLERY_PHOTOS || GALLERY_PHOTOS.length === 0) {
      return (
        <div className="flex items-center justify-center h-screen text-white">
          Loading gallery...
        </div>
      );
    }

    const [mounted, setMounted] = useState(false);
    const [visiblePhotos, setVisiblePhotos] = useState<Set<string>>(new Set());
    const [blinkingPhotos, setBlinkingPhotos] = useState<Set<string>>(
      new Set(),
    );
    const [zoomedPhoto, setZoomedPhoto] = useState<Photo | null>(null);

    // Ensure component is mounted before running client-side operations
    useEffect(() => {
      setMounted(true);
    }, []);

    const handlePhotoClick = useCallback((photo: Photo) => {
      setZoomedPhoto(photo);
    }, []);

    const handleCloseZoom = useCallback(() => {
      setZoomedPhoto(null);
    }, []);

    // Keyboard escape support
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && zoomedPhoto) {
          handleCloseZoom();
        }
      };

      if (zoomedPhoto) {
        document.addEventListener("keydown", handleKeyDown);
        // Prevent body scroll when modal is open
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
      };
    }, [zoomedPhoto, handleCloseZoom]);

    // Simple staggered fade-in animation for grid
    useEffect(() => {
      if (!mounted || GALLERY_PHOTOS.length === 0) return;

      let currentIndex = 0;
      const animateNext = () => {
        if (currentIndex < GALLERY_PHOTOS.length) {
          const photo = GALLERY_PHOTOS[currentIndex];
          if (photo && photo.id) {
            setVisiblePhotos((prev) => new Set([...prev, photo.id]));
          }
          currentIndex++;
          if (currentIndex < GALLERY_PHOTOS.length) {
            setTimeout(animateNext, 100);
          }
        }
      };

      const timeoutId = setTimeout(animateNext, 200);
      return () => clearTimeout(timeoutId);
    }, [mounted]);

    // Continuous slow blinking effect - one image at a time
    useEffect(() => {
      if (!mounted || GALLERY_PHOTOS.length === 0) return;

      const blinkInterval = setInterval(
        () => {
          // Randomly select only 1 photo to blink
          const randomIndex = Math.floor(Math.random() * GALLERY_PHOTOS.length);
          const randomPhoto = GALLERY_PHOTOS[randomIndex];

          if (randomPhoto && randomPhoto.id) {
            const photoId = randomPhoto.id;

            // Start slow blink (make it dimmer)
            setBlinkingPhotos(new Set([photoId]));

            // End blink after 800ms for slow effect
            setTimeout(() => {
              setBlinkingPhotos(new Set());
            }, 800);
          }
        },
        3000 + Math.random() * 2000,
      ); // Random interval between 3-5 seconds

      return () => clearInterval(blinkInterval);
    }, [mounted]);

    // Show loading state during SSR or before mount
    if (!mounted) {
      return (
        <div className="flex items-center justify-center h-screen text-white">
          <div className="text-white/60 text-sm tracking-wider">
            Loading gallery...
          </div>
        </div>
      );
    }

    return (
      <>
        {/* Gallery Container - Properly sized within page margins */}
        <div className="min-h-screen pt-16 pb-20 px-4 sm:px-8 md:px-12 flex flex-col items-center justify-center">
          {/* Hero Section - Centered Above Gallery */}
          <div className="text-center mb-8">
            <div className="mb-2">
              <Badge
                variant="outline"
                className="text-white border-white/50 bg-white/20 backdrop-blur-md font-light text-[10px] sm:text-xs tracking-[1px] uppercase shadow-xl border px-2 py-1 sm:px-3 sm:py-2"
              >
                <Camera className="mr-1 h-2 w-2" />
                Visuals
              </Badge>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide bg-gradient-to-br from-white via-artistic-pearl to-artistic-silver bg-clip-text text-transparent leading-none uppercase font-['Montserrat']">
              OVER TIME
            </h1>
          </div>

          {/* Grid Photo Layout - Optimized for 15 images */}
          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
              {GALLERY_PHOTOS.map((photo, index) => {
                const isVisible = visiblePhotos.has(photo.id);
                const isBlinking = blinkingPhotos.has(photo.id);

                return (
                  <div
                    key={photo.id}
                    className={`group cursor-pointer transition-all duration-500 ease-in-out ${
                      isVisible
                        ? isBlinking
                          ? "opacity-20"
                          : "opacity-100"
                        : "opacity-40"
                    }`}
                    onClick={() => handlePhotoClick(photo)}
                  >
                    <div className="relative w-full aspect-square overflow-hidden rounded-sm shadow-xl border border-white/10 bg-black/20 backdrop-blur-sm">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title || "Gallery image"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                        style={{ imageRendering: "high-quality" }}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vibes Toolbar - Centered Below Gallery */}
          <div className="mt-8 z-30">
            <a
              href={EXTERNAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Badge
                variant="outline"
                className="text-white border-white/50 bg-white/20 backdrop-blur-md font-light text-[9px] sm:text-[10px] tracking-[1px] uppercase shadow-xl border px-2 py-1 sm:px-3 sm:py-1.5 h-auto touch-manipulation"
              >
                <ExternalLink className="mr-1 h-2 w-2 sm:h-2.5 sm:w-2.5" />
                vibes
              </Badge>
            </a>
          </div>
        </div>

        {/* Zoom Modal - Mobile Optimized */}
        {zoomedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={handleCloseZoom}
            role="dialog"
            aria-modal="true"
            aria-labelledby="zoom-modal-title"
          >
            <div className="relative max-w-[95vw] max-h-[95vh] p-2 sm:p-4">
              {/* Close Button - Mobile Optimized */}
              <button
                onClick={handleCloseZoom}
                className="absolute top-1/2 -translate-y-1/2 -right-1 sm:-right-2 z-10 p-2 sm:p-3 bg-black/90 hover:bg-black text-white rounded-full transition-all duration-200 hover:scale-110 active:scale-95 border border-white/20 touch-manipulation"
                aria-label="Close zoom view"
                autoFocus
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>

              {/* Escape Instructions - Hidden on mobile, visible on desktop */}
              <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 bg-black/80 text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs backdrop-blur-sm border border-white/20 hidden sm:block">
                Press ESC or click outside to close
              </div>

              {/* Mobile tap instruction */}
              <div className="absolute top-2 left-2 z-10 bg-black/80 text-white px-2 py-1 rounded-full text-[10px] backdrop-blur-sm border border-white/20 sm:hidden">
                Tap outside to close
              </div>

              {/* Zoomed Image - Mobile Optimized */}
              <img
                id="zoom-modal-title"
                src={zoomedPhoto.imageUrl}
                alt={zoomedPhoto.title || "Zoomed gallery image"}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl touch-manipulation"
                onClick={(e) => e.stopPropagation()}
                style={{ imageRendering: "high-quality" }}
              />
            </div>
          </div>
        )}
      </>
    );
  } catch (error) {
    console.error("LoopingGalleryContent error:", error);
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Gallery Error</h2>
          <p className="text-white/60">Please refresh the page</p>
        </div>
      </div>
    );
  }
});

LoopingGalleryContent.displayName = "LoopingGalleryContent";
