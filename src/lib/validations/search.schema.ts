import z from "zod";

export const searchSchema = z
  .object({
    type: z.string().optional(),
    animal: z.string().optional(),
    location: z.string().optional(),
  })
  .refine((data) => data.type || data.animal || data.location, {
    message:
      "Vă rugăm să selectați cel puțin un criteriu de căutare (serviciu, animal sau locație)",
    path: ["animal"],
  });
