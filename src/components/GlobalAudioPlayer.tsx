import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  Music,
  SkipBack,
  SkipForward,
  ExternalLink,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/utils";

interface Track {
  id: string;
  title: string;
  artist: string;
  spotifyTrackId: string;
  spotifyUrl: string;
  appleUrl: string;
  appleAlbumId: string;
  appleTrackId: string;
  year: string;
}

// Real HIDDNHILLS tracks with the provided Spotify URLs
const HIDDNHILLS_TRACKS: Track[] = [
  {
    id: "a-la-carte",
    title: "A La Carte Freestyle",
    artist: "HIDDNHILLS",
    spotifyTrackId: "3DRgT0vZhGXz62CxqeX88G",
    spotifyUrl: "https://open.spotify.com/track/3DRgT0vZhGXz62CxqeX88G",
    appleUrl:
      "https://music.apple.com/us/album/a-la-carte/1818645980?i=1818645980",
    appleAlbumId: "1818645980",
    appleTrackId: "1818645980",
    year: "2025",
  },
  {
    id: "be-like-you",
    title: "Be Like You",
    artist: "HIDDNHILLS",
    spotifyTrackId: "6EJKQpn65MlQeCcxktgH1Q",
    spotifyUrl: "https://open.spotify.com/album/1dKD4LfiPFrJJzAQjQc1dU?si=9Ze0OdYERw-hbd16rRBi7w",
    appleUrl:
      "https://music.apple.com/us/album/be-like-you-single/1826237122",
    appleAlbumId: "1826237123",
    appleTrackId: "1826237123",
    year: "2025",
  },
  {
    id: "take-freestyle",
    title: "Take Freestyle",
    artist: "HIDDNHILLS",
    spotifyTrackId: "5Qle0IPD6xswf0hVIyIpRz",
    spotifyUrl: "https://open.spotify.com/album/3F6mZSCFGCQVepbcHXVrtM?si=nknn_fTaSqGtxTO8_lLl0A",
    appleUrl:
      "https://music.apple.com/us/album/take-freestyle-single/1827446102",
    appleAlbumId: "1827446103",
    appleTrackId: "1827446103",
    year: "2019",
  },
  {
    id: "japanese-gin",
    title: "Japanese Gin",
    artist: "HIDDNHILLS",
    spotifyTrackId: "5sQ27QrdoNwSPgJbwXqNQ8",
    spotifyUrl: "https://open.spotify.com/track/5sQ27QrdoNwSPgJbwXqNQ8",
    appleUrl:
      "https://music.apple.com/us/album/japanese-gin/1776039171?i=1776039171",
    appleAlbumId: "1776039171",
    appleTrackId: "1776039171",
    year: "2024",
  },
  {
    id: "nirvana",
    title: "Nirvana",
    artist: "HIDDNHILLS",
    spotifyTrackId: "6cJqW9NGTvgq1mzAVNNL6P",
    spotifyUrl: "https://open.spotify.com/track/6cJqW9NGTvgq1mzAVNNL6P",
    appleUrl:
      "https://music.apple.com/us/album/nirvana/1752050083?i=1752050083",
    appleAlbumId: "1752050083",
    appleTrackId: "1752050083",
    year: "2024",
  },
  {
    id: "no-creases",
    title: "No Creases",
    artist: "HIDDNHILLS",
    spotifyTrackId: "71m24iPSvkscxvxwHrd9wA",
    spotifyUrl: "https://open.spotify.com/track/71m24iPSvkscxvxwHrd9wA",
    appleUrl:
      "https://music.apple.com/us/album/no-creases/1730680897?i=1730680897",
    appleAlbumId: "1730680897",
    appleTrackId: "1730680897",
    year: "2024",
  },
  {
    id: "mr-misfit",
    title: "Mr. Misfit",
    artist: "HIDDNHILLS",
    spotifyTrackId: "1dv54sWBWU2UWFzj1K4pL0",
    spotifyUrl: "https://open.spotify.com/track/1dv54sWBWU2UWFzj1K4pL0",
    appleUrl:
      "https://music.apple.com/us/album/mr-misfit/1769940693?i=1769940693",
    appleAlbumId: "1769940693",
    appleTrackId: "1769940693",
    year: "2024",
  },
  {
    id: "deserve-it",
    title: "Deserve It",
    artist: "HIDDNHILLS",
    spotifyTrackId: "3aTOp1tC188d23K03G8lP8",
    spotifyUrl: "https://open.spotify.com/track/3aTOp1tC188d23K03G8lP8",
    appleUrl:
      "https://music.apple.com/us/album/deserve-it/1817761301?i=1817761301",
    appleAlbumId: "1817761301",
    appleTrackId: "1817761301",
    year: "2024",
  },
  {
    id: "no-pain-no-gain",
    title: "No Pain, No Gain",
    artist: "HIDDNHILLS",
    spotifyTrackId: "6ti3RI65aO7PfYHSBwI8kj",
    spotifyUrl: "https://open.spotify.com/track/6ti3RI65aO7PfYHSBwI8kj",
    appleUrl:
      "https://music.apple.com/us/album/no-pain-no-gain/1773613253?i=1773613253",
    appleAlbumId: "1773613253",
    appleTrackId: "1773613253",
    year: "2024",
  },
  {
    id: "1oak",
    title: "1oak",
    artist: "HIDDNHILLS",
    spotifyTrackId: "1A5RrNAyvf3cmTWNotMqST",
    spotifyUrl: "https://open.spotify.com/track/1A5RrNAyvf3cmTWNotMqST",
    appleUrl: "https://music.apple.com/us/album/1oak/1740744079?i=1740744079",
    appleAlbumId: "1740744079",
    appleTrackId: "1740744079",
    year: "2024",
  },
  {
    id: "4-am",
    title: "4 AM",
    artist: "HIDDNHILLS",
    spotifyTrackId: "0LsblhTC54CXgEfwa5oJp2",
    spotifyUrl: "https://open.spotify.com/track/0LsblhTC54CXgEfwa5oJp2",
    appleUrl: "https://music.apple.com/us/album/4-am/1817761302?i=1817761302",
    appleAlbumId: "1817761302",
    appleTrackId: "1817761302",
    year: "2024",
  },
  {
    id: "rain",
    title: "Rain",
    artist: "HIDDNHILLS",
    spotifyTrackId: "0x45kmELI1NrHJOLmpD7gZ",
    spotifyUrl: "https://open.spotify.com/track/0x45kmELI1NrHJOLmpD7gZ",
    appleUrl: "https://music.apple.com/us/album/rain/1818669272?i=1818669272",
    appleAlbumId: "1818669272",
    appleTrackId: "1818669272",
    year: "2023",
  },
];

