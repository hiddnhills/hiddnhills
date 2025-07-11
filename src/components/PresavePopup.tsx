import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, Music, X } from "lucide-react";

interface PresavePopupProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  autoShow?: boolean;
  delay?: number;
}

export const PresavePopup: React.FC<PresavePopupProps> = ({
  isOpen,
  onOpenChange,
  trigger,
  autoShow = false,
  delay = 3000,
}) => {
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
    if (newOpen) {
      setHasShown(true);
    }
  };

  useEffect(() => {
    if (autoShow && !hasShown) {
      const timer = setTimeout(() => {
        if (!hasShown) {
          setOpen(true);
          setHasShown(true);
        }
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [autoShow, delay, hasShown]);

  const presaveUrl = "https://distrokid.com/hyperfollow/hiddnhills/be-like-you";

  const handlePresaveClick = () => {
    window.open(presaveUrl, "_blank", "noopener,noreferrer");
    handleOpenChange(false);
  };

  const PopupContent = () => (
    <DialogContent className="max-w-md mx-auto bg-artistic-charcoal border-2 border-artistic-silver/20 shadow-luxury backdrop-blur-sm">
      <DialogHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-artistic-pearl to-artistic-silver rounded-full flex items-center justify-center mb-2">
          <Music className="w-8 h-8 text-artistic-charcoal" />
        </div>

        <DialogTitle className="text-2xl font-black tracking-wide bg-gradient-to-br from-white via-artistic-pearl to-artistic-silver bg-clip-text text-transparent leading-none uppercase font-['Montserrat']">
          New Music Alert
        </DialogTitle>

        <DialogDescription className="text-artistic-pearl/80 text-sm leading-relaxed space-y-2">
          <div className="text-lg font-semibold text-white mb-2">
            "Be Like You"
          </div>
          <div>
            Get ready for the latest track from HIDDNHILLS. Presave now to be
            the first to experience it when it drops.
          </div>
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 mt-6">
        <Button
          onClick={handlePresaveClick}
          className="w-full bg-gradient-to-r from-artistic-pearl to-artistic-silver text-artistic-charcoal font-bold py-3 px-6 rounded-lg hover:from-white hover:to-artistic-pearl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Presave "Be Like You"
        </Button>

        <DialogClose asChild>
          <Button
            variant="ghost"
            className="w-full text-artistic-silver/60 hover:text-artistic-pearl hover:bg-artistic-smoke/20 transition-colors"
          >
            Maybe Later
          </Button>
        </DialogClose>
      </div>

      <div className="text-center text-xs text-artistic-silver/40 mt-4">
        Underground Hip-Hop • Las Vegas
      </div>
    </DialogContent>
  );

  if (trigger) {
    return (
      <Dialog
        open={isOpen ?? open}
        onOpenChange={onOpenChange ?? handleOpenChange}
      >
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <PopupContent />
      </Dialog>
    );
  }

  return (
    <Dialog
      open={isOpen ?? open}
      onOpenChange={onOpenChange ?? handleOpenChange}
    >
      <PopupContent />
    </Dialog>
  );
};

export default PresavePopup;
