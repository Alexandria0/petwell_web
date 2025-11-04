import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useAuth} from "@/context/AuthContext";
import {Avatar, AvatarFallback} from "../ui/avatar";
import {useRouter} from "next/navigation";
import {LogOut, UserPen, ClipboardPlus, MonitorCog, Server} from "lucide-react";

export function Profile() {
  const {user, logout} = useAuth();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-11 px-4 rounded-full flex items-center justify-start">
          <Avatar>
            <AvatarFallback className="bg-blue-300">
              {user?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>
          Cont {user?.role === "Business" ? "Business" : "Utilizator"}
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/choose-profile")}>
            Schimbă tipul profilului
            <DropdownMenuShortcut>
              <UserPen />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          {user?.role === "Business" && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/create-service")}>
                Publică serviciu
                <DropdownMenuShortcut>
                  <ClipboardPlus />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/my-services")}>
                Serviciile mele
                <DropdownMenuShortcut>
                  <Server />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuItem>
          Support
          <DropdownMenuShortcut>
            <MonitorCog />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          Ieșire
          <DropdownMenuShortcut>
            <LogOut />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
