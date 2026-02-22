<script>
  let { message, onclose } = $props();
</script>

<div
  class="mb-6 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-[#4A3F35]"
>
  <div class="flex items-center gap-3">
    <span class="text-xl">⚠️</span>
    <p class="text-sm font-medium">{message}</p>
  </div>
  <button
    onclick={onclose}
    class="rounded-lg p-1 text-red-600 transition-colors hover:bg-red-100"
    aria-label="Close error"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
</div>
