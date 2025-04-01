import { DashboardSidebar } from "@/components/custom/DashboardSidebar";
import { AuthorsTable } from "./AuthorsTable";
import { AuthorsHeader } from "./AuthorsHeader";

export function AuthorsPage() {
  return (
    <div className="flex h-screen w-screen">
      <DashboardSidebar />

      <div className="flex h-full flex-col space-y-10 pt-10">
        <AuthorsHeader />
        <AuthorsTable />
      </div>
    </div>
  );
}
