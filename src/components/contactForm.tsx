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
      from_name: (formRef.current["name"] as unknown as HTMLInputElement).value,
      from_email: (formRef.current["email"] as HTMLInputElement).value,
      message: (formRef.current["message"] as HTMLTextAreaElement).value,
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
      className="max-w-4xl mx-auto mb-28 space-y-4"
      aria-labelledby="contact-form-title"
    >
      <h2 id="contact-form-title" className="sr-only">
        {content.contactTitle}
      </h2>
      <div>
        <label
          htmlFor="name"
          className="block text-gray-700 dark:text-gray-400 mb-2"
        >
          {content.contactName}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="w-full px-3 py-2 bg-gray-200 dark:bg-[#495057] text-black dark:text-white rounded-md"
          placeholder="John Doe"
          aria-label="Name"
          required
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-gray-700 dark:text-gray-400 mb-2"
        >
          {content.contactEmail}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="w-full px-3 py-2 bg-gray-200 dark:bg-[#495057] text-black dark:text-white rounded-md"
          placeholder="johndoe@example.com"
          aria-label="Email"
          required
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-gray-700 dark:text-gray-400 mb-2"
        >
          {content.contactMessage}
        </label>
        <textarea
          name="message"
          id="message"
          className="w-full px-3 py-2 bg-gray-200 dark:bg-[#495057] text-black dark:text-white rounded-md"
          placeholder="Votre message..."
          aria-label="Message"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full flex items-center justify-center space-x-2"
        disabled={status === "sending"}
      >
        <span>{content.contactSubmit}</span>
        <SentIcon className="w-5 h-5 text-white" />
      </button>
      {status && (
        <p
          className={`text-center mt-4 text-sm ${
            status === "success" ? "text-green-500" : "text-red-500"
          }`}
          role="status"
        >
          {status === "sending"
            ? "Envoi en cours..."
            : status === "success"
            ? "Message envoyé avec succès !"
            : "Erreur lors de l'envoi, veuillez réessayer."}
        </p>
      )}
    </form>
  );
}
