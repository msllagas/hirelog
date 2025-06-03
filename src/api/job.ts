import axios from "@/config/axios";

const API_ENDPOINT = "/job-applications";

export async function index() {
  return await axios.get(API_ENDPOINT);
}
