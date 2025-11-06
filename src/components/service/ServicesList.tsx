"use client";
import {useEffect, useState} from "react";
import Service from "./Service";
import {getServices, getMyServices} from "@/lib/api/services.service";
import {IService} from "@/lib/interfaces/IService";
import {Spinner} from "../ui/spinner";

interface ServicesListProps {
  showMyServices?: boolean;
  searchParams?: {
    page?: number;
    pageSize?: number;
    searchTerm?: string;
    type?: string;
    animal?: string;
    location?: string;
  };
}

export default function ServicesList({
  showMyServices = false,
  searchParams,
}: ServicesListProps) {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasSearchParams =
    searchParams &&
    (searchParams.type ||
      searchParams.animal ||
      searchParams.location ||
      searchParams.searchTerm);

  useEffect(() => {
    const loadServices = async () => {
      const params = {
        page: searchParams?.page,
        pageSize: searchParams?.pageSize,
        searchTerm: searchParams?.searchTerm,
        type: searchParams?.type,
        animal: searchParams?.animal,
        location: searchParams?.location,
      };

      let result;
      if (showMyServices) {
        result = await getMyServices();
      } else {
        result = await getServices(params);
      }

      if (result.error) {
        setError(result.error);
      } else {
        setServices(result.data);
      }
      setLoading(false);
    };

    loadServices();
  }, [showMyServices, searchParams]);

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
          : hasSearchParams
          ? "Nu au fost găsite servicii care să corespundă criteriilor de căutare."
          : "Nu există servicii disponibile momentan."}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {hasSearchParams && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            Rezultate căutare
          </h2>
          <div className="text-sm text-blue-700">
            {searchParams.searchTerm && (
              <span className="mr-4">
                <strong>Termen căutare:</strong> {searchParams.searchTerm}
              </span>
            )}
            {searchParams.animal && (
              <span className="mr-4">
                <strong>Animal:</strong> {searchParams.animal}
              </span>
            )}
            {searchParams.type && (
              <span className="mr-4">
                <strong>Serviciu:</strong> {searchParams.type}
              </span>
            )}
            {searchParams.location && (
              <span>
                <strong>Locație:</strong> {searchParams.location}
              </span>
            )}
          </div>
          <p className="text-sm text-blue-600 mt-2">
            {services.length}{" "}
            {services.length === 1 ? "serviciu găsit" : "servicii găsite"}
          </p>
        </div>
      )}
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
