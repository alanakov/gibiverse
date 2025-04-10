import { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: { id: string; name: string; email: string; cpf?: string } | null;
  setUser: (user: {
    id: string;
    name: string;
    email: string;
    cpf?: string;
  }) => void;
  updateUser: (updatedUser: {
    name: string;
    email: string;
    cpf?: string;
  }) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined,
);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    cpf?: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const response = await api.get("/users/me");
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        toast.error("Erro ao carregar informações do usuário.");
      }
    };

    fetchUser();
  }, [token]);

  const updateUser = async (updatedUser: {
    name: string;
    email: string;
    cpf?: string;
  }) => {
    try {
      const response = await api.put(`/users/${user?.id}`, updatedUser);
      setUser(response.data);
      toast.success("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      toast.error("Erro ao atualizar usuário. Tente novamente.");
    }
  };

  return (
    <ProfileContext.Provider
      value={{ open, setOpen, user, setUser, updateUser }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
