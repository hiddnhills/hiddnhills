import { PageLayout } from "@/components/PageLayout";
import { LoopingMusicContent } from "@/components/LoopingMusicContent";

const musicLeftMarquee = [
  "UNDERGROUND VIBES",
  "WAVS & FREQUENCIES",
  "ELECTRONIC SYNTHESIS",
  "BEAT CONSTRUCTION",
  "SONIC LANDSCAPES",
  "AUDIO ENGINEERING",
  "SOUND DESIGN",
  "MUSIC PRODUCTION",
] as const;

const musicRightMarquee = [
  "STUDIO SESSIONS",
  "CREATIVE PROCESS",
  "SOUND EXPLORATION",
  "TRACK DEVELOPMENT",
  "MIXING & MASTERING",
  "MUSICAL JOURNEY",
  "SONIC EXPERIMENTATION",
  "AUDIO INNOVATION",
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
