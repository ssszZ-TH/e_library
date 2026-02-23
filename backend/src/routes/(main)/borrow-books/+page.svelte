<script lang="ts">
  import { enhance } from '$app/forms';
  import ErrorBox from '$lib/components/error_box.svelte';
  let { data, form } = $props();

  let selectedBookId = $state('');
  let isLoading = $state(false);

  // ค้นหาข้อมูลหนังสือที่เลือกเพื่อเอามาแสดง "จำนวนคงเหลือ"
  let selectedBook = $derived(data.books.find((b) => b._id === selectedBookId));
</script>

borrows book
<div class="mx-auto max-w-2xl space-y-8 text-[#4A3F35]">
  <header>
    <h2 class="text-3xl font-bold">Borrow Book 📖</h2>
    <p class="text-[#8D7B68]">Register a new book borrowing</p>
  </header>

  {#if form?.error}
    <ErrorBox message={form.error} />
  {/if}

  <form
    method="POST"
    use:enhance={() => {
      isLoading = true;
      return async ({ update }) => {
        await update();
        isLoading = false;
        selectedBookId = '';
      };
    }}
    class="space-y-6 rounded-2xl border border-[#D4C3A3] bg-white p-8 shadow-sm"
  >
    <div class="flex flex-col gap-2">
      <label class="text-xs font-bold text-[#8D7B68] uppercase">Member (Who is borrowing?)</label>
      <input
        list="persons-list"
        name="person_id"
        required
        placeholder="Type to search member name..."
        class="rounded-lg border border-[#D4C3A3] p-3 outline-[#8D7B68]"
      />
      <datalist id="persons-list">
        {#each data.persons as p}
          <option value={p._id}>{p.fname} {p.lname} ({p.personal_id_number})</option>
        {/each}
      </datalist>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-xs font-bold text-[#8D7B68] uppercase">Book Title</label>
      <select
        bind:value={selectedBookId}
        name="book_id"
        required
        class="rounded-lg border border-[#D4C3A3] p-3 outline-[#8D7B68]"
      >
        <option value="" disabled selected>Select a book</option>
        {#each data.books as b}
          <option value={b._id}>{b.title} — {b.writer} ({b.available} left)</option>
        {/each}
      </select>
      {#if selectedBook}
        <p class="text-xs font-bold text-green-700">
          Stock Available: {selectedBook.available} units
        </p>
      {/if}
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-xs font-bold text-[#8D7B68] uppercase">Borrow Duration (Days)</label>
      <input
        type="number"
        name="days"
        value="7"
        min="1"
        class="rounded-lg border border-[#D4C3A3] p-3 outline-[#8D7B68]"
      />
    </div>

    <button
      disabled={isLoading || (selectedBook && selectedBook.available <= 0)}
      class="w-full rounded-lg bg-[#8D7B68] py-4 font-bold text-white transition-all hover:bg-[#63564A] active:scale-[0.98] disabled:opacity-50"
    >
      {isLoading ? 'Processing...' : 'Confirm Borrowing'}
    </button>
  </form>
</div>
