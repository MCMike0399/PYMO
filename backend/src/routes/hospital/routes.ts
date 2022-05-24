import { Router } from "express";
import * as HospitalCtrl from "./controller";

const router = Router();

router.get('/hospital',HospitalCtrl.getHospitales);

export default router;