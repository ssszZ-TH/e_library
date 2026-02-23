<script lang="ts">
  import { enhance } from '$app/forms';
  let { persons = [] } = $props();
</script>

<div class="overflow-hidden rounded-2xl border border-[#D4C3A3] bg-white shadow-sm">
  <table class="w-full text-left text-sm">
    <thead class="bg-[#F5EFE6] font-bold text-[#8D7B68]">
      <tr>
        <th class="px-6 py-4">ID Number</th>
        <th class="px-6 py-4">Full Name</th>
        <th class="px-6 py-4 text-right">Actions</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-[#F5EFE6]">
      {#each persons as person}
        <tr class="transition-colors hover:bg-[#FAF7F2]">
          <td class="px-6 py-4 font-mono text-[#4A3F35]">{person.personal_id_number}</td>
          <td class="px-6 py-4 text-[#4A3F35]">{person.fname} {person.lname}</td>
          <td class="px-6 py-4 text-right">
            <div class="flex justify-end gap-4">
              <a href="/persons/{person._id}" class="font-bold text-amber-800 hover:underline"
                >Edit</a
              >
              <form method="POST" action="?/delete" use:enhance>
                <input type="hidden" name="id" value={person._id} />
                <button
                  type="submit"
                  onclick={(e) => !confirm('Delete this person?') && e.preventDefault()}
                  class="font-bold text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </form>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
