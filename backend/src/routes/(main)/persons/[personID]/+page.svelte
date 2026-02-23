<script lang="ts">
  import { enhance } from '$app/forms';
  let { data } = $props();
  let isLoading = $state(false);
</script>

<div class="mx-auto max-w-2xl space-y-8 text-[#4A3F35]">
  <header>
    <a href="/persons" class="text-sm font-bold text-[#8D7B68] hover:underline">← Back to List</a>
    <h2 class="mt-2 text-3xl font-bold">Edit Profile</h2>
  </header>

  <form
    method="POST"
    action="?/update"
    use:enhance={() => {
      isLoading = true;
      return async ({ update }) => {
        await update();
        isLoading = false;
      };
    }}
    class="space-y-4 rounded-2xl border border-[#D4C3A3] bg-white p-8 shadow-sm"
  >
    <div class="flex flex-col gap-2">
      <label class="text-xs font-bold text-[#8D7B68] uppercase">Personal ID</label>
      <input
        name="personal_id_number"
        value={data.person.personal_id_number}
        required
        class="rounded-lg border-[#D4C3A3] p-2.5 outline-[#8D7B68]"
      />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="flex flex-col gap-2">
        <label class="text-xs font-bold text-[#8D7B68] uppercase">First Name</label>
        <input
          name="fname"
          value={data.person.fname}
          required
          class="rounded-lg border-[#D4C3A3] p-2.5 outline-[#8D7B68]"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-xs font-bold text-[#8D7B68] uppercase">Last Name</label>
        <input
          name="lname"
          value={data.person.lname}
          required
          class="rounded-lg border-[#D4C3A3] p-2.5 outline-[#8D7B68]"
        />
      </div>
    </div>
    <button
      disabled={isLoading}
      class="w-full rounded-lg bg-[#8D7B68] py-3 font-bold text-white transition-colors hover:bg-[#63564A]"
    >
      {isLoading ? 'Updating...' : 'Save Changes'}
    </button>
  </form>
</div>
