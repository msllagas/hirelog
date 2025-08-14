import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { index } from "@/api/jobType";
import { index as applicationStatusIndex } from "@/api/applicationStatus";
import { Button } from "@/components/ui/button.tsx";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {  z } from "zod";
import { jobApplicationSchema } from "@/types/job.ts";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils.ts";
import { JobTypeResponse } from "@/types/jobType.ts";
import { ApplicationStatusResponse } from "@/types/applicationStatus.ts";
import { create } from "@/api/job.ts";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export function AddJobForm() {
  const navigate = useNavigate();

  const { data: jobTypes } = useQuery({
    queryKey: ["job-type"],
    queryFn: async () => {
      const r = await index();
      return r.data.data;
    },
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const { data: applicationStatuses } = useQuery({
    queryKey: ["application-status"],
    queryFn: async () => {
      const r = await applicationStatusIndex();
      console.log(r.data.data);
      return r.data.data;
    },
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const form = useForm<z.infer<typeof jobApplicationSchema>>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      position: "",
      company_name: "",
      applied_date: new Date(),
      location: null,
      job_type_id: 0,
      application_status_id: 0,
      application_url: null,
      description: null
    },
  });

  async function onSubmit(values: z.infer<typeof jobApplicationSchema>) {

    const response = await create(values);

    if (response.status === 201) {
      toast.success("Job application created successfully!");

      navigate("/app/applications");
    }
  }

  return (
    <>
      <h1 className="mx-2 mt-4 text-xl font-medium">Add Job</h1>
      <div className="mx-2">
        <div className="rounded-2xl border p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Position & Company Name */}
              <div className="flex flex-col items-start gap-4 md:flex-row">
                <div className="grid w-full gap-3">
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid w-full gap-3">
                  <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Applied Date & Location */}
              <div className="flex flex-col items-start gap-4 md:flex-row">
                <div className="grid w-full gap-3">
                  <FormField
                    control={form.control}
                    name="applied_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Applied Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid w-full gap-3">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Job type & Application Status*/}
              <div className="flex flex-col items-start gap-4 md:flex-row">
                <div className="grid w-full gap-3">
                  <FormField
                    control={form.control}
                    name="job_type_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Type</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {jobTypes &&
                              jobTypes.map((jobType: JobTypeResponse) => (
                                <SelectItem
                                  key={jobType.id}
                                  value={jobType.id.toString()}
                                >
                                  {jobType.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid w-full gap-3">
                  <FormField
                    control={form.control}
                    name="application_status_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application Status</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {applicationStatuses &&
                              applicationStatuses.map(
                                (
                                  applicationStatus: ApplicationStatusResponse,
                                ) => (
                                  <SelectItem
                                    key={applicationStatus.id}
                                    value={applicationStatus.id.toString()}
                                  >
                                    {applicationStatus.name}
                                  </SelectItem>
                                ),
                              )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Application URL */}
              <div className="flex flex-col items-start gap-4 md:flex-row">
                <div className="grid w-full gap-3">
                  <FormField
                    control={form.control}
                    name="application_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application URL</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value ?? ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col items-start gap-4 md:flex-row">
                <div className="grid w-full gap-3">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            className="resize-none"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
