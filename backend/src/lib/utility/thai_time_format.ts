export function formatThaiTime(dateStr: string | Date): string {
  // ใช้วิธีระบุ timeZone ใน Intl.DateTimeFormat เพื่อล็อค GMT+7 ไม่ว่า Server จะอยู่ที่ไหน
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const parts = formatter.formatToParts(new Date(dateStr));
  // console.log(parts);
  const p: Record<string, string> = {};
  parts.forEach(({ type, value }) => {
    p[type] = value;
  });

  return `${p.day}/${p.month}/${p.year} ${p.hour}:${p.minute}:${p.second}`;
}
