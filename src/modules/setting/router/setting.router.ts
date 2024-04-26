import { Router } from "express";
import { getSettingController } from "../controller/getSetting.controller";
import { updateSettingController } from "../controller/updateSetting.controller";

const router = Router();
router.route("/").get(getSettingController).put(updateSettingController);

export default router;
