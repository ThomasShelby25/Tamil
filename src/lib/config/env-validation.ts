export const validateEnvironment = () => {
  const required = ["DATABASE_URL"];
  const optional = ["ADMIN_API_KEY", "RESEND_API_KEY", "RESEND_FROM_EMAIL"];

  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  const notSet = optional.filter((key) => !process.env[key]);
  if (notSet.length > 0) {
    console.warn(
      `Optional environment variables not set: ${notSet.join(", ")}`
    );
  }

  return {
    databaseConfigured: !!process.env.DATABASE_URL,
    adminAuthConfigured: !!process.env.ADMIN_API_KEY,
    emailServiceConfigured: !!process.env.RESEND_API_KEY,
  };
};
