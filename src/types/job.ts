export type JobApplicationRequest = {
  id: number;
  job_type_id: number;
  company_name: string;
  position: string;
  location?: string | null;
  application_status_id: number;
};

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
