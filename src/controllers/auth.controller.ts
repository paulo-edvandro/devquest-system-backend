import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { config } from "@/config/config";
import { ApiResponse } from "@/types/api";
import { AuthResponse, RegisterDto, LoginDto } from "@/types/auth";
import { AuthenticatedRequest } from "@/middlewares/auth";

// Validation schemas
const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const authController = {
  async register(req: Request, res: Response<ApiResponse<AuthResponse>>) {
    try {
      const { email, displayName, password } = registerSchema.parse(req.body);

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: "User already exists",
          message: "A user with this email already exists",
        });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          displayName,
          passwordHash,
        },
        select: {
          id: true,
          email: true,
          displayName: true,
          xp: true,
          level: true,
        },
      });

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        config.auth.jwtSecret,
        {
          expiresIn: config.auth.jwtExpiresIn as jwt.SignOptions["expiresIn"],
        },
      );

      res.status(201).json({
        success: true,
        data: { user, token },
        message: "User registered successfully",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Validation error",
          message: error.errors.map((e) => e.message).join(", "),
        });
      }
      throw error;
    }
  },

  async login(req: Request, res: Response<ApiResponse<AuthResponse>>) {
    try {
      const { email, password } = loginSchema.parse(req.body);

      // Find user
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          displayName: true,
          passwordHash: true,
          xp: true,
          level: true,
        },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Invalid credentials",
          message: "Email or password is incorrect",
        });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.passwordHash);

      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          error: "Invalid credentials",
          message: "Email or password is incorrect",
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        config.auth.jwtSecret,
        {
          expiresIn: config.auth.jwtExpiresIn as jwt.SignOptions["expiresIn"],
        },
      );

      // Remove password hash from response
      const { passwordHash, ...userResponse } = user;

      res.json({
        success: true,
        data: { user: userResponse, token },
        message: "Login successful",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: "Validation error",
          message: error.errors.map((e) => e.message).join(", "),
        });
      }
      throw error;
    }
  },

  async getProfile(req: AuthenticatedRequest, res: Response<ApiResponse>) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: {
          id: true,
          email: true,
          displayName: true,
          xp: true,
          level: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: "User not found",
        });
      }

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      throw error;
    }
  },
};
