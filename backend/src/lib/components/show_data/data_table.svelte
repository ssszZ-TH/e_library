<script>
  import { enhance } from '$app/forms';
  let { books = [] } = $props();
</script>

<div class="overflow-hidden rounded-2xl border border-[#D4C3A3] bg-white shadow-sm">
  <table class="w-full text-left text-sm">
    <thead class="bg-[#F5EFE6] text-xs font-bold tracking-widest text-[#8D7B68] uppercase">
      <tr>
        <th class="px-6 py-4">Title</th>
        <th class="px-6 py-4">Writer</th>
        <th class="px-6 py-4">Stock</th>
        <th class="px-6 py-4 text-right">Actions</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-[#F5EFE6]">
      {#each books as book}
        <tr class="transition-colors hover:bg-[#FAF7F2]">
          <td class="px-6 py-4 font-bold text-[#4A3F35]">{book.title}</td>
          <td class="px-6 py-4 text-[#63564A]">{book.writer}</td>
          <td class="px-6 py-4">
            <span class="rounded-full bg-[#E8DFCA] px-3 py-1 text-xs font-bold text-[#8D7B68]">
              {book.available} / {book.amount}
            </span>
          </td>
          <td class="px-6 py-4 text-right">
            <div class="flex justify-end gap-3">
              <a href="/books/{book._id}" class="font-bold text-amber-800 hover:text-amber-900"
                >Edit</a
              >
              <form method="POST" action="?/delete" use:enhance class="inline">
                <input type="hidden" name="id" value={book._id} />
                <button
                  type="submit"
                  onclick={(e) => {
                    if (!confirm('Are you sure?')) e.preventDefault();
                  }}
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
