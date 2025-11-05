import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800">
          Pagina nu a fost găsită
        </h2>
        <p className="text-gray-600 max-w-md">
          Ne pare rău, nu am putut găsi pagina pe care o cauți. Este posibil să
          fi fost ștearsă, redenumită sau nu există.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Link href="/">
            <Button>Acasă</Button>
          </Link>
          <Link href="/services">
            <Button variant="outline">Servicii</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
