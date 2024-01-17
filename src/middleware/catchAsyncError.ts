import { RequestHandler } from "express";

export const catchAsyncErrors = (func: (req: any, res: any, next: any) => Promise<any>): RequestHandler => (req, res, next) =>
    Promise.resolve(func(req, res, next)).catch(next);