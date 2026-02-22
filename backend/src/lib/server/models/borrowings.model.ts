import mongoose from 'mongoose';
const { Schema } = mongoose;

const BorrowingSchema = new Schema({
  book_id: { type: Schema.Types.ObjectId, ref: 'books', required: true },
  person_id: { type: Schema.Types.ObjectId, ref: 'persons', required: true },
  borrow_date: { type: Date, default: Date.now },
  expect_return_date: { type: Date, required: true }
});

export default mongoose.models.borrowings || mongoose.model('borrowings', BorrowingSchema);
