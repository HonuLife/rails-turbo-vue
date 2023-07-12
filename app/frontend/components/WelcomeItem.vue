<template>
  <div class="flex mb-8">
    <i class="flex w-8 h-8 items-center justify-center lg:rounded-lg">
      <slot name="icon"></slot>
    </i>
    <div class="flex flex-col ml-4">
      <h2 class="font-bold text-2xl mb-3">
        <slot name="heading"></slot>
      </h2>
      <slot></slot>
    </div>
  </div>
</template>
