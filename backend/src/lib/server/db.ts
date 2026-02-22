import mongoose from 'mongoose';
import { MONGO_URL } from '$env/static/private'; // อย่าลืมใส่ใน .env

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(MONGO_URL);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
  }
}
