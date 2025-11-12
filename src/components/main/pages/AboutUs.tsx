import {ABOUT_US} from "@/common/constants";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="space-y-16 md:space-y-24">
      <Image
        src={"/assets/images/about-us-main-photo.jpg"}
        alt="img"
        width={1000}
        height={1000}
        className="object-cover w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-2xl md:rounded-4xl shadow-lg"
      />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            {ABOUT_US.t1}
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
            {ABOUT_US.p1}
          </p>
        </div>
        <div className="flex-1 w-full">
          <Image
            src={"/assets/images/about-us-secondary-photo.jpg"}
            alt="img"
            width={1000}
            height={1000}
            className="object-cover w-full h-[250px] sm:h-[300px] lg:h-[350px] rounded-2xl md:rounded-4xl shadow-lg"
          />
        </div>
      </div>

      <div className="space-y-8 md:space-y-12">
        <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          {ABOUT_US.t2}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {ABOUT_US.p2.map((item, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-gray-200">
              <CardHeader className="flex flex-col items-center pb-4 space-y-4">
                <div className="bg-green-100 p-4 rounded-full transition-colors duration-300 hover:bg-green-200">
                  <item.icon className="text-green-600 w-8 h-8" />
                </div>
                <CardTitle className="text-center text-lg sm:text-xl font-semibold text-gray-900">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <p className="text-center text-sm sm:text-base text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
