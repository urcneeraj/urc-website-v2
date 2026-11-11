# Enquiry delivery and deployment

Production runs on Cloudflare **Workers**, using the Next.js/OpenNext adapter. The Cloudflare project is `urc-website-v2`, connected to `urcneeraj/urc-website-v2`, production branch `main`, with automatic builds enabled. A successful build/deployment updates the custom domain. Check the Cloudflare deployment status after pushing.

The existing `preview:cf` / `deploy:cf` scripts are legacy **Pages static-export** commands, not this production deployment path. Do not use them with `output: "standalone"`. For local testing use `npm run dev`, or `npm run build` followed by `npm start`.

## Request flow

`InvestorEnquiryModal` → `POST /api/v1/contact` → `app/api/v1/contact/route.ts` → `lib/contact/server.ts` → Web3Forms → configured recipient mailbox.

The `functions/` and root `api/` adapters alone do not register a Next.js App Router route. Their absence from the Worker runtime caused the previous HTML 404 and JSON parsing error.

## Configuration

- Set `WEB3FORMS_ACCESS_KEY` in Cloudflare **runtime** variables/secrets. Do not prefix it with `NEXT_PUBLIC_` or commit it. Locally use `.env.local` based on `env.local.example`.
- In Web3Forms, select the matching form, verify the recipient, and set **Settings → Spam & Security → Captcha Protection → hCaptcha**. Save it. This mandatory provider check prevents fabricated CAPTCHA tokens from bypassing the frontend.
- The browser uses Web3Forms' documented public hCaptcha site key. It is not a secret. Tokens are sent to the server, forwarded to Web3Forms for validation, then reset after each attempt or expiry.
- Leave the provider's spam filter enabled. Configure a Cloudflare rate-limiting rule for the contact URL to reject bursts before they reach the Worker.
- Optional Upstash monthly quotas use `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`. Without these, Redis quotas are inactive; they are separate from edge rate limiting and mandatory CAPTCHA. A configured Redis failure returns JSON 503 instead of sending mail.
- `ALLOWED_ORIGINS` optionally allows a comma-separated list. Otherwise browser requests must be same-origin. Origin checks do not replace CAPTCHA.

The handler rejects honeypot entries, requests larger than 32 KiB, missing CAPTCHA, invalid fields, and attachments. The current free Web3Forms plan does not support attachments; visitors are directed to email them instead. Only an explicit upstream `success: true` produces a success message. Transient upstream failures do not automatically retry delivery (which could duplicate email).

## Verification

Run `npm test`, `npx tsc --noEmit`, and `npm run build`. The build route list must include `/api/v1/contact`. In production, missing CAPTCHA should return JSON 400 and an invalid CAPTCHA should be rejected by Web3Forms, without sending email. Complete one real CAPTCHA and send a clearly labelled test enquiry to verify delivery. CAPTCHA reduces automated abuse; it cannot prove a visitor's identity or business intent.

References: [Next.js route handlers](https://nextjs.org/docs/app/api-reference/file-conventions/route), [Web3Forms hCaptcha](https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha).
