import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { JobApplication } from "@/types/job.ts";
import { index } from "@/api/job.ts";

function Application() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["jobs", page],
    queryFn: async () => {
      const r = await index();
      return r.data.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
    refetchOnWindowFocus: false,
  });

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
    </>
  );
}

export { Application };
