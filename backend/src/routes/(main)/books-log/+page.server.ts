import { getBookLogs } from '$lib/server/controllers/books.controller';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const logs = await getBookLogs();
  return {
    logs: JSON.parse(JSON.stringify(logs)) // Ensure Plain Old JavaScript Object
  };
}) satisfies PageServerLoad;
