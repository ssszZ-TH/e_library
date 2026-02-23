import {
  getActiveBorrowings,
  deleteBorrowing
} from '$lib/server/controllers/borrowings.controller';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const activeBorrowings = await getActiveBorrowings();
  return {
    // ต้องแปลงข้อมูลที่ populate มาให้เรียบร้อย
    borrowings: JSON.parse(JSON.stringify(activeBorrowings))
  };
}) satisfies PageServerLoad;

export const actions: Actions = {
  return: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    try {
      await deleteBorrowing(id);
      return { success: true };
    } catch (e: any) {
      return fail(400, { error: e.message });
    }
  }
};
