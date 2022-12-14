<template>
  <div class="card card-flush rounded-0" :class="className">
    <!--begin::Header-->
    <div class="card-header pt-5">
      <!--begin::Title-->
      <div class="card-title d-flex flex-column">
        <!--begin::Info-->
        <div class="d-flex align-items-center">
          <!--begin::Currency-->
          <span class="fs-4 fw-semibold text-gray-400 me-1 align-self-start"
            >XAF</span
          >
          <!--end::Currency-->

          <!--begin::Amount-->
          <span class="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">0.0</span>
          <!--end::Amount-->

          <!--begin::Badge-->
          <span class="badge badge-light-success fs-base">
            <span class="svg-icon-5 svg-icon-success ms-n1">
              <inline-svg src="/media/icons/duotune/arrows/arr066.svg" />
            </span>
            0.0%
          </span>
          <!--end::Badge-->
        </div>
        <!--end::Info-->

        <!--begin::Subtitle-->
        <span class="text-gray-400 pt-1 fw-semibold fs-6"
          >Lorem ipsum dolor sit amet.</span
        >
        <!--end::Subtitle-->
      </div>
      <!--end::Title-->
    </div>
    <!--end::Header-->

    <!--begin::Card body-->
    <div class="card-body pt-2 pb-4 d-flex flex-wrap align-items-center">

      <!--begin::Labels-->
      <div class="d-flex flex-column content-justify-center flex-row-fluid">
        <!--begin::Label-->
        <div class="d-flex fw-semibold align-items-center">
          <!--begin::Bullet-->
          <div class="bullet w-8px h-3px rounded-2 bg-success me-3"></div>
          <!--end::Bullet-->

          <!--begin::Label-->
          <div class="text-gray-500 flex-grow-1 me-4">Lorem ipsum</div>
          <!--end::Label-->

          <!--begin::Stats-->
          <div class="fw-bolder text-gray-700 text-xxl-end">XAF0,000</div>
          <!--end::Stats-->
        </div>
        <!--end::Label-->

        <!--begin::Label-->
        <div class="d-flex fw-semibold align-items-center my-3">
          <!--begin::Bullet-->
          <div class="bullet w-8px h-3px rounded-2 bg-primary me-3"></div>
          <!--end::Bullet-->

          <!--begin::Label-->
          <div class="text-gray-500 flex-grow-1 me-4">Lorem ipsum</div>
          <!--end::Label-->

          <!--begin::Stats-->
          <div class="fw-bolder text-gray-700 text-xxl-end">XAF0,000</div>
          <!--end::Stats-->
        </div>
        <!--end::Label-->
      </div>
      <!--end::Labels-->
    </div>
    <!--end::Card body-->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { getCSSVariableValue } from "@/assets/ts/_utils";

export default defineComponent({
  name: "default-dashboard-widget-2",
  components: {},
  props: {
    className: { type: String, required: false },
  },
  setup(props, { expose }) {
    onMounted(() => {
    });
  },
});
</script>
