import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(100).optional(),
  fullname: z.string().min(2, "Full name must be at least 2 characters").max(100).optional(),
  full_name: z.string().min(2, "Full name must be at least 2 characters").max(100).optional(),
  full_Name: z.string().min(2, "Full name must be at least 2 characters").max(100).optional(),
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50).optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50).optional(),
  email: z.string().email("Please enter a valid email").trim().toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password cannot exceed 50 characters"),
}).superRefine((data, ctx) => {
  const hasFull = !!(data.fullName || data.fullname || data.full_name || data.full_Name);
  const hasParts = !!(data.firstName && data.lastName);

  if (!hasFull && !hasParts) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please provide either fullName, fullname, full_name, full_Name OR both firstName and lastName",
      path: ["fullName"],
    });
  }
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").trim().toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});