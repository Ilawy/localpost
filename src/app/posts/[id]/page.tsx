import { prisma } from "@/prisma";
import { notFound } from "next/navigation";
import * as dayjs from "dayjs";
import { OutputData } from "@editorjs/editorjs";
import edjHTML from "editorjs-html";
import Link from "next/link";

// export const dynamicParams = true; // or false, to 404 on unknown paths
// export async function generateStaticParams() {
//   const posts = await prisma.post.findMany({
//     select: {
//       id: true,
//     },
//   });
//   return posts.map((post) => ({ ...post, id: String(post.id) }));
// }

export default async function PostWithIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post
    .findFirstOrThrow({
      where: { id: +id },
      include: {
        author: true,
      },
    })
    .catch(() => notFound());

  return (
    <>
      <div>
        <Link className="text-2xl underline" href={"/posts"}>
          {"<-"} All posts
        </Link>
      </div>
      <article>
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <small>
          <i>By {post.author.name}</i> -{" "}
          {dayjs.default(post.createdAt).format("DD MMMM, YYYY")}
        </small>
        <br />
        <div
          className="prose prose-xl"
          dangerouslySetInnerHTML={{
            __html: edjHTML({}, { strict: true }).parse(
              post.content as unknown as OutputData
            ),
          }}
        ></div>
      </article>
    </>
  );
}
