import { Router } from "express";
import {
  validator as getMediaListValidator,
  getMediaListController,
} from "../controllers/getMediaList.controller";
import { getMediaController } from "../controllers/getMedia.controller";

const router = Router();

router
  .route("/")
  .get(getMediaListValidator, getMediaListController)
router
  .route("/:id")
  .get(getMediaController)

export default router;

/*

*/