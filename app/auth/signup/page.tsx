import OtherProviders from "@/components/auth/OtherProviders";
import SignUpForm from "@/components/auth/SignUpForm";
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
  title: "Sign Up",
};

export default function SignUpPage() {
  return (
    <section className="grid min-h-[calc(100dvh-241px)] place-items-center">
      <Card className="w-full max-w-sm py-8">
        <CardHeader className="mb-4 w-full text-lg">
          <UserIcon className="text-primary mx-auto mb-2 h-10 w-10" />
          <CardTitle className="mx-auto mb-1">Create a free account</CardTitle>
          <CardDescription className="mx-auto text-center">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-primary hover:underline">
              Sing in.
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <SignUpForm />
          <OtherProviders />
        </CardContent>
      </Card>
    </section>
  );
}
