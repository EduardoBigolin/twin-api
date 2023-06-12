import transporter from "../../../config/mail";
import { serverRabbitmq } from "../../../infrastructure/db/rabbitmq/connect";

interface createUserEmail {
  name: string;
  email: string;
  id: string;
}
interface IAuthenticatedUser {
  email: string;
  name: string;
}

export class HandleEmail {
  static async createUser(payLoad: createUserEmail) {
    const info = {
      from: "'support twin' <support@twin.com>",
      to: payLoad.email,
      subject: "Account created",
      text: "Your account has been created",
      html: `
      <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Confirmation</title>
</head>
<body>
  <table style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <tr>
      <td style="background-color: #f8f8f8; padding: 40px; text-align: center;">
        <h2>Email Confirmation</h2>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px;">
        <p>Dear ${payLoad.name},</p>
        <p>Thank you for signing up. Please click the button below to confirm your email address:</p>
        <table style="margin: 0 auto;">
          <tr>
            <td style="background-color: #4CAF50; border-radius: 5px; padding: 10px;">
              <a href="http://localhost:3000/api/user/verify/${payLoad.id}" style="color: #fff; text-decoration: none;">Confirm Email</a>
            </td>
          </tr>
        </table>
        <p>If you didn't sign up for this service, you can ignore this email.</p>
        <p>Best regards,</p>
        <p>Twin E-commerce</p>
      </td>
    </tr>
  </table>
</body>
</html>
`,
    };
    await serverRabbitmq.publishInQueue("EmailMessage", JSON.stringify(info));
    await serverRabbitmq.consumeEmails("EmailMessage");
  }
  static async authenticatedUser(payLoad: IAuthenticatedUser) {
    const info = await transporter.sendMail({
      from: "'support twin' <support@twin.com>",
      to: payLoad.email,
      subject: "Account created",
      text: "Your account has been created",
      html: `
      <b>Your account has been created</b>
      `,
    });
  }
}
