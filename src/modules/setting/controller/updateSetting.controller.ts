import { body } from "express-validator";
import Setting from "../model/setting.model";
import guardController from "@errors/guardController";
import formatRes from "@global/helpers/formatResponse";
import type { Request, Response, NextFunction } from "express";
import type { Setting as SettingType } from "../types/setting.type";
import validateRequest from "@errors/middlewares/validateRequest.mw";

interface RType extends Request {
  body: {
    setting: SettingType;
  };
}

async function updateSetting(req: RType, res: Response) {
  const { setting: updateData } = req.body;
  let newSetting = await Setting.findOneAndUpdate({}, updateData, {
    runValidators: true,
    new: true,
  });
  // در صورتی که تنظیمات به‌روزرسانی نشود (مثلاً چون وجود نداشته باشد)، یک نمونه جدید از تنظیمات ایجاد و ذخیره می‌شود.
  if (!newSetting) newSetting = await new Setting(updateData).save();
  res.status(202).json(formatRes("success", { newSetting }));
}

export const validator = [body("setting").isObject(), validateRequest];
export const updateSettingController = guardController(updateSetting);