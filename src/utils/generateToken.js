import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export const generateTokens = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(
    payload,
    jwtConfig.accessSecret,
    {
      expiresIn: jwtConfig.accessExpires,
    }
  );

  const refreshToken = jwt.sign(
    payload,
    jwtConfig.refreshSecret,
    {
      expiresIn: jwtConfig.refreshExpires,
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};