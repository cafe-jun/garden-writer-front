export function dateChanger(dt: string | null) {
  if (!dt) {
    return null;
  }
  return dt.split(' ')[0];
}
