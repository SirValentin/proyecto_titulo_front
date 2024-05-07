<template>
  <div class="flex">
    <!-- <ClientOnly>
      <Loading />
    </ClientOnly> -->
    <div class="w-12">
      <Navbar />
    </div>
    <main class="mx-4 my-5 w-full">
      <slot />
    </main>
  </div>
</template>
