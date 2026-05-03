import { z } from 'zod/v4';

/**
 * Shared Zod validation schemas.
 * Used for form validation, API input validation, etc.
 */

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter'),
  email: z.email('Format email tidak valid'),
  phone: z
    .string()
    .min(8, 'Nomor telepon minimal 8 digit')
    .max(20, 'Nomor telepon maksimal 20 digit')
    .optional(),
  subject: z
    .string()
    .min(3, 'Subjek minimal 3 karakter')
    .max(200, 'Subjek maksimal 200 karakter'),
  message: z
    .string()
    .min(10, 'Pesan minimal 10 karakter')
    .max(2000, 'Pesan maksimal 2000 karakter'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const newsletterSchema = z.object({
  email: z.email('Format email tidak valid'),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;
