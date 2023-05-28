import transporter from "../../../config/mail";

interface createUserEmail {
  email: string;
  id: string;
}

export class HandleEmail {
  static async createUser(payLoad: createUserEmail) {
    const info = await transporter.sendMail({
      from: "'support twin' <support@twin.com>",
      to: payLoad.email,
      subject: "Account created",
      text: "Your account has been created",
      html: `<b>Your account has been created</b> <a href=http://localhost:3000/api/confirmUser/${payLoad.id}>Confirm your email</a>`,
    });
    console.log("Message sent: %s", info.messageId);
  }
}
