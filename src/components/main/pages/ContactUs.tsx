"use client";
import {CONTACT_US} from "@/common/constants";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import SendMessageForm from "../partials/SendMessageForm";
import Link from "next/link";

export default function ContactUs() {
  return (
    <>
      <Card className="w-1/4 p-6 h-auto">
        <CardHeader>
          <CardTitle className="font-light text-2xl">
            {CONTACT_US.info.header}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 contain-content">
          <Link
            href={
              "https://www.google.com/maps/place/Strada+Agricultorilor+10,+B%C4%83cioi"
            }
            className="text-[#878787] hover:underline"
            target="_blank">
            {CONTACT_US.info.address}
          </Link>
          <Link
            href={`tel:${CONTACT_US.info.phone}`}
            className="text-[#878787] hover:underline">
            {CONTACT_US.info.phone}
          </Link>
          <Link
            href={`mailto:${CONTACT_US.info.email}`}
            className="text-[#878787] hover:underline">
            {CONTACT_US.info.email}
          </Link>
          <ul className="text-left w-full">
            <h2 className="font-semibold">Program:</h2>
            {CONTACT_US.program.map((program, index) => {
              return <li key={index}>{program}</li>;
            })}
          </ul>
          <Image
            src={CONTACT_US.map_img}
            alt={CONTACT_US.map_img}
            width={300}
            height={300}
            className="object-contain rounded-xl"
          />
        </CardContent>
      </Card>
      <SendMessageForm />
    </>
  );
}
