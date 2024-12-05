import { z } from "zod";

export const orderSchema = z.object({
  customer: z.string().min(1, "You should enter your name."),
  address: z.string().min(1, "You should enter your address."),
  phone: z.string().min(1, "You should enter your phone number."),
  priority: z.boolean(),
});
