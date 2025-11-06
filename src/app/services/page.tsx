import ServicesList from "@/components/service/ServicesList";

interface ServicesPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    searchTerm?: string;
    type?: string;
    animal?: string;
    location?: string;
  }>;
}

export default async function page({searchParams}: ServicesPageProps) {
  const resolvedSearchParams = await searchParams;

  const params = {
    page: resolvedSearchParams.page
      ? parseInt(resolvedSearchParams.page)
      : undefined,
    pageSize: resolvedSearchParams.pageSize
      ? parseInt(resolvedSearchParams.pageSize)
      : undefined,
    searchTerm: resolvedSearchParams.searchTerm,
    type: resolvedSearchParams.type,
    animal: resolvedSearchParams.animal,
    location: resolvedSearchParams.location,
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <ServicesList searchParams={params} />
    </div>
  );
}
