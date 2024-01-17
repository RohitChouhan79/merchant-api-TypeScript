import { Request, Response, NextFunction } from "express"
import Merchants from "../models/merchantModel";
import { catchAsyncErrors } from "../middleware/catchAsyncError";
import USER from "../models/userModel";




export const pageinatefilter = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    let fromdate: string = '01 01 2024';
    let todate: string = new Date().toISOString();
    let page: number = 1;
    let pageSize: number = 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (req.query.to) {
        todate = req.query.to as string;
    }
    if (req.query.from) {
        fromdate = req.query.from as string;
    }
    const merchantData: any = await Merchants.find();
    const filteredMerchants = merchantData.filter((e: any) => {
        const splitDate = e.createdAt.toLocaleDateString().split('/');
        const compDate = `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`;

        if (
            e.merchantName.toLowerCase().includes(req.query.merchantName as string) &&
            compDate >= todate &&
            compDate >= fromdate
        ) { return e; }
    });

    const paginatedMerchants = filteredMerchants.slice(startIndex, endIndex);

    res.json({
        success: true,
        data: paginatedMerchants,
    });


});


export const addmerchant= catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const merchant=await new Merchants(req.body).save()
    res.json({merchant})
});

export const editmerchant= catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const merchant=await new Merchants(req.body).save()
    res.json({merchant})
});


export const deletemerchants= catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    await Merchants.findByIdAndDelete(req.params.merchantid);
    res.status(200).json({
        sucess: true,
        message: " Delete Suceesfully",
        Merchants
    })
});

export const Detailmerchants= catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const user:any = await USER.findById(req.id).exec();
    const merchant = await Merchants.findById(req.params.merchantid).exec();
    user.merchants.push(merchant._id);
    merchant.user.push(user._id);
    await user.save()
    await merchant.save()
    res.status(201).json({ sucess: true, merchant })
});


export const filtermerchant= catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
   
    try {
        let fromdate: string = '01 01 2024';
        let todate: string = new Date().toISOString();
    
        if (req.query.to) {
          todate = req.query.to as string;
        }
        if (req.query.from) {
          fromdate = req.query.from as string;
        }
    
        const merchantData: any= await Merchants.find();
        const filteredMerchants = merchantData.filter((e:any) => {
          const splitDate = e.createdAt.toLocaleDateString().split('/');
          const compDate = `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`;
    
          return (
            e.merchantName.toLowerCase().includes(req.query.merchantName as string) &&
            compDate >= todate &&
            compDate >= fromdate
          );
        });
    
        res.json({
          success: true,
          data: filteredMerchants,
        });
      }
       catch (error:any) {
        res.status(500).json({
          success: false,
          error: error.message,
        })};


});
