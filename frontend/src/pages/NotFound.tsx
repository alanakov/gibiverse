import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl text-zinc-400">Página não encontrada</p>
      <Button
        className="cursor-pointer bg-zinc-800 hover:bg-zinc-600"
        onClick={() => navigate("/home")}
      >
        Voltar para o início
      </Button>
    </div>
  );
}
