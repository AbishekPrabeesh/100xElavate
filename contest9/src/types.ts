import { z } from "zod";

export const SignupSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
    role: z.enum(["USER", "ADMIN"])
});
export const SigninSchema = z.object({
    username: z.string(),
    password: z.string()
});