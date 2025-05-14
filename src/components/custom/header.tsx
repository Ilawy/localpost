import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";

export default function Header({ session }: { session: Session | null }) {
  console.log(session);

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Link href="#" className="mr-6 lg:flex" prefetch={false}>
          <span className="sr-xonly">localpost</span>
        </Link>
        <div className="ml-auto flex gap-2">
          <Link
            href="https://github.com/o-some-sad/localpost"
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
            target="_blank"
          >
            Source code
          </Link>
          {session?.user ? (
            <>
              <form>
                <Button>Logout</Button>
              </form>
            </>
          ) : (
            <>
              <Link href={"/auth"}>
                <Button>Login</Button>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
