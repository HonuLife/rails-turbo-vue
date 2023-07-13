<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { type Subscription } from "@rails/actioncable";
import consumer from "@/channels/consumer.ts";

let progress = ref(0);
let subscription: Subscription | null = null;

const createImportChannelSubscription = () => {
  return consumer.subscriptions.create("ImportUsersProgressChannel", {
    connected() {
      this.perform("get_progress");
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
  console.debug(subscription);
});

onBeforeUnmount(() => {
  console.debug("onBeforeUnmount");
  if (subscription) {
    subscription.unsubscribe();
  }
});
</script>

<template>
  <main>
    <h1>users/index</h1>

    <p>Progress: {{ progress }}%</p>
  </main>
</template>
