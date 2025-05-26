"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// zod 스키마 정의
const contactSchema = z.object({
  name: z.string().min(2, "이름을 입력해 주세요."),
  email: z.string().email("유효한 이메일을 입력해 주세요."),
  message: z.string().min(5, "메시지를 입력해 주세요."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

type AlertState = {
  type: "success" | "error";
  message: string;
};

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [alert, setAlert] = useState<AlertState | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  // 서버 액션 import (actions/sendContactMessage.ts)
  async function onSubmit(data: ContactFormValues) {
    setStatus("loading");
    setAlert(null);
    try {
      const res = await fetch("/actions/sendContactMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        setStatus("error");
        setAlert({ type: "error", message: result.message || "메시지 전송에 실패했습니다." });
        return;
      }
      setStatus("success");
      setAlert({ type: "success", message: result.message });
      reset();
    } catch (err: any) {
      setStatus("error");
      setAlert({ type: "error", message: err.message || "알 수 없는 오류가 발생했습니다." });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg mx-auto bg-white dark:bg-slate-900/80 rounded-xl shadow-lg p-6 sm:p-8 flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">이름</Label>
        <Input id="name" {...register("name")} placeholder="이름을 입력하세요" disabled={status === "loading"} className="w-full" />
        {errors.name && <span className="text-destructive text-sm mt-1">{errors.name.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">이메일</Label>
        <Input id="email" type="email" {...register("email")} placeholder="이메일 주소" disabled={status === "loading"} className="w-full" />
        {errors.email && <span className="text-destructive text-sm mt-1">{errors.email.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">메시지</Label>
        <Textarea id="message" {...register("message")} placeholder="메시지를 입력하세요" rows={5} disabled={status === "loading"} className="w-full" />
        {errors.message && <span className="text-destructive text-sm mt-1">{errors.message.message}</span>}
      </div>
      <Button type="submit" disabled={status === "loading"} className="w-full">
        {status === "loading" ? (
          <Loader2 className="animate-spin mr-2" />
        ) : (
          "보내기"
        )}
      </Button>
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="mt-2"
          >
            <Alert variant={alert.type === "success" ? "default" : "destructive"}>
              <AlertTitle>{alert.type === "success" ? "성공" : "오류"}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
} 