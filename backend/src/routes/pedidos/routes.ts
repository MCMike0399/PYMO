import { Router } from "express";
import * as pedidosCtrl from "./controller";

const router = Router();

router.get('/pedidos',pedidosCtrl.getPedidos);
router.post('/pedidos',pedidosCtrl.createPedido);
router.put("/pedidos",pedidosCtrl.actualizaEstado);

export default router;