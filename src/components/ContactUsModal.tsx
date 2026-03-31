'use client';

import { useState, useTransition } from 'react';
import { motion } from 'motion/react';
import { sendContactEmail } from '@/actions/sendEmail';

/**
 * Contact Us Modal Component
 * Allows users to send inquiries about car partnerships
 */
export default function ContactUsModal() {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  /**
   * Handle form submission
   */
  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await sendContactEmail(formData);

      if (result.success) {
        setFeedback({
          type: 'success',
          message: 'Message sent successfully! We will contact you soon.',
        });
        // Clear form after successful submission
        const form = document.getElementById('contactForm') as HTMLFormElement;
        form?.reset();
      } else {
        setFeedback({
          type: 'error',
          message: result.error || 'Failed to send message',
        });
      }

      // Clear feedback after 5 seconds
      setTimeout(() => setFeedback(null), 5000);
    });
  }

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="min-h-screen w-full flex flex-col justify-center items-center p-4 gap-4"
    >
      {/* Header Section */}
      <div className="w-full">
        <div className="pl-24">
          <div className="border-orange-600 border-l-2 h-36 flex w-full p-6 items-center justify-start">
            <h1 className="text-transparent bg-linear-to-r bg-clip-text from-orange-600 to-red-500 font-bold text-2xl">
              Ask an Expert
            </h1>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="text-center w-full max-w-2xl m-2 mb-16">
        <p className="text-zinc-400">
          Our goal is to become a reliable partner for every client, to
          be available every day and at any time to address any questions
          that arise and to respond swiftly to any changes.
        </p>
      </div>

      {/* Contact Form */}
      <form
        id="contactForm"
        action={handleSubmit}
        className="flex justify-center items-center flex-col gap-6 w-full max-w-md"
      >
        {/* Company Input */}
        <div className="flex flex-col items-center gap-2 w-full">
          <label htmlFor="company" className="text-sm text-zinc-400">
            Are you a company interested in partnering?
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Company Name"
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-orange-500 transition-colors text-white placeholder-zinc-500"
          />
        </div>

        {/* Personal Information */}
        <div className="flex flex-col items-center gap-4 w-full">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name *"
            required
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-orange-500 transition-colors text-white placeholder-zinc-500"
          />

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email *"
            required
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-orange-500 transition-colors text-white placeholder-zinc-500"
          />

          <input
            type="text"
            id="topic"
            name="topic"
            placeholder="Topic *"
            required
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-orange-500 transition-colors text-white placeholder-zinc-500"
          />
        </div>

        {/* Car Information */}
        <div className="flex flex-col gap-4 w-full">
          <input
            type="text"
            id="carBrand"
            name="carBrand"
            placeholder="Car Brand (e.g., Hyundai, Kia)"
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-orange-500 transition-colors text-white placeholder-zinc-500"
          />

          <input
            type="text"
            id="carModel"
            name="carModel"
            placeholder="Car Model (e.g., Sonata, K5)"
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-orange-500 transition-colors text-white placeholder-zinc-500"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="message" className="text-sm text-zinc-400">
            Your Message *
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us what you're looking for..."
            required
            rows={5}
            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-orange-500 transition-colors text-white placeholder-zinc-500 resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full text-2xl py-4 bg-linear-30 from-orange-600 to-red-500 disabled:bg-orange-800 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all hover:scale-95"
        >
          {isPending ? 'Sending...' : 'Send Message'}
        </button>

        {/* Feedback Messages */}
        {feedback && (
          <div
            className={`w-full p-4 rounded-lg text-center ${
              feedback.type === 'success'
                ? 'bg-green-900/50 text-green-400 border border-green-800'
                : 'bg-red-900/50 text-red-400 border border-red-800'
            }`}
          >
            {feedback.message}
          </div>
        )}
      </form>
    </motion.div>
  );
}
