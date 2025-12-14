// lib/emailTemplates.ts

export interface QuoteRequestData {
  fullName: string;
  phoneNumber: string;
  email: string;
  serviceType: string;
  numberOfGuests: string;
  date: string;
  time: string;
  additionalInfo: string;
}

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

// Simple inline CSS for maximum compatibility
const simpleStyles = `
  .email-container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333333; }
  .email-header { padding: 20px 0; border-bottom: 1px solid #eeeeee; }
  .email-content { padding: 20px; }
  .email-section { margin: 20px 0; padding: 15px; background: #f9f9f9; border-radius: 4px; }
  .email-label { font-weight: bold; display: block; margin-bottom: 5px; color: #555555; }
  .email-value { margin-bottom: 10px; }
  .email-footer { padding: 20px 0; border-top: 1px solid #eeeeee; font-size: 12px; color: #888888; }
  .email-button { display: inline-block; background: #000000; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 10px 0; }
`;

/**
 * Generate simple admin notification email
 */
export function generateAdminNotificationEmail(data: QuoteRequestData): EmailTemplate {
  const subject = `New Quote Request: ${data.fullName || 'Customer'}`;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${subject}</title>
<style>${simpleStyles}</style>
</head>
<body>
<div class="email-container">
  <div class="email-header">
    <h2 style="margin: 0; color: #333333;">New Quote Request</h2>
    <p style="margin: 5px 0; color: #666666;">Submitted: ${currentDate} at ${currentTime}</p>
  </div>

  <div class="email-content">
    <p>A new quote request has been submitted through the website.</p>
    
    <div class="email-section">
      <h3 style="margin-top: 0; color: #333333;">Customer Information</h3>
      <div class="email-value"><span class="email-label">Name:</span> ${data.fullName || 'Not provided'}</div>
      <div class="email-value"><span class="email-label">Email:</span> ${data.email || 'Not provided'}</div>
      <div class="email-value"><span class="email-label">Phone:</span> ${data.phoneNumber || 'Not provided'}</div>
    </div>

    <div class="email-section">
      <h3 style="margin-top: 0; color: #333333;">Event Details</h3>
      <div class="email-value"><span class="email-label">Service Type:</span> ${data.serviceType || 'Not specified'}</div>
      <div class="email-value"><span class="email-label">Number of Guests:</span> ${data.numberOfGuests || 'Not specified'}</div>
      <div class="email-value"><span class="email-label">Preferred Date:</span> ${data.date || 'Not specified'}</div>
      <div class="email-value"><span class="email-label">Preferred Time:</span> ${data.time || 'Not specified'}</div>
    </div>

    ${data.additionalInfo ? `
    <div class="email-section">
      <h3 style="margin-top: 0; color: #333333;">Additional Information</h3>
      <div class="email-value">${data.additionalInfo.replace(/\n/g, '<br>')}</div>
    </div>
    ` : ''}

    <p style="margin-top: 30px;">
      <strong>Action Required:</strong> Please respond to this inquiry within 24-48 hours.
    </p>
  </div>

  <div class="email-footer">
    <p>This is an automated notification from your website contact form.</p>
    <p>Reply to: ${data.email || 'No email provided'}</p>
  </div>
</div>
</body>
</html>
  `;

  const text = `
NEW QUOTE REQUEST

A new quote request has been submitted through your website.

Customer Information:
Name: ${data.fullName || 'Not provided'}
Email: ${data.email || 'Not provided'}
Phone: ${data.phoneNumber || 'Not provided'}

Event Details:
Service Type: ${data.serviceType || 'Not specified'}
Number of Guests: ${data.numberOfGuests || 'Not specified'}
Preferred Date: ${data.date || 'Not specified'}
Preferred Time: ${data.time || 'Not specified'}

${data.additionalInfo ? `
Additional Information:
${data.additionalInfo}
` : ''}

Submitted: ${currentDate} at ${currentTime}

Action Required: Please respond to this inquiry within 24-48 hours.

This is an automated notification from your website contact form.
  `;

  return { subject, html, text };
}

/**
 * Generate simple client confirmation email
 */
export function generateClientConfirmationEmail(data: QuoteRequestData): EmailTemplate {
  const reference = `QR${Date.now().toString().slice(-6)}`;
  const subject = `Quote Request Confirmation #${reference}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${subject}</title>
<style>${simpleStyles}</style>
</head>
<body>
<div class="email-container">
  <div class="email-header">
    <h2 style="margin: 0; color: #333333;">Quote Request Confirmation</h2>
    <p style="margin: 5px 0; color: #666666;">Reference: ${reference}</p>
  </div>

  <div class="email-content">
    <p>Dear ${data.fullName || 'Customer'},</p>
    
    <p>Thank you for submitting your quote request to TME by Nicky. We have received your inquiry and will review it shortly.</p>
    
    <div class="email-section">
      <h3 style="margin-top: 0; color: #333333;">Request Summary</h3>
      <div class="email-value"><span class="email-label">Service:</span> ${data.serviceType || 'To be determined'}</div>
      <div class="email-value"><span class="email-label">Guests:</span> ${data.numberOfGuests || 'To be determined'}</div>
      <div class="email-value"><span class="email-label">Preferred Date:</span> ${data.date || 'Flexible'}</div>
      <div class="email-value"><span class="email-label">Preferred Time:</span> ${data.time || 'Flexible'}</div>
    </div>

    <div class="email-section">
      <h3 style="margin-top: 0; color: #333333;">What Happens Next</h3>
      <p>1. Our team will review your requirements (within 24 hours)</p>
      <p>2. A coordinator will contact you to discuss details</p>
    </div>

    <p>We look forward to helping you create a memorable event!</p>
  </div>
</div>
</body>
</html>
  `;

  const text = `
QUOTE REQUEST CONFIRMATION

Reference: ${reference}

Dear ${data.fullName || 'Customer'},

Thank you for submitting your quote request to TME by Nicky. We have received your inquiry and will review it shortly.

Request Summary:
Service: ${data.serviceType || 'To be determined'}
Guests: ${data.numberOfGuests || 'To be determined'}
Preferred Date: ${data.date || 'Flexible'}
Preferred Time: ${data.time || 'Flexible'}

What Happens Next:
1. Our team will review your requirements (within 24 hours)
2. We'll prepare a customized quote based on your needs
3. A coordinator will contact you to discuss details
4. You'll receive a comprehensive proposal

Our Contact Information:
Email: TMEbyNicky@gmail.com
Hours: Monday-Friday, 9:00 AM - 6:00 PM

We look forward to helping you create a memorable event!

This is an automated confirmation. Please do not reply to this message.
TME by Nicky Event Planning Services
  `;

  return { subject, html, text };
}