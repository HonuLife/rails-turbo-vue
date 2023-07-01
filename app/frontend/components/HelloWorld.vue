<template>
  <div class="greetings">
    <h1>Welcome to the Rails + Vue experience! ⚡️</h1>
    <h3>
      This project is configured with:
      <a
        class="font-weight-600 text-red-400"
        target="_blank"
        href="https://rubyonrails.org/"
      >
        Ruby on Rails
      </a>
      +
      <a
        class="font-weight-600 text-yellow-400"
        target="_blank"
        href="https://vitejs.dev/"
      >
        Vite
      </a>
      +
      <a
        class="font-weight-600 text-green-400"
        target="_blank"
        href="https://vuejs.org/"
      >
        Vue 3
      </a>
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
