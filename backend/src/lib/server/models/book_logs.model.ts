import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookLogSchema = new Schema({
  ref_id: { type: Schema.Types.ObjectId, required: true },
  data: { type: Object, required: true },
  action: { type: String, required: true },
  action_at: { type: Date, default: Date.now }
});

export default mongoose.models.book_logs || mongoose.model('book_logs', BookLogSchema);
