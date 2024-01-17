import express, { Router } from 'express';
import { isAuthenticated } from '../middleware/auth';
import { pageinatefilter,filtermerchant,addmerchant,editmerchant,deletemerchants,Detailmerchants} from '../controllers/merchantController';
const router:Router=express.Router()

// get /api/merchants/filter

router.get('/merchants', pageinatefilter);

// get /api/merchants
router.get('/merchants/filter',filtermerchant);


// post api/merchants
router.post("/merchants",isAuthenticated, addmerchant)



//post  /api/merchants/Delete/:merchantid


router.post("/merchants/Delete/:merchantid",isAuthenticated, deletemerchants)
//post /api/merchants/:merchantid


router.post("/merchants/:merchantid",isAuthenticated, editmerchant)
// get /api/merchants/:merchantid
router.get("/merchants/:merchantid",isAuthenticated,Detailmerchants)
export=router;