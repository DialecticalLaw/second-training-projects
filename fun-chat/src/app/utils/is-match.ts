export function isMatch(text: string, template: string): boolean {
  for (let i: number = 0; i < template.length; i += 1) {
    if (text[i] === undefined) return false;
    if (text[i].toUpperCase() !== template[i].toUpperCase()) {
      return false;
    }
  }
  return true;
}
