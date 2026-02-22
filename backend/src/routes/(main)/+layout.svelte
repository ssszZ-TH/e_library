<script>
  import Nav from '$lib/components/nav.svelte';
  import Footer from '$lib/components/footer.svelte';
  let { children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-[#FDFBF9] font-sans selection:bg-[#D4C3A3]">
  <Nav />

  <main class="mx-auto w-full max-w-7xl flex-grow px-6 py-10">
    {@render children()}
  </main>

  <Footer />
</div>
