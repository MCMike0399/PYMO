import { Router } from "express";
import * as entregasCtrl from "./controller";

const router = Router();

router.get('/entregas',entregasCtrl.getEntregas);
router.put("/entregas",entregasCtrl.updateEntrega);

export default router;