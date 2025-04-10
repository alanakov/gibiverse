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
    { label: "Gibis", href: "/comicbooks", icon: FaBookOpen }, // Updated path
    { label: "Gêneros", href: "/genres", icon: IoMdPricetags },
    { label: "Coleções", href: "/collections", icon: BsCollectionFill },
  ];

  return (
    <div className="fixed top-0 left-0 h-full">
      <aside className="flex h-screen w-[80px] shrink-0 flex-col border-r border-zinc-800 bg-[#121212] md:w-[90px]">
        <header className="flex w-full flex-col items-center justify-center space-y-3 bg-[#121212] p-3">
          <NavLink to="/home" className="flex justify-center">
            <img className="mb-4 w-10" src="/src/assets/logo.svg" alt="Logo" />
          </NavLink>
          <ProfileSheet />
        </header>
        <nav className="mt-4 flex w-full flex-col items-center">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) =>
                `flex w-full flex-col items-center justify-center gap-2 py-4 text-sm font-medium text-gray-300 transition-colors duration-200 ${
                  isActive
                    ? "border-l-4 border-red-500 bg-(--background-color) text-white"
                    : "hover:border-l-4 hover:border-red-500 hover:bg-[#222] hover:text-white"
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <label className="mt-auto mb-4 text-center font-bold text-zinc-700">
          A&V
        </label>
      </aside>
    </div>
  );
};
