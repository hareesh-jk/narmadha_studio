// Notification service for email and WhatsApp

export interface NotificationData {
  to: string;
  type: 'booking_confirmation' | 'booking_reminder' | 'payment_received' | 'gallery_ready';
  data: Record<string, any>;
}

export async function sendEmailNotification(notification: NotificationData): Promise<void> {
  const response = await fetch('/api/notifications/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notification),
  });

  if (!response.ok) {
    throw new Error('Failed to send email notification');
  }
}

export async function sendWhatsAppNotification(notification: NotificationData): Promise<void> {
  const response = await fetch('/api/notifications/whatsapp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notification),
  });

  if (!response.ok) {
    throw new Error('Failed to send WhatsApp notification');
  }
}

export async function sendBookingConfirmation(
  email: string,
  phone: string,
  bookingData: {
    bookingId: string;
    serviceType: string;
    date: string;
    time: string;
    amount: number;
  }
): Promise<void> {
  const notification: NotificationData = {
    to: email,
    type: 'booking_confirmation',
    data: bookingData,
  };

  await Promise.all([
    sendEmailNotification(notification),
    sendWhatsAppNotification({
      ...notification,
      to: phone,
    }),
  ]);
}

