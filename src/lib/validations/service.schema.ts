import {z} from "zod";

const contactsSchema = z.object({
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

export const serviceSchema = z.object({
  company: z
    .string()
    .min(2, "Numele companiei trebuie să aibă cel puțin 2 caractere")
    .max(100, "Numele companiei nu poate depăși 100 de caractere"),
  type: z
    .string()
    .min(1, "Vă rugăm să selectați un serviciu")
    .max(100, "Numele serviciului nu poate depăși 100 de caractere"),
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
    .max(1500, "Descrierea nu poate depăși 1500 de caractere"),
  prices: z
    .array(
      z.object({
        name: z.string().min(2).max(100),
        price: z.string().max(5),
        currency: z.string().max(5).min(1),
      })
    )
    .min(1, "Add at least one service.")
    .max(10, "You can add up to 10 services"),
});
