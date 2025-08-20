import { z } from "zod";

export type LoginCredentials = {
  email: string;
  password: string;
};

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email(),
  password: z.string().min(8)
})

export type SignUpCredentials = z.infer<typeof signUpSchema>;