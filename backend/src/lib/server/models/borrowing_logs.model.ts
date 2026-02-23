import mongoose from 'mongoose';
const { Schema } = mongoose;

const BorrowingLogSchema = new Schema({
  book_id: { type: Schema.Types.ObjectId, required: true },
  person_id: { type: Schema.Types.ObjectId, required: true },
  borrow_date: { type: Date, required: true },
  real_return_date: { type: Date, default: null },
  action: { type: String, required: true, enum: ['borrow', 'return'] }, // Added action field
  action_at: { type: Date, default: Date.now }
});

export default mongoose.models.borrowing_logs ||
  mongoose.model('borrowing_logs', BorrowingLogSchema);
