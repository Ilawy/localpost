import { prisma } from "@/prisma";
import { PostSchema } from "@/prisma/zod";

export async function createPost(authorId: string, unsafe_data: unknown) {
  const data = PostSchema.pick({
    title: true,
    content: true,
  }).parse(unsafe_data);
  return await prisma.post.create({
    data: {
      ...data,
      content: data.content!,
      authorId,
    },
  });
}

export async function updatePost(id: number, unsafe_data: unknown) {
  const data = PostSchema.pick({
    title: true,
    content: true,
  })
    .required()
    .parse(unsafe_data);
  return await prisma.post.update({
    data: {
      ...data,
      content: data.content!,
    },
    where: {
      id,
    },
  });
}

export async function getPostsList() {
  return await prisma.post.findMany({
    // include: {
    //   author: true,
    // },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      title: true,
      author: true,
      id: true,
      createdAt: true,
    },
  });
}

export async function deletePost(id: number) {
  return await prisma.post.delete({
    where: { id },
  });
}
