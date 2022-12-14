<template>
  <div class="card card-flush rounded-0" :class="className">
    <!--begin::Header-->
    <div class="card-header pt-5">
      <!--begin::Title-->
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold text-dark">Lorem</span>
        <span class="text-gray-400 mt-1 fw-semibold fs-6"
          >Lorem ipsum dolor sit</span
        >
      </h3>
      <!--end::Title-->
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-5">
      <template v-for="(item, i) in items" :key="i">
        <!--begin::Item-->
        <div class="d-flex flex-stack">
          <!--begin::Section-->
          <div class="text-gray-700 fw-semibold fs-6 me-2">
            {{ item.description }}
          </div>
          <!--end::Section-->

          <!--begin::Statistics-->
          <div class="d-flex align-items-senter">
            <span
              v-if="item.inc"
              class="svg-icon svg-icon-2 svg-icon-success me-2"
            >
              <inline-svg src="/media/icons/duotune/arrows/arr094.svg" />
            </span>

            <span v-else class="svg-icon svg-icon-2 svg-icon-danger me-2">
              <inline-svg src="/media/icons/duotune/arrows/arr093.svg" />
            </span>

            <!--begin::Number-->
            <span class="text-gray-900 fw-bolder fs-6">{{
              item.statistics
            }}</span>
            <!--end::Number-->
          </div>
          <!--end::Statistics-->
        </div>
        <!--end::Item-->

        <div
          v-if="items.length - 1 !== i"
          class="separator separator-dashed my-3"
        ></div>
      </template>
    </div>
    <!--end::Body-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";

export default defineComponent({
  name: "default-dashboard-widget-4",
  components: {
    Dropdown2,
  },
  props: {
    className: { type: String, required: false },
  },
  setup() {
    const items = [
      {
        description: "Lorem ipsum",
        statistics: "0.0",
        inc: true,
        number: "true",
      }
    ];

    return {
      items,
    };
  },
});
</script>
