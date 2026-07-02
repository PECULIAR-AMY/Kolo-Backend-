import bcrypt from "bcrypt";
import prisma from "../config/db.js";
import { generateTokens,generateAccessToken, generateRefreshToken } from "../utils/generateTokens.js";
import ApiError from "../utils/ApiError.js";
import { comparePassword } from "../utils/comparePassword.js";

export const registerUser = async (data) => {
  const {
    fullName,
    fullname,
    full_name,
    full_Name,
    firstName,
    lastName,
    email,
    password,
  } = data;

  // 1. Check if user already exists
  const existingUser = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const resolvedFullName = (fullName || fullname || full_name || full_Name || `${firstName || ""} ${lastName || ""}`).trim();

  // 3. Create user
  const user = await prisma.users.create({
    data: {
      full_name: resolvedFullName,
      email,
      password_hash: hashedPassword,
    },
  });

  // 4. Generate JWT tokens
  const { accessToken, refreshToken } = generateTokens(user);

  // 5. Hash refresh token before storing
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

  // 6. Save hashed refresh token to user record
  await prisma.users.update({
    where: {
      id: user.id,
    },
    data: {
      refresh_token: hashedRefreshToken,
    },
  });

  // 7. Return response data
  return {
    user: {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      isEmailVerified: user.is_verified,
      createdAt: user.created_at,
    },
    accessToken,
    refreshToken,
  };
};

// Login 
export const loginUser = async ({ email, password }) => {
  // Find user
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Compare password
  const passwordMatches = await comparePassword(
    password,
    user.password_hash
  );

  if (!passwordMatches) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user);

  // Hash and save refresh token
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  await prisma.users.update({
    where: {
      id: user.id,
    },
    data: {
      refresh_token: hashedRefreshToken,
    },
  });

  return {
    user: {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      isEmailVerified: user.is_verified,
      createdAt: user.created_at,
    },
    accessToken,
    refreshToken,
  };
};