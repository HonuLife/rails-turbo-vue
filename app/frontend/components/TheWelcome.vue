<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import ToolingIcon from "./icons/IconTooling.vue";
import EcosystemIcon from "./icons/IconEcosystem.vue";
import CommunityIcon from "./icons/IconCommunity.vue";
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    <ul class="list-inside list-disc">
      <li>
        Vue’s
        <a
          class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
          target="_blank"
          href="https://vuejs.org/"
          >official documentation</a
        >
        provides you with all information you need to get started.
      </li>
      <li>
        Ruby on Rails'
        <a
          class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
          target="_blank"
          href="https://rubyonrails.org"
          >official documentation.</a
        >
      </li>
      <li>
        TailwindCSS'
        <a
          class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
          target="_blank"
          href="https://tailwindcss.com"
          >official documentation.</a
        >
      </li>
      <li>
        Vite Ruby's
        <a
          class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
          target="_blank"
          href="https://vite-ruby.netlify.app/"
          >official documentation.</a
        >
      </li>
    </ul>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>

    This project is served and bundled with
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      href="https://vitejs.dev/guide/features.html"
      target="_blank"
      >Vite</a
    >. The recommended IDE setup is
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      href="https://code.visualstudio.com/"
      target="_blank"
      >VSCode</a
    >
    +
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      href="https://github.com/johnsoncodehk/volar"
      target="_blank"
      >Volar</a
    >.

    <br />
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      target="_blank"
      href="https://pinia.vuejs.org/"
      >Pinia</a
    >,
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      target="_blank"
      href="https://vitest.dev/"
      >Vitest</a
    >, and
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      target="_blank"
      href="https://github.com/vuejs/devtools"
      >Vue Dev Tools</a
    >. If you need more resources, we suggest paying
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      target="_blank"
      href="https://github.com/vuejs/awesome-vue"
      >Awesome Vue</a
    >
    a visit.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    <h3 class="text-lg mt-2">Vue</h3>
    Ask your question on
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      target="_blank"
      href="https://chat.vuejs.org"
      >Vue Land</a
    >, the official Vue Discord server, or
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      target="_blank"
      href="https://stackoverflow.com/questions/tagged/vue.js"
      >StackOverflow</a
    >. You could also subscribe to
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      target="_blank"
      href="https://news.vuejs.org"
      >for the Vue mailing list</a
    >
    and follow the official
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      target="_blank"
      href="https://twitter.com/vuejs"
      >@vuejs</a
    >
    twitter account for latest news in the Vue world.
    <h3 class="text-lg mt-2">Rails</h3>
    Ask your questions on
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      target="_blank"
      href="https://discuss.rubyonrails.org"
      >Discourse</a
    >, the official Rails forums, or
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      target="_blank"
      href="https://stackoverflow.com/questions/tagged/rails"
      >StackOverflow</a
    >. You can also check out
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      href="https://gorails.com/"
      >GoRails</a
    >
    for screencasts and tutorials.
  </WelcomeItem>
</template>
