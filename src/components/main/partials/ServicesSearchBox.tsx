"use client";

import {
  servicesConstants,
  animalsConstants,
  locationsConstants,
} from "@/common/kservice";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {searchSchema} from "@/lib/validations/search.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import z from "zod";
import {useRouter} from "next/navigation";

export function ServicesSearchBox() {
  const router = useRouter();
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      type: "",
      animal: "",
      location: "",
    },
  });

  function onSubmit(data: z.infer<typeof searchSchema>) {
    const params = new URLSearchParams();
    if (data.type) params.set("type", data.type);
    if (data.animal) params.set("animal", data.animal);
    if (data.location) params.set("location", data.location);

    router.push(`/services?${params.toString()}`);
  }

  return (
    <Card className="absolute left-1/2 bottom-40 transform -translate-x-1/2 translate-y-1/2 w-[80%] bg-white rounded-3xl shadow-xl">
      <CardHeader>
        <CardTitle>Alegeți serviciul</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} id="form-rhf-select">
          <FieldGroup className="flex flex-row gap-4">
            <Controller
              name="type"
              control={form.control}
              render={({field, fieldState}) => (
                <Field orientation="vertical" data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-type">
                      Tipul serviciului
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}>
                    <SelectTrigger
                      id="form-rhf-select-type"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]">
                      <SelectValue placeholder="Alege serviciul" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {servicesConstants.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <Controller
              name="animal"
              control={form.control}
              render={({field, fieldState}) => (
                <Field orientation="vertical" data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-animal">
                      Tipul animalului
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}>
                    <SelectTrigger
                      id="form-rhf-select-animal"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]">
                      <SelectValue placeholder="Alege animalul" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {animalsConstants.map((animal) => (
                        <SelectItem key={animal} value={animal}>
                          {animal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <Controller
              name="location"
              control={form.control}
              render={({field, fieldState}) => (
                <Field orientation="vertical" data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-location">
                      Locația
                    </FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}>
                    <SelectTrigger
                      id="form-rhf-select-location"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]">
                      <SelectValue placeholder="Alege locația" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {locationsConstants.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            form="form-rhf-select"
            onClick={() => form.reset()}>
            Resetează
          </Button>
          <Button type="submit" form="form-rhf-select">
            Caută
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
