import React from "react";
import { PageLayout } from "@/components/PageLayout";
import { LoopingGalleryContent } from "@/components/LoopingGalleryContent";

const galleryLeftMarquee = [
  "VISUAL JOURNAL",
  "BEHIND THE LENS",
  "MOMENTS CAPTURED",
  "ARTISTIC VISION",
] as const;

const galleryRightMarquee = [
  "FRAME BY FRAME",
  "AESTHETIC VISION",
  "CANDID MOMENTS",
  "VISUAL NARRATIVE",
] as const;

function Gallery() {
  return (
    <PageLayout
      leftMarqueeItems={galleryLeftMarquee}
      rightMarqueeItems={galleryRightMarquee}
    >
      <div className="h-screen relative">
        <LoopingGalleryContent />

        {/* Copyright */}
        <div className="absolute bottom-2 right-2 z-40">
          <div className="text-gray-400 text-[9px] font-light tracking-wide opacity-60">
            © 2025 ITSWINMEDIA
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default Gallery;
