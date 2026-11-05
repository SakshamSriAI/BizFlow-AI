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
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setStoredUser } from "@/lib/auth-store";

const signupSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid work email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the Terms of Service" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [signupSuccess, setSignupSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: true,
    },
  });

  const passwordValue = watch("password", "");

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { label: "None", percent: 0, color: "bg-slate-200" };
    if (pwd.length < 6) return { label: "Weak", percent: 25, color: "bg-rose-500" };
    if (pwd.length < 8) return { label: "Fair", percent: 50, color: "bg-amber-500" };
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    const hasNum = /\d/.test(pwd);
    if (hasSpecial && hasNum && pwd.length >= 8) {
      return { label: "Strong", percent: 100, color: "bg-emerald-500" };
    }
    return { label: "Good", percent: 75, color: "bg-indigo-500" };
  };

  const strength = getPasswordStrength(passwordValue);

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    // Save mock user session
    setStoredUser({
      id: "usr-" + Date.now(),
      name: data.fullName,
      email: data.email,
      role: "Workspace Owner",
      status: "online",
    });

    setSignupSuccess(true);
    setTimeout(() => {
      // Direct new user to Business Onboarding flow!
      router.push("/onboarding");
    }, 700);
  };

  return (
    <Card className="border-slate-200/90 shadow-xl bg-white animate-fade-in">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 shadow-2xs">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <CardTitle className="text-xl font-bold tracking-tight text-slate-900">
          Create your Nexora account
        </CardTitle>
        <CardDescription className="text-xs text-slate-500">
          Start your 14-day full platform access. No credit card required.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {signupSuccess && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Account created! Redirecting to Business Onboarding...</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          {/* Full Name */}
          <div>
            <Input
              label="Full Legal Name"
              placeholder="e.g. Saksham Srivastava"
              leftIcon={<User className="w-4 h-4" />}
              error={errors.fullName?.message}
              {...register("fullName")}
            />
          </div>

          {/* Work Email */}
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

          {/* Password */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 characters"
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
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-rose-500 font-medium mt-1">
                {errors.password.message}
              </p>
            )}

            {/* Password strength bar */}
            {passwordValue && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>Strength: {strength.label}</span>
                  <span>{strength.percent}%</span>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${strength.percent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Input
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter password"
              leftIcon={<Lock className="w-4 h-4" />}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </div>

          {/* Terms checkbox */}
          <div>
            <div className="flex items-start">
              <input
                id="acceptTerms"
                type="checkbox"
                className="w-3.5 h-3.5 mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                {...register("acceptTerms")}
              />
              <label
                htmlFor="acceptTerms"
                className="ml-2 block text-xs text-slate-600 select-none cursor-pointer leading-normal"
              >
                I agree to Nexora&apos;s Terms of Service and Privacy Policy.
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-xs text-rose-500 font-medium mt-1">
                {errors.acceptTerms.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full justify-center text-sm font-semibold shadow-sm"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create Account & Continue
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t border-slate-100 py-4 bg-slate-50/50 rounded-b-xl">
        <p className="text-xs text-slate-500">
          Already have a Nexora workspace?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
