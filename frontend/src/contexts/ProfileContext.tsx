import { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  cpf: string | null;
}

interface ProfileContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: User | null;
  updateUser: (data: Omit<User, "id">) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined,
);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await api.get<User>("/users/me");
      setUser(data);
    } catch {
      toast.error("Erro ao carregar informações do usuário");
    }
  };

  const updateUser = async (userData: Omit<User, "id">) => {
    if (!user) return;

    try {
      const { data } = await api.put<User>(`/users/${user.id}`, userData);
      setUser(data);
      toast.success("Perfil atualizado com sucesso!");
    } catch {
      toast.error("Erro ao atualizar perfil");
    }
  };

  return (
    <ProfileContext.Provider value={{ open, setOpen, user, updateUser }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error("useProfile must be used within ProfileProvider");
  return context;
};
