// Cloudflare Worker / Edge Function for Email Notifications
// Deploy this to Cloudflare Workers or similar edge function platform

export interface Env {
  RESEND_API_KEY: string;
  EMAIL_FROM: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const notification = await request.json();

      const emailTemplates = {
        booking_confirmation: {
          subject: 'Booking Confirmed - Narmadha Studio Photography',
          html: `
            <h2>Your Booking is Confirmed!</h2>
            <p>Dear Customer,</p>
            <p>We're excited to confirm your photography session booking with Narmadha Studio.</p>
            <h3>Booking Details:</h3>
            <ul>
              <li><strong>Service:</strong> ${notification.data.serviceType}</li>
              <li><strong>Date:</strong> ${notification.data.date}</li>
              <li><strong>Time:</strong> ${notification.data.time}</li>
              <li><strong>Amount:</strong> ₹${notification.data.amount}</li>
            </ul>
            <p>We'll see you soon!</p>
            <p>Best regards,<br>Narmadha Studio Photography</p>
          `,
        },
        payment_received: {
          subject: 'Payment Received - Narmadha Studio Photography',
          html: `
            <h2>Payment Received</h2>
            <p>Thank you for your payment of ₹${notification.data.amount}.</p>
            <p>Your booking is now confirmed.</p>
          `,
        },
        gallery_ready: {
          subject: 'Your Photos Are Ready! - Narmadha Studio Photography',
          html: `
            <h2>Your Gallery is Ready!</h2>
            <p>We're excited to share that your photos are ready for viewing.</p>
            <p><a href="${notification.data.galleryUrl}">View Your Gallery</a></p>
          `,
        },
      };

      const template = emailTemplates[notification.type as keyof typeof emailTemplates];
      if (!template) {
        return new Response('Invalid notification type', { status: 400 });
      }

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: env.EMAIL_FROM,
          to: notification.to,
          subject: template.subject,
          html: template.html,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  },
};

