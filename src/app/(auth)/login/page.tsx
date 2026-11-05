"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { setStoredUser } from "@/lib/auth-store";
import { mockCurrentUser } from "@/data/mock-workspaces";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid business email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [authError, setAuthError] = React.useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setAuthError(null);

    // Simulate authentication delay
    await new Promise((r) => setTimeout(r, 900));

    // Simulated check: if password is "error", trigger mock error state
    if (data.password === "error123") {
      setIsLoading(false);
      setAuthError("Invalid credentials. Enter any other password or use Quick Demo.");
      return;
    }

    // Success flow
    setStoredUser({
      ...mockCurrentUser,
      email: data.email,
    });
    setAuthSuccess(true);

    setTimeout(() => {
      router.push("/workspaces");
    }, 600);
  };

  const fillDemoAccount = (role: "owner" | "admin") => {
    setAuthError(null);
    if (role === "owner") {
      setValue("email", "saksham@businessos.dev");
      setValue("password", "NexoraPass2026!");
    } else {
      setValue("email", "alex@novasaas.dev");
      setValue("password", "NovaAdmin99#");
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setStoredUser(mockCurrentUser);
    setAuthSuccess(true);
    setTimeout(() => {
      router.push("/workspaces");
    }, 500);
  };

  return (
    <Card className="border-slate-200/90 shadow-xl bg-white animate-fade-in">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 shadow-2xs">
          <Lock className="w-5 h-5" />
        </div>
        <CardTitle className="text-xl font-bold tracking-tight text-slate-900">
          Welcome back to Nexora
        </CardTitle>
        <CardDescription className="text-xs text-slate-500">
          Sign in to access your business workspaces, leads, and finances.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {/* Quick Demo Fill Pills */}
        <div className="rounded-lg bg-indigo-50/70 border border-indigo-100 p-2.5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-900">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              1-Click Demo Accounts:
            </span>
            <span className="text-indigo-600 font-normal">Autofill</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => fillDemoAccount("owner")}
              className="px-2 py-1 rounded-md bg-white border border-indigo-200 text-indigo-700 text-[11px] font-medium hover:bg-indigo-100/50 transition-colors shadow-2xs"
            >
              Workspace Owner (Saksham)
            </button>
            <button
              type="button"
              onClick={() => fillDemoAccount("admin")}
              className="px-2 py-1 rounded-md bg-white border border-indigo-200 text-indigo-700 text-[11px] font-medium hover:bg-indigo-100/50 transition-colors shadow-2xs"
            >
              Team Admin (Alex)
            </button>
          </div>
        </div>

        {/* Auth Error Banner */}
        {authError && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{authError}</span>
          </div>
        )}

        {/* Auth Success Banner */}
        {authSuccess && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Authenticated successfully! Directing to workspace selector...</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          {/* Email Field */}
          <div>
            <Input
              label="Work Email"
              type="email"
              placeholder="name@company.com"
              leftIcon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              {...register("email")}
            />
          </div>

          {/* Password Field with Visibility Toggle */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-700">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[11px] text-indigo-600 hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 shadow-2xs focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/10 pl-9 pr-10"
                {...register("password")}
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-rose-500 font-medium mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              {...register("rememberMe")}
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-xs text-slate-600 select-none cursor-pointer"
            >
              Remember this device for 30 days
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full justify-center text-sm font-semibold shadow-sm"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign in to Workspace
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-white px-2 text-slate-400 font-semibold tracking-wider">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-2 gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleSocialLogin("Google")}
            className="w-full text-xs"
          >
            <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Google
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleSocialLogin("GitHub")}
            className="w-full text-xs"
          >
            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            GitHub
          </Button>
        </div>
      </CardContent>

      <CardFooter className="justify-center border-t border-slate-100 py-4 bg-slate-50/50 rounded-b-xl">
        <p className="text-xs text-slate-500">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/signup"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Create free account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
