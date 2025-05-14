export function formDataToObject(fd: FormData): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const key of fd.keys()) {
    const values = fd.getAll(key);
    result[key] = values.length === 1 ? values[0] : values;
  }
  return result;
}
