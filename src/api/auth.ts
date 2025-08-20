import axios from "@/config/axios";
import { LoginCredentials, SignUpCredentials } from "@/types/auth.ts";

export async function loginUser(data: LoginCredentials) {
  await axios.post("/login", data);
  const response = await axios.get("/user");
  return response.data;
}

export async function signup(data: SignUpCredentials) {
  return await axios.post("/signup", data);
}