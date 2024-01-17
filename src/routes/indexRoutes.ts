import express, { Router } from 'express';
import {merchantsignup,merchantsignin,
    merchantsignout,merchantsession} from '../controllers/indexController';
import { isAuthenticated } from '../middleware/auth';
const router:Router=express.Router()



// Get /auth/signup
router.post("/auth/signup",merchantsignup)

// Get /auth/signup
router.post("/auth/login",merchantsignin)
//post /auth/logout
router.post("/auth/logout",isAuthenticated,merchantsignout)

//post /auth/session
router.get("/auth/session",isAuthenticated,merchantsession)

export=router;