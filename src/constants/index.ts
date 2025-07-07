// =============================================
// GLOBAL CONSTANTS
// =============================================

// App metadata
export const APP_CONFIG = {
  name: "HIDDNHILLS",
  tagline: "Art before ego.",
  description: "Underground Hip-Hop Visionary from Las Vegas",
  copyright: "© 2025 ITSWINMEDIA",
  established: "Since 2016",
} as const;

// External links
export const EXTERNAL_LINKS = {
  spotify: "https://open.spotify.com/artist/3Tuyh4C0HtGBaqmSdvhGWS",
  appleMusic: "https://music.apple.com/us/artist/hiddnhills/1727680628",
  instagram: "https://www.instagram.com/hiddn.hills/",
  youtube: "https://youtube.com/@officialhiddnhills?si=Ybw5DFS2ejMgHSTe",
  linkTree: "https://linktr.ee/hiddnhills",
  email: "hiddnhills@gmail.com",
  phone: "702-723-6577",
  pressEmail: "press@hiddnhills.com",
} as const;

// Navigation constants
export const SCROLL_THRESHOLD = 50;
export const NAVIGATION_HEIGHT = 80; // 20 * 4 = 80px (h-20)

// Animation timings (in milliseconds)
export const ANIMATION_DURATIONS = {
  quick: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 1000,
  navigation: 500,
  slotMachine: {
    interval: 80,
    minDuration: 500,
    maxDuration: 1000,
  },
  fade: {
    stagger: 150,
    duration: 300,
    cycleInterval: 18000,
  },
} as const;

// Breakpoints (Tailwind default values)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

// Z-index levels
export const Z_INDEX = {
  base: 0,
  marquee: 10,
  content: 20,
  footer: 25,
  copyright: 30,
  navigation: 50,
  modal: 100,
  tooltip: 200,
} as const;

// Color palette (custom artistic colors)
export const COLORS = {
  artistic: {
    charcoal: "rgb(64, 64, 64)",
    smoke: "rgb(128, 128, 128)",
    ash: "rgb(96, 96, 96)",
    silver: "rgb(192, 192, 192)",
    mercury: "rgb(144, 144, 144)",
    platinum: "rgb(224, 224, 224)",
    fog: "rgb(176, 176, 176)",
    pearl: "rgb(240, 240, 240)",
  },
  semantic: {
    success: "rgb(34, 197, 94)",
    warning: "rgb(234, 179, 8)",
    error: "rgb(239, 68, 68)",
    info: "rgb(59, 130, 246)",
  },
} as const;

// Typography scale
export const TYPOGRAPHY = {
  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
  },
  letterSpacing: {
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
} as const;

// Default marquee content
export const DEFAULT_MARQUEE_ITEMS = {
  left: [
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
  ],
  right: [
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
  ],
} as const;

// Page-specific marquee content
export const PAGE_MARQUEE_ITEMS = {
  bio: {
    left: [
      "BIOGRAPHY",
      "STORY",
      "JOURNEY",
      "ORIGINS",
      "EVOLUTION",
      "IDENTITY",
      "PASSION",
      "PURPOSE",
      "GROWTH",
      "VISION",
    ],
    right: [
      "ARTIST",
      "CREATOR",
      "SONGWRITER",
      "PERFORMER",
      "VISIONARY",
      "INNOVATOR",
      "AUTHENTIC",
      "DEDICATED",
      "FOCUSED",
      "DRIVEN",
    ],
  },
  music: {
    left: [
      "TRACKS",
      "BEATS",
      "RHYTHM",
      "MELODY",
      "HARMONY",
      "PRODUCTION",
      "STUDIO",
      "RECORDING",
      "MIXING",
      "MASTERING",
    ],
    right: [
      "STREAMING",
      "PLAYLIST",
      "ALBUM",
      "SINGLE",
      "EP",
      "RELEASE",
      "DROP",
      "PREMIERE",
      "DEBUT",
      "REPEAT",
    ],
  },
  gallery: {
    left: [
      "GALLERY",
      "PHOTOS",
      "VISUALS",
      "MOMENTS",
      "CAPTURES",
      "SHOTS",
      "FRAMES",
      "SCENES",
      "IMAGES",
      "PICTURES",
    ],
    right: [
      "GALLERY",
      "PHOTOGRAPHY",
      "VISUAL",
      "ARTISTIC",
      "CREATIVE",
      "AESTHETIC",
      "PORTFOLIO",
      "COLLECTION",
      "SHOWCASE",
      "EXHIBITION",
    ],
  },
} as const;

// Slot machine button alternatives
export const SLOT_MACHINE_OPTIONS = {
  music: ["MUSIC", "TRACKS", "BEATS", "VIBES", "SOUND", "AUDIO"],
  bio: ["BIO", "STORY", "ABOUT", "ARTIST", "LIFE", "JOURNEY"],
  gallery: ["GALLERY", "PHOTOS", "VISUALS", "IMAGES", "SHOTS", "CAPTURES"],
  press: ["PRESS", "MEDIA", "NEWS", "COVERAGE", "ARTICLES", "FEATURES"],
  contact: ["CONTACT", "REACH", "EMAIL", "BOOKING", "INQUIRIES", "CONNECT"],
  links: ["LINKS", "SOCIALS", "CONNECT", "FOLLOW", "CONTACT", "REACH"],
  instagram: ["INSTAGRAM", "PHOTOS", "FOLLOW", "SOCIAL", "VISUAL", "CONNECT"],
} as const;

// Performance constants
export const PERFORMANCE = {
  debounceMs: 100,
  throttleMs: 150,
  rafThrottleEnabled: true,
  lazyLoadingOffset: 100, // pixels
  imageOptimization: {
    quality: 80,
    format: "webp",
    maxWidth: 800,
  },
} as const;

// Accessibility constants
export const A11Y = {
  skipLinkText: "Skip to main content",
  focusRingClasses: "focus:outline-none focus:ring-2 focus:ring-artistic-pearl",
  srOnlyClasses: "sr-only focus:not-sr-only",
} as const;

// Error messages
export const ERROR_MESSAGES = {
  generic: "Something went wrong",
  network: "Network error. Please check your connection.",
  notFound: "Page not found",
  loading: "Loading...",
} as const;
