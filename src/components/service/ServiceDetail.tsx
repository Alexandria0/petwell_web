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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-6 my-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">{company}</CardTitle>
          <div className="flex flex-wrap gap-3 sm:gap-4 text-sm text-muted-foreground mt-4">
            <span className="flex items-center gap-2">
              <Syringe className="h-4 w-4 sm:h-5 sm:w-5" />
              {type}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
              {location}
            </span>
            <span className="flex items-center gap-2">
              <PawPrint className="h-4 w-4 sm:h-5 sm:w-5" />
              {animal}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base sm:text-lg leading-relaxed">{description}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Prices Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
              Prețuri
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 sm:space-y-3">
              {prices.map((price, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 sm:p-3 bg-muted rounded-lg gap-2">
                  <span className="font-medium text-sm sm:text-base">
                    {price.name}
                  </span>
                  <span className="text-base sm:text-lg font-bold whitespace-nowrap">
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
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
              Contacte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-muted-foreground flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">Telefon</p>
                  <a
                    href={`tel:${contacts.phone}`}
                    className="font-medium hover:underline text-sm sm:text-base break-all">
                    {contacts.phone}
                  </a>
                </div>
              </div>

              {contacts.email && (
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${contacts.email}`}
                      className="font-medium hover:underline text-sm sm:text-base break-all">
                      {contacts.email}
                    </a>
                  </div>
                </div>
              )}

              {contacts.website && (
                <div className="flex items-start gap-3">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">Website</p>
                    <a
                      href={
                        /^https?:\/\//i.test(contacts.website)
                          ? contacts.website
                          : `https://${contacts.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium hover:underline text-sm sm:text-base break-all">
                      {contacts.website}
                    </a>
                  </div>
                </div>
              )}

              {contacts.address && (
                <div className="flex items-start gap-3">
                  <MapPinned className="h-4 w-4 sm:h-5 sm:w-5 mt-1 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">Adresă</p>
                    <p className="font-medium text-sm sm:text-base">
                      {contacts.address}
                    </p>
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
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Award className="h-4 w-4 sm:h-5 sm:w-5" />
              Specializări
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {specialities.map((speciality, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium">
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
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5" />
              Informații despre Doctor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {doctor}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
