import { updatePerson, getPersons } from '$lib/server/controllers/persons.controller';
import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
  const persons = await getPersons();
  const person = persons.find((p) => p._id === params.personID);
  if (!person) throw error(404, 'Person not found');
  return { person };
}) satisfies PageServerLoad;

export const actions = {
  update: async ({ params, request }) => {
    const formData = await request.formData();
    const data = {
      personal_id_number: formData.get('personal_id_number') as string,
      fname: formData.get('fname') as string,
      lname: formData.get('lname') as string
    };
    await updatePerson(params.personID, data);
    throw redirect(303, '/persons');
  }
} satisfies Actions;
