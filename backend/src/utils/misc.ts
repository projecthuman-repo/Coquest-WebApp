export function getJson(str) {
  try {
    return JSON.parse(str);
  } catch {
    return "";
  }
}
