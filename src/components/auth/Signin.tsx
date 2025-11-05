"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useState} from "react";

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
import {signin} from "@/lib/api/auth.service";
import {useAuth} from "@/context/AuthContext";
import {logToastError, logToastSuccess} from "@/helpers/toast_logger";

const FormSchema = z.object({
  email: z.email({
    message: "Vă rugăm să introduceți o adresă de email validă.",
  }),
  password: z.string().min(8, {
    message: "Parola trebuie să conțină cel puțin 8 caractere.",
  }),
});

export function Signin() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const {login} = useAuth();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      const response = await signin({
        email: data.email,
        password: data.password,
      });

      if (response.success) {
        login(response);
      }
      logToastSuccess(response, "Autentificare reușită!");
    } catch (error) {
      logToastError(error, "Eroare de autentificare");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-sm my-10">
      <CardHeader>
        <CardTitle className="text-center font-light text-2xl">
          Conectare
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Parola</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Se încarcă..." : "Conectare"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p>
          Nu ai încă un cont?{" "}
          <Link href="/sign-up" className="text-green-400 hover:underline">
            Înregistrează-te
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
