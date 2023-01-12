import nodemailer from "nodemailer";
import "dotenv/config";

//configurações nodemailer
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export { transport };
