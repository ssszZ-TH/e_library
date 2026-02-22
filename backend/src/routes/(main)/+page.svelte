<script>
  // redirect to /books imediately
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  onMount(() => {
    goto('/books');
  });
</script>

<a href="/books">click me to redirect</a>
