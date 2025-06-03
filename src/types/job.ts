export type JobApplication = {
  id: number;
  user_id: number;
  job_type_id: number;
  company_name: string;
  position: string;
  location?: string | null;
  application_status_id: number;
};
