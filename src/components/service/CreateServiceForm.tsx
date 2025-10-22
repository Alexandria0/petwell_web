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
import {ServiceFormData, serviceSchema} from "@/lib/validations/service.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import {Input} from "../ui/input";
import {currencyConstants, serviceTypesConstants} from "@/common/service";
import {Textarea} from "../ui/textarea";

export function CreateServiceForm() {
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      company: "",
      type: undefined,
      location: "",
      animal: "",
      description: "",
      prices: [{name: "", price: 0, currency: "MDL"}],
      contacts: {address: "", phone: "", email: "", website: ""},
    },
  });

  const pricesFields = form.watch("prices");
  const addPriceField = () => {
    form.setValue("prices", [
      ...pricesFields,
      {name: "", price: 0, currency: "MDL"},
    ]);
  };

  const removePriceField = (index: number) => {
    if (pricesFields.length > 1) {
      const newPrices = [...pricesFields];
      newPrices.splice(index, 1);
      form.setValue("prices", newPrices);
    }
  };

  function onSubmit(data: ServiceFormData) {
    logToastSuccess(data, "Service form submitted");
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-2xl">Creați serviciul</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id="form-rhf-service"
          className="flex gap-8">
          <FieldGroup className="">
            <Controller
              name="company"
              control={form.control}
              render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-company">
                    Numele companiei
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-company"
                    aria-invalid={fieldState.invalid}
                    placeholder="Numele companiei"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="flex gap-8">
              <Controller
                name="type"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field
                    orientation="vertical"
                    data-invalid={fieldState.invalid}>
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
                        {serviceTypesConstants.map((service) => (
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
                    <FieldLabel htmlFor="form-rhf-input-animal">
                      Animalul
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-animal"
                      aria-invalid={fieldState.invalid}
                      placeholder="Pisică, Câine, etc."
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              name="location"
              control={form.control}
              render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-location">
                    Locatia
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-location"
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
                    Descrierea serviciului
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="form-rhf-textarea-description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Descrie serviciul oferit..."
                    className="min-h-[120px]"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup className="">
            {pricesFields.map((price, idx) => (
              <div key={idx}>
                <Controller
                  name={`prices.${idx}.name`}
                  control={form.control}
                  render={({field, fieldState}) => (
                    <Field
                      orientation="vertical"
                      data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor={`form-rhf-price-name-${idx}`}
                        className="flex justify-between">
                        Serviciul #{idx + 1}
                        {idx > 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => removePriceField(idx)}
                            className="text-red-500 hover:text-red-700">
                            Șterge
                          </Button>
                        )}
                      </FieldLabel>
                      <Input
                        id={`form-rhf-price-name-${idx}`}
                        placeholder="Numele serviciului"
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <FieldGroup className="flex flex-row gap-12 my-4">
                  <Controller
                    name={`prices.${idx}.price`}
                    control={form.control}
                    render={({field, fieldState}) => (
                      <Field
                        orientation="vertical"
                        data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={`form-rhf-price-amount-${idx}`}>
                          Prețul serviciului
                        </FieldLabel>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          max="100000"
                          id={`form-rhf-price-amount-${idx}`}
                          placeholder="0.00"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            const numValue = parseFloat(value);
                            field.onChange(isNaN(numValue) ? 0 : numValue);
                          }}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name={`prices.${idx}.currency`}
                    control={form.control}
                    render={({field, fieldState}) => (
                      <Field
                        orientation="vertical"
                        data-invalid={fieldState.invalid}>
                        <FieldContent>
                          <FieldLabel
                            htmlFor={`form-rhf-select-currency-${idx}`}>
                            Valuta
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
                            id={`form-rhf-select-currency-${idx}`}
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
                </FieldGroup>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addPriceField}>
              + Adaugă preț
            </Button>
          </FieldGroup>
          <FieldGroup className="">
            <Controller
              name="contacts.address"
              control={form.control}
              render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-address">
                    Adresa serviciului
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-address"
                    aria-invalid={fieldState.invalid}
                    placeholder="str. Exemplu, nr. 00, Chișinău"
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
                  <FieldLabel htmlFor="form-rhf-input-phone">
                    Telefon
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-phone"
                    aria-invalid={fieldState.invalid}
                    placeholder="+373 00 000 000"
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
                  <FieldLabel htmlFor="form-rhf-input-email">
                    Email-ul serviciului
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="email@exemplu.com"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Resetează
        </Button>
        <Button type="submit" form="form-rhf-service">
          Creează serviciu
        </Button>
      </CardFooter>
    </Card>
  );
}
