import Media from "../model/media.model";
import NotFError from "@errors/NotFoundError";
import type { Request, Response } from "express";
import guardController from "@errors/guardController";
import formatRes from "@global/helpers/formatResponse";

interface RType extends Request {
  params: {
    id: string;
  };
}

async function getMedia(req: RType, res: Response) {
  const { id } = req.params;
  const media = await Media.findById(id);
  if (!media) throw new NotFError(Media, id);
  res.status(200).json(formatRes("success", { media }));
}

export const getMediaController = guardController(getMedia)
