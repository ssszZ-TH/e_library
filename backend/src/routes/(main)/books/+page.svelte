<script>
  import { enhance } from '$app/forms';
  import ErrorBox from '$lib/components/error_box.svelte';
  import ViewToggle from '$lib/components/switch/view_toddle.svelte';
  import DataFlex from '$lib/components/show_data/data_flex.svelte';
  import DataTable from '$lib/components/show_data/data_table.svelte';

  let { data, form } = $props();
  let isLoading = $state(false);
  let showFormError = $state(true);
  let currentView = $state('grid'); // 'grid' | 'table'

  // คำนวณยอดสรุป (Sum จาก Property ใน Array ของแต่ละเล่ม)
  let totalCount = $derived(data.books.reduce((sum, b) => sum + b.amount, 0));
  let availableCount = $derived(data.books.reduce((sum, b) => sum + b.available, 0));

  $effect(() => {
    if (form?.error) showFormError = true;
  });
</script>

<div class="space-y-8 text-[#4A3F35]">
  <header class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
    <div>
      <h2 class="text-3xl font-bold">Book Inventory</h2>
      <p class="text-[#8D7B68]">Manage your library collection</p>
    </div>

    <div class="flex items-center gap-4">
      <div
        class="flex items-center gap-2 rounded-xl border border-[#D4C3A3] bg-[#F5EFE6] p-1.5 shadow-sm"
      >
        <div class="flex flex-col px-4 py-1 text-center">
          <span class="text-[10px] font-bold tracking-widest text-[#8D7B68] uppercase">Total</span>
          <span class="text-lg leading-none font-black">{totalCount}</span>
        </div>
        <div class="h-8 w-[1px] bg-[#D4C3A3]"></div>
        <div class="flex flex-col px-4 py-1 text-center">
          <span class="text-[10px] font-bold tracking-widest text-[#8D7B68] uppercase"
            >In Stock</span
          >
          <span class="text-lg leading-none font-black text-green-700">{availableCount}</span>
        </div>
      </div>

      <ViewToggle bind:view={currentView} />
    </div>
  </header>

  {#if form?.error && showFormError}
    <ErrorBox message={form.error} onclose={() => (showFormError = false)} />
  {/if}

  <section class="rounded-2xl border border-[#D4C3A3] bg-[#F5EFE6] p-6 shadow-sm">
    <h3 class="mb-4 flex items-center gap-2 text-lg font-bold"><span>🍝</span> Add New Book</h3>
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
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      <input
        name="title"
        placeholder="Book Title"
        required
        class="rounded-lg border-[#D4C3A3] bg-white p-2.5 outline-[#8D7B68]"
      />
      <input
        name="writer"
        placeholder="Writer"
        required
        class="rounded-lg border-[#D4C3A3] bg-white p-2.5 outline-[#8D7B68]"
      />
      <input
        type="number"
        name="amount"
        placeholder="Total Amount"
        required
        min="0"
        class="rounded-lg border-[#D4C3A3] bg-white p-2.5 outline-[#8D7B68]"
      />
      <textarea
        name="description"
        placeholder="Description"
        required
        class="rounded-lg border-[#D4C3A3] bg-white p-2.5 outline-[#8D7B68] md:col-span-2 lg:col-span-1"
      ></textarea>
      <button
        disabled={isLoading}
        class="rounded-lg bg-[#8D7B68] font-bold text-white transition-all hover:bg-[#63564A] active:scale-[0.98] disabled:opacity-50"
      >
        {isLoading ? 'Saving...' : 'Add Book'}
      </button>
    </form>
  </section>

  {#if data.books.length === 0}
    <div
      class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D4C3A3] py-20 text-center"
    >
      <span class="text-4xl opacity-50">📚</span>
      <p class="mt-4 font-bold text-[#8D7B68]">No books found in the inventory.</p>
    </div>
  {:else if currentView === 'grid'}
    <DataFlex books={data.books} />
  {:else if currentView === 'table'}
    <DataTable books={data.books} />
  {:else}
    <p class="font-bold text-red-500">ERROR: Unknown data view {currentView}</p>
  {/if}
</div>
