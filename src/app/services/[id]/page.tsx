"use client";
import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {getServiceById} from "@/lib/services/services.service";
import {IService} from "@/lib/interfaces/IService";
import ServiceDetail from "@/components/service/ServiceDetail";
import {Spinner} from "@/components/ui/spinner";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";

export default function ServicePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [service, setService] = useState<IService | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadService = async () => {
      const {data, error} = await getServiceById(id);
      if (error) {
        setError(error);
      } else {
        setService(data);
      }
      setLoading(false);
    };

    if (id) {
      loadService();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen mx-[130px]">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="container py-8 mx-[130px]">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-red-500">
            {error || "Serviciul nu a fost găsit"}
          </h1>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Înapoi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-[50px]">
        <Button onClick={() => router.back()} variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Înapoi la servicii
        </Button>
      </div>
      <ServiceDetail service={service} />
    </div>
  );
}
