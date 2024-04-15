export function isMatch(text: string, template: string): boolean {
  for (let i: number = 0; i < template.length; i += 1) {
    if (text[i] !== template[i]) {
      return false;
    }
  }
  return true;
}
