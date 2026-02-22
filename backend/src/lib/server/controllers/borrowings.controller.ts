import BorrowingModel from '../models/borrowings.model';
import BookModel from '../models/books.model';
import BorrowingLogModel from '../models/borrowing_logs.model';

export interface IBorrowingRead {
  _id: string;
  book_id: string;
  person_id: string;
  borrow_date: Date;
  expect_return_date: Date;
}

export async function createBorrowing(
  data: Omit<IBorrowingRead, '_id' | 'borrow_date'>
): Promise<IBorrowingRead> {
  const book = await BookModel.findByIdAndUpdate(
    data.book_id,
    { $inc: { available: -1 } },
    { new: true }
  );
  if (!book || book.available < 0) throw new Error('Book not available');

  const borrowing = await BorrowingModel.create(data);
  const result = borrowing.toObject({ flattenObjectIds: true }) as IBorrowingRead;

  await BorrowingLogModel.create({
    book_id: result.book_id,
    person_id: result.person_id,
    borrow_date: result.borrow_date,
    action_at: new Date()
  });

  return result;
}

export async function deleteBorrowing(id: string): Promise<IBorrowingRead | null> {
  const borrowing = await BorrowingModel.findByIdAndDelete(id);
  if (!borrowing) return null;

  const result = borrowing.toObject({ flattenObjectIds: true }) as IBorrowingRead;

  await BookModel.findByIdAndUpdate(result.book_id, { $inc: { available: 1 } });

  await BorrowingLogModel.findOneAndUpdate(
    { book_id: result.book_id, person_id: result.person_id, real_return_date: null },
    { real_return_date: new Date(), action_at: new Date() },
    { sort: { borrow_date: -1 } }
  );

  return result;
}

export async function getActiveBorrowings(): Promise<IBorrowingRead[]> {
  return await BorrowingModel.find().populate('book_id').populate('person_id');
}

export async function getBorrowingLogs() {
  return await BorrowingLogModel.find().sort({ action_at: -1 });
}
