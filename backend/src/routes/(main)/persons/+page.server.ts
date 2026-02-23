import { getPersons, createPerson, deletePerson } from '$lib/server/controllers/persons.controller';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load = (async () => {
  return {
    persons: await getPersons()
  };
}) satisfies PageServerLoad;

export const actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const personal_id_number = formData.get('personal_id_number') as string;
    const fname = formData.get('fname') as string;
    const lname = formData.get('lname') as string;

    try {
      await createPerson({ personal_id_number, fname, lname });
    } catch (e: any) {
      return fail(400, { error: e.message });
    }
  },
  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    await deletePerson(id);
  }
} satisfies Actions;
