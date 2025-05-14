import { prisma } from "@/prisma";
import { PostModel } from "@/prisma/zod";

export async function createPost(authorId: string, unsafe_data: unknown) {
  const data = PostModel.pick({
    title: true,
    content: true,
  }).parse(unsafe_data);
  return await prisma.post.create({
    data: {
      ...data,
      authorId,
    },
  });
}

export async function updatePost(id: number, unsafe_data: unknown) {
  const data = PostModel.pick({
    title: true,
    content: true,
  }).parse(unsafe_data);
  return await prisma.post.update({
    data,
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
