import { Router } from "express";
import * as pedidosCtrl from "./controller";

const router = Router();

router.get('/pedidos',pedidosCtrl.getPedidos);
router.post('/pedidos',pedidosCtrl.createPedido);

export default router;