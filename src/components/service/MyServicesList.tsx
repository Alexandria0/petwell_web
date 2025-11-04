"use client";
import {useEffect, useState} from "react";
import Service from "./Service";
import {getMyServices} from "@/lib/services/services.service";
import {IService} from "@/lib/interfaces/IService";
import {Spinner} from "../ui/spinner";

export default function MyServicesList() {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      const {data, error} = await getMyServices();
      if (error) {
      } else {
        setServices(data);
      }
      setLoading(false);
    };

    loadServices();
  }, []);

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

  if (services?.length == 0 || services == null) {
    return (
      <div className="text-center text-muted-foreground p-4">
        Nu ai publicat niciun serviciu.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {services.map((service) => (
        <Service
          key={service.id}
          service={service}
          onMyServicesPage={true}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
