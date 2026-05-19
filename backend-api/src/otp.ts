import { sendSms } from './sms';

type OtpRecord = { code: string; expiresAt: number };

const otps: Map<string, OtpRecord> = new Map();

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function requestOtp(phone: string, ttlMillis = 5 * 60 * 1000) {
  const code = generateCode();
  const expiresAt = Date.now() + ttlMillis;
  otps.set(phone, { code, expiresAt });
  await sendSms(phone, `Your verification code is ${code}. It expires in 5 minutes.`);
}

export function verifyOtp(phone: string, code: string) {
  const record = otps.get(phone);
  if (!record) return false;
  if (Date.now() > record.expiresAt) {
    otps.delete(phone);
    return false;
  }
  const ok = record.code === code;
  if (ok) otps.delete(phone);
  return ok;
}

export function clearOtps() {
  otps.clear();
}
