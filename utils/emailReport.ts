import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from project root
dotenv.config({ path: path.join(process.cwd(), '.env') });

async function sendEmailReport(): Promise<void> {

  // Safety check
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    throw new Error('Email credentials are missing in .env file');
  }

  // Configure mail transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER as string,
      pass: process.env.EMAIL_APP_PASSWORD as string,
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: 'Vanij Automation Test Report',
    text: 'Playwright automation execution completed. Please find the attached report.',
    attachments: [
      {
        filename: 'Playwright_Report.html',
        path: path.join(process.cwd(), 'playwright-report/index.html'),
      },
    ],
  };

  // Send email
  await transporter.sendMail(mailOptions);

  console.log('✅ Test report email sent successfully');
}

// Execute
sendEmailReport().catch((error: unknown) => {
  console.error('❌ Failed to send email:', error);
});