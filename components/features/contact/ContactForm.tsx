"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/common/Icon";
import { cn } from "@/lib/utils";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas/contact";

// Props 인터페이스 정의
interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form 설정
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // 폼 제출 핸들러
  const onSubmit = async (values: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        toast.success("문의가 성공적으로 전송되었습니다.");
        form.reset();
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(
          errorData.message || 
          "문의 전송에 실패했습니다. 잠시 후 다시 시도해주세요."
        );
      }
    } catch (error) {
      console.error("문의 전송 오류:", error);
      toast.error(
        "네트워크 연결을 확인하고 다시 시도해주세요."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        {/* 이름 필드 */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름 *</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="성함을 입력해주세요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 이메일 필드 */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일 *</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="답변 받으실 이메일 주소를 입력해주세요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 제목 필드 */}
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="문의 제목 (선택 사항)"
                  {...field}
                />
              </FormControl>
              <FormDescription>선택 사항입니다.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 문의 내용 필드 */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>문의 내용 *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="문의하실 내용을 자세히 적어주세요."
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 제출 버튼 */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Icon
                name="LoaderCircle"
                className="mr-2 h-4 w-4 animate-spin"
              />
              전송 중...
            </>
          ) : (
            "문의 보내기"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm; 