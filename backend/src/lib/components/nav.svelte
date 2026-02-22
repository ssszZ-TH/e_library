<script>
  let menuItems = [
    { name: 'Books', href: '/books' },
    { name: 'Borrow', href: '/borrow-books' },
    { name: 'Return', href: '/return-books' },
    { name: 'Members', href: '/persons' }
  ];
</script>

<nav class="sticky top-0 z-50 border-b border-[#D4C3A3] bg-[#F5EFE6]/90 backdrop-blur-md">
  <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
    <a href="#" class="flex items-center gap-3 transition-opacity hover:opacity-80">
      <div class="text-3xl">🍝</div>
      <div>
        <h1 class="text-lg leading-none font-bold tracking-tight text-[#4A3F35]">E LIBRARY</h1>
        <p class="mt-1 text-[10px] font-medium text-[#8D7B68]">
          Library Management System made by spaghetthi
        </p>
      </div>
    </a>

    <div class="hidden items-center gap-2 md:flex">
      {#each menuItems as item}
        <a
          href={item.href}
          class="rounded-lg px-4 py-2 text-sm font-semibold text-[#63564A] transition-all hover:bg-[#D4C3A3]/40 hover:text-[#4A3F35]"
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
  </div>
</nav>
