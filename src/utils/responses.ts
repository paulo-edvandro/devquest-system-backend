import { Response } from 'express';
import { ApiResponse, PaginatedResponse } from '@/types/api';

// Helper functions for consistent API responses

export function sendSuccess<T>(
  res: Response,
  data?: T,
  message?: string,
  statusCode: number = 200
): Response<ApiResponse<T>> {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
}

export function sendError(
  res: Response,
  error: string,
  message?: string,
  statusCode: number = 400
): Response<ApiResponse> {
  return res.status(statusCode).json({
    success: false,
    error,
    message,
  });
}

export function sendPaginatedResponse<T>(
  res: Response,
  data: T[],
  pagination: {
    page: number;
    limit: number;
    total: number;
  },
  message?: string
): Response<PaginatedResponse<T[]>> {
  const pages = Math.ceil(pagination.total / pagination.limit);
  
  return res.json({
    success: true,
    data,
    message,
    pagination: {
      ...pagination,
      pages,
      hasNext: pagination.page < pages,
      hasPrev: pagination.page > 1,
    },
  });
}

export function sendCreated<T>(
  res: Response,
  data: T,
  message: string = 'Resource created successfully'
): Response<ApiResponse<T>> {
  return sendSuccess(res, data, message, 201);
}

export function sendNotFound(
  res: Response,
  message: string = 'Resource not found'
): Response<ApiResponse> {
  return sendError(res, 'Not found', message, 404);
}

export function sendUnauthorized(
  res: Response,
  message: string = 'Authentication required'
): Response<ApiResponse> {
  return sendError(res, 'Unauthorized', message, 401);
}

export function sendForbidden(
  res: Response,
  message: string = 'Access denied'
): Response<ApiResponse> {
  return sendError(res, 'Forbidden', message, 403);
}

export function sendValidationError(
  res: Response,
  message: string
): Response<ApiResponse> {
  return sendError(res, 'Validation error', message, 400);
}

export function sendInternalError(
  res: Response,
  message: string = 'Internal server error'
): Response<ApiResponse> {
  return sendError(res, 'Internal error', message, 500);
}