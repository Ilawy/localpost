import { updatePost } from "@/actions/post";
import { NewPostForm } from "@/app/posts/create/_form";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { OutputData } from "@editorjs/editorjs";
import { notFound, redirect, unauthorized } from "next/navigation";

export default async function PostWithIdEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/auth");
  const { id } = await params;
  console.log("??", session.user);

  const post = await prisma.post
    .findFirstOrThrow({
      where: {
        id: +id,
      },
    })
    .catch(() => notFound());
  console.log(post);

  if (post.authorId !== session.user?.id) {
    unauthorized();
  }
  return (
    <>
      <NewPostForm
        initial={{
          title: post.title,
          content: post.content as unknown as OutputData,
        }}
        id={post.id}
        action={async (data, id) => {
          "use server";
          return await updatePost(id!, data)
            .catch((error: Error) => ({
              message: error.message,
              type: "error",
            }))
            .then(() => redirect(`/posts/${id!}`));
        }}
      />
    </>
  );
}
