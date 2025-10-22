import {Button} from "../ui/button";
import {UserWhiteOutlineIcon} from "../icons";
import {cn} from "@/lib/utils";
import {TYPES_OF_PROFILES} from "@/common/constants";

export default function ProfileTypeBtnSelector({
  profile,
  selectedType,
  setSelectedType,
}: {
  profile: (typeof TYPES_OF_PROFILES)[number];
  selectedType: number;
  setSelectedType: (type: number) => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn(
        "flex flex-col space-y-4 w-96 p-6 h-auto hover:bg-green-50",
        selectedType === profile.type && "ring-2 ring-green-400 bg-green-50"
      )}
      onClick={() => setSelectedType(profile.type)}>
      <div className="flex items-center justify-center bg-[#3F5902] rounded-full p-4 w-16 h-16 mx-auto">
        <UserWhiteOutlineIcon size={32} />
      </div>

      <div className="font-semibold text-xl">{profile.title}</div>
      <div className="font-thin text-lg text-[#3F5902] text-wrap">
        {profile.description}
      </div>
      <ul className="space-y-3 text-left w-full">
        {profile.features.map((feature, index) => {
          const Icon = profile.iconList[index];
          return (
            <li key={index} className="flex items-center gap-2">
              <Icon />
              <span>{feature}</span>
            </li>
          );
        })}
      </ul>
    </Button>
  );
}
