import { z } from "zod";
import { isValidPhone } from "../utils/helpers";

export const orderSchema = z.object({
  customer: z.string().trim().min(1, "You should enter your name."),
  address: z.string().min(1, "You should enter your address."),
  phone: z
    .string()
    .min(1, "You should enter your phone number.")
    .refine(isValidPhone, {
      message: "Invalid phone number",
    }),
  priority: z.boolean(),
});
