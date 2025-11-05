import {Card, CardContent, CardFooter, CardHeader} from "../ui/card";
import {Button} from "../ui/button";
import {Syringe, MapPin, PawPrint} from "lucide-react";
import {IService} from "@/lib/interfaces/IService";
import Link from "next/link";
import {deleteService} from "@/lib/api/services.service";
import {useState} from "react";
import {toast} from "sonner";

interface ServiceProps {
  service: IService;
  onMyServicesPage?: boolean;
  onDelete?: (serviceId: string) => void;
}

export default function Service({
  service,
  onMyServicesPage = false,
  onDelete,
}: ServiceProps) {
  const {id, company, type, location, animal, description} = service;
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <Card>
      <CardHeader>
        <h1>{company}</h1>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Syringe className="h-4 w-4" />
            {type}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {location}
          </span>
          <span className="flex items-center gap-1">
            <PawPrint className="h-4 w-4" />
            {animal}
          </span>
        </div>
      </CardHeader>
      <CardContent>{description}</CardContent>
      <CardFooter className="space-x-4">
        <Link href={`/services/${id}`}>
          <Button type="button" variant="outline">
            Citește mai mult
          </Button>
        </Link>
        {onMyServicesPage && (
          <Button
            type="button"
            variant="destructive"
            disabled={isDeleting}
            onClick={async () => {
              setIsDeleting(true);
              const result = await deleteService(id);
              if (result.success) {
                toast.success("Serviciul a fost șters cu succes");
                onDelete?.(id);
              } else {
                toast.error(result.error || "Nu s-a putut șterge serviciul");
                setIsDeleting(false);
              }
            }}>
            {isDeleting ? "Se șterge..." : "Șterge serviciul"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
