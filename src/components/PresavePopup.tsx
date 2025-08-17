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
  delay = 2800,
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

  const presaveUrl = "https://distrokid.com/hyperfollow/hiddnhills/patience-is-a-virtue";

  const handlePresaveClick = () => {
    window.open(presaveUrl, "_blank", "noopener,noreferrer");
    handleOpenChange(false);
  };

  const PopupContent = () => (
    <DialogContent className="max-w-sm mx-4 sm:mx-auto bg-black/90 border border-white/20 backdrop-blur-sm rounded-lg p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
      <DialogHeader className="text-center space-y-4">
        <div className="mx-auto w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden">
          <img
            src="https://i.imgur.com/8WoRjcb.jpeg"
            alt="Patience is a Virtue - Track Cover"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <DialogTitle className="text-lg sm:text-xl font-medium tracking-wide text-white font-['Montserrat'] uppercase text-center">
          "Patience is a Virtue"
        </DialogTitle>

        <DialogDescription className="text-white/80 text-sm font-['Montserrat'] text-center px-2">
          New track from HIDDNHILLS September 1, 2025
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-3 mt-6">
        <Button
          onClick={handlePresaveClick}
          className="w-full bg-white/20 text-white font-['Montserrat'] font-medium py-3 px-6 rounded-md hover:bg-white/30 active:bg-white/40 transition-colors duration-300 uppercase text-sm tracking-wide min-h-[48px] touch-manipulation"
          type="button"
          aria-label="Presave Patience is a Virtue on music platforms"
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

  // Determine which open state to use - external prop takes precedence over internal state
  const isDialogOpen = isOpen !== undefined ? isOpen : internalOpen;

  if (trigger) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <PopupContent />
      </Dialog>
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <PopupContent />
    </Dialog>
  );
};

export default PresavePopup;
