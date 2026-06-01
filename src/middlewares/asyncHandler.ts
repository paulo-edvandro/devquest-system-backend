import { NextFunction, Request, Response } from "express";

type AsyncRouteHandler<Req extends Request = Request> = (
  req: Req,
  res: Response,
  next: NextFunction,
) => Promise<unknown> | unknown;

export function asyncHandler<Req extends Request = Request>(
  handler: AsyncRouteHandler<Req>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req as Req, res, next)).catch(next);
  };
}
