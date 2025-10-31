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
import {serviceSchema} from "@/lib/validations/service.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {Input} from "../ui/input";
import {currencyConstants, servicesConstants} from "@/common/service";
import z from "zod";
import {logToastSuccess} from "@/helpers/toast_logger";
import {Textarea} from "../ui/textarea";
import {XIcon} from "lucide-react";
import {InputGroupAddon, InputGroupButton} from "../ui/input-group";

export function CreateServiceForm() {
  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      company: "",
      type: "",
      location: "",
      animal: "",
      description: "",
      prices: [{name: "", price: "", currency: "MDL"}],
    },
  });

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name: "prices",
  });

  // const pricesFields = form.watch("prices");
  // const addPriceField = () => {
  //   form.setValue("prices", [
  //     ...pricesFields,
  //     {name: "", price: "", currency: "MDL"},
  //   ]);
  // };

  // const removePriceField = (index: number) => {
  //   if (pricesFields.length > 1) {
  //     const newPrices = [...pricesFields];
  //     newPrices.splice(index, 1);
  //     form.setValue("prices", newPrices);
  //   }
  // };

  function onSubmit(data: z.infer<typeof serviceSchema>) {
    console.log("Form submitted with data:", data);
    logToastSuccess(data, "Service form submitted");
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-2xl">Creați serviciul</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-service" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="flex flex-row justify-center">
            <div className="w-1/3 space-y-3">
              <Controller
                name="company"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-service-company">
                      Numele companiei
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-service-company"
                      aria-invalid={fieldState.invalid}
                      placeholder="Numele companiei"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="flex flex-row gap-8">
                <Controller
                  name="type"
                  control={form.control}
                  render={({field, fieldState}) => (
                    <Field
                      orientation="vertical"
                      data-invalid={fieldState.invalid}>
                      <FieldContent>
                        <FieldLabel htmlFor="form-rhf-service-type">
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
                          id="form-rhf-service-type"
                          aria-invalid={fieldState.invalid}
                          className="min-w-[180px]">
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
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-service-animal">
                        Animalul
                      </FieldLabel>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                      <Input
                        {...field}
                        id="form-rhf-service-animal"
                        aria-invalid={fieldState.invalid}
                        placeholder="Pisică, Câine, etc."
                      />
                    </Field>
                  )}
                />
              </div>
              <Controller
                name="location"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-service-location">
                      Locatia
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-service-location"
                      aria-invalid={fieldState.invalid}
                      placeholder="Chisinău"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-textarea-description">
                      Descriere
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="form-rhf-service-description"
                      aria-invalid={fieldState.invalid}
                      placeholder="..."
                      className="min-h-[120px] max-h-[360px]"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="w-1/3 space-y-3">
              {fields.map((field, index) => (
                <div key={field.id}>
                  <Controller
                    key={`${field.id}.name`}
                    name={`prices.${index}.name`}
                    control={form.control}
                    render={({field: controllerField, fieldState}) => (
                      <Field
                        orientation="vertical"
                        data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor={`form-rhf-service-prices.${index}.name`}>
                          Numele serviciului
                        </FieldLabel>
                        <Input
                          {...controllerField}
                          id={`form-rhf-service-prices.${index}.name`}
                          aria-invalid={fieldState.invalid}
                          placeholder="..."
                        />
                        {fields.length > 1 && (
                          <InputGroupAddon align="inline-end">
                            <InputGroupButton
                              type="button"
                              variant="ghost"
                              size="icon-xs"
                              onClick={() => remove(index)}
                              aria-label={`Remove service ${index + 1}`}>
                              <XIcon />
                            </InputGroupButton>
                          </InputGroupAddon>
                        )}
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    key={`${field.id}.price`}
                    name={`prices.${index}.price`}
                    control={form.control}
                    render={({field: controllerField, fieldState}) => (
                      <Field
                        orientation="vertical"
                        data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor={`form-rhf-service-prices.${index}.price`}>
                          Pretul
                        </FieldLabel>
                        <Input
                          {...controllerField}
                          id={`form-rhf-service-prices.${index}.price`}
                          aria-invalid={fieldState.invalid}
                          placeholder="0.00"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    key={`${field.id}.currency`}
                    name={`prices.${index}.currency`}
                    control={form.control}
                    render={({field: controllerField, fieldState}) => (
                      // <Field
                      //   orientation="vertical"
                      //   data-invalid={fieldState.invalid}>
                      //   <FieldLabel
                      //     htmlFor={`form-rhf-service-prices.${index}.currency`}>
                      //     Pretul
                      //   </FieldLabel>
                      //   <Input
                      //     {...controllerField}
                      //     id={`form-rhf-service-prices.${index}.currency`}
                      //     aria-invalid={fieldState.invalid}
                      //     placeholder="MDL"
                      //   />
                      //   {fieldState.invalid && (
                      //     <FieldError errors={[fieldState.error]} />
                      //   )}
                      // </Field>
                      <Field
                        orientation="vertical"
                        data-invalid={fieldState.invalid}>
                        <FieldContent>
                          <FieldLabel
                            htmlFor={`form-rhf-service-prices.${index}.currency`}>
                            Valuta
                          </FieldLabel>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </FieldContent>
                        <Select
                          name={controllerField.name}
                          value={controllerField.value}
                          onValueChange={controllerField.onChange}>
                          <SelectTrigger
                            id={`form-rhf-service-prices.${index}.currency`}
                            aria-invalid={fieldState.invalid}
                            className="min-w-[120px]">
                            <SelectValue placeholder="Alege valuta" />
                          </SelectTrigger>
                          <SelectContent position="item-aligned">
                            {currencyConstants.map((currency) => (
                              <SelectItem key={currency} value={currency}>
                                {currency}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({name: "", price: "", currency: "MDL"})}
                disabled={fields.length >= 10}>
                Add service
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Field orientation="horizontal" className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            form="form-rhf-service"
            onClick={() => form.reset()}>
            Resetează
          </Button>
          <Button type="submit" form="form-rhf-service">
            Creează serviciu
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
