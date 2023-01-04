<template>
  <div class="d-flex flex-wrap justify-content-between">
    <apexchart v-for="(v, k) in props.charts" :key="k" v-bind="v"></apexchart>
  </div>
</template>

<script setup lang="ts">
import type { IChart } from "@/types";

interface Props {
  charts: IChart[];
}

const props = defineProps<Props>();
</script>

<style>
.flex-wrap {
  flex-wrap: wrap;
}
</style>
