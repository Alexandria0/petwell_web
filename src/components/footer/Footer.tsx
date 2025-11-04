import Link from "next/link";
import React from "react";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {ABOUT_US, NAV_LINKS} from "@/common/constants";

export default function Footer() {
  return (
    <footer className="flex justify-between px-32 py-12 border-t-2 mt-10">
      <div className="flex-1">
        <ul className="flex flex-col gap-3">
          <h2 className="uppercase mb-3">Navigare</h2>
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-[#878787] hover:underline">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <h2 className="uppercase mb-3">Contact</h2>
        <h3 className="">Telefon</h3>
        <Link
          href={`tel:${ABOUT_US.info.phone}`}
          className="text-[#878787] hover:underline">
          {ABOUT_US.info.phone}
        </Link>
        <h3 className="">Email</h3>
        <Link
          href={`mailto:${ABOUT_US.info.email}`}
          className="text-[#878787] hover:underline">
          {ABOUT_US.info.email}
        </Link>
      </div>
      <div className="flex-2">
        <ul className="flex flex-col gap-3">
          <h2 className="uppercase mb-4">Newsletter</h2>
          <p className="text-[#878787]">
            Abonează-te pentru a primi cele mai noi actualizări și oferte
            speciale.
          </p>
          <Input type="email" placeholder="email-ul dvs." />
          <Button className="w-full bg-[#81A632] font-light">
            Abonează-te
          </Button>
        </ul>
      </div>
    </footer>
  );
}
