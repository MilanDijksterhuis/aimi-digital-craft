import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendWelcomeEmail(to: string, fullName: string, tempPassword: string) {
  const loginUrl = process.env.VITE_APP_URL
    ? `${process.env.VITE_APP_URL}/login`
    : "https://portal.aimi-development.nl/login";

  await transporter.sendMail({
    from: `"AIMI Backoffice" <${process.env.SMTP_USER ?? "backoffice@aimi-development.nl"}>`,
    to,
    subject: "Welkom bij AIMI — jouw inloggegevens",
    html: `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#0f0e0d;font-family:Inter,ui-sans-serif,system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0e0d;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#161717;border-radius:12px;border:1px solid #2a2b2b;overflow:hidden;">
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid #2a2b2b;">
              <span style="font-size:22px;font-weight:600;color:#ffffff;letter-spacing:-0.02em;">
                AIMI<span style="color:#fe2c02;">.</span>
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 40px;">
              <h1 style="margin:0 0 12px;font-size:24px;font-weight:600;color:#ffffff;letter-spacing:-0.02em;">
                Welkom, ${fullName}!
              </h1>
              <p style="margin:0 0 24px;font-size:15px;color:#9ca3af;line-height:1.6;">
                Je AIMI-account is aangemaakt. Hieronder vind je jouw tijdelijke inloggegevens.
                Wijzig je wachtwoord na je eerste inlog.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#1e1f1f;border-radius:8px;border:1px solid #2a2b2b;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:12px;">
                          <span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#8a8f98;">E-mailadres</span><br/>
                          <span style="font-size:15px;color:#ffffff;font-weight:500;">${to}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#8a8f98;">Tijdelijk wachtwoord</span><br/>
                          <span style="font-size:15px;color:#ffffff;font-weight:500;font-family:monospace;letter-spacing:0.05em;">${tempPassword}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td>
                    <a href="${loginUrl}"
                      style="display:inline-block;background:#ffffff;color:#0f0e0d;font-weight:600;font-size:14px;
                             text-decoration:none;padding:12px 28px;border-radius:9999px;letter-spacing:-0.01em;">
                      Inloggen →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:13px;color:#6b7280;line-height:1.6;">
                Heb je vragen? Mail naar
                <a href="mailto:sales@aimi-development.nl" style="color:#fe2c02;text-decoration:none;">sales@aimi-development.nl</a>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #2a2b2b;">
              <p style="margin:0;font-size:12px;color:#4a4b4b;">
                © ${new Date().getFullYear()} AIMI Digital Craft · Automatisch gegenereerde e-mail.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
    text: `Welkom bij AIMI, ${fullName}!\n\nE-mailadres: ${to}\nTijdelijk wachtwoord: ${tempPassword}\n\nLog in via: ${loginUrl}\n\nWijzig je wachtwoord na je eerste inlog.\n\nVragen? Mail naar sales@aimi-development.nl`,
  });
}
