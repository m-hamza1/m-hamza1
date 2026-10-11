import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // 1. Strict Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name (at least 2 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Please provide a message with at least 10 characters." },
        { status: 400 }
      );
    }

    const cleanName = escapeHtml(name.trim());
    const cleanEmail = escapeHtml(email.trim());
    const cleanSubject = subject && typeof subject === "string" ? escapeHtml(subject.trim()) : "New Project Inquiry";
    const cleanMessage = escapeHtml(message.trim()).replace(/\n/g, "<br/>");

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || smtpUser;

    if (!smtpUser || !smtpPass) {
      console.error("Missing SMTP credentials in environment variables.");
      return NextResponse.json(
        { success: false, error: "Server mail configuration is incomplete." },
        { status: 500 }
      );
    }

    // 2. Setup Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE !== "false",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // 3. Dispatch Email
    const mailOptions = {
      from: `"Portfolio Contact Form" <${smtpUser}>`,
      to: receiver,
      replyTo: email.trim(),
      subject: `[Portfolio Inquiry] ${cleanSubject} — from ${cleanName}`,
      text: `You have received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}\n\nTimestamp: ${new Date().toISOString()}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0c0e; color: #ffffff; padding: 24px; margin: 0; }
            .container { max-width: 600px; margin: 0 auto; background: #141417; border-radius: 12px; border: 1px solid #27272a; padding: 32px; }
            .badge { display: inline-block; padding: 4px 10px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; background: #27272a; color: #a1a1aa; border-radius: 9999px; margin-bottom: 20px; }
            h2 { color: #ffffff; margin-top: 0; font-size: 22px; font-weight: 600; }
            .field { margin-bottom: 18px; }
            .field-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #71717a; margin-bottom: 4px; }
            .field-value { font-size: 15px; color: #e4e4e7; line-height: 1.5; }
            .field-value a { color: #38bdf8; text-decoration: none; }
            .message-box { background: #09090b; border: 1px solid #27272a; border-radius: 8px; padding: 18px; margin-top: 20px; font-size: 15px; line-height: 1.6; color: #f4f4f5; }
            .footer { margin-top: 28px; padding-top: 20px; border-top: 1px solid #27272a; font-size: 12px; color: #52525b; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <span class="badge">Portfolio Inquiry</span>
            <h2>New Client Message</h2>
            <div class="field">
              <div class="field-label">Sender Name</div>
              <div class="field-value"><strong>${cleanName}</strong></div>
            </div>
            <div class="field">
              <div class="field-label">Email Address</div>
              <div class="field-value"><a href="mailto:${cleanEmail}">${cleanEmail}</a></div>
            </div>
            <div class="field">
              <div class="field-label">Subject</div>
              <div class="field-value">${cleanSubject}</div>
            </div>
            <div class="field">
              <div class="field-label">Message</div>
              <div class="message-box">${cleanMessage}</div>
            </div>
            <div class="footer">
              Sent via Ameer Hamza Portfolio Contact Form • ${new Date().toUTCString()}
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Error sending contact email via SMTP:", errorMsg);
    return NextResponse.json(
      { success: false, error: "Failed to send message. Please check connection or try again." },
      { status: 500 }
    );
  }
}
