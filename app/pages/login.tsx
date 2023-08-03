import Link from "next/link";

import { SignInForm } from "@/components/ui/use-auth-form";
import { Icons } from "@/components/icons";
import Head from "next/head";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login - Login to your account</title>
      </Head>
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Icons.logo className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
          </div>
          <SignInForm />
          <p className="px-8 text-center text-sm font-medium text-muted-foreground">
            <Link
              href="/register"
              className="hover:text-brand underline underline-offset-4"
            >
              Don&apos;t have an account? Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
