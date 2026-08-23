"use server";

export interface ContactFormState {
  success: boolean;
  error?: string;
  message?: string;
}

export async function sendContactMessage(
  formData: FormData
): Promise<ContactFormState> {
  // Extract and validate fields
  const name = (formData.get("name") as string | null)?.trim();
  const email = (formData.get("email") as string | null)?.trim();
  const subject = (formData.get("subject") as string | null)?.trim();
  const message = (formData.get("message") as string | null)?.trim();

  // Basic server-side validation
  if (!name || name.length < 2) {
    return { success: false, error: "Please enter your full name." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }
  if (!subject || subject.length < 3) {
    return { success: false, error: "Please enter a subject." };
  }
  if (!message || message.length < 10) {
    return { success: false, error: "Message must be at least 10 characters." };
  }

  // ── Resend integration ──
  // Requires RESEND_API_KEY in .env.local and `resend` package installed.
  // Uncomment the block below once you add the package:
  //
  // import { Resend } from "resend";
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // const { error } = await resend.emails.send({
  //   from: "Portfolio Contact <contact@subhransu.dev>",
  //   to: "subhransu.nayak.connect@gmail.com",
  //   replyTo: email,
  //   subject: `[Portfolio] ${subject} — from ${name}`,
  //   text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  // });
  // if (error) {
  //   return { success: false, error: "Failed to send message. Please try again." };
  // }

  // ── Formspree fallback (no-auth) ──
  // Set FORMSPREE_ENDPOINT in .env.local (e.g. https://formspree.io/f/YOUR_ID)
  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
  if (formspreeEndpoint) {
    const res = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });
    if (!res.ok) {
      return { success: false, error: "Message delivery failed. Please email directly." };
    }
  }

  // Simulate delivery success if no integration configured
  // Remove this when a real integration is active
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    message: `Thanks ${name}! Your message has been received. I'll reply to ${email} within 24 hours.`,
  };
}
