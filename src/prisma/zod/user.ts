import * as z from "zod";
import { User } from "@prisma/client";

export const UserModel = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
});
