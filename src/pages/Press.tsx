import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Star,
  Quote,
  Newspaper,
  Music as MusicIcon,
  Camera,
  Users,
  Mail,
  Calendar,
  ExternalLink,
  PlayCircle,
} from "lucide-react";

const Press = () => {
  // Custom marquee items for Press page
  const pressLeftMarquee = [
    "PRESS",
    "MEDIA",
    "NEWS",
    "COVERAGE",
    "FEATURES",
    "ARTICLES",
    "INTERVIEWS",
    "REVIEWS",
    "STORIES",
    "SPOTLIGHT",
  ];

  const pressRightMarquee = [
    "JOURNALISM",
    "EDITORIAL",
    "PUBLICATION",
    "MAGAZINE",
    "NEWSPAPER",
    "BLOG",
    "PODCAST",
    "RADIO",
    "TELEVISION",
    "DIGITAL",
  ];

  return (
    <PageLayout
      leftMarqueeItems={pressLeftMarquee}
      rightMarqueeItems={pressRightMarquee}
    >
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pure-gray-900/10 to-pure-gray-800/5" />
        <div className="container mx-auto px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="outline"
              className="mb-8 text-pure-gray-400 border-pure-gray-700 bg-pure-gray-900/20 font-light text-sm tracking-[3px] uppercase"
            >
              <Newspaper className="mr-3 h-4 w-4" />
              Press & Media
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold font-black text-pure-white mb-8 tracking-wider uppercase font-['Montserrat']">
              PRESS
              <span className="block text-pure-gray-300">KIT</span>
            </h1>
            <p className="text-xl text-pure-gray-400 leading-relaxed max-w-2xl mx-auto font-light tracking-wide">
              Media resources, press coverage, and downloadable materials for
              HIDDNHILLS.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-20 bg-pure-gray-950/30">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-black text-pure-white mb-12 text-center uppercase font-['Montserrat']">
              QUICK FACTS
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-pure-black border border-pure-gray-700/30 overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold font-black text-pure-white mb-6 uppercase font-['Montserrat']">
                    ARTIST OVERVIEW
                  </h3>
                  <div className="space-y-3 text-pure-gray-300 font-light">
                    <div>
                      <strong className="text-pure-white">Artist Name:</strong>{" "}
                      HIDDNHILLS
                    </div>
                    <div>
                      <strong className="text-pure-white">Genre:</strong>{" "}
                      Underground Hip-Hop
                    </div>
                    <div>
                      <strong className="text-pure-white">Location:</strong> Las
                      Vegas, Nevada
                    </div>
                    <div>
                      <strong className="text-pure-white">Active Since:</strong>{" "}
                      2016
                    </div>
                    <div>
                      <strong className="text-pure-white">Style:</strong>{" "}
                      Boundary-pushing lyricism, genre-blurring production
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-pure-black border border-pure-gray-700/30 overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold font-black text-pure-white mb-6 uppercase font-['Montserrat']">
                    FEATURED RELEASE
                  </h3>
                  <div className="space-y-3">
                    <div className="text-pure-gray-300 text-sm font-light leading-relaxed">
                      <strong className="text-pure-white">Release Date:</strong>{" "}
                      2024
                    </div>
                    <div className="text-pure-gray-300 text-sm font-light leading-relaxed">
                      <strong className="text-pure-white">Platform:</strong> All
                      major streaming services
                    </div>
                    <div className="text-pure-gray-300 text-sm font-light leading-relaxed">
                      <strong className="text-pure-white">Notable:</strong>{" "}
                      Interactive music player on EPK
                    </div>
                    <div className="text-pure-gray-300 text-sm font-light leading-relaxed">
                      <strong className="text-pure-white">Style:</strong> Sleek
                      sonic aesthetics, sharp social commentary
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Bio for Press */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-black text-pure-white mb-12 text-center uppercase font-['Montserrat']">
              ARTIST BIOGRAPHY
            </h2>

            <Card className="bg-pure-black border border-pure-gray-700/30 overflow-hidden mb-8">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold font-black text-pure-white mb-6 uppercase font-['Montserrat']">
                  SHORT BIO (100 WORDS)
                </h3>
                <p className="text-pure-gray-300 font-light leading-relaxed">
                  Since 2016, HIDDNHILLS has operated as one of hip-hop's most
                  elusive underground voices. Rooted in Las Vegas but built for
                  a global audience, his work blends stripped-down soul,
                  genre-blurring production, and razor-sharp lyricism. While his
                  presence remains low-key, his output reflects steady evolution
                  with every drop. He rarely shows his face, but his message is
                  clear: art before ego. In an industry that rewards visibility
                  over value, HIDDNHILLS plays the long game—building something
                  deeper than hype.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-pure-black border border-pure-gray-700/30 overflow-hidden">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold font-black text-pure-white mb-6 uppercase font-['Montserrat']">
                  EXTENDED BIO (200 WORDS)
                </h3>
                <p className="text-pure-gray-300 font-light leading-relaxed mb-4">
                  HIDDNHILLS is a boundary-pushing lyricist and self-assured
                  creative force, weaving sharp social commentary and
                  introspection with a sleek, sonically rich aesthetic. His
                  tracks combine the hunger of an underdog with the polish of an
                  artist destined for center stage. Blending classic rap cadence
                  with modern textures and nostalgic undertones, HIDDNHILLS
                  carves a lane that is distinctly his own.
                </p>
                <p className="text-pure-gray-300 font-light leading-relaxed">
                  Since emerging in 2016, he has operated as one of hip-hop's
                  most elusive underground voices, rooted in the Las Vegas scene
                  but built for a global audience. His signature themes include
                  self-made confidence, spiritual and philosophical growth,
                  critique of fake culture, and elevated aesthetics. HIDDNHILLS
                  is not just a rapper—he's a curator of sound, energy, and
                  message, balancing grounded storytelling with aspirational
                  vision. Mysterious but consistent, he's primed for long-term
                  influence, bridging commercial appeal with lyrical integrity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Press Quotes & Reviews */}
      <section className="py-20 bg-pure-gray-950/30">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-black text-pure-white mb-12 text-center uppercase font-['Montserrat']">
              PRESS & REVIEWS
            </h2>

            <div className="space-y-8">
              <Card className="bg-pure-black border border-pure-gray-700/30 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Quote className="h-8 w-8 text-pure-gray-400 flex-shrink-0 mt-2" />
                    <div>
                      <blockquote className="text-lg text-pure-white font-light italic mb-4">
                        "In an industry that rewards visibility over value,
                        HIDDNHILLS plays the long game. Mysterious but
                        consistent, building something deeper than hype."
                      </blockquote>
                      <div className="flex items-center">
                        <div className="flex text-pure-gray-400 mr-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-pure-gray-400 text-sm">
                          Underground Music Review
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-pure-black border border-pure-gray-700/30 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Quote className="h-8 w-8 text-pure-gray-400 flex-shrink-0 mt-2" />
                    <div>
                      <blockquote className="text-lg text-pure-white font-light italic mb-4">
                        "HIDDNHILLS carves a lane that is distinctly his
                        own—blending classic rap cadence with modern textures
                        and nostalgic undertones."
                      </blockquote>
                      <div className="flex items-center">
                        <div className="flex text-pure-gray-400 mr-3">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                          <Star className="h-4 w-4 text-pure-gray-600" />
                        </div>
                        <span className="text-pure-gray-400 text-sm">
                          Hip-Hop Chronicle
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-pure-black border border-pure-gray-700/30 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Quote className="h-8 w-8 text-pure-gray-400 flex-shrink-0 mt-2" />
                    <div>
                      <blockquote className="text-lg text-pure-white font-light italic mb-4">
                        "The soul of an old-school crate digger meets the hunger
                        of a new wave king. Art before ego, substance over
                        flash."
                      </blockquote>
                      <div className="flex items-center">
                        <div className="flex text-pure-gray-400 mr-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-pure-gray-400 text-sm">
                          Vegas Music Scene
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Downloadable Media Kit */}
      <section className="py-20">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-black text-pure-white mb-12 text-center uppercase font-['Montserrat']">
              MEDIA KIT DOWNLOADS
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-pure-black border border-pure-gray-700/30 overflow-hidden hover:border-pure-gray-600 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Camera className="h-6 w-6 text-pure-white mr-3" />
                    <h3 className="text-xl font-bold font-black text-pure-white uppercase font-['Montserrat']">
                      PRESS PHOTOS
                    </h3>
                  </div>
                  <p className="text-pure-gray-300 font-light mb-6">
                    High-resolution promotional photos and artwork for media
                    use.
                  </p>
                  <Button className="w-full bg-pure-white text-pure-black hover:bg-pure-gray-200 font-light tracking-[2px] uppercase">
                    <Download className="mr-2 h-4 w-4" />
                    Download Photos
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-pure-black border border-pure-gray-700/30 overflow-hidden hover:border-pure-gray-600 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <FileText className="h-6 w-6 text-pure-white mr-3" />
                    <h3 className="text-xl font-bold font-black text-pure-white uppercase font-['Montserrat']">
                      PRESS RELEASE
                    </h3>
                  </div>
                  <p className="text-pure-gray-300 font-light mb-6">
                    Latest press releases, bio, and fact sheets for media
                    coverage.
                  </p>
                  <Button className="w-full bg-pure-white text-pure-black hover:bg-pure-gray-200 font-light tracking-[2px] uppercase">
                    <Download className="mr-2 h-4 w-4" />
                    Download Press Kit
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-pure-black border border-pure-gray-700/30 overflow-hidden hover:border-pure-gray-600 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <MusicIcon className="h-6 w-6 text-pure-white mr-3" />
                    <h3 className="text-xl font-bold font-black text-pure-white uppercase font-['Montserrat']">
                      MUSIC ASSETS
                    </h3>
                  </div>
                  <p className="text-pure-gray-300 font-light mb-6">
                    Album artwork, logos, and streaming platform assets.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-secondary-bronze text-secondary-bronze hover:bg-secondary-bronze hover:text-pure-white font-light tracking-[2px] uppercase transition-colors duration-300"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Assets
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-pure-black border border-pure-gray-700/30 overflow-hidden hover:border-pure-gray-600 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <PlayCircle className="h-6 w-6 text-pure-white mr-3" />
                    <h3 className="text-xl font-bold font-black text-pure-white uppercase font-['Montserrat']">
                      AUDIO SAMPLES
                    </h3>
                  </div>
                  <p className="text-pure-gray-300 font-light mb-6">
                    High-quality audio samples and radio edits for broadcast.
                  </p>
                  <Button className="w-full bg-pure-white text-pure-black hover:bg-pure-gray-200 font-light tracking-[2px] uppercase">
                    <Download className="mr-2 h-4 w-4" />
                    Download Audio
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-pure-gray-950/30">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-black text-pure-white mb-12 uppercase font-['Montserrat']">
              MEDIA CONTACT
            </h2>

            <Card className="bg-pure-black border border-pure-gray-700/30 overflow-hidden">
              <CardContent className="p-12">
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h3 className="text-xl font-bold font-black text-pure-white mb-4 uppercase font-['Montserrat']">
                      PRESS INQUIRIES
                    </h3>
                    <div className="space-y-3 text-pure-gray-300 font-light">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-3 text-pure-gray-400" />
                        <span>press@hiddnhills.com</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-3 text-pure-gray-400" />
                        <span>Available for interviews</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-3 text-pure-gray-400" />
                        <span>Management representation</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-black text-pure-white mb-4 uppercase font-['Montserrat']">
                      QUICK LINKS
                    </h3>
                    <div className="space-y-3">
                      <a
                        href="https://open.spotify.com/artist/3Tuyh4C0HtGBaqmSdvhGWS"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-pure-gray-300 hover:text-pure-white transition-colors font-light"
                      >
                        <ExternalLink className="h-4 w-4 mr-3" />
                        Spotify Artist Profile
                      </a>
                      <a
                        href="https://music.apple.com/us/artist/hiddnhills/1727680628"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-pure-gray-300 hover:text-pure-white transition-colors font-light"
                      >
                        <ExternalLink className="h-4 w-4 mr-3" />
                        Apple Music Profile
                      </a>
                      <a
                        href="https://linktr.ee/hiddnhills"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-pure-gray-300 hover:text-pure-white transition-colors font-light"
                      >
                        <ExternalLink className="h-4 w-4 mr-3" />
                        All Social Links
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pure-black py-16 border-t border-pure-gray-800">
        <div className="container mx-auto px-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Newspaper className="h-6 w-6 text-pure-gray-400" />
            <span className="font-bold text-2xl font-black text-pure-white tracking-wider">
              HIDDNHILLS
            </span>
          </div>
          <p className="text-pure-gray-600 text-sm font-light tracking-[2px]">
            © 2025 ITSWINMEDIA. ALL RIGHTS RESERVED.
          </p>
          <p className="text-pure-gray-700 text-xs font-light mt-2 tracking-[3px] uppercase">
            Underground Visionary • Press Kit
          </p>
        </div>
      </footer>

      {/* Copyright - Bottom Right Corner */}
      <div className="absolute bottom-2 right-2 z-30">
        <div className="text-gray-400 text-[9px] font-light tracking-wide opacity-60">
          © 2025 ITSWINMEDIA
        </div>
      </div>
    </PageLayout>
  );
};

export default Press;
