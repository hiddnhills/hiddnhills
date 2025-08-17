import React, { useEffect, useState, useRef, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Music as MusicIcon,
  Headphones,
  ExternalLink,
  Disc3,
  Heart,
  Calendar,
  Download,
} from "lucide-react";

interface Track {
  id: string;
  title: string;
  spotifyId: string;
  appleId: string;
  year: string;
}

interface MusicSection {
  id: string;
  type: "hero" | "platforms" | "latest" | "discography" | "stats";
  title?: string;
  content: React.ReactNode;
}

export const LoopingMusicContent: React.FC = () => {
  const [musicPlatform, setMusicPlatform] = useState<"spotify" | "apple">(
    "spotify",
  );
  const [featuredTrack, setFeaturedTrack] = useState<
    "be-like-you" | "nirvana"
  >("be-like-you");
  const [showLatestFirst, setShowLatestFirst] = useState(true);

  // Base track catalog
  const baseTracks: Track[] = [
    {
      id: "be-like-you",
      title: "Be Like You",
      spotifyId: "6EJKQpn65MlQeCcxktgH1Q",
      appleId: "1826237123",
      year: "2025",
    }, 
    {
      id: "a-la-carte",
      title: "A La Carte Freestyle",
      spotifyId: "3DRgT0vZhGXz62CxqeX88G",
      appleId: "1818645980",
      year: "2022",
    },
    {
      id: "japanese-gin",
      title: "Japanese Gin",
      spotifyId: "5sQ27QrdoNwSPgJbwXqNQ8",
      appleId: "1776039171",
      year: "2024",
    },
    {
      id: "nirvana",
      title: "Nirvana",
      spotifyId: "6cJqW9NGTvgq1mzAVNNL6P",
      appleId: "1752050083",
      year: "2024",
    },
    {
      id: "no-creases",
      title: "No Creases",
      spotifyId: "71m24iPSvkscxvxwHrd9wA",
      appleId: "1730680897",
      year: "2024",
    },
    {
      id: "mr-misfit",
      title: "Mr. Misfit",
      spotifyId: "1dv54sWBWU2UWFzj1K4pL0",
      appleId: "1769940693",
      year: "2024",
    },
    {
      id: "deserve-it",
      title: "Deserve It",
      spotifyId: "3aTOp1tC188d23K03G8lP8",
      appleId: "1817761301",
      year: "2024",
    },
    {
      id: "no-pain-no-gain",
      title: "No Pain, No Gain",
      spotifyId: "6ti3RI65aO7PfYHSBwI8kj",
      appleId: "1773613253",
      year: "2024",
    },
    {
      id: "1oak",
      title: "1oak",
      spotifyId: "1A5RrNAyvf3cmTWNotMqST",
      appleId: "1740744079",
      year: "2024",
    },
    {
      id: "4-am",
      title: "4 AM",
      spotifyId: "0LsblhTC54CXgEfwa5oJp2",
      appleId: "1817761302",
      year: "2024",
    },
    {
      id: "rain",
      title: "Rain",
      spotifyId: "0x45kmELI1NrHJOLmpD7gZ",
      appleId: "1818669272",
      year: "2023",
    },
    {
      id: "take-freestyle",
      title: "Take Freestyle",
      spotifyId: "5Qle0IPD6xswf0hVIyIpRz",
      appleId: "1827446103",
      year: "2019",
    },
  ];

  // Latest release (newest)
  const latestTrack = baseTracks.find((track) => track.id === "be-like-you")!;

  // Current featured track
  const currentFeaturedTrack = baseTracks.find(
    (track) => track.id === featuredTrack,
  )!;

  // Dynamic track ordering based on showLatestFirst
  const tracks = useMemo(() => {
    const otherTracks = baseTracks.filter(
      (track) => track.id !== "a-la-carte" && track.id !== featuredTrack,
    );

    if (showLatestFirst) {
      return [latestTrack, currentFeaturedTrack, ...otherTracks];
    } else {
      return [currentFeaturedTrack, latestTrack, ...otherTracks];
    }
  }, [featuredTrack, showLatestFirst, latestTrack, currentFeaturedTrack]);

  // One-time session initialization logic
  useEffect(() => {
    // Randomly set initial state once per session
    const randomFeaturedTrack =
      Math.random() > 0.5 ? "nirvana" : "be-like-you";
    const randomShowLatestFirst = Math.random() > 0.5;

    setFeaturedTrack(randomFeaturedTrack);
    setShowLatestFirst(randomShowLatestFirst);
  }, []);

  // Static hero content - displayed separately
  const heroContent = (
    <div className="text-center mb-4">
      <Badge
        variant="outline"
        className="mb-1 text-white/60 border-white/30 bg-white/10 backdrop-blur-sm font-light text-xs tracking-[1px] uppercase"
      >
        <Headphones className="mr-1 h-2 w-2" />
        Music
      </Badge>
      <h1 className="text-2xl md:text-3xl font-black tracking-wide bg-gradient-to-br from-white via-artistic-pearl to-artistic-silver bg-clip-text text-transparent leading-none mb-1 uppercase font-['Montserrat']">
        .WAVS
      </h1>
      <p className="text-xs text-artistic-pearl/80 font-light tracking-wide leading-relaxed max-w-md mx-auto">
        Underground
      </p>
    </div>
  );

  // Create track content for carousel
  const createTrackContent = (track: Track) => {
    return (
      <div className="text-center space-y-3 w-full">
        <div className="mb-2">
          <h3 className="text-sm font-medium text-white mb-0.5 tracking-wide">
            {track.title}
          </h3>
          <p className="text-white/50 text-xs">{track.year}</p>
        </div>

        <div className="flex justify-center gap-2 mb-3">
          <Button
            onClick={() => setMusicPlatform("spotify")}
            size="sm"
            className={`${
              musicPlatform === "spotify"
                ? "bg-[#1DB954] text-black"
                : "bg-black/20 text-white border-white/30 hover:bg-[#1DB954] hover:text-black"
            } font-light text-xs px-3 py-1.5 transition-all duration-300 touch-manipulation`}
          >
            <Headphones className="mr-1 h-3 w-3" />
            Spotify
          </Button>
          <Button
            onClick={() => setMusicPlatform("apple")}
            size="sm"
            className={`${
              musicPlatform === "apple"
                ? "bg-white text-black"
                : "bg-black/20 text-white border-white/30 hover:bg-pink-500 hover:text-black"
            } font-light text-xs px-3 py-1.5 transition-all duration-300 touch-manipulation`}
          >
            <MusicIcon className="mr-1 h-3 w-3" />
            Apple
          </Button>
        </div>

        <div className="w-full flex flex-col">
          {musicPlatform === "spotify" && track.spotifyId ? (
            <iframe
              style={{ borderRadius: "6px", border: "none" }}
              src={`https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator&theme=0`}
              width="100%"
              height="100"
              frameBorder="0"
              allowFullScreen
              allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="w-full border-none"
            />
          ) : musicPlatform === "apple" && track.appleId ? (
            <iframe
              style={{
                borderRadius: "6px",
                border: "none",
                alignSelf: "flex-start",
              }}
              src={`https://embed.music.apple.com/us/song/${track.appleId}`}
              width="100%"
              height="70"
              frameBorder="0"
              allowFullScreen
              allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="w-full border-none"
            />
          ) : (
            <div className="bg-black/10 border border-white/10 rounded-lg p-2 text-center">
              <p className="text-white/50 text-xs">
                "{track.title}" not available on{" "}
                {musicPlatform === "spotify" ? "Spotify" : "Apple Music"}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Hero Content - Mobile Optimized */}
      <div className="pt-16 sm:pt-20 pb-6 sm:pb-8 flex justify-center px-4">
        <div className="max-w-xl px-4 sm:px-8">{heroContent}</div>
      </div>

      {/* Music Grid Container - Mobile Optimized */}
      <div className="min-h-screen pb-32 px-3 sm:px-4 md:px-8 flex justify-center">
        <div className="w-full max-w-6xl">
          {/* Grid Layout - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {tracks.map((track) => {
              const isFeatured = track.id === featuredTrack;

              return (
                <div
                  key={track.id}
                  className="relative group transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation"
                >
                  {/* Track Card - Mobile Optimized */}
                  <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 h-[200px] sm:h-[200px] flex items-start justify-center transition-all duration-300 hover:shadow-xl hover:bg-black/40 active:bg-black/50">
                    {createTrackContent(track)}
                  </div>

                  {/* Featured Badge - Bottom of card */}
                  {isFeatured && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="text-xs font-medium shadow-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-none">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
