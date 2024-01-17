import { Response } from "express";

export const sendtokens = (user:any, statusCode:number, res:Response): void => {
    const token: string = user.getJwtToken();
  
    const options = {
      expires: new Date(
        Date.now() + (process.env.COOKIE_EXPIRE ? parseInt(process.env.COOKIE_EXPIRE) : 1) * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    //   secure: true,
    };
  
    res.status(statusCode).cookie('token', token, options).json({ success: true, id: user._id, token });
  };