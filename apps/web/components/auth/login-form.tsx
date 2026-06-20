'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginFormData, loginSchema } from "@/lib/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, UseFormSetError } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormRootError } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface LoginFormProps {
  OnSubmit: (
    data: LoginFormData, 
    setError: UseFormSetError<LoginFormData>
  ) => Promise<void>;
}

export default function LoginForm({ OnSubmit }: LoginFormProps) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  
    const form = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
        email: "",
        password: ""
      }
    });
  
    const handleSubmit = async (data: LoginFormData) => {
      setIsSubmitting(true);
      try {
        await OnSubmit(data, form.setError);
      } catch (error) {
        console.error("Login Error:", error);
      } finally {
        setIsSubmitting(false);
      }
    };
  

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(handleSubmit)} 
            className="space-y-4"
          >
            <FormRootError />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter Your Email Address"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Your Password"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
            
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}