import React, { useCallback } from "react";
import { PageLayout } from "@/components/PageLayout";
import { ContactNavigationButtons } from "@/components/ContactNavigationButtons";
import {
  Headphones,
  Music as MusicIcon,
  User,
  Camera,
  FileText,
  Mail,
  Link as LinkIcon,
  Instagram,
} from "lucide-react";

// Slot machine alternatives for each button (bio key now contains Instagram content)
const slotMachineOptions = {
  music: ["MUSIC", "TRACKS", "BEATS", "VIBES", "SOUND", "AUDIO"],
  bio: ["INSTAGRAM", "PHOTOS", "FOLLOW", "SOCIAL", "VISUAL", "CONNECT"],
  gallery: ["GALLERY", "PHOTOS", "VISUALS", "IMAGES", "SHOTS", "CAPTURES"],
  press: ["PRESS", "MEDIA", "NEWS", "COVERAGE", "ARTICLES", "FEATURES"],
  contact: ["CONTACT", "REACH", "EMAIL", "BOOKING", "INQUIRIES", "CONNECT"],
  links: ["LINKS", "SOCIALS", "CONNECT", "FOLLOW", "CONTACT", "REACH"],
} as const;

// Contact-specific marquee content
const contactLeftMarquee = [
  "CONTACT",
  "CONNECT",
  "REACH",
  "BOOKING",
  "INQUIRIES",
  "BUSINESS",
  "COLLABORATION",
  "PRESS",
  "MEDIA",
  "NETWORK",
] as const;

const contactRightMarquee = [
  "EMAIL",
  "PHONE",
  "SOCIAL",
  "DIRECT",
  "IMMEDIATE",
  "PROFESSIONAL",
  "AUTHENTIC",
  "RESPONSIVE",
  "AVAILABLE",
  "OPEN",
] as const;

// Constants
const CONTACT_INFO = {
  email: "hiddnhills@gmail.com",
  phone: "702-723-6577",
  location: "Las Vegas, Nevada",
} as const;

const EXTERNAL_LINKS = {
  spotify: "https://open.spotify.com/artist/3Tuyh4C0HtGBaqmSdvhGWS",
  appleMusic: "https://music.apple.com/us/artist/hiddnhills/1727680628",
  instagram: "https://www.instagram.com/hiddn.hills/",
  linkTree: "https://linktr.ee/hiddnhills",
} as const;

const Contact = () => {
  // Optimized email handler with error handling
  const handleEmailClick = useCallback(() => {
    try {
      const mailtoLink = `mailto:${CONTACT_INFO.email}`;
      window.open(mailtoLink, "_self");
    } catch (error) {
      console.error("Error opening email client:", error);
      // Fallback: copy email to clipboard
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(CONTACT_INFO.email)
          .then(() => {
            alert("Email copied to clipboard!");
          })
          .catch(() => {
            alert(`Please email: ${CONTACT_INFO.email}`);
          });
      } else {
        alert(`Please email: ${CONTACT_INFO.email}`);
      }
    }
  }, []);

  // Phone click handler for mobile devices
  const handlePhoneClick = useCallback(() => {
    try {
      window.open(`tel:${CONTACT_INFO.phone}`, "_self");
    } catch (error) {
      console.error("Error opening phone app:", error);
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(CONTACT_INFO.phone)
          .then(() => {
            alert("Phone number copied to clipboard!");
          })
          .catch(() => {
            alert(`Phone: ${CONTACT_INFO.phone}`);
          });
      } else {
        alert(`Phone: ${CONTACT_INFO.phone}`);
      }
    }
  }, []);

  return (
    <PageLayout
      leftMarqueeItems={contactLeftMarquee}
      rightMarqueeItems={contactRightMarquee}
    >
      <div className="h-screen relative">
        {/* Single Page Content */}
        <section className="h-full relative flex items-center justify-end">
          <div className="relative z-20 text-right px-8 max-w-lg ml-auto mr-8 lg:mr-16">
            <div className="space-y-4">
              {/* Brand Badge */}
              <div className="mb-6">
                <span className="text-artistic-silver text-xs tracking-[2px] font-light uppercase">
                  Direct Contact • Always Available
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-wide bg-gradient-to-br from-white via-artistic-pearl to-artistic-silver bg-clip-text text-transparent leading-none drop-shadow-2xl uppercase font-['Montserrat']">
                CONNECT
              </h1>

              {/* Contact Information with Interactive Buttons */}
              <div className="text-sm md:text-base text-artistic-pearl font-light tracking-wide leading-relaxed drop-shadow-xl space-y-2">
                {/* Email Section */}
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={handleEmailClick}
                    className="flex items-center justify-center p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm group"
                    aria-label={`Send email to ${CONTACT_INFO.email}`}
                    title="Send email"
                    type="button"
                  >
                    <Mail className="h-4 w-4 text-white group-hover:text-artistic-pearl transition-colors" />
                  </button>
                  <p className="select-all">{CONTACT_INFO.email}</p>
                </div>

                {/* Phone Section */}
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={handlePhoneClick}
                    className="flex items-center justify-center p-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm group sm:hidden"
                    aria-label={`Call ${CONTACT_INFO.phone}`}
                    title="Call phone number"
                    type="button"
                  >
                    📞
                  </button>
                  <p className="select-all">{CONTACT_INFO.phone}</p>
                </div>

                {/* Location */}
                <p className="text-xs text-artistic-silver">
                  {CONTACT_INFO.location}
                </p>
              </div>

              {/* Contact Navigation Buttons */}
              <ContactNavigationButtons
                slotMachineOptions={slotMachineOptions}
              />

              {/* Minimal Footer */}
              <div className="pt-8">
                <p className="text-artistic-silver text-xs font-light tracking-wide">
                  Open for business, booking & collaboration.
                </p>
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
    </PageLayout>
  );
};

export default Contact;
