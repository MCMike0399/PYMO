import { Router } from "express";
import * as shippingCtrl from "./controller";

const router = Router();

router.get('/shipping',shippingCtrl.getShipping);
router.post("/shipping",shippingCtrl.createShipping);
router.put("/shipping",shippingCtrl.updateFechaEnvio);

export default router;