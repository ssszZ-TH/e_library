import { getPersonLogs } from '$lib/server/controllers/persons.controller';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const logs = await getPersonLogs();
  return {
    logs: JSON.parse(JSON.stringify(logs))
  };
}) satisfies PageServerLoad;
