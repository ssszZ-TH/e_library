<script>
  import { enhance } from '$app/forms';
  import ErrorBox from '$lib/components/error_box.svelte';
  let { data, form } = $props();
  let book = data.book;
  let showFormError = $state(true);

  $effect(() => {
    if (form?.error) showFormError = true;
  });
</script>

<div class="mx-auto max-w-2xl text-[#4A3F35]">
  <a href="/books" class="mb-4 inline-block text-sm font-bold text-[#8D7B68] hover:underline"
    >← Back to Library</a
  >

  {#if form?.error && showFormError}
    <ErrorBox message={form.error} onclose={() => (showFormError = false)} />
  {/if}

  <div class="rounded-2xl border border-[#D4C3A3] bg-white p-8 shadow-lg">
    <h2 class="mb-6 text-2xl font-bold">Edit Book Details</h2>

    <form method="POST" action="?/update" use:enhance class="space-y-4">
      <div class="grid gap-2">
        <label class="text-sm font-bold text-[#63564A]" for="title">Book Title</label>
        <input
          id="title"
          name="title"
          value={book.title}
          required
          class="rounded-lg border-[#D4C3A3] p-2 focus:ring-2 focus:ring-[#8D7B68] focus:outline-none"
        />
      </div>

      <div class="grid gap-2">
        <label class="text-sm font-bold text-[#63564A]" for="writer">Writer</label>
        <input
          id="writer"
          name="writer"
          value={book.writer}
          required
          class="rounded-lg border-[#D4C3A3] p-2 focus:ring-2 focus:ring-[#8D7B68] focus:outline-none"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <label class="text-sm font-bold text-[#63564A]" for="amount">Total Amount</label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={book.amount}
            required
            class="rounded-lg border-[#D4C3A3] p-2 focus:ring-2 focus:ring-[#8D7B68] focus:outline-none"
          />
        </div>
        <div class="grid gap-2">
          <label class="text-sm font-bold text-[#63564A]" for="available">Available</label>
          <input
            id="available"
            type="number"
            name="available"
            value={book.available}
            required
            class="rounded-lg border-[#D4C3A3] p-2 focus:ring-2 focus:ring-[#8D7B68] focus:outline-none"
          />
        </div>
      </div>

      <div class="grid gap-2">
        <label class="text-sm font-bold text-[#63564A]" for="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          class="rounded-lg border-[#D4C3A3] p-2 focus:ring-2 focus:ring-[#8D7B68] focus:outline-none"
          >{book.description}</textarea
        >
      </div>

      <div class="flex gap-3 pt-4">
        <button
          type="submit"
          class="flex-1 rounded-lg bg-[#8D7B68] py-3 font-bold text-white transition-all hover:bg-[#63564A] active:scale-95"
        >
          Save Changes
        </button>
        <a
          href="/books"
          class="flex-1 rounded-lg border border-[#D4C3A3] py-3 text-center font-bold text-[#63564A] transition-all hover:bg-[#F5EFE6]"
        >
          Cancel
        </a>
      </div>
    </form>
  </div>
</div>
