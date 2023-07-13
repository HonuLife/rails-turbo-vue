<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { type Subscription } from "@rails/actioncable";
import consumer from "@/channels/consumer.ts";

const progress = ref(null);
let subscription: Subscription | null = null;

const createImportChannelSubscription = () => {
  return consumer.subscriptions.create("ImportUsersProgressChannel", {
    connected() {
      console.log("connected");
    },
    disconnected() {
      console.log("disconnected");
    },
    received(data) {
      progress.value = data?.progress;
    },
  });
};

onMounted(() => {
  subscription = createImportChannelSubscription();
});

onBeforeUnmount(() => {
  subscription?.unsubscribe();
});
</script>

<template>
  <main>
    <h1>users/index</h1>

    <section v-if="progress !== null">
      <h2 class="text-xl">Import in progress</h2>
      <div class="w-full bg-neutral-200 dark:bg-neutral-600">
        <div
          class="bg-blue-400 p-0.5 text-center text-xs font-bold leading-none text-primary-100"
          :style="`width: ${progress}%`"
        >
          {{ progress }}%
        </div>
      </div>
    </section>
  </main>
</template>
