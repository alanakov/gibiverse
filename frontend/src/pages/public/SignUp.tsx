import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { AuthForm } from "@/components/custom/AuthForm";
import api from "@/services/api";

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

const signupSchema = z
  .object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido").min(1, "O e-mail é obrigatório"),
    cpf: z.string().regex(cpfRegex, "CPF inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export function Signup() {
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await api.post("/users", {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        password: data.password,
      });

      toast.success(
        "Cadastro realizado com sucesso! Faça login para continuar.",
      );
      navigate("/login");
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);
      toast.error(
        error.response?.data?.error || "Erro ao cadastrar. Tente novamente.",
      );
    }
  };

  return (
    <AuthForm
      title="Criar Conta"
      fields={[
        {
          name: "name",
          label: "Nome",
          placeholder: "Digite seu nome",
        },
        {
          name: "email",
          label: "E-mail",
          type: "email",
          placeholder: "Digite seu e-mail",
        },
        {
          name: "cpf",
          label: "CPF",
          placeholder: "Digite seu CPF",
        },
        {
          name: "password",
          label: "Senha",
          type: "password",
          placeholder: "Digite sua senha",
        },
        {
          name: "confirmPassword",
          label: "Confirmar Senha",
          type: "password",
          placeholder: "Confirme sua senha",
        },
      ]}
      schema={signupSchema}
      onSubmit={onSubmit}
      buttonText="Cadastrar"
      extraContent={
        <p className="text-zinc-400">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-red-400 hover:underline">
            Faça login
          </Link>
        </p>
      }
    />
  );
}
