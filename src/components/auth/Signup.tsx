"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {useState} from "react";
import {signup} from "@/lib/services/auth.service";
import {useAuth} from "@/context/AuthContext";
import {logToastError, logToastSuccess} from "@/helpers/toast_logger";

const FormSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.email({
      message: "Please enter a valid email address.",
    }),
    phone: z
      .string()
      .min(10, {
        message: "Phone number must be at least 10 digits.",
      })
      .regex(/^[0-9+]+$/, {
        message: "Please enter a valid phone number.",
      })
      .optional(),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function Signup() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const {login} = useAuth();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      const response = await signup({
        username: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        repeatedPassword: data.password,
      });

      if (response.success) {
        login(response);
      }

      logToastSuccess(response, "Înregistrare reușită!");
    } catch (error) {
      logToastError(error, "Eroare de înregistrare");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-sm my-10">
      <CardHeader>
        <CardTitle className="text-center font-light text-2xl">
          Înregistrare
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Numele</FormLabel>
                  <FormControl>
                    <Input placeholder="Numele dvs." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="exemplu@exemplu.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Nr. de telefon</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+373 606 06 060"
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
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Confirmare parolă</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Se încarcă..." : "Următorul pas"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p>
          Aveți deja un cont?{" "}
          <Link href="/login" className="text-green-400 hover:underline">
            Conectează-te
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
