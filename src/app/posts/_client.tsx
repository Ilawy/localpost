"use client";
import { type getPostsList } from "@/actions/post";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import dayjs from "dayjs";
import Link from "next/link";
import relativeTime from "dayjs/plugin/relativeTime";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Session } from "next-auth";

dayjs.extend(relativeTime);

export default function PostsClient({
  posts,
  deleteAction,
  session,
}: {
  posts: Awaited<ReturnType<typeof getPostsList>>;
  deleteAction: (id: number) => Promise<boolean>;
  session: Session | null;
}) {
  const [currentPost, setCurrentPost] = useState<(typeof posts)[number] | null>(
    null,
  );
  return (
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You're trying to delete a post with title '{currentPost?.title}' and
            id '{currentPost?.id}'
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setCurrentPost(null)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteAction(currentPost!.id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>

      <h1 className="text-3xl font-bold">Posts</h1>
      {session && (
        <Link href="/posts/create">
          <Button>Create a post</Button>
        </Link>
      )}
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-3 border rounded-md max-w-sm grid grid-cols-2 grid-rows-2 my-3"
        >
          <Link className="contents" href={`/posts/${post.id}`}>
            <span className="font-bold text-xl">{post.title}</span>
            <span className="row-start-2">{post.author.name}</span>
          </Link>
          <span className="flex items-center justify-end">
            {dayjs(post.createdAt).from(dayjs())}
          </span>
          {session?.user?.id === post.author.id && (
            <div className="flex items-center justify-end gap-3">
              <AlertDialogTrigger asChild>
                <Button
                  size={"icon"}
                  variant={"destructive"}
                  onClick={() => setCurrentPost(post)}
                >
                  D
                </Button>
              </AlertDialogTrigger>
              <Link href={`/posts/${post.id}/edit`}>
                <Button size={"icon"}>E</Button>
              </Link>
            </div>
          )}
        </div>
      ))}
    </AlertDialog>
  );
}
