import {cn} from "@/lib/utils";
import Image from "next/image";

interface IconProps {
  className?: string;
  size?: number;
}

export function TickGreenOutlineIcon({className, size = 24}: IconProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{width: size, height: size}}>
      <Image
        src="/assets/icons/tick_green_outline.svg"
        alt="Tick Green Outline"
        fill
        className="object-contain"
      />
    </div>
  );
}

export function StarGreenOutlineIcon({className, size = 24}: IconProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{width: size, height: size}}>
      <Image
        src="/assets/icons/star_green_outline.svg"
        alt="Star Green Outline"
        fill
        className="object-contain"
      />
    </div>
  );
}

export function CalendarGreenOutlineIcon({className, size = 24}: IconProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{width: size, height: size}}>
      <Image
        src="/assets/icons/calendar_green_outline.svg"
        alt="Calendar Green Outline"
        fill
        className="object-contain"
      />
    </div>
  );
}

export function UserGreenOutlineIcon({className, size = 24}: IconProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{width: size, height: size}}>
      <Image
        src="/assets/icons/user_green_outline.svg"
        alt="User Green Outline"
        fill
        className="object-contain"
      />
    </div>
  );
}

export function UserWhiteOutlineIcon({className, size = 24}: IconProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{width: size, height: size}}>
      <Image
        src="/assets/icons/user_white_outline.svg"
        alt="User White Outline"
        fill
        className="object-contain"
      />
    </div>
  );
}
