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
      from_name:
        (formRef.current.elements.namedItem("name") as HTMLInputElement)
          ?.value || "",
      from_email:
        (formRef.current.elements.namedItem("email") as HTMLInputElement)
          ?.value || "",
      message:
        (formRef.current.elements.namedItem("message") as HTMLTextAreaElement)
          ?.value || "",
    };

    const formSpreeUrl = process.env.NEXT_PUBLIC_FORM_SPREE_URL;
    if (!formSpreeUrl) {
      console.error("FORM_SPREE_URL n'est pas défini");
      setStatus("error");
      return;
    }

    try {
      const response = await fetch(formSpreeUrl, {
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

  const getStatusMessage = () => {
    if (!status) return null;

    const messageClass = `text-center mt-4 text-sm font-medium ${status === "success" ? "text-success animate-slide-up" : "text-error animate-fade-in"
      }`;

    const message = status === "sending"
      ? content.contactSending
      : status === "success"
        ? content.contactSuccess
        : content.contactError;

    return (
      <p className={messageClass} role="status">
        {message}
      </p>
    );
  };

  return (
    <form
      ref={formRef}
      onSubmit={sendEmail}
      className="max-w-4xl mx-auto space-y-6 animate-slide-in"
      aria-labelledby="contact-form-title"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-muted mb-2 font-semibold"
        >
          {content.contactName}
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="
            w-full px-4 py-2 bg-card-hover text-foreground 
            rounded-md border border-card-border
            focus-visible-ring transition-all duration-normal
          "
          placeholder="John Doe"
          aria-label={content.contactName}
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-muted mb-2 font-semibold"
        >
          {content.contactEmail}
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="
            w-full px-4 py-2 bg-card-hover text-foreground
            rounded-md border border-card-border
            focus-visible-ring transition-all duration-normal
          "
          placeholder="johndoe@example.com"
          aria-label={content.contactEmail}
          required
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-muted mb-2 font-semibold"
        >
          {content.contactMessage}
        </label>
        <textarea
          name="message"
          id="message"
          rows={5}
          className="
            w-full px-4 py-2 bg-card-hover text-foreground
            rounded-md border border-card-border
            focus-visible-ring transition-all duration-normal
            resize-y min-h-[100px]
          "
          placeholder={content.contactMessage}
          aria-label={content.contactMessage}
          required
        />
      </div>

      <button
        type="submit"
        className="
          bg-primary hover:bg-primary-dark
          px-6 py-3 rounded-md w-full font-semibold
          flex items-center justify-center gap-2 
          transition-all duration-normal
          active:scale-[0.98] hover:shadow-md
          focus-visible-ring
          disabled:bg-muted disabled:cursor-not-allowed
        "
        disabled={status === "sending"}
        aria-label={content.contactSubmit}
      >
        <span>{content.contactSubmit}</span>
        <SentIcon className="w-5 h-5" />
      </button>

      {getStatusMessage()}
    </form>
  );
}
