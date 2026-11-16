import { z } from "zod";

/**
 * Common primitive validation schemas
 */
export const emailSchema = z.string().email("Invalid email address");

export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format");

export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(100, "Name must not exceed 100 characters");

export const uuidSchema = z.string().uuid("Invalid UUID identifier");

export const idSchema = z.object({
  id: z.string().uuid("Invalid UUID identifier"),
});

/**
 * Standard pagination and search query schemas
 */
export const paginationSchema = z.object({
  page: z.coerce.number().min(1, "Page must be at least 1").default(1),
  limit: z.coerce.number().min(1).max(100, "Limit cannot exceed 100").default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const searchSchema = z.object({
  query: z.string().min(1, "Search query cannot be empty"),
  type: z.enum(["athletes", "tournaments", "schools", "sponsors"]).optional(),
});

/**
 * Shared TypeScript types for pagination and search
 */
export interface PaginationInput {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export type SearchInput = z.infer<typeof searchSchema>;
