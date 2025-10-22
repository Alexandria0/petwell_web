import {Button} from "@/components/ui/button";
import {useAuth} from "@/context/AuthContext";
import Link from "next/link";
import {Profile} from "../Profile";

export default function NavigationProfileOrAuth() {
  const {user} = useAuth();
  return user ? (
    <div className="flex items-center gap-4">
      <Profile />
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <Link href="/sign-in">
        <Button variant="outline" className="font-light px-6">
          Autentificare
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button className="font-light px-6">Creare cont</Button>
      </Link>
    </div>
  );
}
