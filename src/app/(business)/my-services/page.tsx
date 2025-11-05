import ServicesList from "@/components/service/ServicesList";

export default function page() {
  return (
    <div className="mx-[130px]">
      <ServicesList showMyServices={true} />
    </div>
  );
}
