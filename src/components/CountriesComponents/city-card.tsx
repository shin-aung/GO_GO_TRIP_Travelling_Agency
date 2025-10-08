"use client"

import { Clock, MapPin, Briefcase, Lightbulb, ChevronDown } from "lucide-react";
import { useState } from "react";

export function CityCard({ city }: { city: any }) {
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
