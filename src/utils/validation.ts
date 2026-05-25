import { z } from 'zod';

// Common validation schemas that can be reused across controllers

export const emailSchema = z.string().email('Invalid email format');

export const passwordSchema = z.string()
  .min(6, 'Password must be at least 6 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number');

export const displayNameSchema = z.string()
  .min(2, 'Display name must be at least 2 characters')
  .max(50, 'Display name must be at most 50 characters')
  .regex(/^[\p{L}0-9\s]+$/u, 'Display name can only contain letters, numbers, and spaces');

export const paginationSchema = z.object({
  page: z.coerce.number().min(1, 'Page must be at least 1').default(1),
  limit: z.coerce.number().min(1, 'Limit must be at least 1').max(100, 'Limit must be at most 100').default(20),
});

export const slugSchema = z.string()
  .min(1, 'Slug is required')
  .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens');

export const cuidSchema =
  z.string().cuid();

export const xpAmountSchema = z.number()
  .min(0, 'XP amount must be non-negative')
  .max(10000, 'XP amount is too large');

export const scoreSchema = z.number()
  .min(0, 'Score must be non-negative');

// Utility functions for validation

export function validateEmail(email: string): boolean {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
}

export function validatePassword(password: string): boolean {
  try {
    passwordSchema.parse(password);
    return true;
  } catch {
    return false;
  }
}

export function sanitizeString(input: string): string {
  return input.trim().replace(/\s+/g, ' '); // Remove extra whitespace
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove multiple hyphens
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}