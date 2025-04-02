import { createContext, useContext, useState } from "react";

interface ProfileContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: { name: string; email: string; cpf: string };
  setUser: (user: { name: string; email: string; cpf: string }) => void;
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
  const [user, setUser] = useState({
    name: "Alana",
    email: "alana@exemplo.com",
    cpf: "123.456.789-00",
  });

  return (
    <ProfileContext.Provider value={{ open, setOpen, user, setUser }}>
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
