import { Request, Response, NextFunction } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const timestamp = new Date().toISOString();
  
  // Log request
  console.log(`📥 ${timestamp} - ${req.method} ${req.originalUrl} - ${req.ip}`);
  
  // Log request body in development (excluding sensitive data)
  if (process.env.NODE_ENV === 'development' && req.body && Object.keys(req.body).length > 0) {
    const sanitizedBody = { ...req.body };
    
    // Remove sensitive fields
    delete sanitizedBody.password;
    delete sanitizedBody.passwordHash;
    delete sanitizedBody.token;
    
    if (Object.keys(sanitizedBody).length > 0) {
      console.log(`📄 Request body:`, JSON.stringify(sanitizedBody, null, 2));
    }
  }
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusIcon = res.statusCode >= 400 ? '❌' : '✅';
    
    console.log(`${statusIcon} ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });

  next();
}