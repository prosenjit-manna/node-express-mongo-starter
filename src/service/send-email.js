import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import { join } from "path";
import { appEnv } from "../env.js";

export async function sendEmail({ template, to, subject }, context) {
  // Configure SMTP transporter
  const transporter = nodemailer.createTransport({
    host: appEnv.SMTP_HOST, // e.g., 'smtp.gmail.com'
    port: appEnv.SMTP_PORT, // e.g., 587
    secure: appEnv.SMTP_SECURE, // Use true for port 465, false for others
    auth: {
      user: appEnv.SMTP_USER, // SMTP username
      pass: appEnv.SMTP_PASS, // SMTP password
    },
  });

  // Configure Handlebars for Nodemailer
  const handlebarsOptions = {
    viewEngine: {
      extname: ".hbs",
      layoutsDir: join(process.cwd(), "src", "view", "email"),
      defaultLayout: false,
    },
    viewPath: join(process.cwd(), "src", "view", "email"),
    extName: ".hbs",
  };

  transporter.use("compile", hbs(handlebarsOptions));

  const mailOptions = {
    from: appEnv.SMTP_FROM, // Sender address
    to: to, // Recipient address
    subject: subject, // Email subject
    template: template, // Template name (welcome.hbs)
    context: {
      frontend_url: appEnv.FRONTEND_URL,
      ...context
    }, // Email template variables
  };

  try {
    const response = await transporter.sendMail(mailOptions);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
