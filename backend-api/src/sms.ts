import Twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER;

let client: ReturnType<typeof Twilio> | null = null;
if (accountSid && authToken) client = Twilio(accountSid, authToken);

export async function sendSms(to: string, body: string) {
  if (!client || !fromNumber) {
    console.warn('Twilio not configured - skipping SMS:', { to, body });
    return;
  }

  try {
    await client.messages.create({ body, from: fromNumber, to });
    console.log('SMS queued to', to);
  } catch (err) {
    console.error('Failed to send SMS', err);
  }
}

export default sendSms;
