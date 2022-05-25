import { Router } from "express";
import * as entregasCtrl from "./controller";

const router = Router();

router.get('/entregas',entregasCtrl.getEntregas);

export default router;