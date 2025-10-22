import {currencyConstants, serviceTypesConstants} from "@/common/service";
import {z} from "zod";

export const ServiciiVeterinareSchema = z.enum(serviceTypesConstants);

export const currencySchema = z.enum(currencyConstants);

export const contactsSchema = z.object({
  address: z
    .string()
    .max(200, "Adresa nu poate depăși 200 de caractere")
    .optional(),
  phone: z
    .string()
    .min(5, "Numărul de telefon trebuie să aibă cel puțin 5 caractere")
    .max(20, "Numărul de telefon nu poate depăși 20 de caractere")
    .regex(/^\+?[\d\s-()]+$/, "Format invalid pentru număr de telefon"),
  email: z
    .email()
    .max(100, "Email-ul nu poate depăși 100 de caractere")
    .optional(),
  website: z
    .url()
    .max(200, "URL-ul website-ului nu poate depăși 200 de caractere")
    .optional(),
});

export const priceSchema = z.object({
  name: z
    .string()
    .max(100, "Numele prețului nu poate depăși 100 de caractere")
    .min(1, "Numele prețului este obligatoriu"),
  price: z
    .number()
    .min(1, "Prețul trebuie să fie mai mare sau egal cu 1")
    .max(100000, "Prețul nu poate depăși 100000"),
  currency: currencySchema.refine((val) => val !== undefined, {
    message: "Selectați tipul valutar",
  }),
});

export const serviceSchema = z.object({
  company: z
    .string()
    .min(2, "Numele companiei trebuie să aibă cel puțin 2 caractere")
    .max(100, "Numele companiei nu poate depăși 100 de caractere"),
  type: ServiciiVeterinareSchema.refine((val) => val !== undefined, {
    message: "Selectați tipul serviciului veterinar",
  }),
  location: z
    .string()
    .min(2, "Locația este obligatorie")
    .max(50, "Locația nu poate depăși 50 de caractere"),
  animal: z
    .string()
    .max(50, "Tipul animalului nu poate depăși 50 de caractere")
    .min(1, "Tipul animalului este obligatoriu"),
  description: z
    .string()
    .min(10, "Descrierea trebuie să aibă cel puțin 10 caractere")
    .max(2000, "Descrierea nu poate depăși 2000 de caractere"),
  prices: z
    .array(priceSchema)
    .min(1, "Trebuie specificat cel puțin un preț pentru serviciu"),
  contacts: contactsSchema,
});

export type ContactsFormData = z.infer<typeof contactsSchema>;
export type PriceFormData = z.infer<typeof priceSchema>;
export type ServiceFormData = z.infer<typeof serviceSchema>;
