<script lang="ts">
  import { enhance } from '$app/forms';
  import ErrorBox from '$lib/components/error_box.svelte';
  import PersonTable from '$lib/components/show_data/for_person/data_table.svelte';
  import PersonFlex from '$lib/components/show_data/for_person/data_flex.svelte';
  import ViewToggle from '$lib/components/switch/view_toddle.svelte';

  let { data, form } = $props();
  let isLoading = $state(false);
  let currentView = $state('table'); // 'table' | 'grid'
</script>

<div class="space-y-8 text-[#4A3F35]">
  <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <h2 class="text-3xl font-bold">Person Management</h2>
      <p class="text-[#8D7B68]">Manage library members and staff</p>
    </div>
    <ViewToggle bind:view={currentView} />
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
        class="rounded-lg border-[#D4C3A3] bg-white p-2.5 outline-[#8D7B68]"
      />
      <input
        name="fname"
        placeholder="First Name"
        required
        class="rounded-lg border-[#D4C3A3] bg-white p-2.5 outline-[#8D7B68]"
      />
      <input
        name="lname"
        placeholder="Last Name"
        required
        class="rounded-lg border-[#D4C3A3] bg-white p-2.5 outline-[#8D7B68]"
      />
      <button
        disabled={isLoading}
        class="rounded-lg bg-[#8D7B68] font-bold text-white transition-all hover:bg-[#63564A] active:scale-[0.98] disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : 'Register Member'}
      </button>
    </form>
  </section>

  {#if data.persons.length === 0}
    <div
      class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D4C3A3] py-20 text-center text-[#8D7B68]"
    >
      <span class="text-4xl">👥</span>
      <p class="mt-4 font-bold">No members found.</p>
    </div>
  {:else if currentView === 'table'}
    <PersonTable persons={data.persons} />
  {:else}
    <PersonFlex persons={data.persons} />
  {/if}
</div>
