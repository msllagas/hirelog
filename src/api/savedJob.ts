import axios from "@/config/axios";
import { SavedJobRequest } from "@/types/savedJob.ts";

const API_ENDPOINT = "/saved-jobs";

export async function index( queryString: string | null = null) {
  const url = queryString ? `${API_ENDPOINT}/?${queryString}` : API_ENDPOINT;
  return await axios.get(url);
}

export async function create(payload: SavedJobRequest) {

  return await axios.post(API_ENDPOINT, payload)
}

export async function update() {
  // todo -> implement update
}

export async function  destroy(jobApplicationID: number) {
  return await axios.delete(`${API_ENDPOINT}/${jobApplicationID}`);
}
