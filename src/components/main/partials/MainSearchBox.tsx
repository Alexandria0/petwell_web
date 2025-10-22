"use client";

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
import {logToastSuccess} from "@/helpers/toast_logger";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import z from "zod";

const searchFormSchema = z.object({
  serviceType: z.string().min(1, "Vă rugăm să selectați un serviciu"),
  animalType: z.string().min(1, "Vă rugăm să selectați un animal"),
  location: z.string().min(1, "Vă rugăm să selectați o locație"),
});

const serviceTypeList = [
  {label: "Vaccinare", value: "Vaccinare"},
  {label: "Controale veterinare", value: "Controale veterinare"},
  {label: "Hrănire asistată", value: "Hrănire asistată"},
  {label: "Sfaturi și bune practici", value: "Sfaturi și bune practici"},
  {label: "Consultanță", value: "Consultanță"},
  {label: "Îngrijire paliativă", value: "Îngrijire paliativă"},
  {label: "Chirurgie", value: "Chirurgie"},
] as const;

const animalTypeList = [
  {label: "Câine", value: "Câine"},
  {label: "Pisică", value: "Pisică"},
  {label: "Pasăre", value: "Pasăre"},
  {label: "Pește", value: "Pește"},
  {label: "Hamster", value: "Hamster"},
  {label: "Iepure", value: "Iepure"},
] as const;

const locationList = [
  {label: "București", value: "București"},
  {label: "Cluj-Napoca", value: "Cluj-Napoca"},
  {label: "Iași", value: "Iași"},
  {label: "Timișoara", value: "Timișoara"},
  {label: "Constanța", value: "Constanța"},
] as const;

export function MainSearchBox() {
  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      serviceType: "",
      animalType: "",
      location: "",
    },
  });

  function onSubmit(data: z.infer<typeof searchFormSchema>) {
    logToastSuccess(data, "Search form submitted");
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
              name="serviceType"
              control={form.control}
              render={({field, fieldState}) => (
                <Field orientation="vertical" data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-serviceType">
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
                      id="form-rhf-select-serviceType"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]">
                      <SelectValue placeholder="Alege serviciul" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {serviceTypeList.map((service) => (
                        <SelectItem key={service.value} value={service.value}>
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <Controller
              name="animalType"
              control={form.control}
              render={({field, fieldState}) => (
                <Field orientation="vertical" data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor="form-rhf-select-animalType">
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
                      id="form-rhf-select-animalType"
                      aria-invalid={fieldState.invalid}
                      className="min-w-[120px]">
                      <SelectValue placeholder="Alege animalul" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      {animalTypeList.map((animal) => (
                        <SelectItem key={animal.value} value={animal.value}>
                          {animal.label}
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
                      {locationList.map((location) => (
                        <SelectItem key={location.value} value={location.value}>
                          {location.label}
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
