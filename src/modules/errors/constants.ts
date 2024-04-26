// این ثابت‌ها برای کد خطاها در یک API مشخص شده‌اند
// انتخاب این کدها بر اساس استانداردهای HTTP و توصیه‌های عمومی برای معانی خطاهاست

export const ERROR_CODES = {
  // 404 به معنای "پیدا نشدن" در استاندارد HTTP است
  // 1 به عنوان پسوند استفاده می‌شود تا این خطا از خطاهای "پیدا نشدن" دیگر قابل تمییز باشد
  DOCUMENT_NOT_FOUND: 4041,

  ROUTE_NOT_FOUND: 4042,

  // 422 به معنای "نتواستن موجودیت" در استاندارد HTTP است که اغلب برای خطاهای اعتبارسنجی استفاده می‌شود
  // 1 به عنوان پسوند استفاده می‌شود تا این خطا از خطاهای اعتبارسنجی دیگر قابل تمییز باشد
  REQUEST_BODY_VALIDATION_ERROR: 4221,

  // 422 به معنای "نتواستن موجودیت" در استاندارد HTTP است که اغلب برای خطاهای اعتبارسنجی استفاده می‌شود
  // 2 به عنوان پسوند استفاده می‌شود تا این خطا از خطاهای اعتبارسنجی دیگر قابل تمییز باشد
  DOCUMENT_VALIDATION_ERROR: 4222,

  INTERNAL_ERROR: 5001,

  DOCUMENT_DUPLICATE_KEY_ERROR: 4091,

  INVALID_OBJECT_ID_ERROR: 4001,

  INVALID_PER_PAGE_ERROR: 4002,

  AUTH_API_KEY_ERROR: 4031,

  TIMEOUT_ERROR: 5041,

  BAD_FORM_DATA: 4003,
  BAD_JSON_DATA: 4004,
  INVALID_FILE: 4005,
};

export const MAX_PER_PAGE = 50;
