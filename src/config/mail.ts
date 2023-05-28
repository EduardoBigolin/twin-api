import nodemailer from "nodemailer";

import { environment } from "./environments";

const transporter = nodemailer.createTransport({
  host: environment.email_host,
  port: environment.email_port,
  auth: {
    user: environment.auth_user,
    pass: environment.auth_pass,
  },
});
export default transporter;
