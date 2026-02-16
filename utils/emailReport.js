const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

// Load .env from project root
dotenv.config({ path: path.join(process.cwd(), '.env') });

async function sendEmailReport() {

  // Safety check
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    throw new Error('Email credentials are missing in .env file');
  }

  // Configure mail transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
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
sendEmailReport().catch(console.error);
