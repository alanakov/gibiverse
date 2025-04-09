import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { AuthForm } from "@/components/custom/AuthForm";
import api from "@/services/api";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido").min(1, "O e-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export function Login() {
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post("/login", {
        email: data.email,
        senha: data.password,
      });

      localStorage.setItem("authToken", response.data.token);

      toast.success("Login realizado com sucesso!");
      navigate("/home");
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      toast.error(
        error.response?.data?.error || "Erro ao fazer login. Tente novamente.",
      );
    }
  };

  return (
    <AuthForm
      title="Entrar"
      fields={[
        {
          name: "email",
          label: "E-mail",
          type: "email",
          placeholder: "Digite seu e-mail",
        },
        {
          name: "password",
          label: "Senha",
          type: "password",
          placeholder: "Digite sua senha",
        },
      ]}
      schema={loginSchema}
      onSubmit={onSubmit}
      buttonText="Entrar"
      extraContent={
        <p className="text-zinc-400">
          Não tem uma conta?{" "}
          <Link to="/signup" className="text-red-400 hover:underline">
            Cadastre-se
          </Link>
        </p>
      }
    />
  );
}
