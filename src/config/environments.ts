import "dotenv/config";

export const environment = {
  port: parseInt(process.env.PORT as string),
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN as string,
  auth_user: process.env.AUTH_USER as string,
  auth_pass: process.env.AUTH_PASS as string,
  email_port: parseInt(process.env.EMAIL_PORT as string),
  email_host: process.env.EMAIL_HOST as string,
};
