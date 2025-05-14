import { createPost } from "@/actions/post";
import { NewPostForm, NewPostFormAction } from "./_form";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function PostCreate() {
  const session = await auth();
  if (!session) redirect("/auth");
  const action: NewPostFormAction = async (data) => {
    "use server";
    const session = await auth();
    if (!session) redirect("/auth");
    return await createPost(session.user!.id!, data)
      .then((post) => ({
        message: (
          <span>
            Post{" "}
            <Link className="underline" href={`/posts/${post.id}`}>
              {post.id}
            </Link>{" "}
            has been created
          </span>
        ),
        type: "success" as const,
      }))
      .catch((error: Error) => ({
        message: <>{error.message}</>,
        type: "error" as const,
      }));
  };

  return (
    <div>
      <NewPostForm action={action} />
    </div>
  );
}
