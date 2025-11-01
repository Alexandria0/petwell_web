"use client";
import {useEffect, useState} from "react";
import Service from "./Service";
import {getServices} from "@/lib/services/services.service";
import {IService} from "@/lib/interfaces/IService";
import {Spinner} from "../ui/spinner";

export default function ServicesList() {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      const {data, error} = await getServices();
      if (error) {
        setError(error);
      } else {
        setServices(data);
      }
      setLoading(false);
    };

    loadServices();
  }, []);

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

  if (services.length === 0) {
    return (
      <div className="text-center text-muted-foreground p-4">
        Nu există servicii disponibile momentan.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {services.map((service) => (
        <Service key={service.id} service={service} />
      ))}
    </div>
  );
}
