"use client";
import {IService} from "@/lib/interfaces/IService";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {
  Syringe,
  MapPin,
  PawPrint,
  Phone,
  Mail,
  Globe,
  MapPinned,
  Stethoscope,
  Award,
  DollarSign,
} from "lucide-react";

interface ServiceDetailProps {
  service: IService;
}

export default function ServiceDetail({service}: ServiceDetailProps) {
  const {
    company,
    type,
    location,
    animal,
    description,
    prices,
    contacts,
    specialities,
    doctor,
  } = service;

  return (
    <div className="mx-[130px] space-y-6 my-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{company}</CardTitle>
          <div className="flex gap-4 text-sm text-muted-foreground mt-4">
            <span className="flex items-center gap-2">
              <Syringe className="h-5 w-5" />
              {type}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              {location}
            </span>
            <span className="flex items-center gap-2">
              <PawPrint className="h-5 w-5" />
              {animal}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">{description}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Prices Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Prețuri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {prices.map((price, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="font-medium">{price.name}</span>
                  <span className="text-lg font-bold">
                    {price.price} {price.currency}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contacte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Telefon</p>
                  <a
                    href={`tel:${contacts.phone}`}
                    className="font-medium hover:underline">
                    {contacts.phone}
                  </a>
                </div>
              </div>

              {contacts.email && (
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${contacts.email}`}
                      className="font-medium hover:underline">
                      {contacts.email}
                    </a>
                  </div>
                </div>
              )}

              {contacts.website && (
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <a
                      href={contacts.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:underline">
                      {contacts.website}
                    </a>
                  </div>
                </div>
              )}

              {contacts.address && (
                <div className="flex items-start gap-3">
                  <MapPinned className="h-5 w-5 mt-1 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Adresă</p>
                    <p className="font-medium">{contacts.address}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Specialities Card */}
      {specialities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Specializări
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {specialities.map((speciality, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {speciality.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Doctor Information Card */}
      {doctor && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Informații despre Doctor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed whitespace-pre-line">
              {doctor}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
