<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { type Subscription } from "@rails/actioncable";
import consumer from "@/channels/consumer.ts";

type User = {
  id: number;
  email: string;
};

defineProps({
  users: {
    type: Array as () => User[],
    required: true,
  },
});

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
  <section class="w-full">
    <header class="flex justify-between">
      <h1 class="text-3xl">Users</h1>

      <a
        href="/users/csv_import_modal"
        class="bg-purple-500 hover:bg-purple-600 text-white py-1.5 px-3 font-medium whitespace-nowrap rounded"
        role="button"
        data-turbo-frame="modal"
      >
        Import Users from CSV
      </a>
    </header>


    <article class="mt-8">
      <ol v-if="users.length > 0" class="list-decimal list-inside">
        <li class="list-item" v-for="user in users" :key="user.id">
          <a
            class="text-purple-600 hover:text-purple-800 dark:hover:text-purple-300"
            :href="`/users/${user.id}`"
            >{{ user.email }}</a
          >
        </li>
      </ol>
      <div v-else>No users found</div>
    </article>
  </section>
</template>
