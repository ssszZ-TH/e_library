import { createBorrowing } from '$lib/server/controllers/borrowings.controller';
import { getBooks } from '$lib/server/controllers/books.controller';
import { getPersons } from '$lib/server/controllers/persons.controller';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const [books, persons] = await Promise.all([getBooks(), getPersons()]);
  return {
    // กรองเอาเฉพาะเล่มที่ available > 0
    books: books.filter((b) => b.available > 0),
    persons
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const book_id = formData.get('book_id') as string;
    const person_id = formData.get('person_id') as string;
    const days = Number(formData.get('days') || 7);

    const expect_return_date = new Date();
    expect_return_date.setDate(expect_return_date.getDate() + days);

    try {
      await createBorrowing({ book_id, person_id, expect_return_date });
      return { success: true };
    } catch (e: any) {
      return fail(400, { error: e.message });
    }
  }
};
