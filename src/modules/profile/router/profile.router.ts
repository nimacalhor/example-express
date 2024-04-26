import { Router } from "express";
import {
  validator as getProfileListValidator,
  getProfileListController,
} from "../controllers/getProfileList.controller";
import { getProfileController } from "../controllers/getProfile.controller";

const router = Router();

router.route("/").get(getProfileListValidator, getProfileListController);
router.route("/:id").get(getProfileController);

export default router;
