import { Card, CardContent } from "@/components/ui/card";

interface CustomCardProps {
  imageUrl: string;
  name: string;
  onClick?: () => void;
}

export function CustomCard({ imageUrl, name, onClick }: CustomCardProps) {
  return (
    <Card
      className="flex w-[200px] cursor-pointer flex-col border-0 bg-zinc-800 p-0 transition-all hover:scale-105 sm:w-[150px]"
      onClick={onClick}
    >
      <div className="aspect-[2/3] w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full rounded-t-md object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
      <CardContent className="pb-6 text-center text-white">
        <h3 className="mx-auto w-full max-w-[150px] truncate text-sm font-semibold">
          {name}
        </h3>
      </CardContent>
    </Card>
  );
}
