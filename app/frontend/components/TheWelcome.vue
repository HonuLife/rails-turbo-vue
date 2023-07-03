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
        Ruby on Rails
        <a
          class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
          target="_blank"
          href="https://rubyonrails.org"
          >official documentation.</a
        >
      </li>
      <li>
        Vue
        <a
          class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
          target="_blank"
          href="https://vuejs.org/"
          >official documentation</a
        >
      </li>
      <li>
        TailwindCSS
        <a
          class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
          target="_blank"
          href="https://tailwindcss.com"
          >official documentation.</a
        >
      </li>
      <li>
        Vite Ruby
        <a
          class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
          target="_blank"
          href="https://vite-ruby.netlify.app/"
          >official documentation.</a
        >
      </li>
      <li>
        Playwright Ruby API
        <a
          class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
          target="_blank"
          href="https://playwright-ruby-client.vercel.app/docs/api/page"
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

    This project is served in dev and bundled with
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      href="https://vitejs.dev/guide/features.html"
      target="_blank"
      >Vite</a
    >
    via
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      href="https://vite-ruby.netlify.app/"
      target="_blank"
      >Vite Ruby</a
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
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    <h3 class="text-lg mt-2 font-semibold">Rails</h3>

    Find docs on
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      target="_blank"
      href="https://chat.vuejs.org"
    >
      testing with RSpec</a
    >
    , and
    <a
      href="https://playwright-ruby-client.vercel.app/docs/api/pages/"
      target="_blank"
      >Playwright Ruby</a
    >. To set up authentication checkout the
    <a
      class="text-teal-700 hover:text-teal-500 dark:text-teal-200"
      href="https://github.com/heartcombo/devise/wiki"
      target="_blank"
      >Devise Wiki</a
    >.

    <h3 class="text-lg mt-2 font-semibold">Vue</h3>
    Get official tools and libraries for your project:
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
    >. If you need more resources, give
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

    <h3 class="text-lg mt-2 font-semibold">Rails</h3>
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

    <h3 class="text-lg mt-2 font-semibold">Vue</h3>
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
  </WelcomeItem>
</template>
