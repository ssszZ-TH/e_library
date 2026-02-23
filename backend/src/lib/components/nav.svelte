<script>
  import { page } from '$app/state';
  let isOpen = $state(false);

  let menuItems = [
    { name: 'Books', href: '/books' },
    { name: 'Borrow', href: '/borrow-books' },
    { name: 'Return', href: '/return-books' },
    { name: 'Persons', href: '/persons' },
    { name: 'Books Log', href: '/books-log' },
    { name: 'Persons Log', href: '/persons-log' },
    { name: 'Borrow Log', href: '/borrows-log' }
  ];

  // Auto-close mobile menu on route change
  $effect(() => {
    page.url.pathname;
    isOpen = false;
  });
</script>

<nav class="sticky top-0 z-50 border-b border-[#D4C3A3] bg-[#F5EFE6]/90 backdrop-blur-md">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
    <a href="/" class="flex items-center gap-3 transition-opacity hover:opacity-80">
      <div class="text-3xl">🍝</div>
      <div>
        <h1 class="text-lg leading-none font-bold tracking-tight text-[#4A3F35]">E LIBRARY</h1>
        <p class="mt-1 text-[10px] font-medium text-[#8D7B68]">
          Library Management System made by spaghetthi
        </p>
      </div>
    </a>

    <!-- start ofDesktop Menu -->
    <div class="hidden items-center gap-2 md:flex">
      {#each menuItems as item}
        <a
          href={item.href}
          class="rounded-lg px-4 py-2 text-sm font-semibold text-[#63564A] transition-all hover:bg-[#D4C3A3]/40 hover:text-[#4A3F35] {page
            .url.pathname === item.href
            ? 'bg-[#D4C3A3]/60 text-[#4A3F35]'
            : ''}"
        >
          {item.name}
        </a>
      {/each}
      <div class="mx-4 h-6 w-[1px] bg-[#D4C3A3]"></div>
      <div
        class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#8D7B68] text-white shadow-sm hover:bg-[#63564A]"
      >
        <span class="text-xs font-bold">SC</span>
      </div>
    </div>
    <!-- end of desktop menu -->

    <!-- start of Mobile Menu -->
    <button
      onclick={() => (isOpen = !isOpen)}
      aria-label="Toggle Menu"
      class="flex h-10 w-10 items-center justify-center rounded-lg text-[#4A3F35] hover:bg-[#D4C3A3]/40 md:hidden"
    >
      {#if !isOpen}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      {:else}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      {/if}
    </button>
  </div>

  {#if isOpen}
    <div class="border-t border-[#D4C3A3] bg-[#F5EFE6] px-6 py-4 shadow-inner md:hidden">
      <div class="flex flex-col gap-2">
        {#each menuItems as item}
          <a
            href={item.href}
            class="rounded-lg px-4 py-3 text-base font-bold text-[#63564A] transition-all hover:bg-[#D4C3A3]/40 {page
              .url.pathname === item.href
              ? 'bg-[#D4C3A3]/60 text-[#4A3F35]'
              : ''}"
          >
            {item.name}
          </a>
        {/each}

        <div class="my-2 h-[1px] w-full bg-[#D4C3A3]"></div>

        <div class="flex items-center gap-3 px-4 py-2">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full bg-[#8D7B68] text-white"
          >
            <span class="text-xs font-bold">SC</span>
          </div>
          <span class="text-sm font-bold text-[#4A3F35]">Administrator</span>
        </div>
      </div>
    </div>
  {/if}
  <!-- end of mobile menu -->
</nav>
