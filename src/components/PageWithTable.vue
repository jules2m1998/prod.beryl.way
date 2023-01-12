<template>
  <div class="mb-5 filter-charts" v-if="charts">
    <div class="card rounded-0">
      <div class="card-body">
        <label class="form-label" for="test">Title to filter</label>
        <select class="form-select" aria-label="Default select example">
          <option disabled>Open this select menu</option>
          <option value="1">Filter one</option>
          <option value="2">Filter two</option>
          <option value="3">Filter Three</option>
        </select>
      </div>
    </div>
    <div class="card rounded-0">
      <div class="card-body">
        <many-chart :charts="props.charts"></many-chart>
      </div>
    </div>
  </div>
  <div class="card rounded-0 pt-6">
    <div class="card-header border-0 pt-6">
      <div class="card-title" v-if="!isNotSearch">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <span class="svg-icon svg-icon-1 position-absolute ms-6">
            <inline-svg src="/media/icons/duotune/general/gen021.svg" />
          </span>
          <input
            type="text"
            v-model="search"
            @input="searchByText"
            class="form-control form-control-solid w-250px ps-15"
            placeholder="Search request..."
          />
        </div>
        <!--end::Search-->
      </div>

      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div
          v-if="selectedIds.length === 0"
          class="d-flex justify-content-end"
          data-kt-customer-table-toolbar="base"
        >
          <!--begin::Export-->
          <button
            type="button"
            class="btn btn-light-primary me-3"
            data-bs-toggle="modal"
            data-bs-target="#kt_customers_export_modal"
          >
            <span class="svg-icon svg-icon-2">
              <inline-svg src="/media/icons/duotune/arrows/arr078.svg" />
            </span>
            Export
          </button>
          <!--end::Export-->
        </div>
        <!--end::Toolbar-->
        <!--begin::Group actions-->
        <div
          v-else
          class="d-flex justify-content-end align-items-center"
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bold me-5">
            <span class="me-2">{{ selectedIds.length }}</span
            >Selected
          </div>
          <button
            type="button"
            class="btn btn-danger"
            @click="emit('deleteFewCustomers', selectedIds)"
          >
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
        <!--begin::Group actions-->
        <div
          class="d-flex justify-content-end align-items-center d-none"
          data-kt-customer-table-toolbar="selected"
        >
          <div class="fw-bold me-5">
            <span
              class="me-2"
              data-kt-customer-table-select="selected_count"
            ></span
            >Selected
          </div>
          <button
            type="button"
            class="btn btn-danger"
            data-kt-customer-table-select="delete_selected"
          >
            Delete Selected
          </button>
        </div>
        <!--end::Group actions-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ManyChart from "./chart/ManyChart.vue";
import type { IChart } from "@/types";

interface Props {
  charts?: IChart[];
  value: Array<any>;
  selectedIds: Array<number>;
  isNotSearch: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "searchItems", value: string): void;
  (e: "deleteFewCustomers", value: Array<number>): void;
  (e: "deleteCustomer", value: number): void;
}>();

const search = ref<string>("");
const searchByText = () => {
  emit("searchItems", search.value);
};
</script>

<style scoped lang="scss">
.filter-charts {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 0.5rem;
}
</style>
