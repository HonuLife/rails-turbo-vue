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
let importModal: HTMLDialogElement | null;

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

const closeModal = () => {
  importModal?.close();
};

const openModal = (e: Event) => {
  if (typeof e.target === "object" && e.target instanceof Element) {
    importModal = e.target.querySelector("dialog");
    importModal?.showModal();

    importModal
      ?.querySelector("button[data-action='modal#close']")
      ?.addEventListener("click", closeModal);
  }
};

onMounted(() => {
  subscription = createImportChannelSubscription();

  document.addEventListener("turbo:frame-render", openModal);
});

onBeforeUnmount(() => {
  subscription?.unsubscribe();
  document.removeEventListener("turbo:frame-render", openModal);
  importModal
    ?.querySelector("button[data-action='modal#close']")
    ?.removeEventListener("click", closeModal);
});
</script>

<template>
  <main>
    <h1>users/index</h1>

    <a
      href="/users/csv_import_modal"
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      role="button"
      data-turbo-frame="modal"
    >
      Import Users from CSV
    </a>

    <section class="mt-8">
      <ol v-if="users.length > 0" class="list-decimal list-inside">
        <li class="list-item" v-for="user in users" :key="user.id">
          <a :href="`/users/${user.id}`">{{ user.email }}</a>
        </li>
      </ol>
      <div v-else>No users found</div>
    </section>
  </main>
</template>
