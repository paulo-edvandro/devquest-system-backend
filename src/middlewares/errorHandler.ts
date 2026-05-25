import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { ApiResponse } from '@/types/api';
import { config } from '@/config/config';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) {
  console.error('🚨 Error occurred:', {
    message: error.message,
    stack: config.server.env === 'development' ? error.stack : undefined,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Prisma database errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return res.status(409).json({
          success: false,
          error: 'Resource already exists',
          message: 'A record with this information already exists',
        });
      case 'P2025':
        return res.status(404).json({
          success: false,
          error: 'Resource not found',
          message: 'The requested resource could not be found',
        });
      case 'P2003':
        return res.status(400).json({
          success: false,
          error: 'Foreign key constraint failed',
          message: 'Related resource not found',
        });
      default:
        return res.status(400).json({
          success: false,
          error: 'Database error',
          message: 'A database error occurred',
        });
    }
  }

  // Zod validation errors
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: 'Validation error',
      message: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
    });
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid token',
      message: 'Authentication token is invalid',
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Token expired',
      message: 'Authentication token has expired',
    });
  }

  // Custom API errors
  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: error.message || 'Authentication required',
    });
  }

  if (error.name === 'ForbiddenError') {
    return res.status(403).json({
      success: false,
      error: 'Forbidden',
      message: error.message || 'Access denied',
    });
  }

  // Default server error
  return res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: config.server.env === 'development' 
      ? error.message 
      : 'Something went wrong on our end',
  });
}