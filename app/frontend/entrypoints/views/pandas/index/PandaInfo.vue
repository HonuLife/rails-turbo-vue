<script setup lang="ts">
defineProps({
  pandas: {
    type: Array<{ name: string; age: string }>,
    required: true,
  },
});
</script>

<template>
  <section class="mb-5">
    <h1 class="text-2xl mb-2">Our Pandas</h1>

    <article>
      <ul v-if="pandas.length > 0">
        <li v-for="panda in pandas" :key="panda.name">
          {{ panda.name }} is {{ panda.age }} years old
        </li>
      </ul>
      <p v-else class="mb-3">No pandas found</p>
    </article>
  </section>
</template>
