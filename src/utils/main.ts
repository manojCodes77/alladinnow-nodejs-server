export function convertBigIntToString(value: any): any {
  if (typeof value === "bigint") return value.toString();
  if (Array.isArray(value)) return value.map(convertBigIntToString);
  if (value && typeof value === "object") {
    const out: Record<string, any> = {};
    for (const k of Object.keys(value)) {
      out[k] = convertBigIntToString((value as any)[k]);
    }
    return out;
  }
  return value;
}