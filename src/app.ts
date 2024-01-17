import dotenv from 'dotenv';
dotenv.config({path:"./.env"});

import express from 'express';
const app=express();

// Db connection
import { connectDatabase } from './models/Database';
connectDatabase()



// logger

import logger from 'morgan';
app.use(logger('tiny'));


// bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// sesion cookie parser
import session from 'express-session';
import cookieParser from 'cookie-parser';
app.use(
    session({
        resave:true,
        saveUninitialized:true,
        secret:process.env.EXPRESS_SESSION_SECRET || 'your-secret-key',
    })
)

app.use(cookieParser())


// Routes
import indexRoutes from './routes/indexRoutes';
import merchantRoute from './routes/merchantRoutes'

app.use('/',indexRoutes);
app.use('/api',merchantRoute)


// ErrorHandler

import ErrorHandler from './utils/errorHandler';
import { generatedErrors } from './middleware/error';



app.all("*",(req,res,next)=>{
    next (new ErrorHandler(`Requested URL NOT FOUND ${req.url}`,401));

})

app.use(generatedErrors)

// ....................................

const PORT= process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`);
})