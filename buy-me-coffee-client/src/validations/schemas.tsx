import { z } from "zod";

export const profileSchema = z.object({
  avatarImage: z.string().min(1, "Please enter image."),
  socialMediaURL: z.string().min(1, "Please enter a social link.").url(),
  name: z.string().min(1, "Please enter name."),
  about: z.string().min(1, "Please enter info about yourself."),
});
export const payInfoSchema = z.object({
  id: z.number(),
  country: z.string().min(1, "Select country to continue."),
  firstName: z.string().min(1, "First name required."),
  lastName: z.string().min(1, "Last name required."),
  cardNumber: z.string().length(16, "Invalid card number."),
  expires: z.string().min(1, "Expires required."),
  cvc: z.coerce.number().max(999).min(1),
  year: z.string().min(4, "Invalid year"),
});
export const MessageType = z.object({
  successMessage: z.string().min(1, "Enter message "),
});
export const PasswordTypes = z
  .object({
    password: z.string().min(1, "Password is required"),
    confirm: z.string().min(1, "Please confirm your password"),
  })
  .refine(data => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });
