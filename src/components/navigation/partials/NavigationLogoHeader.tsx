import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";

export default function NavigationLogoHeader({name}: {name: string}) {
  return (
    <NavigationMenuLink
      asChild
      className={navigationMenuTriggerStyle() + " text-lg font-bold px-16"}>
      <Link href="/">{name}</Link>
    </NavigationMenuLink>
  );
}
