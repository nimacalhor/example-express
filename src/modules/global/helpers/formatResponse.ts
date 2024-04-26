interface ErrorResponse {
  errorMessage: string;
  errorCode: number;
}

type ResponseData = Record<string, any>;

/**
 * تولید یک پاسخ JSON استاندارد برای API REST.
 *
 * @function
 *
 * @param {"success" | "error"} status - وضعیت پاسخ (موفقیت آمیز یا خطا).
 * @param {ResponseData} data - داده‌های اصلی که در پاسخ قرار می‌گیرند.
 * @param {any | ErrorResponse} [additionalData] - داده‌های اضافی برای صفحه‌بندی یا جزئیات خطا (اختیاری).
 *
 * @returns {Record<string, any>} - پاسخ JSON تولید شده.
 *
 * @example
 * // مثال استفاده در یک کنترلر:
 * const successData = {
 *   user: {
 *     id: 123,
 *     username: "john_doe",
 *     email: "john.doe@example.com",
 *   },
 * };
 * const successResponse = formatRes("success", successData);
 * console.log(successResponse);
 */
function formatRes(
  status: "success" | "error",
  data: ResponseData,
  additionalData?: any | ErrorResponse
): Record<string, any> {
  const response: Record<string, any> = {
    ok: status === "success" ? true : false,
    status,
    data,
  };

  if (!additionalData) return response;

  if (status === "success") response.pagination = additionalData;
  else if (status === "error") response.errorDetails = additionalData;

  return response;
}

export default formatRes;
