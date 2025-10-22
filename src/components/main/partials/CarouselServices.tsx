import * as React from "react";
import Image from "next/image";

import {Card} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {CAROUSEL_CONTENT} from "@/common/constants";

export function CarouselServices() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="min-w-full max-w-sm my-10">
      <CarouselContent>
        {CAROUSEL_CONTENT.map((item, index) => (
          <CarouselItem key={index} className="basis-1/4 select-none">
            <Card className="p-2 relative rounded-3xl">
              <Image
                src={item.img}
                alt={item.title}
                width={500}
                height={500}
                className="object-contain"
              />
              <div className="absolute inset-x-5 bottom-5 p-5 w-[75%]">
                <h3 className="text-xl font-semibold text-white uppercase text-wrap">
                  {item.title}
                </h3>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
