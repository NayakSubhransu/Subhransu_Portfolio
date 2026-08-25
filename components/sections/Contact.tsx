import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Zap,
} from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";
import CopyButton from "@/components/ui/CopyButton";
import { contactInfo } from "@/data/portfolio-data";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative"
      aria-label="Contact & Socials"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-60 sm:h-72 bg-emerald-500/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <header className="mb-10 sm:mb-14 text-center">
          <p className="section-eyebrow justify-center mb-3">
            <Mail className="w-4 h-4" aria-hidden="true" />
            Get In Touch
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Contact & Socials
          </h2>
          <p className="mt-2 text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
            Open to new opportunities, collaborations, and interesting
            conversations. I typically respond within 24 hours.
          </p>
        </header>

        {/* On mobile: form first, then info below. On lg: info left, form right */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-[380px_1fr] gap-8 lg:gap-12 items-start">
          {/* ── Left: Contact Info ── */}
          <aside aria-label="Contact information">
            <div className="flex flex-col gap-4">
              {/* Email card */}
              <div className="glass-card rounded-2xl p-4 sm:p-5">
                <p className="text-xs font-mono font-semibold uppercase tracking-widest text-white-500 mb-3">
                  Email
                </p>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors break-all"
                    aria-label={`Send email to ${contactInfo.email}`}
                  >
                    {contactInfo.email}
                  </a>
                  <CopyButton
                    text={contactInfo.email}
                    className="flex-shrink-0 text-zinc-500 hover:text-zinc-300"
                    aria-label="Copy email address"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="glass-card rounded-2xl p-4 sm:p-5">
                <p className="text-xs font-mono font-semibold uppercase tracking-widest text-white-500 mb-2">
                  Location
                </p>
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                  <MapPin
                    className="w-4 h-4 text-white-500 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {contactInfo.location}
                </div>
              </div>

              {/* Social links */}
              <div className="glass-card rounded-2xl p-4 sm:p-5">
                <p className="text-xs font-mono font-semibold uppercase tracking-widest text-white-500 mb-3">
                  Profiles
                </p>
                <div className="flex flex-col gap-1">
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/[0.04] active:bg-white/[0.07] transition-colors group min-h-[48px]"
                    aria-label="GitHub profile"
                  >
                    <Github
                      className="w-4 h-4 text-white-500 group-hover:text-zinc-300 transition-colors flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-white-400 group-hover:text-zinc-200 transition-colors">
                      GitHub
                    </span>
                    <span className="ml-auto text-xs font-mono text-zinc-600 truncate max-w-[120px]">
                      NayakSubhransu
                    </span>
                  </a>

                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/[0.04] active:bg-white/[0.07] transition-colors group min-h-[48px]"
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin
                      className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition-colors flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-white-400 group-hover:text-zinc-200 transition-colors">
                      LinkedIn
                    </span>
                    <span className="ml-auto text-xs font-mono text-zinc-600 truncate max-w-[120px]">
                      subhransu-p-nayak
                    </span>
                  </a>
                </div>
              </div>

              {/* Deployment badge */}
              <div
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04]"
                aria-label="Site deployment status"
              >
                <span
                  className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot flex-shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold text-emerald-400">
                    🟢 Deployed on Edge
                  </p>
                  <p className="text-xs text-zinc-600 font-mono">
                    Latency: &lt;20ms · Vercel Edge
                  </p>
                </div>
                <Zap
                  className="w-3.5 h-3.5 text-yellow-400 ml-auto flex-shrink-0"
                  aria-hidden="true"
                />
              </div>
            </div>
          </aside>

          {/* ── Right: Contact Form ── */}
          <div
            className="glass-card rounded-2xl p-4 sm:p-6 lg:p-7"
            role="region"
            aria-label="Send a message"
          >
            <h3 className="text-base font-bold text-zinc-200 mb-5">
              Drop a Message
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
