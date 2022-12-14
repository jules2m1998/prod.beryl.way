<template>
    <div class="card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end rounded-0">

        <!--begin::Header-->
        <div class="card-header pt-5">
            <!--begin::Title-->
            <div class="card-title">
                {{ t(props.title) }}
            </div>
            <!--end::Title-->
        </div>
        <!--end::Header-->

        <!--begin::Card body-->
        <div class="card-body">
            <label for="disabledSelect" class="form-label">{{ t(props.label) }}</label>
            <select id="disabledSelect" class="form-select">
                <option v-for="(v, k) in filters" :key="k">{{ t(v) }}</option>
            </select>

            <apexchart type="bar" :options="options" :series="props.data"></apexchart>
        </div>
        <!--end::Card body-->
    </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import type VueApexCharts from "vue3-apexcharts";
import type { ApexOptions } from "apexcharts";

interface Props {
    title: string
    label: string
    data: any[]
}

const props = defineProps<Props>()

const { t } = useI18n();
const filters = [
    "byMonht",
    "byYear",
    "byWeek",
    "byDay"
]
let options = ref<ApexOptions>({
    colors:['#62567A', '#2FFA9E']
});
</script>