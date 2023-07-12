<template>
  <div class="flex mb-8">
    <i class="flex items-center content-center w-8 h-8 lg:rounded-lg">
      <slot name="icon"></slot>
    </i>
    <div class="flex flex-col ml-4">
      <h2 class="font-bold text-xl mb-3">
        <slot name="heading"></slot>
      </h2>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .item {
    margin-top: 1rem;
  }

  i {
    top: calc(50% - 25px);
  }

  .item:before {
    content: " ";
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: " ";
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
