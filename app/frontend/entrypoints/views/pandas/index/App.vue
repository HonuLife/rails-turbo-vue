<script setup lang="ts">
defineProps({
  pandas: {
    type: Array<{ name: string; age: string }>,
    required: true,
  },
});
</script>

<template>
  <main>
    <h1 class="text-2xl mb-2">Our Pandas</h1>

    <ul v-if="pandas.length > 0">
      <li v-for="panda in pandas" :key="panda.name">
        {{ panda.name }} is {{ panda.age }} years old
      </li>
    </ul>
    <div v-else>
      <p>No pandas found</p>
    </div>
  </main>
</template>
