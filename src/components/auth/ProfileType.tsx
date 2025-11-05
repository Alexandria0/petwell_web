"use client";

import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../ui/card";
import {Button} from "../ui/button";
import {useState} from "react";
import ProfileTypeBtnSelector from "./ProfileTypeBtnSelector";
import {TYPES_OF_PROFILES} from "@/common/constants";
import {chooseProfile} from "@/lib/api/auth.service";
import {logToastError, logToastSuccess} from "@/helpers/toast_logger";
import {useAuth} from "@/context/AuthContext";

export default function ProfileType() {
  const {profileChanged, user} = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<number>(
    user?.role === "Customer" ? 0 : 1
  );

  async function onSubmit() {
    try {
      setIsLoading(true);
      const response = await chooseProfile(selectedType);
      profileChanged(response);
      logToastSuccess(response, "Schimbare profil reușită!");
    } catch (error) {
      logToastError(error, "Eroare la schimbare profil");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="max-w-4/6 my-10 mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Alege tipul contului
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-6 p-4 contain-content">
        {TYPES_OF_PROFILES.map((profile) => {
          return (
            <ProfileTypeBtnSelector
              key={profile.title}
              profile={profile}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          );
        })}
      </CardContent>
      <CardFooter className="p-6">
        <Button
          className="w-full max-w-md mx-auto text-lg py-6"
          disabled={isLoading}
          onClick={onSubmit}>
          {isLoading ? "Se încarcă..." : "Continuare"}
        </Button>
      </CardFooter>
    </Card>
  );
}
