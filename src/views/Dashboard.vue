<template>
  <div class="grid mb-5">
    <Widget1 description="dolor sit amet consectetur" bgColor="#EF7B00" bgImage="/media/patterns/vector-1.png" />

    <Widget3 />

    <Widget2 :icon="false" stats="0" description="Lorem ipsum" labelColor="dark" textColor="gray-300" />

    <Widget4 />
  </div>

  <div class="row mb-5">
    <div class="col-6">
      <chart-filtered title="creditApplications" label="periodFilter" :data="creditApplicationChart" />
    </div>
    <div class="col-6">
      <chart-filtered title="unboardingRequest" label="periodFilter" :data="unboardingRequestChart" />
    </div>
  </div>

  <!--begin::Row-->
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">

    <!--begin::Col-->
    <div class="col-xl-4">
      <Widget9 className="h-lg-100" :height="300" />
    </div>
    <!--end::Col-->

    <!--begin::Col-->
    <div class="col-xl-8">
      <Widget10 className="h-md-100" />
    </div>
    <!--end::Col-->
  </div>

  <!--begin::Row-->
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">

    <!--begin::Col-->
    <div class="col-xl-4">
      <Widget9 className="h-lg-100" :height="300" />
    </div>
    <!--end::Col-->

    <!--begin::Col-->
    <div class="col-xl-8">
      <Widget10 className="h-md-100" />
    </div>
    <!--end::Col-->
  </div>

  <!--begin::Row-->
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">

    <!--begin::Col-->
    <div class="col-xl-4">
      <Widget9 className="h-lg-100" :height="300" />
    </div>
    <!--end::Col-->

    <!--begin::Col-->
    <div class="col-xl-8">
      <Widget10 className="h-md-100" />
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Widget1 from "@/components/dashboard-default-widgets/Widget1.vue";
import Widget2 from "@/components/dashboard-default-widgets/Widget2.vue";
import Widget3 from "@/components/dashboard-default-widgets/Widget3.vue";
import Widget4 from "@/components/dashboard-default-widgets/Widget4.vue";
import Widget5 from "@/components/dashboard-default-widgets/Widget5.vue";
import Widget6 from "@/components/dashboard-default-widgets/Widget6.vue";
import Widget7 from "@/components/dashboard-default-widgets/Widget7.vue";
import Widget8 from "@/components/dashboard-default-widgets/Widget8.vue";
import Widget9 from "@/components/dashboard-default-widgets/Widget9.vue";
import Widget10 from "@/components/dashboard-default-widgets/Widget10.vue";
import MixedWidget5 from "@/components/widgets/mixed/Widget5.vue";
import ChartFiltered from "@/components/query/ChartFiltered.vue"

export default defineComponent({
  name: "main-dashboard",
  components: {
    Widget1,
    Widget2,
    Widget3,
    Widget4,
    Widget5,
    Widget6,
    Widget7,
    Widget8,
    Widget9,
    Widget10,
    MixedWidget5,
    ChartFiltered
  },
  setup() {
    const className = ref("mb-5 mb-xl-10 col-md-3")
    const creditApplicationChart = ref([
      {
        name: 'Non traité',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      },
      {
        name: 'Traité',
        data: [10, 20, 50, 20, 60, 10, 20, 40]
      },
    ]);
    const unboardingRequestChart = ref([
      {
        name: 'series-1',
        data: [10, 60, 50, 70, 23, 60, 70, 23]
      },
      {
        name: 'series-2',
        data: [5, 46, 50, 20, 60, 10, 20, 40]
      },
    ]);

    return {
      className,
      creditApplicationChart,
      unboardingRequestChart
    }
  }
});
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: .5rem;

  @media screen and (max-width: 1226px) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
