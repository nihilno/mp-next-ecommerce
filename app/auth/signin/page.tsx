import SignInForm from "@/components/auth/SignInForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserIcon } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <section className="grid min-h-[calc(100dvh-241px)] place-items-center">
      <Card className="w-full max-w-sm py-8">
        <CardHeader className="mb-4 w-full text-lg">
          <UserIcon className="text-primary mx-auto mb-2 h-10 w-10" />
          <CardTitle className="mx-auto mb-1">
            Sign In to your account
          </CardTitle>
          <CardDescription className="mx-auto text-center">
            Or{" "}
            <Link href="#" className="text-primary hover:underline">
              create an account
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SignInForm />

          <div className="relative my-4 flex items-center">
            <span className="border-primary grow border-t"></span>
            <span className="text-muted-foreground mx-2 text-sm">
              or continue with
            </span>
            <span className="border-primary grow border-t"></span>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant="outline" className="w-full" disabled>
              Sign in with Google
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Sign in with GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
