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
import { Music } from "lucide-react";

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
  const [internalOpen, setInternalOpen] = useState(false);
  const [hasAutoShown, setHasAutoShown] = useState(false);

  // Check sessionStorage on mount to prevent repeated auto-shows in the same session
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("presave-popup-shown");
    if (hasSeenPopup) {
      setHasAutoShown(true);
    }
  }, []);

  const handleOpenChange = (newOpen: boolean) => {
    setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
    if (newOpen) {
      setHasAutoShown(true);
      // Remember that user has seen the popup for this session
      sessionStorage.setItem("presave-popup-shown", "true");
    }
  };

  useEffect(() => {
    if (autoShow && !hasAutoShown) {
      const timer = setTimeout(() => {
        if (!hasAutoShown) {
          setInternalOpen(true);
          setHasAutoShown(true);
          sessionStorage.setItem("presave-popup-shown", "true");
          onOpenChange?.(true);
        }
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [autoShow, delay, hasAutoShown, onOpenChange]);

  const presaveUrl = "https://distrokid.com/hyperfollow/hiddnhills/be-like-you";

  const handlePresaveClick = () => {
    window.open(presaveUrl, "_blank", "noopener,noreferrer");
    handleOpenChange(false);
  };

  const PopupContent = () => (
    <DialogContent className="max-w-sm mx-4 sm:mx-auto bg-black/90 border border-white/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
      <DialogHeader className="text-center space-y-4">
        <div className="mx-auto w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F0dd1a1ded0234fbb9d750f1dcd8d1bea%2F11e1ab4378c44b54a7e4881fd22d97bc?format=webp&width=800"
            alt="Be Like You - Track Cover"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <DialogTitle className="text-lg sm:text-xl font-medium tracking-wide text-white font-['Montserrat'] uppercase text-center">
          "Be Like You"
        </DialogTitle>

        <DialogDescription className="text-white/80 text-sm font-['Montserrat'] text-center px-2">
          New track from HIDDNHILLS August 8, 2025
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-3 mt-6">
        <Button
          onClick={handlePresaveClick}
          className="w-full bg-white/20 text-white font-['Montserrat'] font-medium py-3 px-6 rounded-md hover:bg-white/30 active:bg-white/40 transition-colors duration-300 uppercase text-sm tracking-wide min-h-[48px] touch-manipulation"
          type="button"
          aria-label="Presave Be Like You on music platforms"
        >
          Presave New Music
        </Button>

        <DialogClose asChild>
          <Button
            variant="ghost"
            className="w-full text-white/60 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors font-['Montserrat'] text-sm min-h-[48px] touch-manipulation"
            type="button"
            aria-label="Close popup"
          >
            Later
          </Button>
        </DialogClose>
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
