# Enquiry delivery and deployment

Production runs on Cloudflare **Workers**, using the Next.js/OpenNext adapter. The Cloudflare project is `urc-website-v2`, connected to `urcneeraj/urc-website-v2`, production branch `main`, with automatic builds enabled. A successful build/deployment updates the custom domain. Check the Cloudflare deployment status after pushing.

The existing `preview:cf` / `deploy:cf` scripts are legacy **Pages static-export** commands, not this production deployment path. Do not use them with `output: "standalone"`. For local testing use `npm run dev`, or `npm run build` followed by `npm start`.

## Request flow

InvestorEnquiryModal sends a browser JSON POST to https://api.web3forms.com/submit. Web3Forms validates mandatory hCaptcha and spam checks before delivering to the configured mailbox.

Server-side submission requires a paid plan and server IP whitelisting. The free-plan production form uses the supported browser flow. The committed form access key is a public routing identifier, not an account API secret. Tokens reset after each attempt. Only HTTP success plus success: true clears the form.

Keep hCaptcha mandatory and the spam filter enabled in Web3Forms. Client validation, honeypot and duplicate-submit prevention supplement provider checks; they cannot establish identity. The Cloudflare contact-URL rate rule and optional Redis quotas apply only to the legacy server endpoint, not browser submissions. The legacy endpoint remains but is not used by this form.

Attachments require a paid plan, so visitors email them separately. No automatic retry is performed. A real CAPTCHA test and mailbox check are required to confirm delivery.

## Responsive checks

Check home, X40 and contact at phone, tablet and desktop widths, including the form and navigation. Mobile hero imagery uses contain with copy below it. The dialog scrolls within the dynamic viewport; inputs use 16px text to avoid mobile focus zoom.

References: [Web3Forms API](https://docs.web3forms.com/getting-started/api-reference), [hCaptcha](https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha).
