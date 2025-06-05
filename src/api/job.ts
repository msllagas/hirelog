import axios from "@/config/axios";

const API_ENDPOINT = "/job-applications";

export async function index( queryString: string | null = null) {
  const url = queryString ? `${API_ENDPOINT}/?${queryString}` : API_ENDPOINT;
  return await axios.get(url);
}
