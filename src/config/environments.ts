import "dotenv/config";

export const environment = {
  port: parseInt(process.env.PORT as string),
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN as string,
};
