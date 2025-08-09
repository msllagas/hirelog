import axios from "@/config/axios";
import { JobApplicationRequest } from "@/types/job.ts";

const API_ENDPOINT = "/job-applications";

export async function index( queryString: string | null = null) {
  const url = queryString ? `${API_ENDPOINT}/?${queryString}` : API_ENDPOINT;
  return await axios.get(url);
}

export async function create(payload: JobApplicationRequest) {

  return axios.post(API_ENDPOINT, payload)

}

export async function update() {
  // todo -> implement update
}

export async function  destroy(jobApplicationID: number) {
  return await axios.delete(`${API_ENDPOINT}/${jobApplicationID}`);
}