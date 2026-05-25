import { Request, Response } from 'express';
import { ApiResponse } from '@/types/api';

export function notFoundHandler(req: Request, res: Response<ApiResponse>) {
  console.log(`🔍 Route not found: ${req.method} ${req.originalUrl}`);
  
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
}