export const GlobalAudioPlayer: React.FC = () => {
  // Featured tracks: No Pain No Gain, No Creases, or Nirvana
  const featuredTrackIndices = [2, 3, 6]; // nirvana, no-creases, no-pain-no-gain

  const [currentTrackIndex, setCurrentTrackIndex] = useState(() => {
    // Only randomize once on initial mount
    return featuredTrackIndices[
      Math.floor(Math.random() * featuredTrackIndices.length)
    ];
  });
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTrackList, setShowTrackList] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<"spotify" | "apple">(
    "spotify",
  );

  const location = useLocation();
  const currentTrack = HIDDNHILLS_TRACKS[currentTrackIndex];

  // Navigation functions
  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % HIDDNHILLS_TRACKS.length);
  }, []);

  const prevTrack = useCallback(() => {
    setCurrentTrackIndex(
      (prev) =>
        (prev - 1 + HIDDNHILLS_TRACKS.length) % HIDDNHILLS_TRACKS.length,
    );
  }, []);

  const selectTrack = useCallback((index: number) => {
    setCurrentTrackIndex(index);
    setShowTrackList(false);
    setIsExpanded(true);
  }, []);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const toggleTrackList = useCallback(() => {
    setShowTrackList(!showTrackList);
  }, [showTrackList]);

  const togglePlatform = useCallback(() => {
    setSelectedPlatform((prev) => (prev === "spotify" ? "apple" : "spotify"));
  }, []);

  // Show player only on home page
  useEffect(() => {
    setIsVisible(location.pathname === "/");
  }, [location.pathname]);

  // Close track list when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowTrackList(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Track List Overlay */}
      {showTrackList && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
          onClick={toggleTrackList}
        >
          <div
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-md mx-4 bg-black/95 backdrop-blur-xl rounded-lg border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold text-lg">HIDDNHILLS</h3>
                <p className="text-white/60 text-sm">Select a track</p>
              </div>
              <button
                onClick={toggleTrackList}
                className="p-2 text-white/60 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {HIDDNHILLS_TRACKS.map((track, index) => (
                <div
                  key={track.id}
                  onClick={() => selectTrack(index)}
                  className={cn(
                    "flex items-center justify-between p-4 cursor-pointer transition-all duration-200 border-b border-white/5 last:border-b-0 touch-manipulation",
                    index === currentTrackIndex
                      ? "bg-white/20 text-white"
                      : "hover:bg-white/10 text-white/80",
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{track.title}</p>
                    <p className="text-xs text-white/60">{track.year}</p>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <a
                      href={track.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 text-white/60 hover:text-green-400 transition-colors touch-manipulation"
                      aria-label={`Listen to ${track.title} on Spotify`}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <a
                      href={track.appleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 text-white/60 hover:text-white transition-colors touch-manipulation"
                      aria-label={`Listen to ${track.title} on Apple Music`}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Audio Player */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-t border-white/10 transition-all duration-300",
          isExpanded ? "h-auto" : "h-auto",
        )}
      >
        {/* Platform Toggle & Embeds - Hidden when collapsed */}
        {isExpanded && (
          <div className="p-4 border-b border-white/10">
            {/* Platform Toggle Buttons */}
            <div className="flex justify-center mb-4">
              <div className="bg-white/10 rounded-lg p-1 flex">
                <button
                  onClick={() => setSelectedPlatform("spotify")}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 touch-manipulation",
                    selectedPlatform === "spotify"
                      ? "bg-green-500 text-white shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10",
                  )}
                >
                  Spotify
                </button>
                <button
                  onClick={() => setSelectedPlatform("apple")}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 touch-manipulation",
                    selectedPlatform === "apple"
                      ? "bg-white text-black shadow-lg"
                      : "text-white/70 hover:text-white hover:bg-white/10",
                  )}
                >
                  Apple Music
                </button>
              </div>
            </div>

            {/* Platform Embeds */}
            {selectedPlatform === "spotify" ? (
              <iframe
                src={`https://open.spotify.com/embed/track/${currentTrack.spotifyTrackId}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
                title={`${currentTrack.title} by ${currentTrack.artist} on Spotify`}
              />
            ) : (
              <iframe
                src={`https://embed.music.apple.com/us/album/${currentTrack.appleAlbumId}?i=${currentTrack.appleTrackId}&app=music&theme=dark`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="rounded-lg"
                title={`${currentTrack.title} by ${currentTrack.artist} on Apple Music`}
              />
            )}
          </div>
        )}

        {/* Player Controls */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Track Info - Clickable */}
            <div
              className="flex items-center space-x-3 min-w-0 flex-1 cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-all duration-200 touch-manipulation"
              onClick={toggleTrackList}
            >
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-artistic-pearl to-artistic-silver rounded-md flex items-center justify-center">
                <span className="text-black font-bold text-xs">HH</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white text-sm font-medium truncate">
                  {currentTrack.title}
                </p>
                <p className="text-artistic-pearl text-xs truncate">
                  {currentTrack.artist} • {currentTrack.year}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={prevTrack}
                className="text-white/60 hover:text-white transition-colors touch-manipulation"
                aria-label="Previous track"
              >
                <SkipBack className="h-4 w-4" />
              </button>

              <button
                onClick={toggleExpanded}
                className="bg-white text-black rounded-full p-2 hover:bg-artistic-pearl transition-colors touch-manipulation"
                aria-label={isExpanded ? "Collapse player" : "Expand player"}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <Music className="h-4 w-4" />
                )}
              </button>

              <button
                onClick={nextTrack}
                className="text-white/60 hover:text-white transition-colors touch-manipulation"
                aria-label="Next track"
              >
                <SkipForward className="h-4 w-4" />
              </button>
            </div>

            {/* Expand/Collapse Button */}
            <div className="flex items-center">
              <button
                onClick={toggleExpanded}
                className="text-white/60 hover:text-white transition-colors p-2 touch-manipulation"
                aria-label={isExpanded ? "Collapse player" : "Expand player"}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
