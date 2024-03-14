export default function shuffleArr<T>(array: T[]): T[] {
  const arr: T[] = [...array];
  return arr.sort(() => Math.random() - 0.5);
}
