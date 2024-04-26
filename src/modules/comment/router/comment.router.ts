import { Router } from "express";
import {
  validator as getCommentListValidator,
  getCommentListController,
} from "../controllers/getCommentList.controller";
import { getCommentController } from "../controllers/getComment.controller";

const router = Router();

router.route("/").get(getCommentListValidator, getCommentListController);
router.route("/:id").get(getCommentController);

export default router;
