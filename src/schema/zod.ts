import {z} from "zod";

export const signInSchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z.string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(6, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
})

export const ingredientSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.enum([
        "VEGETABLES",
        "FRUITS",
        "MEAT",
        "DAIRY",
        "SPICES",
        "OTHER",
    ]),
    unit: z.enum(["GRAMS", "KILOGRAMS", "LITERS", "MILLILITERS", "PIECES"]),
    pricePerUnit: z.number({ invalid_type_error: "Price must be a number" })
        .min(0, "The price must be positive")
        .nullable(),
    description: z.string().optional(),
});
