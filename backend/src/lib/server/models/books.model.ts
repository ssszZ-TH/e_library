import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    writer: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    available: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.models.books || mongoose.model('books', BookSchema);
