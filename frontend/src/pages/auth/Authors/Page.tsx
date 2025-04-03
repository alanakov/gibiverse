import { useState } from "react";
import { DashboardSidebar } from "@/components/custom/DashboardSidebar";
import { AuthorsTable } from "./AuthorsTable";
import { AuthorsHeader } from "./AuthorsHeader";
import { DashboardPagination } from "@/components/custom/DashboardPagination";

export function AuthorsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <div className="flex h-screen w-screen">
      <DashboardSidebar />

      <div className="flex h-full flex-col space-y-10 pt-30">
        <AuthorsHeader />

        <div className="flex h-[100%] flex-col justify-between pb-30">
          <AuthorsTable currentPage={currentPage} />

          <DashboardPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
