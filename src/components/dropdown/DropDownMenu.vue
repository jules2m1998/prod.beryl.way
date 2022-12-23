<template>
  <div class="my-dropdown">
    <button
      @click.stop="toggleOpen"
      class="btn btn-sm btn-light btn-active-light-primary"
    >
      {{ props.name }}
      <span class="svg-icon svg-icon-5 m-0">
        <inline-svg src="/media/icons/duotune/arrows/arr072.svg" />
      </span>
    </button>
    <!--begin::Menu-->
    <div
      class="my-dropdown-menu menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4"
      :class="{ show: isOpen }"
    >
      <template v-for="(m, j) in props.menu" :key="j">
        <div class="menu-item px-3">
          <slot :name="`${m}`"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue";

interface Props {
  name: string;
  menu: string[];
}

const props = defineProps<Props>();

const isOpen = ref<boolean>(false);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

onMounted(() => {
  document.addEventListener("click", () => {
    isOpen.value = false;
  });
});

// menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4
</script>

<style lang="scss" scoped>
.my-dropdown {
  position: relative;

  &-menu {
    z-index: 105;
    position: absolute;
    inset: auto 0px 0px auto;
    margin: 0px;
  }
}
</style>
