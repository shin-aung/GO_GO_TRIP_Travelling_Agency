"use client";

import Image from "next/image";
import { HeaderBackground } from "@/images";

export default function OurStory() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <Image
        src={HeaderBackground}
        alt="Our story background"
        fill
        priority
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm -z-10" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-black">
        <h1 className="text-5xl font-bold mb-8 text-center">Our Story</h1>

        <p className="text-lg leading-relaxed mb-6">
          Every journey begins with a dream. Ours began with a simple belief —
          that travel should be meaningful, stress-free, and unforgettable.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          TRIP ZONE was founded by{" "}
          <span className="font-semibold">
            Shin Thant Aung, Alinah and Harish
          </span>
          , a passionate traveler who believed that exploring the world should
          be more than just visiting places. It should be about creating
          memories, discovering cultures, and connecting people.
        </p>

        <p className="text-lg leading-relaxed mb-6">
          What started as a small idea grew into a trusted travel agency through
          dedication, honesty, and a deep understanding of our customers’ needs.
          From family holidays and group tours to personalized travel
          experiences, every journey is designed with care.
        </p>

        <p className="text-lg leading-relaxed mb-12">
          Today, we continue to grow with one clear mission — to turn every trip
          into a story worth remembering.
        </p>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-black/20 backdrop-blur p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p>
              To provide reliable, personalized, and memorable travel
              experiences that inspire people to explore the world with
              confidence.
            </p>
          </div>

          <div className="bg-black/20 backdrop-blur p-6 rounded-xl">
            <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
            <p>
              To become a leading travel agency known for trust, creativity, and
              exceptional customer care.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-black/20 backdrop-blur p-8 rounded-xl text-center">
          <h2 className="text-3xl font-semibold mb-6">Why Choose Us</h2>
          <ul className="space-y-3 text-lg">
            <li>🌍 Carefully planned travel experiences</li>
            <li>🤝 Friendly and professional consultants</li>
            <li>✈️ Customized trips for every traveler</li>
            <li>⭐ Honest service and transparent pricing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
