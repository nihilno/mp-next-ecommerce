import OtherProviders from "@/components/auth/OtherProviders";
import SignInForm from "@/components/auth/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account to access your orders and more.",
};

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
            <Link href="/auth/signup" className="text-primary hover:underline">
              create an account
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SignInForm />
          <OtherProviders />
        </CardContent>
      </Card>
    </section>
  );
}
