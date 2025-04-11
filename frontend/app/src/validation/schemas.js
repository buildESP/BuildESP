import { z } from "zod";

export const registerSchema = z.object({
  firstname: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastname: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z
    .string()
    .email("Adresse e-mail invalide"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  address: z
    .string()
    .optional(), // Adresse est optionnelle
  postcode: z
    .string()
    .optional(), // Code postal est optionnel
  phone: z
    .string()
    .min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres")
    .optional()
    .or(z.literal("")),
  picture: z
    .string()
    .url("URL de l'image invalide")
    .optional()
    .or(z.literal("")),
});


export const loginSchema = z.object({
  login: z
    .string({ required_error: "L’e-mail est requis" })
    .nonempty("L’e-mail est requis")
    .email("Email invalide"),
  password: z
    .string({ required_error: "Le mot de passe est requis" })
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});


export const addItemSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom de l’objet est requis"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .optional()
    .or(z.literal("")),
  picture: z
    .string()
    .url("URL de l’image invalide")
    .optional()
    .or(z.literal("")),
  status: z.enum(["Available", "Unavailable"], {
    message: "Statut invalide",
  }),
  subcategory_id: z.preprocess(
    (val) => Number(val),
    z.number().positive("Une sous-catégorie est requise")
  ),
});



export const updateProfileSchema = z.object({
  firstname: z
    .string()
    .min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastname: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z
    .string()
    .email("Adresse e-mail invalide"), // ✅ L’e-mail doit être valide (non modifiable côté UI)
  address: z
    .string()
    .optional()
    .or(z.literal("")), // ✅ Optionnel, vide accepté
  postcode: z
    .string()
    .optional()
    .or(z.literal("")), // ✅ Optionnel, vide accepté
  phone: z
    .string()
    .min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres")
    .optional()
    .or(z.literal("")), // ✅ Vide ou numéro valide
  picture: z
    .string()
    .url("URL de la photo invalide")
    .optional()
    .or(z.literal("")), // ✅ Vide ou URL valide
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});



export const itemUpdateSchema = z.object({
  name: z.string().min(2, "Le nom doit avoir au moins 2 caractères"),
  description: z.string().optional(),
  picture: z.string().url("URL invalide").optional(),
  status: z.enum(["Available", "Unavailable"]),
});


export const userUpdateSchema = z.object({
  firstname: z.string().min(1, "Le prénom est requis"),
  lastname: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères").optional(),
  address: z.string().optional(),
  postcode: z.string().optional(),
  phone: z.string().optional(),
  rating: z.coerce.number().optional(), // coerce transforme string en number
  picture: z.string().url("URL de l'image invalide").optional(),
  is_admin: z.boolean().optional(),
  // groups: z.array(z.number()).optional(), // à activer plus tard si besoin
});

export const categoryUpdateSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  image_url: z.string().url().optional().nullable().or(z.literal("")),
});


export const subcategoryUpdateSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  image_url: z.string().url().optional().nullable().or(z.literal("")),
});