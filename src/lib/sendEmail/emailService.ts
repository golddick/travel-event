// lib/email.ts

export interface EmailTemplate {
  subject: string;
  html: string;
  text?: string;
}

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
  type?: "NEWSLETTER" | "NOTIFICATION" | "TRANSACTIONAL";
  metadata?: Record<string, any>;
  tags?: string[];
}

export async function useSendEmail({
  to,
  subject,
  html,
  type = "NOTIFICATION",
  metadata = {},
  tags = [],
}: SendEmailOptions) { 
  try {
    const API_KEY = "drop-aphi-key-trial-NkaN_63m5Ex9";
    const DROP_URL = "https://drop-aphi.vercel.app"

    if (!API_KEY) {
      console.error("Missing environment variable: VITE_DROP_APHI_KEY");
      return { success: false, error: "Email service not configured" };
    }

    const response = await fetch(`${DROP_URL}/api/email/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "drop-aphi-key": API_KEY,
      },
      body: JSON.stringify({
        to: Array.isArray(to) ? to : [to],
        subject: subject.trim(),
        html: html.trim(),
        type,
        metadata,
        tags: [...tags, 'website-form'],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Email API error:", errorData);
      return { 
        success: false, 
        error: errorData.error || `Email failed with status: ${response.status}` 
      };
    }

    const data = await response.json();
    console.log("Email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Send email API call failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}


// Helper functions
export async function sendNotificationEmail(to: string | string[], subject: string, html: string, options: Partial<SendEmailOptions> = {}) {
  return useSendEmail({
    to,
    subject,
    html,
    type: "NOTIFICATION",
    ...options
  });
}