import { useProfile } from "@/contexts/ProfileContext";
import { LatestComics } from "@/pages/auth/Home/sections/LatestComics";
import { LatestAuthors } from "@/pages/auth/Home/sections/LatestAuthors";

export function HomePage() {
  const { user } = useProfile();

  if (!user) return null;

  return (
    <div className="mx-auto mb-10 max-w-[1400px] pr-10 pl-[90px]">
      <div className="mb-20 flex items-center gap-2 py-8">
        <h1 className="text-2xl font-bold text-red-300">Olá, {user.name}!</h1>
        <h1 className="text-2xl">👋</h1>
      </div>

      <div className="space-y-16">
        <LatestComics />
        <LatestAuthors />
      </div>
    </div>
  );
}
