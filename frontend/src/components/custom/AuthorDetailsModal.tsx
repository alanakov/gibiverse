import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface AuthorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  author: {
    name: string;
    bio: string;
    coverUrl: string;
  };
}

export function AuthorDetailsModal({
  isOpen,
  onClose,
  author,
}: AuthorDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/80" />
        <DialogContent className="fixed top-1/2 left-1/2 z-50 h-[450px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-zinc-800 p-0 outline-none">
          <button
            onClick={onClose}
            className="ring-offset-background absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
          >
            <X className="h-6 w-6 cursor-pointer" />
          </button>
          <div className="flex h-full gap-6 p-6">
            <div className="shrink-0">
              <img
                src={author.coverUrl}
                alt={author.name}
                className="h-[380px] w-[280px] rounded-md object-cover"
              />
            </div>
            <div className="flex h-[380px] flex-col">
              <div className="flex-1 space-y-4">
                <DialogTitle className="text-2xl font-bold">
                  {author.name}
                </DialogTitle>
                <p className="max-h-[250px] overflow-y-auto text-gray-300">
                  {author.bio}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
