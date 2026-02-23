<script lang="ts">
  import { formatThaiTime } from '$lib/utility/thai_time_format';
  let { logs = [] } = $props();
</script>

<div class="overflow-x-auto rounded-2xl border border-[#D4C3A3] bg-white shadow-sm">
  <table class="w-full min-w-[1000px] text-left text-sm">
    <thead class="bg-[#F5EFE6] font-bold text-[#8D7B68]">
      <tr>
        <th class="px-6 py-4">Action At (GMT+7)</th>
        <th class="px-6 py-4">Action</th>
        <th class="px-6 py-4">Title</th>
        <th class="px-6 py-4">Writer</th>
        <th class="px-6 py-4">Total/Avail</th>
        <th class="px-6 py-4">Description</th>
        <th class="px-6 py-4">Log ID</th>
        <th class="px-6 py-4">Ref ID</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-[#F5EFE6]">
      {#each logs as log}
        <tr class="transition-colors hover:bg-[#FAF7F2]">
          <td class="px-6 py-4 font-medium whitespace-nowrap text-[#4A3F35]"
            >{formatThaiTime(log.action_at)}</td
          >
          <td class="px-6 py-4">
            <span
              class="rounded-full px-3 py-1 text-[10px] font-black uppercase
              {log.action === 'create'
                ? 'bg-green-100 text-green-700'
                : log.action === 'update'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-red-100 text-red-700'}"
            >
              {log.action}
            </span>
          </td>
          <td class="px-6 py-4 font-bold text-[#4A3F35]">{log.data?.title || '-'}</td>
          <td class="px-6 py-4 text-[#63564A]">{log.data?.writer || '-'}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="font-bold text-[#4A3F35]">{log.data?.available ?? 0}</span>
            <span class="text-[#8D7B68]">/ {log.data?.amount ?? 0}</span>
          </td>
          <td class="px-6 py-4">
            <p class="max-w-[200px] truncate text-xs text-[#8D7B68]" title={log.data?.description}>
              {log.data?.description || '-'}
            </p>
          </td>
          <td class="px-6 py-4 font-mono text-[10px] text-blue-600">{log._id}</td>
          <td class="px-6 py-4 font-mono text-[10px] text-[#8D7B68]">{log.ref_id}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
