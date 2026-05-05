import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters")
    .toLowerCase()
    .trim(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters")
    .trim(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export const validateContactForm = (data: unknown) => {
  try {
    return ContactFormSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.issues.map(e => ({
          field: e.path.join("."),
          message: e.message
        }))
      };
    }
    return {
      success: false,
      errors: [{ field: "unknown", message: "Validation failed" }]
    };
  }
};
