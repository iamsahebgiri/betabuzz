import * as z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  link: z.string().min(1, "Link to product is required"),
  description: z.string().min(1, "Description is required"),
});