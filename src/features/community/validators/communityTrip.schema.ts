import { z } from "zod";

export const createCommunityTripSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters")
      .max(200, "Title cannot exceed 200 characters"),
    category: z.enum(["CAMP", "TREK_EXPEDITION", "ROADTRIP", "TRIP"], {
      message: "Please select a valid category",
    }),
    pricingType: z.enum(["FREE", "PAID"]),
    price: z.number().positive("Price must be greater than 0").optional(),
    priceNote: z.string().max(200).optional(),
    destinationName: z
      .string()
      .trim()
      .min(2, "Destination name is required"),
    city: z.string().trim().min(2, "City is required"),
    state: z.string().trim().min(2, "State is required"),
    country: z.string().trim(),
    dateFrom: z.string().min(1, "Start date is required"),
    dateTo: z.string().min(1, "End date is required"),
    durationText: z
      .string()
      .trim()
      .min(2, "Duration text is required (e.g. '3 Days / 2 Nights')"),
    maxCapacity: z
      .number()
      .min(1, "Capacity must be at least 1")
      .max(500, "Capacity cannot exceed 500"),
    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters"),
    itinerary: z
      .string()
      .trim()
      .min(5, "Itinerary or schedule details are required"),
    inclusions: z.string().optional(),
    exclusions: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.pricingType === "PAID") {
        return typeof data.price === "number" && !isNaN(data.price) && data.price > 0;
      }
      return true;
    },
    {
      message: "Paid trips must have a valid price greater than 0",
      path: ["price"],
    }
  )
  .refine(
    (data) => {
      if (data.dateFrom && data.dateTo) {
        return new Date(data.dateFrom) < new Date(data.dateTo);
      }
      return true;
    },
    {
      message: "End date must be after start date",
      path: ["dateTo"],
    }
  );

export type CreateCommunityTripFormData = z.infer<
  typeof createCommunityTripSchema
>;
