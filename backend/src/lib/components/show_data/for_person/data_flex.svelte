<script lang="ts">
  import { enhance } from '$app/forms';
  let { persons = [] } = $props();
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {#each persons as person}
    <div
      class="flex flex-col justify-between rounded-2xl border border-[#D4C3A3] bg-white p-5 shadow-sm transition-all hover:shadow-md"
    >
      <div>
        <span class="text-[10px] font-bold tracking-widest text-[#8D7B68] uppercase">Member ID</span
        >
        <p class="font-mono text-sm font-bold text-[#4A3F35]">{person.personal_id_number}</p>
        <h4 class="mt-3 text-lg font-bold text-[#4A3F35]">{person.fname} {person.lname}</h4>
      </div>

      <div class="mt-6 flex items-center justify-between border-t border-[#F5EFE6] pt-4">
        <a href="/persons/{person._id}" class="text-sm font-bold text-amber-800 hover:underline"
          >Edit Profile</a
        >
        <form method="POST" action="?/delete" use:enhance>
          <input type="hidden" name="id" value={person._id} />
          <button
            type="submit"
            onclick={(e) => !confirm('Delete this person?') && e.preventDefault()}
            class="text-sm font-bold text-red-600 hover:text-red-700"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  {/each}
</div>
