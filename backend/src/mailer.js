const nodemailer = require('nodemailer');

const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);

const transporter = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

async function notify(subject, html) {
  if (!transporter) {
    console.warn('[mailer] SMTP no configurado, se omite notificación:', subject);
    return;
  }

  const to = process.env.NOTIFY_TO || process.env.SMTP_USER;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  try {
    await transporter.sendMail({ from, to, subject, html });
  } catch (err) {
    console.error('[mailer] fallo al enviar notificación:', err.message);
  }
}

module.exports = { notify };
