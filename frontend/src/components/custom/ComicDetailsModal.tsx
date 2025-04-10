import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ComicDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  comic: {
    title: string;
    description: string;
    coverUrl: string;
    Author: { id: number; name: string };
    Genre: { id: number; name: string };
    Collection?: { id: number; name: string };
  };
}

export function ComicDetailsModal({
  isOpen,
  onClose,
  comic,
}: ComicDetailsModalProps) {
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
                src={comic.coverUrl}
                alt={comic.title}
                className="h-[380px] w-[280px] rounded-md object-cover"
              />
            </div>
            <div className="flex h-[380px] flex-col">
              <div className="flex-1 space-y-4">
                <DialogTitle className="text-2xl font-bold">
                  {comic.title}
                </DialogTitle>
                <p className="max-h-[250px] overflow-y-auto text-gray-300">
                  {comic.description}
                </p>
              </div>

              <div className="mt-auto flex w-100 items-center justify-between pt-4">
                <p className="italic">
                  <span className="font-semibold italic">Autor:</span>{" "}
                  {comic.Author?.name || "Autor desconhecido"}
                </p>
                <span className="rounded-md bg-zinc-700 px-4 py-1 text-sm text-white">
                  {comic.Genre?.name || "Sem gênero"}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
