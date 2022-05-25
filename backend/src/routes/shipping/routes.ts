import { Router } from "express";
import * as shippingCtrl from "./controller";

const router = Router();

router.get('/shipping',shippingCtrl.getShipping);

export default router;