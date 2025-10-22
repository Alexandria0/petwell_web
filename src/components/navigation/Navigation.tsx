"use client";

import * as React from "react";

import {NavigationLinks} from "./partials/NavigationLinks";
import {NavigationMenu} from "../ui/navigation-menu";
import {NAV_LINKS} from "@/common/constants";
import NavigationLogoHeader from "./partials/NavigationLogoHeader";
import NavigationProfileOrAuth from "./partials/NavigationProfile";

export function Navigation() {
  return (
    <div className="flex items-center justify-between py-5 px-32">
      <NavigationMenu viewport={false}>
        <NavigationLogoHeader name="Petwell" />
      </NavigationMenu>
      <NavigationLinks navLinks={NAV_LINKS} />
      <NavigationProfileOrAuth />
    </div>
  );
}
