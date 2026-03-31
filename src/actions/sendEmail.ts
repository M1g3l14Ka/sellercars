'use server';

import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Configuration
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'info@millioncars.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Million Cars <onboarding@resend.dev>';

// Email validation regex pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Send contact form email via Resend
 * @param formData - Form data with contact information
 * @returns Success or error response
 */
export const sendContactEmail = async (formData: FormData) => {
  const name = formData.get('name') as string;
  const company = formData.get('company') as string;
  const email = formData.get('email') as string;
  const topic = formData.get('topic') as string;
  const message = formData.get('message') as string;
  const carBrand = formData.get('carBrand') as string;
  const carModel = formData.get('carModel') as string;

  // Validation
  if (!email || !message) {
    return { error: 'Email and message are required' };
  }

  if (!emailRegex.test(email)) {
    return { error: 'Invalid email format' };
  }

  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Contact Request: ${topic || 'General Inquiry'}`,
      text: `
Name: ${name}
Company: ${company || 'N/A'}
Email: ${email}
Topic: ${topic || 'General'}
Car Brand: ${carBrand || 'N/A'}
Car Model: ${carModel || 'N/A'}

Message:
${message}
      `.trim(),
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Topic:</strong> ${topic || 'General'}</p>
        ${carBrand ? `<p><strong>Car Brand:</strong> ${carBrand}</p>` : ''}
        ${carModel ? `<p><strong>Car Model:</strong> ${carModel}</p>` : ''}
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { error: 'Something went wrong. Please try again later.' };
  }
};
