import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Music, ArrowLeft, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log 404 error for analytics if needed
    // console.log("404 Error: Route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-pure-black text-pure-white relative overflow-hidden">
      <Navigation />

      {/* Background Effects */}
      <div className="fixed inset-0 bg-elegant-grid bg-grid opacity-10" />

      <div className="min-h-screen flex items-center justify-center relative">
        {/* Elegant effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pure-gray-700/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-pure-gray-600/20 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="text-center max-w-md mx-auto px-4 relative z-10">
          <div className="relative mb-8">
            <Music className="h-24 w-24 text-pure-gray-400 mx-auto opacity-50" />
            <div className="absolute inset-0 bg-pure-gray-400/20 blur-3xl animate-pulse" />
          </div>

          <h1 className="text-8xl font-bold font-black text-pure-white mb-4">
            404
          </h1>

          <h2 className="text-3xl font-bold font-black text-pure-gray-300 mb-4 tracking-wider">
            PAGE NOT FOUND
          </h2>

          <div className="relative mb-8">
            <p className="text-pure-gray-400 leading-relaxed font-light text-sm">
              The page you're looking for doesn't exist or has been moved. Let's
              get you back to the main experience.
            </p>
          </div>

          <Link to="/">
            <Button
              size="lg"
              className="bg-pure-white text-pure-black hover:bg-pure-gray-200 font-light tracking-[2px] uppercase px-8 group"
            >
              <ArrowLeft className="mr-3 h-5 w-5" />
              Return Home
            </Button>
          </Link>

          {/* Error details */}
          <div className="mt-8 p-4 bg-pure-gray-900/20 border border-pure-gray-700/30 rounded font-mono text-xs text-left">
            <div className="flex items-center mb-2">
              <Terminal className="h-4 w-4 text-pure-gray-400 mr-2" />
              <span className="text-pure-gray-400">Error Log</span>
            </div>
            <div className="text-pure-gray-500">
              <div>
                <span className="text-pure-gray-400">→</span> Route "
                {location.pathname}" not found
              </div>
              <div>
                <span className="text-pure-gray-400">→</span> Redirecting to
                home...
              </div>
              <div className="text-pure-gray-300">
                <span className="text-pure-gray-400">→</span> Ready to continue.
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - Bottom Right Corner */}
        <div className="absolute bottom-2 right-2 z-30">
          <div className="text-gray-400 text-[9px] font-light tracking-wide opacity-60">
            © 2025 ITSWINMEDIA
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
