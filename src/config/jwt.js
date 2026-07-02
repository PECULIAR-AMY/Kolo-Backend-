export const jwtConfig = {
  accessSecret: process.env.JWT_SECRET?.trim(),
  refreshSecret: process.env.JWT_REFRESH_SECRET?.trim(),

  accessExpires: process.env.ACCESS_TOKEN_EXPIRES || "15m",

  refreshExpires: process.env.REFRESH_TOKEN_EXPIRES || process.env.JWT_EXPIRES_IN || "7d",
};