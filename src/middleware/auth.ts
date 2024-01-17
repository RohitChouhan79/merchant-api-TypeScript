import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { catchAsyncErrors } from './catchAsyncError';
import ErrorHandler from '../utils/errorHandler';
import dotenv from 'dotenv';
dotenv.config({path:"./.env"});

export const isAuthenticated = catchAsyncErrors(
  async (req:Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) {
      return next(new ErrorHandler('Please log in to access the resource', 401));
    }
    const JWT_SECRET_KEY:string=process.env.JWT_SECRET_KEY||"";
    try {
      const {id}= jwt.verify(token,JWT_SECRET_KEY) as {id:string};
      const ids =id;
      req.id =  id ; 
      res.json({ id, token });
      next();
    } catch (error) {
      return next(new ErrorHandler('Invalid token. Please log in again.', 401));
    }
  }
);