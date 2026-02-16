require('dotenv').config();
const nodemailer = require('nodemailer');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const mailOptions = {
  from: `"Playwright Automation" <${process.env.EMAIL_USER}>`,
  to: process.env.EMAIL_TO.split(',').map(e => e.trim()),
  subject: '✅ Authentication Automation – Allure Report',
  html: `
    <h2>Authentication Automation – Allure Report</h2>

    <p>The latest <b>Authentication Test Execution</b> has been completed.</p>

    <ul>
      <li>Email + OTP Login</li>
      <li>Email + Password Login</li>
      <li>Negative Login Scenarios</li>
    </ul>

    <p><b>📎 Allure report is attached.</b></p>

    <p>How to view:</p>
    <pre>
1. Rename file to allure-report.zip
2. Extract it
3. Open index.html in browser
    </pre>

    <br/>
    <p>Regards,<br/><b>QA Automation</b></p>
  `,
  attachments: [
    {
      filename: 'allure-report-allure.txt',
      path: path.resolve(__dirname, 'allure-report-allure.txt'),
    },
  ],
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('❌ Email sending failed:', error);
  } else {
    console.log('✅ Email sent successfully:', info.response);
  }
});
