"use client";
import {useEffect, useState} from "react";
import Service from "./Service";
import {getServices, getMyServices} from "@/lib/api/services.service";
import {IService} from "@/lib/interfaces/IService";
import {Spinner} from "../ui/spinner";

interface ServicesListProps {
  showMyServices?: boolean;
}

export default function ServicesList({
  showMyServices = false,
}: ServicesListProps) {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      const {data, error} = showMyServices
        ? await getMyServices()
        : await getServices();
      if (error) {
        setError(error);
      } else {
        setServices(data);
      }
      setLoading(false);
    };

    loadServices();
  }, [showMyServices]);

  const handleDelete = (serviceId: string) => {
    setServices(services.filter((service) => service.id !== serviceId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  if (services?.length === 0 || services == null) {
    return (
      <div className="text-center text-muted-foreground p-4">
        {showMyServices
          ? "Nu ai publicat niciun serviciu."
          : "Nu există servicii disponibile momentan."}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {services.map((service) => (
        <Service
          key={service.id}
          service={service}
          onMyServicesPage={showMyServices}
          onDelete={showMyServices ? handleDelete : undefined}
        />
      ))}
    </div>
  );
}
