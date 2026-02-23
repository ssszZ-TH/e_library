<script lang="ts">
  import { enhance } from '$app/forms';
  import ErrorBox from '$lib/components/error_box.svelte';
  let { data, form } = $props();
  let isLoading = $state(false);
</script>

<div class="space-y-8 text-[#4A3F35]">
  <header>
    <h2 class="text-3xl font-bold">Person Management</h2>
    <p class="text-[#8D7B68]">Manage library members and staff</p>
  </header>

  {#if form?.error}
    <ErrorBox message={form.error} />
  {/if}

  <section class="rounded-2xl border border-[#D4C3A3] bg-[#F5EFE6] p-6 shadow-sm">
    <h3 class="mb-4 text-lg font-bold">Add New Person</h3>
    <form
      method="POST"
      action="?/create"
      use:enhance={() => {
        isLoading = true;
        return async ({ update }) => {
          await update();
          isLoading = false;
        };
      }}
      class="grid grid-cols-1 gap-4 md:grid-cols-4"
    >
      <input
        name="personal_id_number"
        placeholder="ID Number"
        required
        class="rounded-lg border-[#D4C3A3] bg-white p-2.5"
      />
      <input
        name="fname"
        placeholder="First Name"
        required
        class="rounded-lg border-[#D4C3A3] bg-white p-2.5"
      />
      <input
        name="lname"
        placeholder="Last Name"
        required
        class="rounded-lg border-[#D4C3A3] bg-white p-2.5"
      />
      <button
        disabled={isLoading}
        class="rounded-lg bg-[#8D7B68] font-bold text-white hover:bg-[#63564A] disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : 'Register'}
      </button>
    </form>
  </section>

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
        {#each data.persons as person}
          <tr class="hover:bg-[#FAF7F2]">
            <td class="px-6 py-4 font-mono">{person.personal_id_number}</td>
            <td class="px-6 py-4">{person.fname} {person.lname}</td>
            <td class="flex justify-end gap-3 px-6 py-4 text-right">
              <a href="/persons/{person._id}" class="font-bold text-amber-800 hover:underline"
                >Edit</a
              >
              <form method="POST" action="?/delete" use:enhance>
                <input type="hidden" name="id" value={person._id} />
                <button
                  onclick={(e) => !confirm('Delete this person?') && e.preventDefault()}
                  class="font-bold text-red-600">Delete</button
                >
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
