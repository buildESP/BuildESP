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
