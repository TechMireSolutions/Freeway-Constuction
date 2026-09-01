"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { ServiceCard } from "@/types/sanity";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Please tell us a little more about your project"),
});

type FormValues = z.infer<typeof schema>;

interface ContactFormProps {
  services: ServiceCard[];
  successMessage?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ services, successMessage }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 sm:grid-cols-2" noValidate>
        <Field label="Full name" error={errors.name?.message} className="sm:col-span-1">
          <input
            type="text"
            className={inputClass(!!errors.name)}
            placeholder="John Smith"
            {...register("name")}
          />
        </Field>

        <Field label="Email" error={errors.email?.message} className="sm:col-span-1">
          <input
            type="email"
            className={inputClass(!!errors.email)}
            placeholder="john@example.com"
            {...register("email")}
          />
        </Field>

        <Field label="Phone (optional)" className="sm:col-span-1">
          <input
            type="tel"
            className={inputClass(false)}
            placeholder="+1 555 000 0000"
            {...register("phone")}
          />
        </Field>

        <Field label="Service of interest" className="sm:col-span-1">
          <select className={inputClass(false)} {...register("service")}>
            <option value="">General enquiry</option>
            {services.map((service) => (
              <option key={service._id} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Project details" error={errors.message?.message} className="sm:col-span-2">
          <textarea
            rows={5}
            className={inputClass(!!errors.message)}
            placeholder="Tell us about your project, timeline and budget..."
            {...register("message")}
          />
        </Field>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-medium text-base transition-colors duration-300 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Send message"
            )}
          </button>
        </div>
      </form>

      {status === "success" ? (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm">
            {successMessage || "Thanks — your message has been sent. We'll get back to you shortly."}
          </p>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm">
            Something went wrong sending your message. Please try again, or contact us directly.
          </p>
        </div>
      ) : null}
    </div>
  );
}

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink transition-colors outline-none placeholder:text-neutral/60 focus:border-ink ${
    hasError ? "border-red-400" : "border-divider"
  }`;

interface FieldProps {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

function Field({ label, error, className, children }: FieldProps) {
  return (
    <label className={className}>
      <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error ? <span className="mt-1.5 block text-xs text-red-500">{error}</span> : null}
    </label>
  );
}