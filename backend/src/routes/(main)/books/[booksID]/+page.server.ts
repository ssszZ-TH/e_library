import { updateBook } from '$lib/server/controllers/books.controller';
import BookModel from '$lib/server/models/books.model';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const book = await BookModel.findById(params.booksID).lean();
    if (!book) throw error(404, 'Book not found');
    return {
      book: JSON.parse(JSON.stringify(book))
    };
  } catch (e: any) {
    throw error(500, e.message);
  }
};

export const actions = {
  update: async ({ request, params }) => {
    const formData = await request.formData();
    const updates = {
      title: formData.get('title') as string,
      writer: formData.get('writer') as string,
      description: formData.get('description') as string,
      amount: Number(formData.get('amount')),
      available: Number(formData.get('available'))
    };

    if (updates.available > updates.amount) {
      return fail(400, { error: 'จำนวนที่เหลือ (Available) ห้ามมากกว่าจำนวนทั้งหมด (Amount)' });
    }

    try {
      const result = await updateBook(params.booksID, updates);
      if (!result) return fail(404, { error: 'ไม่พบหนังสือที่ต้องการอัปเดต' });
    } catch (e: any) {
      return fail(500, { error: e.message });
    }

    throw redirect(303, '/books');
  }
} satisfies Actions;
