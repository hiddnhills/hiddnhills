import React, { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { LoopingNavigationButtons } from "@/components/LoopingNavigationButtons";
import { PresavePopup } from "@/components/PresavePopup";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";

// Slot machine alternatives for each button
const slotMachineOptions = {
  music: ["MUSIC", "TRACKS", "BEATS", "VIBES", "SOUND", "AUDIO"],
  bio: ["BIO", "STORY", "ABOUT", "ARTIST", "LIFE", "JOURNEY"],
  gallery: ["GALLERY", "PHOTOS", "VISUALS", "IMAGES", "SHOTS", "CAPTURES"],
  press: ["PRESS", "MEDIA", "NEWS", "COVERAGE", "ARTICLES", "FEATURES"],
  contact: ["CONTACT", "REACH", "EMAIL", "BOOKING", "INQUIRIES", "CONNECT"],
  links: ["LINKS", "SOCIALS", "CONNECT", "FOLLOW", "CONTACT", "REACH"],
  newMusic: [
    "NEW MUSIC",
    "NEW TRACK",
    "PRESAVE",
    "BE LIKE YOU",
    "LATEST",
    "FRESH",
  ],
};

// Vertical marquee content
const leftMarqueeItems = [
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
];

const rightMarqueeItems = [
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
];

const Index = () => {
  const [presavePopupOpen, setPresavePopupOpen] = useState(false);

  return (
    <PageLayout
      leftMarqueeItems={leftMarqueeItems}
      rightMarqueeItems={rightMarqueeItems}
    >
      <div className="h-screen relative">
        {/* Single Page Content */}
        <section className="h-full relative flex items-center justify-end">
          <div className="relative z-20 text-right px-8 max-w-lg ml-auto mr-8 lg:mr-16">
            <div className="space-y-4">
              {/* Brand Badge */}
              <div className="mb-6">
                <span className="text-artistic-silver text-xs tracking-[2px] font-light uppercase">
                  Underground Hip-Hop • Las Vegas
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-wide bg-gradient-to-br from-white via-artistic-pearl to-artistic-silver bg-clip-text text-transparent leading-none drop-shadow-2xl uppercase font-['Montserrat']">
                HIDDNHILLS
              </h1>

              {/* Minimal Tagline */}
              <p className="text-sm md:text-base text-artistic-pearl font-light tracking-wide leading-relaxed drop-shadow-xl">
                Art before ego.
              </p>

              {/* Looping Navigation Buttons */}
              <LoopingNavigationButtons
                slotMachineOptions={slotMachineOptions}
              />

              {/* Presave Button */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <Button
                  onClick={() => setPresavePopupOpen(true)}
                  className="w-full bg-white/20 text-white font-['Montserrat'] font-medium hover:bg-white/30 active:bg-white/40 transition-colors duration-300 uppercase text-sm tracking-wide rounded-md min-h-[48px] touch-manipulation"
                  size="sm"
                  type="button"
                  aria-label="Open presave popup for new music"
                >
                  <Music className="w-4 h-4 mr-2" />
                  Presave New Music
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Copyright - Bottom Right Corner */}
        <div className="absolute bottom-2 right-2 z-30">
          <div className="text-gray-400 text-[9px] font-light tracking-wide opacity-60">
            © 2025 ITSWINMEDIA
          </div>
        </div>
      </div>

      {/* Presave Popup - Auto-shows after 3 seconds and manual trigger */}
      <PresavePopup
        autoShow={true}
        delay={3000}
        isOpen={presavePopupOpen ? presavePopupOpen : undefined}
        onOpenChange={(open) => {
          setPresavePopupOpen(open);
        }}
      />
    </PageLayout>
  );
};

export default Index;
