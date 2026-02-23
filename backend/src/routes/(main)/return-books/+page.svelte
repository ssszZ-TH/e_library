<script lang="ts">
  import { enhance } from '$app/forms';
  import { formatThaiTime } from '$lib/utility/thai_time_format';
  let { data } = $props();
</script>

return book
<div class="space-y-8 text-[#4A3F35]">
  <header>
    <h2 class="text-3xl font-bold">Return Books 📥</h2>
    <p class="text-[#8D7B68]">Current active borrowings in the system</p>
  </header>

  <div class="overflow-x-auto rounded-2xl border border-[#D4C3A3] bg-white shadow-sm">
    <table class="w-full min-w-[900px] text-left text-sm">
      <thead class="bg-[#F5EFE6] font-bold text-[#8D7B68]">
        <tr>
          <th class="px-6 py-4">Borrow Date</th>
          <th class="px-6 py-4">Due Date</th>
          <th class="px-6 py-4">Member</th>
          <th class="px-6 py-4">Book Title</th>
          <th class="px-6 py-4 text-right">Action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-[#F5EFE6]">
        {#each data.borrowings as b}
          <tr class="hover:bg-[#FAF7F2]">
            <td class="px-6 py-4">{formatThaiTime(b.borrow_date)}</td>
            <td class="px-6 py-4 font-bold text-amber-900"
              >{formatThaiTime(b.expect_return_date)}</td
            >
            <td class="px-6 py-4">
              <span class="font-bold">{b.person_id?.fname} {b.person_id?.lname}</span>
              <p class="text-[10px] text-[#8D7B68]">{b.person_id?.personal_id_number}</p>
            </td>
            <td class="px-6 py-4 font-bold">{b.book_id?.title}</td>
            <td class="px-6 py-4 text-right">
              <form method="POST" action="?/return" use:enhance>
                <input type="hidden" name="id" value={b._id} />
                <button
                  onclick={(e) => !confirm('Confirm returning this book?') && e.preventDefault()}
                  class="rounded-lg bg-[#8D7B68] px-4 py-2 text-xs font-bold text-white hover:bg-[#63564A]"
                >
                  Return Book
                </button>
              </form>
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="5" class="py-20 text-center font-bold text-[#8D7B68]"
              >No books currently borrowed.</td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
