import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { JobApplicationResponse } from "@/types/job.ts";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge.tsx";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Bookmark,
  BriefcaseBusiness,
  Code,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton.tsx";

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

  const statusStyles: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Review": "bg-blue-100 text-blue-800",
    "Interview Scheduled": "bg-green-100 text-green-800",
    "Offer Received": "bg-purple-100 text-purple-800",
    Accepted: "bg-emerald-100 text-emerald-800",
    Rejected: "bg-red-100 text-red-800",
    Withdrawn: "bg-gray-100 text-gray-800",
  };
  return (
    <>
      <h1>Job Application List</h1>

      {isPending && (
        <div className="font-inter grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <>
              <Skeleton key={i} className="h-[250px] w-[300px] self-stretch" />
            </>
          ))}
        </div>
      )}
      {isError && <p>An error occurred. {error?.message}</p>}

      {!isPending && !isError && data && data.length === 0 && (
        <p>No job applications yet.</p>
      )}
      {!isPending && !isError && (
        <div className="font-inter grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {data?.map((job: JobApplicationResponse) => (
            <Card key={job.id} className="self-stretch">
              <CardHeader>
                <CardTitle>
                  <div className="">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <Badge
                        className={
                          statusStyles[job.application_status.name] ||
                          "bg-gray-100 text-gray-800"
                        }
                      >
                        {job.application_status.name}
                      </Badge>
                      <div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                className="cursor-pointer text-amber-500 hover:text-amber-600"
                              >
                                <Bookmark />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Save</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    <p className="flex items-center gap-2 font-extrabold">
                      <Code />
                      {job.position}
                    </p>
                  </div>
                </CardTitle>
                <CardDescription>{job.company_name}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-x-4 text-sm">
                <p className="flex items-center gap-2 text-sm">
                  <BriefcaseBusiness size={18} />
                  <span>{job?.job_type?.name}</span>
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <MapPin size={18} />
                  <span>{job.location}</span>
                </p>
              </CardContent>
              <CardFooter className="justify-end">
                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className="cursor-pointer text-blue-600 hover:text-blue-800"
                        >
                          <Pencil />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" className="cursor-pointer">
                          <Trash2 className="text-destructive" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
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
                className={
                  page >= totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}

export { Application };
