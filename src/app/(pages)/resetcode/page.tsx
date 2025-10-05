"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// ✅ Define schema before using it
const ResetCodeSchema = z.object({
  resetCode: z.string().nonempty("Reset code required"),
});

type FormFields = z.infer<typeof ResetCodeSchema>;

export default function ResetCode() {
  const route = useRouter();
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("callback-url");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const forgetForm = useForm<FormFields>({
    resolver: zodResolver(ResetCodeSchema),
    defaultValues: {
      resetCode: "",
    },
  });

  // ✅ Submit handler
  async function onSubmit(values: FormFields) {
   
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}auth/verifyResetCode`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      

      if (data.status === "Success") {
        route.push("/resetpassword");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      
      toast.error("Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <Card className="p-6 w-sm">
        <Form {...forgetForm}>
          <h1 className="text-2xl font-bold text-center">Verify your email</h1>
          <form
            onSubmit={forgetForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={forgetForm.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem className="mx-auto">
                  <FormLabel>Reset code</FormLabel>
                  <FormControl>
                    <InputOTP
                      {...field}
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full"
            >
              {isLoading && <Loader2 className="animate-spin mr-2" />}
              Verify
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
