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
import {
  servicesConstants,
  animalsConstants,
  locationsConstants,
  currencyConstants,
} from "@/common/kservice";
import z from "zod";
import {logToastSuccess, logToastError} from "@/helpers/toast_logger";
import {Textarea} from "../ui/textarea";
import {XIcon} from "lucide-react";
import {InputGroupAddon, InputGroupButton} from "../ui/input-group";
import {createService} from "@/lib/api/assistance.service";
import {useRouter} from "next/navigation";

export function CreateServiceForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      company: "",
      type: "",
      location: "",
      animal: "",
      description: "",
      prices: [{name: "", price: "", currency: "MDL"}],
      contacts: {
        address: "",
        phone: "",
        email: "",
        website: "",
      },
      specialities: [{name: ""}],
      doctor: "",
    },
  });

  const {
    fields: priceFields,
    append: addPrice,
    remove: removePrice,
  } = useFieldArray({
    control: form.control,
    name: "prices",
  });

  const {
    fields: specialityFields,
    append: addSpeciality,
    remove: removeSpeciality,
  } = useFieldArray({
    control: form.control,
    name: "specialities",
  });

  async function onSubmit(data: z.infer<typeof serviceSchema>) {
    try {
      const response = await createService(data);
      logToastSuccess(response, "");
      if (
        typeof response === "object" &&
        response !== null &&
        "success" in response &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (response as any)["success"]
      ) {
        router.push("/my-services");
      }
    } catch (err: unknown) {
      logToastError(String(err), "Eroare");
    }
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
                      placeholder="S.R.L. INVITRO DIAGNOSTICS"
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
                          Secțiune
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
                          <SelectValue placeholder="Alege secțiunea" />
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
                    <Field
                      orientation="vertical"
                      data-invalid={fieldState.invalid}>
                      <FieldContent>
                        <FieldLabel htmlFor="form-rhf-service-animal">
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
                          id="form-rhf-service-animal"
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
              </div>
              <Controller
                name="location"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field
                    orientation="vertical"
                    data-invalid={fieldState.invalid}>
                    <FieldContent>
                      <FieldLabel htmlFor="form-rhf-service-location">
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
                        id="form-rhf-service-location"
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
              <Controller
                name="description"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-service-description">
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
              {priceFields.map((field, index) => (
                <div key={field.id}>
                  <Controller
                    name={`prices.${index}.name`}
                    control={form.control}
                    render={({field: controllerField, fieldState}) => (
                      <Field
                        orientation="vertical"
                        data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor={`form-rhf-service-prices.${index}.name`}
                          className="flex justify-between items-center">
                          #{index + 1} Numele serviciului
                          {priceFields.length > 1 && (
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton
                                type="button"
                                variant="destructive"
                                size="icon-xs"
                                onClick={() => removePrice(index)}
                                aria-label={`Remove service ${index + 1}`}>
                                <XIcon />
                              </InputGroupButton>
                            </InputGroupAddon>
                          )}
                        </FieldLabel>
                        <Input
                          {...controllerField}
                          id={`form-rhf-service-prices.${index}.name`}
                          aria-invalid={fieldState.invalid}
                          placeholder="Consultație generală"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <div className="flex flex-row gap-4 mt-2">
                    <Controller
                      name={`prices.${index}.price`}
                      control={form.control}
                      render={({field: controllerField, fieldState}) => (
                        <Field
                          orientation="vertical"
                          data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor={`form-rhf-service-prices.${index}.price`}>
                            Prețul
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
                      name={`prices.${index}.currency`}
                      control={form.control}
                      render={({field: controllerField, fieldState}) => (
                        <Field
                          orientation="vertical"
                          data-invalid={fieldState.invalid}>
                          <FieldContent>
                            <FieldLabel
                              htmlFor={`form-rhf-service-prices.${index}.currency`}></FieldLabel>
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
                </div>
              ))}
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={() => addPrice({name: "", price: "", currency: "MDL"})}
                disabled={priceFields.length >= 10}>
                Adaugă serviciu
              </Button>
            </div>
            <div className="w-1/3 space-y-3">
              <Controller
                name="contacts.address"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-service-address">
                      Adresă
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-service-address"
                      aria-invalid={fieldState.invalid}
                      placeholder="str. Exemplu, nr. 10, Chișinău"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="contacts.phone"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-service-phone">
                      Nr. Telefon
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-service-phone"
                      aria-invalid={fieldState.invalid}
                      placeholder="+373 00 00 0000"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="contacts.email"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-service-email">
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-service-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="email@exemplu.com"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="contacts.website"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-service-website">
                      Website
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-service-website"
                      aria-invalid={fieldState.invalid}
                      placeholder="www.exemplu.com"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              {specialityFields.map((field, index) => (
                <Controller
                  key={field.id}
                  name={`specialities.${index}.name`}
                  control={form.control}
                  render={({field: controllerField, fieldState}) => (
                    <Field
                      orientation="vertical"
                      data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor={`form-rhf-service-specialities.${index}.name`}
                        className="flex justify-between items-center">
                        Specialitatea #{index + 1}
                        {specialityFields.length > 1 && (
                          <InputGroupAddon align="inline-end">
                            <InputGroupButton
                              type="button"
                              variant="destructive"
                              size="icon-xs"
                              onClick={() => removeSpeciality(index)}
                              aria-label={`Remove speciality ${index + 1}`}>
                              <XIcon />
                            </InputGroupButton>
                          </InputGroupAddon>
                        )}
                      </FieldLabel>
                      <Input
                        {...controllerField}
                        id={`form-rhf-service-specialities.${index}.name`}
                        aria-invalid={fieldState.invalid}
                        placeholder="Consultanță nutrițională"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              ))}
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={() => addSpeciality({name: ""})}
                disabled={specialityFields.length >= 10}>
                Adaugă specialitate
              </Button>
              <Controller
                name="doctor"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-service-doctor">
                      Descrierea doctorului
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="form-rhf-service-doctor"
                      aria-invalid={fieldState.invalid}
                      placeholder="..."
                      className="min-h-[120px] max-h-[400px]"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
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
