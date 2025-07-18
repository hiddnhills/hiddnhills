import { PageLayout } from "@/components/PageLayout";
import { LoopingMusicContent } from "@/components/LoopingMusicContent";

const musicLeftMarquee = [
  "UNDERGROUND",
  "WAVS",
  "DOPE",
  "BEATS",
  "SONICS",
  "VIBES",
  "SOUND",
  "FREQUENCIES",
] as const;

const musicRightMarquee = [
  "STUDIO",
  "LYRICIST",
  "EXPLORATION",
  "DEVELOPMENT",
  "MIXING",
  "MASTERING",
  "STORYTELLING",
  "INNOVATION",
] as const;

export function Music() {
  return (
    <PageLayout
      leftMarqueeItems={musicLeftMarquee}
      rightMarqueeItems={musicRightMarquee}
    >
      <div className="min-h-screen relative">
        <LoopingMusicContent />

        {/* Copyright - Bottom Right Corner */}
        <div className="absolute bottom-2 right-2 z-30">
          <div className="text-gray-400 text-[9px] font-light tracking-wide opacity-60">
            © 2025 ITSWINMEDIA
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

// Default export for lazy loading
export default Music;
