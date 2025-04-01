import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface DashboardPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function DashboardTablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: DashboardPaginationProps) {
  return (
    <div className="mt-4 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage - 1);
              }}
              disabled={currentPage === 1}
              className="hover:bg-[#222] hover:text-inherit focus:bg-[#222] focus:text-inherit"
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
                className="hover:bg-[#222] hover:text-inherit focus:bg-[#222] focus:text-inherit"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage + 1);
              }}
              disabled={currentPage === totalPages}
              className="hover:bg-[#222] hover:text-inherit focus:bg-[#222] focus:text-inherit"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
