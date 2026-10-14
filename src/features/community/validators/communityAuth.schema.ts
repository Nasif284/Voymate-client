import { z } from "zod";

export const communityLoginSchema = z.object({
  email: z.string().trim().email("Invalid email address format").toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type CommunityLoginFormData = z.infer<typeof communityLoginSchema>;

export const communityRegisterSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Community or club name must be at least 2 characters")
      .max(150, "Name cannot exceed 150 characters"),
    email: z
      .string()
      .trim()
      .email("Invalid email address format")
      .toLowerCase(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(128, "Password cannot exceed 128 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    city: z.string().max(100).optional(),
    state: z.string().max(100).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CommunityRegisterFormData = z.infer<typeof communityRegisterSchema>;

export const communityOnboardingSchema = z.object({
  tagline: z.string().max(255, "Tagline cannot exceed 255 characters").optional(),
  description: z.string().max(2000, "Description cannot exceed 2000 characters").optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  instagramHandle: z.string().max(100).optional(),
  websiteUrl: z
    .string()
    .url("Invalid URL format (e.g. https://yourclub.com)")
    .optional()
    .or(z.literal("")),
  phone: z.string().max(20).optional(),
});

export type CommunityOnboardingFormData = z.infer<typeof communityOnboardingSchema>;
