import {Card, CardContent, CardFooter, CardHeader} from "../ui/card";
import {Button} from "../ui/button";
import {Syringe, MapPin, PawPrint} from "lucide-react";
import {IService} from "@/lib/interfaces/IService";

interface ServiceProps {
  service: IService;
}

export default function Service({service}: ServiceProps) {
  const {company, type, location, animal, description} = service;

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
      <CardFooter>
        <Button type="button" variant="outline">
          Citește mai mult
        </Button>
      </CardFooter>
    </Card>
  );
}
