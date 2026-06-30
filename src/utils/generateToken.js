import jwt from "jsonwebtoken";

import { jwtConfig } from "../config/jwt.js";

export function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    jwtConfig.accessSecret,
    {
      expiresIn: jwtConfig.accessExpires,
    }
  );
}

export function generateRefreshToken(user) {
  return jwt.sign(
    {
      id: user.id,
    },
    jwtConfig.refreshSecret,
    {
      expiresIn: jwtConfig.refreshExpires,
    }
  );
}