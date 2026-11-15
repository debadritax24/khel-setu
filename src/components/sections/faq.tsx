"use client";

import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is Khel Setu?",
    answer: "Khel Setu is India's complete Sports Ecosystem Platform that connects athletes, schools, coaches, sponsors, and tournament organizers. It provides tools for tournament management, performance tracking, digital certificates, and networking.",
    id: "01",
  },
  {
    question: "Who can join Khel Setu?",
    answer: "Any athlete, coach, school administrator, or sports sponsor can join. We welcome participants from all sports and skill levels across India.",
    id: "02",
  },
  {
    question: "Is Khel Setu free to use?",
    answer: "Yes, Khel Setu is free for athletes and coaches. Schools and sponsors may have premium features available through subscription plans.",
    id: "03",
  },
  {
    question: "How do tournaments work?",
    answer: "Tournament organizers can create and manage events on the platform. Athletes can browse, register, and track their performance. Real-time updates and live scoring are available during events.",
    id: "04",
  },
  {
    question: "Can sponsors find athletes on the platform?",
    answer: "Yes! Sponsors can browse verified athlete profiles, view performance analytics, and connect directly with athletes for sponsorship opportunities.",
    id: "05",
  },
];

export function FAQSection() {
  return (
    <section className="relative bg-[#0A0A0A] py-24 sm:py-32 border-b border-white/10 overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 font-mono-tag text-xs font-semibold uppercase tracking-widest text-[#FF4D12] mb-3">
            <span>[ 06 // KNOWLEDGE BASE ]</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-400">
            Everything you need to know about Khel Setu.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-16 divide-y divide-white/10 border-y border-white/10"
        >
          <Accordion.Root type="single" collapsible className="space-y-0">
            {faqs.map((faq) => (
              <Accordion.Item
                key={faq.question}
                value={faq.question}
                className="group py-2"
              >
                <Accordion.Trigger className="flex w-full items-center justify-between py-5 text-left font-display text-lg sm:text-xl font-bold text-white transition-colors hover:text-[#FF4D12]">
                  <span className="flex items-center gap-4">
                    <span className="font-mono-tag text-xs text-[#FF4D12]">
                      // {faq.id}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:border-[#FF4D12]/40 group-data-[state=open]:bg-[#FF4D12]/10">
                    <ChevronDown className="h-4 w-4 text-neutral-300 group-data-[state=open]:text-[#FF4D12]" />
                  </div>
                </Accordion.Trigger>
                <Accordion.Content className="overflow-hidden pb-6 pl-10 text-sm sm:text-base text-neutral-400 leading-relaxed">
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </motion.div>
      </div>
    </section>
  );
}
