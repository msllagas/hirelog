import { z } from "zod";

export const jobApplicationSchema = z.object({
  position: z.string(),
  company_name: z.string(),
  applied_date: z.date(),
  location: z.string().nullable().optional(),
  job_type_id: z.number(),
  application_status_id: z.number(),
  application_url: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
});

export type JobApplicationRequest = z.infer<typeof jobApplicationSchema>;

export type JobApplicationResponse = {
  id: number;
  company_name: string;
  position: string;
  location: string;
  description: string;
  job_type: {
    id: number;
    name: string;
  };
  application_status: {
    id: number;
    name: string;
  };
  is_saved: boolean;
};
