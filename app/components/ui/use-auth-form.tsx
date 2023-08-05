import * as React from "react";
import { useRouter } from "next/router";
import authService from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { registerSchema, signInSchema } from "@/lib/validations/auth";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import useUser from "@/hooks/use-user";
import { FormErrorMessage } from "@/components/ui/form-error-message";
import { GoogleLoginButton } from "../accounts/google-login-btn";

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type SignInFormData = z.infer<typeof signInSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export function SignInForm({ className, ...props }: SignInFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  const { mutate } = useUser();

  const onSignInSuccess = React.useCallback(async () => {
    await mutate();
    const nextLocation = router.asPath.split("?next=")[1];
    if (nextLocation) await router.push(nextLocation as string);
    else await router.push("/");
  }, [mutate, router]);

  function onSubmit(data: SignInFormData) {
    setIsLoading(true);

    authService
      .signIn(data)
      .then(async () => {
        await onSignInSuccess();
      })
      .catch((err) => {
        return toast({
          title: "Bad request.",
          description: err?.message,
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleGoogleSignIn = (code: string) => {
    setIsGoogleLoading(true);

    authService
      .signInWithGoogle({ code })
      .then(async () => {
        await onSignInSuccess();
      })
      .catch((err) => {
        return toast({
          title: "Bad request.",
          description: err?.message,
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsGoogleLoading(false);
      });
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="secret"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign in
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background text-muted-foreground px-2 font-medium">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleLoginButton
        isLoading={isGoogleLoading}
        handleSignIn={handleGoogleSignIn}
      />
    </div>
  );
}
export function RegisterForm({ className, ...props }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { mutate } = useUser();

  const onRegistrationSuccess = React.useCallback(async () => {
    await mutate();
    const nextLocation = router.asPath.split("?next=")[1];
    if (nextLocation) await router.push(nextLocation as string);
    else await router.push("/");
  }, [mutate, router]);

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);

    authService
      .register(data)
      .then(async (res) => {
        await onRegistrationSuccess();
      })
      .catch((err) => {
        return toast({
          title: "Bad request.",
          description: err.message,
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Jon Snow"
              type="name"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              {...register("name")}
            />
            {errors?.name && (
              <FormErrorMessage>{errors.name.message}</FormErrorMessage>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            {errors?.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="secret"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              disabled={isLoading}
              {...register("password")}
            />
            {errors?.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
