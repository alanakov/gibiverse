import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { BiSolidHome } from "react-icons/bi";
import { IoIosPerson } from "react-icons/io";
import { FaBookOpen } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { BsCollectionFill } from "react-icons/bs";
import { ProfileSheet } from "./ProfileSheet";

export const DashboardSidebar = () => {
  const sidebarItems = [
    { label: "Home", href: "/home", icon: BiSolidHome },
    { label: "Autores", href: "/authors", icon: IoIosPerson },
    { label: "Gibis", href: "/books", icon: FaBookOpen },
    { label: "Gêneros", href: "/genders", icon: IoMdPricetags },
    { label: "Coleções", href: "/collections", icon: BsCollectionFill },
  ];

  return (
    <SidebarProvider>
      <Sidebar className="flex w-[100px] flex-col items-center">
        <SidebarHeader className="flex w-full justify-center space-y-6 bg-(--background-color) p-6">
          <div className="flex justify-center">
            <img className="w-10" src="/src/assets/logo.svg" alt="Logo" />
          </div>
          <ProfileSheet />
        </SidebarHeader>

        <SidebarContent className="flex w-full flex-grow flex-col bg-(--background-color)">
          <SidebarGroup>
            <nav className="mt-20 flex w-full flex-col items-center">
              {sidebarItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex w-full flex-col items-center justify-center py-3 text-sm font-medium text-gray-300 transition-colors duration-200 ${
                      isActive
                        ? "border-l-4 border-red-500 bg-(--background-color) text-white"
                        : "hover:border-l-4 hover:border-red-500 hover:bg-[#222] hover:text-white"
                    }`
                  }
                >
                  <item.icon className="mb-1 h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
};
