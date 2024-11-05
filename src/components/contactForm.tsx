"use client";

import { useRef, useState, FormEvent } from "react";
import SentIcon from "../../public/img/sent.svg";
import { useLanguage } from "../contexts/LanguageContext";

export default function ContactForm() {
  const { content } = useLanguage();
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");

  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    try {
      if (form.current) {
        const response = await fetch("https://formspree.io/f/xnnqpylq", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from_name: (form.current["name"] as unknown as HTMLInputElement)
              .value,
            from_email: (form.current["email"] as HTMLInputElement).value,
            message: (form.current["message"] as HTMLTextAreaElement).value,
          }),
        });

        if (response.ok) {
          setStatus("Message envoyé !");
          form.current.reset();
        } else {
          setStatus("Erreur lors de l'envoi, veuillez réessayer.");
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setStatus("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="max-w-4xl mx-auto mb-28 space-y-4"
    >
      <div>
        <label className="block text-gray-700 dark:text-gray-400 mb-2">
          {content.contactName}
        </label>
        <input
          type="text"
          name="name"
          className="w-full px-3 py-2 bg-gray-200 dark:bg-[#495057] text-black dark:text-white rounded-md"
          placeholder="John Doe"
          aria-label="Name"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-400 mb-2">
          {content.contactEmail}
        </label>
        <input
          type="email"
          name="email"
          className="w-full px-3 py-2 bg-gray-200 dark:bg-[#495057] text-black dark:text-white rounded-md"
          placeholder="johndoe@example.com"
          aria-label="Email"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 dark:text-gray-400 mb-2">
          {content.contactMessage}
        </label>
        <textarea
          name="message"
          className="w-full px-3 py-2 bg-gray-200 dark:bg-[#495057] text-black dark:text-white rounded-md"
          placeholder="Votre message..."
          aria-label="Message"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full flex items-center justify-center space-x-2"
      >
        <span>{content.contactSubmit}</span>
        <SentIcon className="w-5 h-5 text-white" />
      </button>
      {status && <p className="text-center mt-4 text-sm">{status}</p>}
    </form>
  );
}
