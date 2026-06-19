'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { SignupFormData, signupSchema } from "@/lib/auth/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

interface SignupFormProps {
  OnSubmit: (data: SignupFormData) => Promise<void>;
}

export default function SignupForm({ OnSubmit }: SignupFormProps) {

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const handleSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    try {
      await OnSubmit(data);
    } catch (error) {
      console.error("Signup Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Enter your information to create a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl></FormControl>                
                </FormItem>
              )}
            >

            </FormField>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}