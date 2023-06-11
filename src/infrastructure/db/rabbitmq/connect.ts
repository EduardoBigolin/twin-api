import { Channel, Connection, Message, connect } from "amqplib";
import transporter from "../../../config/mail";

export default class RabbitmqServer {
  private conn!: Connection;
  private channel!: Channel;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async publishInQueue(queue: string, message: string) {
    return this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async consumeEmails(queue: string) {
    await this.channel.assertQueue(queue, { durable: true });

    const callback = async (message: Message | null) => {
      if (message) {
        const emailData = JSON.parse(message.content.toString());
        try {
          await transporter.sendMail(emailData);
          this.channel.ack(message);
        } catch (error) {
          console.error("Erro ao enviar e-mail:", error);
          this.channel.nack(message);
        }
      }
    };

    this.channel.consume(queue, callback);
  }
}
export const serverRabbitmq = new RabbitmqServer(
  "amqp://dev:senhadev@localhost"
);
