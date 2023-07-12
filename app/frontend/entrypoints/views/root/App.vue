<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import TheWelcome from "@/components/TheWelcome.vue";
</script>

<template>
  <header class="mb-12 leading-6">
    <img
      alt="Vue logo"
      class="logo block"
      src="assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="flex flex-wrap place-items-start">
      <HelloWorld />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
.logo {
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
