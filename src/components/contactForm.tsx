"use client";

import { useRef, useState, FormEvent } from "react";
import SentIcon from "../../public/img/sent.svg";
import { useLanguage } from "../contexts/LanguageContext";

export default function ContactForm() {
  const { content } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"sending" | "success" | "error" | "">(
    ""
  );

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    if (!formRef.current) return;

    const formData = {
      from_name: formRef.current.elements.namedItem("name") as HTMLInputElement,
      from_email: formRef.current.elements.namedItem(
        "email"
      ) as HTMLInputElement,
      message: formRef.current.elements.namedItem(
        "message"
      ) as HTMLTextAreaElement,
    };

    try {
      const response = await fetch("https://formspree.io/f/xnnqpylq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        formRef.current.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setStatus("error");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={sendEmail}
      className="max-w-4xl mx-auto space-y-6"
      aria-labelledby="contact-form-title"
    >
      {/* Nom */}
      <div>
        <label
          htmlFor="name"
          className="block text-gray-700 dark:text-gray-400 mb-2 font-semibold"
        >
          {content.contactName}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-full px-4 py-2 bg-gray-200 dark:bg-[#495057] text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="John Doe"
          aria-label={content.contactName}
          required
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-gray-700 dark:text-gray-400 mb-2 font-semibold"
        >
          {content.contactEmail}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="w-full px-4 py-2 bg-gray-200 dark:bg-[#495057] text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="johndoe@example.com"
          aria-label={content.contactEmail}
          required
        />
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-gray-700 dark:text-gray-400 mb-2 font-semibold"
        >
          {content.contactMessage}
        </label>
        <textarea
          name="message"
          id="message"
          className="w-full px-4 py-2 bg-gray-200 dark:bg-[#495057] text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={content.contactMessage}
          aria-label={content.contactMessage}
          required
        ></textarea>
      </div>

      {/* Bouton d'envoi */}
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full flex items-center justify-center space-x-2 transition-transform transform active:scale-95 disabled:bg-gray-500 disabled:cursor-not-allowed"
        disabled={status === "sending"}
        aria-label={content.contactSubmit}
      >
        <span>{content.contactSubmit}</span>
        <SentIcon className="w-5 h-5 text-white" />
      </button>

      {/* Messages de statut */}
      {status && (
        <p
          className={`text-center mt-4 text-sm font-medium ${
            status === "success" ? "text-green-500" : "text-red-500"
          }`}
          role="status"
        >
          {status === "sending"
            ? content.contactSending
            : status === "success"
            ? content.contactSuccess
            : content.contactError}
        </p>
      )}
    </form>
  );
}
