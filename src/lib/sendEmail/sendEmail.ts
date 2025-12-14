// lib/emailService.ts

import { generateAdminNotificationEmail, generateClientConfirmationEmail, type QuoteRequestData } from "../emailTemplate/emailTemplates";
import { useSendEmail, type SendEmailOptions } from "./emailService";


/**
 * Send notification email to ADMIN
 */
export async function sendAdminNotification(data: QuoteRequestData) {
  const template = generateAdminNotificationEmail(data);
  
  const options: SendEmailOptions = {
    to: 'TMEbyNicky@gmail.com',
    subject: template.subject,
    html: template.html,
    text: template.text,
    type: 'NOTIFICATION',
    replyTo: data.email || undefined,
    tags: ['quote-request', 'admin'],
    metadata: {
      form: 'quote-request',
      timestamp: new Date().toISOString(),
      hasEmail: !!data.email,
      replyTo: data.email || undefined,
    }
  };

  return useSendEmail(options);
}

/**
 * Send confirmation email to CLIENT
 */
export async function sendClientConfirmation(data: QuoteRequestData) {
  if (!data.email) {
    console.log('No email provided for client confirmation');
    return { success: false, error: 'No email provided' };
  }

  const template = generateClientConfirmationEmail(data);
  
  const options: SendEmailOptions = {
    to: data.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
    type: 'TRANSACTIONAL', // Using TRANSACTIONAL type for better deliverability
    replyTo: 'TMEbyNicky@gmail.com',
    tags: ['quote-request', 'client'],
    metadata: {
      form: 'quote-request',
      timestamp: new Date().toISOString(),
      customerName: data.fullName,
      replyTo: 'TMEbyNicky@gmail.com',
    }
  };

  return useSendEmail(options);
}

/**
 * Send both admin notification and client confirmation
 */
export async function sendQuoteRequestEmails(data: QuoteRequestData) {
  console.log('Sending quote request emails for:', data.fullName);
  
  const results = {
    admin: null as any,
    client: null as any
  };

  try {
    // Send to admin first
    console.log('Sending admin notification...');
    results.admin = await sendAdminNotification(data);
    
    // Only send to client if admin email was successful and client has email
    if (results.admin.success && data.email) {
      console.log('Sending client confirmation...');
      results.client = await sendClientConfirmation(data);
    }

    const allSuccessful = results.admin.success && (!data.email || (results.client && results.client.success));
    
    return {
      success: allSuccessful,
      results,
      message: data.email 
        ? 'Emails sent to both admin and client'
        : 'Email sent to admin only (no client email provided)'
    };
  } catch (error) {
    console.error('Failed to send quote request emails:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send emails',
      results
    };
  }
}

