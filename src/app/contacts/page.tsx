import {CONTACT_US} from "@/common/constants";
import ContactUs from "@/components/main/pages/ContactUs";

export default function page() {
  return (
    <div className="">
      <h1 className="text-center text-3xl font-bold my-6">
        {CONTACT_US.title}
      </h1>
      <div className="flex justify-center gap-10 mb-12">
        <ContactUs />
      </div>
    </div>
  );
}
