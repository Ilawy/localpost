import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AuthPage() {
  return (
    <div>
      <Card className="max-w-lg mx-auto mt-24">
        <CardHeader>
          <CardTitle>Choose an option</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <form
            action={async () => {
              "use server";
              await signIn("github", {
                redirectTo: "/",
              });
            }}
          >
            <Button>GitHub</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
