import React from "react";
import { PageLayout } from "@/components/PageLayout";
import { LoopingNavigationButtons } from "@/components/LoopingNavigationButtons";

// Slot machine alternatives for each button
const slotMachineOptions = {
  music: ["MUSIC", "TRACKS", "BEATS", "VIBES", "SOUND", "AUDIO"],
  contact: ["CONTACT", "REACH", "EMAIL", "BOOKING", "INQUIRIES", "CONNECT"],
  links: ["LINKS", "SOCIALS", "CONNECT", "FOLLOW", "CONTACT", "REACH"],
};

// Bio-specific marquee content
const bioLeftMarquee = [
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
];

const bioRightMarquee = [
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
];

const Bio = () => {
  return (
    <PageLayout
      leftMarqueeItems={bioLeftMarquee}
      rightMarqueeItems={bioRightMarquee}
    >
      <div className="min-h-screen relative">
        {/* Scrolling Bio Content */}
        <div className="relative z-20 max-w-lg ml-auto mr-8 lg:mr-16 px-8">
          {/* Hero Section */}
          <section className="h-screen flex items-center">
            <div className="text-right space-y-4">
              {/* Brand Badge */}
              <div className="mb-6">
                <span className="text-artistic-silver text-xs tracking-[2px] font-light uppercase">
                  Since 2016
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-wide bg-gradient-to-br from-white via-artistic-pearl to-artistic-silver bg-clip-text text-transparent leading-none drop-shadow-2xl uppercase font-['Montserrat']">
                BIO
              </h1>

              {/* Bio Tagline */}
              <p className="text-sm md:text-base text-artistic-pearl font-light tracking-wide leading-relaxed drop-shadow-xl">
                Boundary-pushing lyricist weaving sharp social commentary with
                introspective depth. Las Vegas-rooted, globally minded.
              </p>

              {/* Looping Navigation Buttons */}
              <LoopingNavigationButtons
                slotMachineOptions={slotMachineOptions}
                includeButtons={["music", "contact", "links"]}
              />

              {/* Scroll Indicator */}
              <div className="pt-8">
                <p className="text-artistic-silver text-lg font-light tracking-wide animate-pulse">
                  ↓ Scroll to read the story
                </p>
              </div>
            </div>
          </section>

          {/* Origins Section */}
          <section className="min-h-screen flex items-center py-20">
            <div className="text-right space-y-6">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase font-['Montserrat']">
                THE BEGINNING
              </h2>
              <div className="space-y-4 text-sm md:text-base text-artistic-pearl font-light leading-relaxed">
                <p>
                  Starting with nothing but a vision and a cell phone. No
                  studio, no fancy equipment—just him and his phone, recording
                  music on the fly. But even in those early days, you could hear
                  the potential.
                </p>
                <p>
                  Growing up in Las Vegas, HIDDNHILLS has always been a low-key.
                  His name says it all: he's hidden, staying out of the way, a g
                  moving in silence like lasagna. Quietly crafting his sound.
                  Never one for the fame, using music as his journal to process
                  the world around him. A way to express himself.
                </p>
              </div>
            </div>
          </section>

          {/* Evolution Section */}
          <section className="min-h-screen flex items-center py-20">
            <div className="text-right space-y-6">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase font-['Montserrat']">
                MUSICAL EVOLUTION
              </h2>
              <div className="space-y-6 text-sm md:text-base text-artistic-pearl font-light leading-relaxed">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    The Early Days
                  </h3>
                  <p>
                    Just a kid with a cell phone and a dream. His early music
                    was raw, and full of emotion. An unfiltered look into his
                    life. He didn't have a studio, but he didn't need one. His
                    phone became his instrument, his tool for telling stories,
                    and it laid the groundwork for his unique sound.
                  </p>
                </div>
                <div>
                  As he started to find his sound, you could hear HIDDNHILLS
                  took inspiration from tons of artists like Asap Rocky, Cudi,
                  Kendrick, Mac Miller, Drake, J. Cole. Which makes it dope to
                  see how he's evolved into his own sound today.
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    The Sound Today
                  </h3>
                  <p>
                    In his own lane. His sound is a mix of introspective rap,
                    wavy beats, and that signature wordplay that makes you
                    think. He's building something with real staying power.
                    Though still under the radar, every release feels like a
                    step closer to a breakout. His time is coming. And when it
                    does, it's going to be big.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="min-h-screen flex items-center py-20">
            <div className="text-right space-y-6">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase font-['Montserrat']">
                ARTISTIC PHILOSOPHY
              </h2>
              <div className="space-y-4 text-sm md:text-base text-artistic-pearl font-light leading-relaxed">
                <p>
                  HIDDNHILLS has never been about chasing fame. He's always
                  stayed in the background—grounded, humble, in his own space at
                  his own pace. Perfecting his craft. It's never been about the
                  spotlight. For him, it's about the art. In a world where
                  everyone's obsessed with likes and trends, HIDDNHILLS is
                  focused on growth at another level. Something real.
                </p>
                <p>
                  His music isn't just about him—it's a conversation. A critique
                  of culture. A deep dive into personal growth, social issues,
                  and relationships. It challenges the listener to think
                  critically and to go beyond the surface. He's not here for the
                  fame. He's here to inspire and leave a mark.
                </p>
              </div>
            </div>
          </section>

          {/* Present & Future Section */}
          <section className="min-h-screen flex items-center py-20">
            <div className="text-right space-y-6">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase font-['Montserrat']">
                THE PRESENT & FUTURE
              </h2>
              <div className="space-y-4 text-sm md:text-base text-artistic-pearl font-light leading-relaxed">
                <p>
                  HIDDNHILLS is still relatively unknown, but the wave is
                  coming. He's been grinding in the shadows, building his sound
                  and just vibing out. Every release feels like another step
                  toward that moment when the world will finally catch up. And
                  when it happens? There will be no question—he's been worth the
                  wait.
                </p>
                <p className="italic text-artistic-silver text-xs">
                  "Always been lowkey. Always been steady. You just had to be
                  paying attention."
                </p>
              </div>
            </div>
          </section>

          {/* Final Section */}
          <section className="h-screen flex items-center">
            <div className="text-right space-y-4">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 uppercase font-['Montserrat']">
                CONNECT
              </h2>
              <p className="text-sm md:text-base text-artistic-pearl font-light leading-relaxed">
                Ready to dive deeper into the HIDDNHILLS universe?
              </p>

              {/* Navigation Options */}
              <LoopingNavigationButtons
                slotMachineOptions={slotMachineOptions}
                includeButtons={["music", "contact", "links"]}
              />

              {/* Minimal Footer */}
              <div className="pt-8">
                <p className="text-artistic-silver text-xs font-light tracking-wide">
                  Art before ego.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Copyright - Bottom Right Corner */}
        <div className="absolute bottom-2 right-2 z-30">
          <div className="text-gray-400 text-[9px] font-light tracking-wide opacity-60">
            © 2025 ITSWINMEDIA
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Bio;
