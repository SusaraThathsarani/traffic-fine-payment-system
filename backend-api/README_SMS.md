Twilio SMS integration
======================

Environment variables (set these before starting the backend):

- `TWILIO_ACCOUNT_SID` — your Twilio Account SID
- `TWILIO_AUTH_TOKEN` — your Twilio Auth Token
- `TWILIO_FROM_NUMBER` — the Twilio phone number (in E.164, e.g. +1234567890)

Install dependencies and run:

```bash
cd backend-api
npm install
npm run dev
```

When a payment is processed via `POST /api/payments`, the backend will attempt
to send an SMS receipt to the phone number on the `TrafficFine` record.

New endpoints:

- `POST /api/fines` — issue a new fine. Required fields: `vehicleNumber`, `offence`, `amount`. Optional: `driverName`, `phone`, `location`, `officerName`. If `phone` is present an SMS is sent on issuance.
- `POST /api/otp/request` — request a verification OTP to `phone` (body: `{ phone }`).
- `POST /api/otp/verify` — verify OTP (body: `{ phone, code }`).

OTP notes: codes are 6 digits and expire after 5 minutes. OTPs are stored in-memory (suitable for testing; replace with a persistent store for production).
