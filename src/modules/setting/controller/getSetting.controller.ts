import type { Request, Response, NextFunction } from "express";
import Setting from "../model/setting.model";
import formatRes from "@global/helpers/formatResponse";
import guardController from "@errors/guardController";
import createDefaultSetting from "../model/createDefaultSetting";

async function getSetting(req: Request, res: Response) {
  let setting = await Setting.findOne({});
  // اگر هیچ سندی یافت نشود، تابع createDefaultSetting فراخوانی می‌شود تا تنظیمات پیش‌فرض ایجاد و ذخیره شود.
  if (!setting) setting = await createDefaultSetting();
  res.status(200).json(formatRes("success", { setting }));
}

export const getSettingController = guardController(getSetting);