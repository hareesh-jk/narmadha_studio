// Cloudflare Worker / Edge Function for WhatsApp Notifications
// Using Twilio API for WhatsApp

export interface Env {
  TWILIO_ACCOUNT_SID: string;
  TWILIO_AUTH_TOKEN: string;
  TWILIO_WHATSAPP_NUMBER: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const notification = await request.json();

      const whatsappTemplates = {
        booking_confirmation: `✅ Booking Confirmed!\n\nService: ${notification.data.serviceType}\nDate: ${notification.data.date}\nTime: ${notification.data.time}\nAmount: ₹${notification.data.amount}\n\nThank you for choosing Narmadha Studio Photography!`,
        payment_received: `💳 Payment Received!\n\nThank you for your payment of ₹${notification.data.amount}.\nYour booking is confirmed.`,
        gallery_ready: `📸 Your Photos Are Ready!\n\nView your gallery: ${notification.data.galleryUrl}\n\nThank you for choosing Narmadha Studio Photography!`,
      };

      const message = whatsappTemplates[notification.type as keyof typeof whatsappTemplates];
      if (!message) {
        return new Response('Invalid notification type', { status: 400 });
      }

      // Format phone number (remove + and ensure proper format)
      const phoneNumber = notification.to.replace(/[^0-9]/g, '');
      const formattedPhone = phoneNumber.startsWith('91') 
        ? `whatsapp:+${phoneNumber}` 
        : `whatsapp:+91${phoneNumber}`;

      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            From: env.TWILIO_WHATSAPP_NUMBER,
            To: formattedPhone,
            Body: message,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Twilio API error: ${error}`);
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

