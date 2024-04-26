import { Request, Response, NextFunction } from "express";

type AsyncFunction<T> = (...args: any[]) => Promise<T>;

/**
 * یک میدلور ایجاد می‌کند که خطاهای ایسینک توسط تابع مشخص شده را کنترل می‌کند.
 * @param - تابع ایسینکی که باید کنترل شود
 * @param - پارامترهای تابع ایسینک
 * @returns - یک میدلور Express ایسینک
 */
const guardController =
  <T>(asyncFunction: AsyncFunction<T>, ...params: any[]) =>
  /**
   * میان‌بر ناهمزمان Express که تابع ناهمزمان مشخص شده را اجرا می‌کند و خطاها را کنترل می‌کند.
   */
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await asyncFunction(...params, req, res, next);
    } catch (error) {
       
      console.error(
        `Error in controller ${asyncFunction.name}: ${
          (error as any)?.message || "NO MESSAGE"
        }`
      );
      next(error);
    }
  };

export default guardController;
