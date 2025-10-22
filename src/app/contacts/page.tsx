import {ABOUT_US} from "@/common/constants";
import AboutUs from "@/components/main/pages/AboutUs";

export default function page() {
  return (
    <div className="">
      <h1 className="text-center text-3xl font-bold my-6">{ABOUT_US.title}</h1>
      <div className="flex justify-center gap-10 mb-12">
        <AboutUs />
      </div>
    </div>
  );
}
