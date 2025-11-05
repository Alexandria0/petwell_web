import Image from "next/image";
import {Card, CardContent, CardHeader} from "../ui/card";
import {CarouselServices} from "./partials/CarouselServices";
import {ServicesSearchBox} from "./partials/ServicesSearchBox";

export default function MainContent() {
  return (
    <main className="mx-[130px]">
      <div className="relative select-none">
        <Image
          src={"/assets/images/main-top-img.jpg"}
          alt="img"
          width={1000}
          height={1000}
          className="object-cover w-full h-[600px] rounded-4xl"
        />
        <ServicesSearchBox />
      </div>
      <div className="w-full flex justify-between my-10 gap-8 select-none">
        <Card className="w-[30%] py-10">
          <CardHeader className="text-7xl w-auto">1K +</CardHeader>
          <CardContent className="font-thin text-lg">
            Persoane mulțumite de prestarea serviciilor
          </CardContent>
        </Card>
        <Card className="w-[30%] py-10">
          <CardHeader className="text-7xl w-auto">50 +</CardHeader>
          <CardContent className="font-thin text-lg">Servicii</CardContent>
        </Card>
        <Card className="w-[30%] py-10">
          <CardHeader className="text-7xl w-auto">100 +</CardHeader>
          <CardContent className="font-thin text-lg">
            Localități acoperite
          </CardContent>
        </Card>
      </div>
      <h1 className="text-5xl">Servicii</h1>
      <CarouselServices />
    </main>
  );
}
