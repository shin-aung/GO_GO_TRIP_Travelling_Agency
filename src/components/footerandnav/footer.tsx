"use client";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-white">GO GO TRIP</h3>
          <p className="mt-2 text-sm">
            Explore the world with our trusted travel services.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Quick Links</h4>
          <div
            onClick={() => scrollToSection("home")}
            className="cursor-pointer hover:text-orange-400"
          >
            Home
          </div>
          <div
            onClick={() => scrollToSection("about")}
            className="cursor-pointer hover:text-orange-400"
          >
            About
          </div>
          <div
            onClick={() => scrollToSection("trip-plan")}
            className="cursor-pointer hover:text-orange-400"
          >
            Trip Plan
          </div>
          <div
            onClick={() => scrollToSection("packages")}
            className="cursor-pointer hover:text-orange-400"
          >
            Packages
          </div>
          <div
            onClick={() => scrollToSection("contact")}
            className="cursor-pointer hover:text-orange-400"
          >
            Contact Us
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white">Contact Us</h4>
          <p className="mt-2 text-sm">
            Email: info@gogotrip.com <br />
            Phone: +95 9 123 456 789
          </p>
        </div>
      </div>
      <div className="text-center py-4 border-t border-gray-700 text-xs">
        © {new Date().getFullYear()} GO GO TRIP. All rights reserved.
      </div>
    </footer>
  );
}
