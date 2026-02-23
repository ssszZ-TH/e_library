<script lang="ts">
  import PersonLogTable from '$lib/components/show_data/for_person_log/data_table.svelte';
  let { data } = $props();
</script>

persons log
<div class="space-y-8 text-[#4A3F35]">
  <header>
    <h2 class="text-3xl font-bold">Person Logs</h2>
    <p class="text-[#8D7B68]">History of member and staff profile changes</p>
  </header>

  {#if data.logs.length === 0}
    <div
      class="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D4C3A3] py-20 text-center text-[#8D7B68]"
    >
      <span class="text-4xl">📜</span>
      <p class="mt-4 font-bold">No logs available.</p>
    </div>
  {:else}
    <PersonLogTable logs={data.logs} />
  {/if}
</div>
