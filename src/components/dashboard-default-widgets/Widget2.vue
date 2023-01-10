<template>
  <div class="card card-flush rounded-0" :class="className">
    <!--begin::Header-->
    <div class="card-header pt-5">
      <!--begin::Title-->
      <div class="card-title d-flex flex-column">
        <!--begin::Amount-->
        <span class="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">{{
          stats
        }}</span>
        <!--end::Amount-->

        <!--begin::Subtitle-->
        <span class="text-gray-400 pt-1 fw-semibold fs-6">{{
          description
        }}</span>
        <!--end::Subtitle-->
      </div>
      <!--end::Title-->
    </div>
    <!--end::Header-->

    <!--begin::Card body-->
    <div class="card-body d-flex flex-column justify-content-end pe-0">
      <!--begin::Title-->
      <span class="fs-6 fw-bolder text-gray-800 d-block mb-2">Lorem ipsum</span>
      <!--end::Title-->
    </div>
    <!--end::Card body-->
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "default-dashboard-widget-3",
  components: {},
  props: {
    stats: { type: String, required: true },
    description: { type: String, required: true },
    className: { type: String, required: false },
  },
  setup() {
    const profiles = [
      {
        name: "Alan Warden",
        initials: "A",
        state: "warning",
      },
      {
        name: "Michael Eberon",
        src: "/media/avatars/300-11.jpg",
      },
      {
        name: "Susan Redwood",
        initials: "S",
        state: "primary",
      },
      {
        name: "Melody Macy",
        src: "/media/avatars/300-2.jpg",
      },
      {
        name: "Perry Matthew",
        initials: "P",
        state: "danger",
      },
      {
        name: "Barry Walter",
        src: "/media/avatars/300-12.jpg",
      },
    ];

    return {
      profiles,
    };
  },
});
</script>
