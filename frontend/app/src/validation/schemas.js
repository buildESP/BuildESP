import { z } from "zod";

export const registerSchema = z.object({
    firstname: z.string().min(2, "Firstname must be at least 2 characters"),
    lastname: z.string().min(2, "Lastname must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    address: z.string().optional(), // Address is optional
    postcode: z.string().optional(), // Postcode is optional
    phone: z.string().min(10, "Phone number must be at least 10 digits").optional().or(z.literal("")),
    picture: z.string().url("Invalid picture URL").optional().or(z.literal("")),
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const addItemSchema = z.object({
  name: z.string().min(2, "Item name is required"),
  description: z.string().min(10, "Description must be at least 10 characters").optional().or(z.literal("")),
  picture: z.string().url("Invalid image URL").optional().or(z.literal("")),
  status: z.enum(["Available", "Unavailable"], { message: "Invalid status" }),
  subcategory_id: z.preprocess((val) => Number(val), z.number().positive("Subcategory is required")),
});


export const updateProfileSchema = z.object({
  firstname: z.string().min(2, "Firstname must be at least 2 characters"),
  lastname: z.string().min(2, "Lastname must be at least 2 characters"),
  email: z.string().email("Invalid email address"), // ✅ Email must be valid but not editable
  address: z.string().optional().or(z.literal("")), // ✅ Optional, allows empty string
  postcode: z.string().optional().or(z.literal("")), // ✅ Optional, allows empty string
  phone: z.string().min(10, "Phone number must be at least 10 digits").optional().or(z.literal("")), // ✅ Allow empty or valid number
  picture: z.string().url("Invalid picture URL").optional().or(z.literal("")), // ✅ Allow empty or valid URL
  password: z.string().min(6, "Password must be at least 6 characters"),

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