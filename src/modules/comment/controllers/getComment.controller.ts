import Comment from "../model/comment.model";
import NotFError from "@errors/NotFoundError";
import type { Request, Response } from "express";
import guardController from "@errors/guardController";
import formatRes from "@global/helpers/formatResponse";

interface RType extends Request {
  params: {
    id: string;
  };
}

async function getComment(req: RType, res: Response) {
  const { id } = req.params;
  const comment = await Comment.findById(id);
  if (!comment) throw new NotFError(Comment, id);
  res.status(200).json(formatRes("success", { comment }));
}

export const getCommentController = guardController(getComment);
