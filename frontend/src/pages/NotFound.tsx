import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl text-zinc-400">Página não encontrada</p>
      <Button variant="outline" onClick={() => navigate("/home")}>
        Voltar para o início
      </Button>
    </div>
  );
}
