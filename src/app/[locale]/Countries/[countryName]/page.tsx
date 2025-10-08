"use client";

import { use, useState } from "react";
import messages from "@/messages/en.json";
import { Clock, MapPin, Briefcase, Lightbulb, ChevronDown } from "lucide-react";
import { HeaderBackground } from "@/images";

interface AboutCountryProps {
  params: Promise<{
    locale: string;
    countryName: string;
  }>;
}

export default function AboutCountry({ params }: AboutCountryProps) {
  const { countryName } = use(params);

  const countryData = (messages.Countries as any)[countryName];
  const cityKeys = Object.keys(countryData);

  return (
    <div
      className="relative pt-24 px-6 py-12 md:py-12 text-black min-h-screen"
      style={{
        backgroundImage: `url(${HeaderBackground.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative max-w-3xl mx-auto space-y-10">
        {/* Country Header */}
        <div className="text-center py-10 bg-gradient-to-r from-orange-500 to-blue-900 text-white rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold">{countryName}</h1>
          <p className="mt-2 text-lg text-orange-100">
            Discover the best cities and travel tips
          </p>
        </div>

        {/* City List */}
        <div className="space-y-8">
          {cityKeys.map((cityKey) => {
            const city = countryData[cityKey];
            return <CityCard key={cityKey} city={city} />;
          })}
        </div>
      </div>
    </div>
  );
}

function CityCard({ city }: { city: any }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition-shadow">
      {/* City Name + Description */}
      <h2 className="text-2xl font-bold text-blue-900">{city.name}</h2>
      <p className="text-gray-600 mt-2">{city.description}</p>

      {/* Collapse Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="mt-4 flex items-center text-orange-600 font-medium hover:underline"
      >
        {open ? "See Less" : "See More"}
        <ChevronDown
          className={`h-4 w-4 ml-1 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Collapsible Content */}
      {open && (
        <div className="mt-6 space-y-6">
          {/* Time */}
          <div className="flex items-start gap-2">
            <Clock className="h-5 w-5 text-orange-500 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-blue-900">
                Recommended Time
              </h3>
              <p>{city.time}</p>
            </div>
          </div>

          {/* Destinations */}
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-orange-500 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-blue-900">
                Top Destinations
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {city.destinations.map((place: string, i: number) => (
                  <li key={i}>{place}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Packing List */}
          <div className="flex items-start gap-2">
            <Briefcase className="h-5 w-5 text-orange-500 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-blue-900">
                Packing List
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {city.items.map((item: string, i: number) => (
                  <span
                    key={i}
                    className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm border border-orange-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="flex items-start gap-2">
            <Lightbulb className="h-5 w-5 text-orange-500 mt-1" />
            <div>
              <h3 className="font-semibold text-lg text-blue-900">
                Travel Tips
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {city.otherTips.map((tip: string, i: number) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
