import * as z from "zod";

export const updateUserSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  name: z.string().min(1, "Name is required"),
});
