import z from "zod";

export const searchSchema = z.object({
  searchTerm: z.string().optional(),
  type: z.string().optional(),
  animal: z.string().optional(),
  location: z.string().optional(),
});
