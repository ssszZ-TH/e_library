import { getBooks, createBook, deleteBook } from '$lib/server/controllers/books.controller';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    books: await getBooks()
  };
};

export const actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const writer = formData.get('writer') as string;
    const description = formData.get('description') as string;
    const amount = Number(formData.get('amount'));

    try {
      await createBook({
        title,
        writer,
        description,
        amount,
        available: amount
      });
    } catch (e: any) {
      return fail(500, { error: e.message });
    }
  },
  delete: async ({ request }) => {
    try {
      const formData = await request.formData();
      const id = formData.get('id') as string;
      const result = await deleteBook(id);
      if (!result) return fail(404, { error: 'ไม่พบหนังสือที่ต้องการลบ' });
    } catch (e: any) {
      return fail(500, { error: e.message });
    }
  }
} satisfies Actions;
