import "dotenv/config";
import { z } from "zod";
import { Logger } from "@/utils/logger";

const logger = new Logger("Config:Env");

// Schema for environment variables
const envSchema = z.object({
  GROQ_API_KEY: z.string(),
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
  NEXT_PUBLIC_APP_URL: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),
});

// Function to validate environment variables
const validateEnv = () => {
  try {
    logger.info("Validating environment variables");
    const env = {
      GROQ_API_KEY: process.env.GROQ_API_KEY,
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: process.env.DATABASE_URL,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
      AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    };
    const parsed = envSchema.parse(env);
    logger.info("Environment variables validated successfully");
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => err.path.join("."));
      logger.error("Invalid environment variables", { error: { missingVars } });
      throw new Error(
        `❌ Invalid environment variables: ${missingVars.join(
          ", "
        )}. Please check your .env file`
      );
    }
    throw error;
  }
};

export const env = validateEnv();
