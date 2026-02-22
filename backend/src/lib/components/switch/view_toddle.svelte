<script>
  let { view = $bindable('grid') } = $props();
</script>

<div class="inline-flex rounded-lg bg-[#E8DFCA] p-1 shadow-inner">
  <button
    onclick={() => (view = 'grid')}
    class="flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-bold transition-all {view ===
    'grid'
      ? 'bg-[#8D7B68] text-white shadow-sm'
      : 'text-[#8D7B68] hover:bg-[#D4C3A3]/30'}"
  >
    <span>Grid</span>
  </button>
  <button
    onclick={() => (view = 'table')}
    class="flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-bold transition-all {view ===
    'table'
      ? 'bg-[#8D7B68] text-white shadow-sm'
      : 'text-[#8D7B68] hover:bg-[#D4C3A3]/30'}"
  >
    <span>Table</span>
  </button>
</div>
