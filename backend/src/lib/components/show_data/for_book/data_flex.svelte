<script>
  import { enhance } from '$app/forms';
  let { books = [] } = $props();
</script>

<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  {#each books as book}
    <div
      class="flex flex-col rounded-2xl border border-[#D4C3A3] bg-white p-5 shadow-sm transition-all hover:shadow-md"
    >
      <div class="mb-4 flex justify-between">
        <span class="text-xs font-bold tracking-widest text-[#8D7B68] uppercase">
          Available: {book.available}/{book.amount}
        </span>
        <a href="/books/{book._id}" class="text-sm font-bold text-amber-800 hover:underline">Edit</a
        >
      </div>
      <h4 class="text-xl font-bold text-[#4A3F35]">{book.title}</h4>
      <p class="text-sm text-[#63564A]">by {book.writer}</p>
      <p class="mt-3 line-clamp-2 flex-grow text-xs text-[#8D7B68]">{book.description}</p>

      <div class="mt-6">
        <form method="POST" action="?/delete" use:enhance class="w-full">
          <input type="hidden" name="id" value={book._id} />
          <button
            type="submit"
            onclick={(e) => {
              if (!confirm('Are you sure?')) e.preventDefault();
            }}
            class="w-full rounded-lg border border-red-200 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-50"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  {/each}
</div>
