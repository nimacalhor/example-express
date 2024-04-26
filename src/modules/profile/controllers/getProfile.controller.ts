import Profile from "../model/profile.model";
import NotFError from "@errors/NotFoundError";
import type { Request, Response } from "express";
import guardController from "@errors/guardController";
import formatRes from "@global/helpers/formatResponse";

interface RType extends Request {
  params: {
    id: string;
  };
}

async function getProfile(req: RType, res: Response) {
  const { id } = req.params;
  const profile = await Profile.findById(id);
  if (!profile) throw new NotFError(Profile, id);
  res.status(200).json(formatRes("success", { profile }));
}

export const getProfileController = guardController(getProfile)
