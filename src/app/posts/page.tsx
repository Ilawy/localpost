import { auth } from "@/auth";

import { unauthorized } from "next/navigation";
import { cache } from "react";
import PostsClient from "./_client";
import { deletePost, getPostsList } from "@/actions/post";
import { revalidatePath } from "next/cache";
// import { Separator } from "@radix-ui/react-separator";

export default async function PostWithIdEdit() {
  const session = await auth();
  const posts = await cache(getPostsList)();
  return (
    <>
      <PostsClient
        session={session}
        deleteAction={async (id: number) => {
          "use server";
          try {
            const session = await auth();
            if (!session || !session.user) unauthorized();
            await deletePost(id);
            revalidatePath("/posts");
            return true;
          } catch (error) {
            console.info(error);

            return false;
          }
        }}
        posts={posts}
      ></PostsClient>
    </>
  );
}
