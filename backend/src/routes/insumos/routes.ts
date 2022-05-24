import { Router } from "express";
import * as insumosCtrl from "./controller";

const router = Router();

router.get('/insumos',insumosCtrl.getInsumos);

export default router;