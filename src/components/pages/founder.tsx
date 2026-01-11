"use client";

import Image, { StaticImageData } from "next/image";
import {
  AlinahImage,
  HarishImage,
  HeaderBackground,
  KristineImage,
  LinImage,
  ShinImage,
} from "@/images";

function Card({
  title,
  name,
  extra,
  image,
}: {
  title: string;
  name: string;
  extra?: string;
  image: StaticImageData;
}) {
  return (
    <div className="flex flex-col items-center bg-white/90 backdrop-blur shadow-md rounded-xl p-4 w-56 border">
      <div className="relative w-20 h-20 mb-3">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-full border-2 border-blue-500"
        />
      </div>

      <h3 className="text-sm font-semibold text-blue-600">{title}</h3>
      <p className="text-lg font-bold text-center text-gray-800">{name}</p>
      {extra && <p className="text-sm text-gray-600 mt-1">{extra}</p>}
    </div>
  );
}

export default function Founder() {
  return (
    <div className="relative min-h-screen flex flex-col items-center py-12 px-4 overflow-hidden">
      {/* Background Image */}
      <Image
        src={HeaderBackground}
        alt="Packages background"
        fill
        priority
        className="object-cover -z-10"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 -z-10" />

      {/* Content */}
      <h1 className="text-4xl font-bold mb-12 text-center text-white">
        Company Structure
      </h1>

      {/* CEO */}
      <Card title="CEO" name="Shin Thant Aung" image={ShinImage} />

      <div className="h-8 w-px bg-white/60 my-2" />

      {/* Marketing Director */}
      <Card title="Marketing Director" name="Alinah" image={AlinahImage} />

      <div className="h-8 w-px bg-white/60 my-2" />

      {/* Shareholders */}
      <h2 className="text-2xl font-semibold mt-6 mb-4 text-white">
        Shareholders
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        <Card
          title="Shareholder (40%)"
          name="Shin Thant Aung"
          image={ShinImage}
        />
        <Card title="Shareholder (30%)" name="Alinah" image={AlinahImage} />
        <Card title="Shareholder (30%)" name="Harish" image={HarishImage} />
      </div>

      <div className="h-8 w-px bg-white/60 my-8" />

      {/* Tour Consultants */}
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Tour Consultants
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        <Card title="Tour Consultant" name="Kristine" image={KristineImage} />
        <Card title="Tour Consultant" name="Linn" image={LinImage} />
      </div>
    </div>
  );
}
