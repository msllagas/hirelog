import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { JobApplication } from "@/types/job.ts";
import { index } from "@/api/job.ts";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function Application() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const totalPages = 5;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["jobs", page],
    queryFn: async () => {
      const r = await index(`page=${page}`);
      return r.data.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    setSearchParams({ page: page.toString() });
  }

  return (
    <>
      <h1>Job Application List</h1>

      {isPending && <p>Loading...</p>}
      {isError && <p>An error occurred. {error?.message}</p>}

      {!isPending && !isError && data && data.length === 0 && (
        <p>No job applications yet.</p>
      )}

      {!isPending && !isError && (
        <ul>
          {data?.map((job: JobApplication) => (
            <li key={job.id}>
              {job.company_name} - {job.position}
            </li>
          ))}
        </ul>
      )}
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`?page=${page - 1}`}
                onClick={(e) => {
                  if (page <= 1) {
                    e.preventDefault(); // Stop navigation
                    return;
                  }
                  e.preventDefault();
                  goToPage(page - 1);
                }}
                className={page <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => {
              const p = i + 1;
              return (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={p === page}
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(p);
                    }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href={`?page=${page + 1}`}
                onClick={(e) => {
                  if (page >= totalPages) {
                    e.preventDefault();
                    return;
                  }
                  e.preventDefault();
                  goToPage(page + 1);
                }}
                className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}

export { Application };
