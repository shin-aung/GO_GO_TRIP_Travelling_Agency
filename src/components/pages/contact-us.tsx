"use client";

import { useTranslations } from "next-intl";
import { FaWhatsapp, FaTelegramPlane, FaFacebookMessenger, FaViber } from "react-icons/fa";

export default function ContactUs() {
  const t = useTranslations("ContactUs.ContactUsPage");

  return (
    <div className="relative flex flex-col items-center justify-center py-16 px-6 bg-gray-50">
      {/* Section Title */}
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-gray-800">
        {t("title")}
      </h1>
      <p className="text-gray-600 max-w-xl text-center mb-12">
        {t("description")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Contact Info */}
        <div className="flex flex-col space-y-8 justify-center">
          <div>
            <h2 className="text-xl font-semibold text-orange-500 mb-2">{t("address")}</h2>
            <p className="text-gray-700">{t("addressDetails")}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-orange-500 mb-2">{t("phone")}</h2>
            <p className="text-gray-700">{t("phoneDetails")}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-orange-500 mb-2">{t("email")}</h2>
            <p className="text-gray-700">{t("emailDetails")}</p>
          </div>

          {/* Social / Messaging Links */}
          <div>
            <h2 className="text-xl font-semibold text-orange-500 mb-4">{t("socialMedia")}</h2>
            <div className="flex space-x-6 text-3xl text-gray-600">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition"
              >
                <FaWhatsapp />
              </a>
              <a
                href="viber://chat?number=%2B1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-500 transition"
              >
                <FaViber />
              </a>
              <a
                href="https://t.me/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                <FaTelegramPlane />
              </a>
              <a
                href="https://m.me/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition"
              >
                <FaFacebookMessenger />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t("form.name")}</label>
            <input
              type="text"
              placeholder={t("form.name")}
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{t("form.email")}</label>
            <input
              type="email"
              placeholder={t("form.email")}
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">{t("form.message")}</label>
            <textarea
              placeholder={t("form.message")}
              rows={4}
              className="mt-1 w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            {t("form.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
