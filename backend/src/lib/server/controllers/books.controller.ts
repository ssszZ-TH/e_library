import BookModel from '../models/books.model';
import BookLogModel from '../models/book_logs.model';

export interface IBook {
  _id: string;
  title: string;
  writer: string;
  description: string;
  amount: number;
  available: number;
}

export async function createBook(data: Omit<IBook, '_id'>): Promise<IBook> {
  const book = await BookModel.create(data);
  const result = book.toObject({ flattenObjectIds: true }) as IBook;
  await BookLogModel.create({ ref_id: result._id, data: result, action: 'create' });
  return result;
}

export async function getBooks(): Promise<IBook[]> {
  const books = await BookModel.find();
  return books.map((b) => b.toObject({ flattenObjectIds: true })) as IBook[];
}

export async function updateBook(id: string, data: Partial<IBook>): Promise<IBook | null> {
  const book = await BookModel.findByIdAndUpdate(id, data, { new: true });
  if (book) {
    const result = book.toObject({ flattenObjectIds: true }) as IBook;
    await BookLogModel.create({ ref_id: id, data: result, action: 'update' });
    return result;
  }
  return null;
}

export async function deleteBook(id: string): Promise<IBook | null> {
  const book = await BookModel.findByIdAndDelete(id);
  if (book) {
    const result = book.toObject({ flattenObjectIds: true }) as IBook;
    await BookLogModel.create({ ref_id: id, data: result, action: 'delete' });
    return result;
  }
  return null;
}

export async function getBookLogs() {
  return await BookLogModel.find().sort({ action_at: -1 });
}
