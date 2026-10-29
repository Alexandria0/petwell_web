import {z} from "zod";

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
        name: z
          .string()
          .min(2, "Numele serviciului trebuie să aibă cel puțin 2 caractere")
          .max(100, "Numele serviciului nu poate depăși 100 de caractere"),
        price: z
          .string()
          .max(5, "Prețul nu poate depăși 5 caractere")
          .regex(/^\d+(\.\d{1,2})?$/, "Prețul trebuie să fie un număr"),
        currency: z
          .string()
          .max(5, "Moneda nu poate depăși 5 caractere")
          .min(1, "Moneda este obligatorie"),
      })
    )
    .min(1, "Adăugați cel puțin un serviciu")
    .max(10, "Puteți adăuga maxim 10 servicii"),
  contacts: z.object({
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
      .email("Adresă de email invalidă")
      .max(100, "Email-ul nu poate depăși 100 de caractere")
      .or(z.literal("")),
    website: z
      .string()
      .max(200, "URL-ul website-ului nu poate depăși 200 de caractere")
      .optional(),
  }),
  specialities: z
    .array(
      z.object({
        name: z
          .string()
          .min(2, "Numele specializării trebuie să aibă cel puțin 2 caractere")
          .max(100, "Numele specializării nu poate depăși 100 de caractere"),
      })
    )
    .min(1, "Adăugați cel puțin o specializare")
    .max(10, "Puteți adăuga maxim 10 specializări"),
  doctor: z
    .string()
    .max(2000, "Descrierea doctorului nu poate depăși 2000 de caractere"),
});
