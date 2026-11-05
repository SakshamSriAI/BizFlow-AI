"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Mail,
  ArrowLeft,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  Clock,
  RotateCw,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid business email address"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [submittedEmail, setSubmittedEmail] = React.useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = React.useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  });

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const onSubmit = async (data: ForgotFormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    setSubmittedEmail(data.email);
    setResendCooldown(30);
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsLoading(false);
    setResendCooldown(30);
  };

  return (
    <Card className="border-slate-200/90 shadow-xl bg-white animate-fade-in">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-3 shadow-2xs">
          <KeyRound className="w-5 h-5" />
        </div>
        <CardTitle className="text-xl font-bold tracking-tight text-slate-900">
          Reset your password
        </CardTitle>
        <CardDescription className="text-xs text-slate-500">
          {submittedEmail
            ? "Recovery instructions have been sent"
            : "Enter your registered work email and we'll send a secure password reset link."}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {submittedEmail ? (
          <div className="space-y-4 animate-fade-in text-center">
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-left space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Reset Link Dispatched</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We sent a secure password reset link to <strong className="text-slate-900">{submittedEmail}</strong>. Please check your inbox and spam folder.
              </p>
              <div className="text-[11px] text-slate-400 font-mono pt-1">
                Token expires in 15 minutes.
              </div>
            </div>

            <div className="pt-2 flex flex-col items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResend}
                disabled={resendCooldown > 0 || isLoading}
                leftIcon={<RotateCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />}
              >
                {resendCooldown > 0
                  ? `Resend available in ${resendCooldown}s`
                  : "Resend reset email"}
              </Button>

              <Link href="/login" className="w-full">
                <Button variant="primary" size="md" className="w-full justify-center">
                  Return to Sign In
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                label="Registered Work Email"
                type="email"
                placeholder="name@company.com"
                leftIcon={<Mail className="w-4 h-4" />}
                hint="We'll send a one-time verification link."
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center text-sm font-semibold shadow-sm"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Send Password Reset Link
            </Button>
          </form>
        )}
      </CardContent>

      <CardFooter className="justify-center border-t border-slate-100 py-4 bg-slate-50/50 rounded-b-xl">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to sign in</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
