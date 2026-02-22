import { connectDB } from '$lib/server/db';

// เชื่อมต่อ DB ทันทีที่ Server เริ่มทำงาน
connectDB();

export const handle = async ({ event, resolve }) => {
  return await resolve(event);
};
