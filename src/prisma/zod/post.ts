import * as z from "zod";
import { Post } from "@prisma/client";

export const PostModel = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  content: z.any().nullable(),
  published: z.boolean(),
  authorId: z.string(),
});
