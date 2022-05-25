import { Router } from "express";
import * as pedidosCtrl from "./controller";

const router = Router();

router.get('/pedidos',pedidosCtrl.getPedidos);

export default router;