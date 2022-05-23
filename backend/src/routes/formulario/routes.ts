import { Router } from "express";
import * as formularioCtrl from "./controller";

const router = Router();

router.post('/formulario',formularioCtrl.createSolicitud);

export default router;