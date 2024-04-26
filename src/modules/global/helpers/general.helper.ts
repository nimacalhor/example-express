export function isDev(): boolean {
  return process.env.NODE_ENV === "development";
}

/**
 * تابعی برای تغییر نام یک کلید مشخص در یک شیء به صورت مستقیم.
 *
 * @template T - نوع شیء که کلید در آن تغییر می‌کند.
 * @param {T} obj - شیء که کلید در آن تغییر می‌کند.
 * @param {keyof T} oldKey - نام فعلی کلید برای تغییر.
 * @param {string} newKey - نام جدید برای کلید.
 * @returns {void}
 *
 * @example
 * const myObject = { originalName: 'value' };
 * renameKey(myObject, 'originalName', 'newName');
 * console.log(myObject); // { newName: 'value' }
 */
export function renameKey<T>(obj: T, oldKey: keyof T, newKey: string): void {
  if (Object.prototype.hasOwnProperty.call(obj, oldKey)) {
    const updatedObject: T = { ...obj, [newKey]: obj[oldKey] };
    Object.assign(obj as any, updatedObject);
    delete obj[oldKey];
  }
}

/**
 * تابعی که یک پارامتر را به عدد تبدیل می‌کند.
 *
 * @param {string | number} input - پارامتر ورودی که ممکن است یک رشته یا یک عدد باشد.
 * @returns {number} - اگر پارامتر ورودی عدد بود، عدد را برمی‌گرداند. اگر رشته بود، تلاش می‌کند آن را به عدد تبدیل کند و در صورت موفقیت، عدد تبدیل شده را برمی‌گرداند. اگر پارامتر ورودی هیچکدام از این دو نبود، NaN یا یک مقدار متناسب با مورد استفاده خاص برمی‌گرداند.
 *
 * @example
 * const result1 = convertToNumber("42"); // result1 مقدار ۴۲ (عدد) خواهد بود
 * const result2 = convertToNumber(123);   // result2 مقدار ۱۲۳ (عدد) خواهد بود
 * const result3 = convertToNumber("abc"); // result3 مقدار NaN (عدد) خواهد بود
 */
export function convertToNumber(input: string | number): number {
  // If the input is already a number, return it
  if (typeof input === "number") {
    return input;
  }

  // If the input is a string, try to parse it to a number
  if (typeof input === "string") {
    const parsedNumber = parseFloat(input);
    if (!isNaN(parsedNumber)) {
      return parsedNumber;
    }
  }

  // If the input is neither a string nor a number, return NaN or handle accordingly
  return NaN;
}

export function getSubarray(array: any[], length: number) {
  const endIndex = Math.min(length, array.length);
  return array.slice(0, endIndex);
}

export function isArrayValid(arr: any, validateLength: boolean = true) {
  if (!arr) return false;
  if (!Array.isArray(arr)) return false;
  if (!validateLength) return true;
  if (arr.length === 0) return false;
  return true;
}
