export const jwtConfig = {
  accessSecret: process.env.JWT_SECRET,
  refreshSecret: process.env.JWT_REFRESH_SECRET,

  accessExpires: process.env.ACCESS_TOKEN_EXPIRES,

  refreshExpires: process.env.REFRESH_TOKEN_EXPIRES,
};