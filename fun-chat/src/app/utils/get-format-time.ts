export function getFormatTime(seconds: number): string {
  const date: Date = new Date(seconds);
  const time: string = date.toLocaleTimeString('ru', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  return `${date.toLocaleDateString('ru')}, ${time}`;
}
