import { Schema } from "mongoose";

// اینجا یک اسکیما برای مدل ایجاد شده است اما خود اسکیما خالی است.
// {strict: true} به عنوان یک ویژگی در ایجاد اسکیما قرار گرفته است.
// اگرچه اسکیما خالی است، ویژگی strict: true باعث می‌شود که مونگوس از مدل تنها به عنوان
// یک مدل خواندنی استفاده شود و هر تغییر یا ورودی اضافه به سند مدل (مانند یک فیلد جدید)
// توسط مونگوس نادیده گرفته شود.
// این مفهوم برای مواقعی استفاده می‌شود که می‌خواهید از یک مدل فقط برای عملیات خواندنی استفاده کنید
// و نیازی به اعمال اسکیما یا اعتبارسنجی ندارید.
const mediaSchema = new Schema({}, { strict: true });

mediaSchema.pre("find", function (next) {
  this.select(["-like_count", "-play_count", "-comment_count", "-is_comment_disable"]);
  next();
});

export default mediaSchema;
