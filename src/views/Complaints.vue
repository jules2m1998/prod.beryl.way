<template>
  <page-with-table
    :charts="charts"
    @search-items="searchByText"
    :value="tableData"
    :table-header="tableHeader"
    :selected-ids="selectedIds"
    v-if="!isLoading"
  >
    <Datatable
      @on-sort="sort"
      @on-items-select="onItemSelect"
      :data="arrayFind"
      :header="tableHeader"
      :enable-items-per-page-dropdown="true"
      checkbox-label="id"
    >
      <template v-slot:created_at="{ row: customer }">
        {{ getI18nDate(customer.created_at).format("ll") }}
      </template>
      <template v-slot:detail="{ row: customer }">
        {{ customer.detail }}
      </template>
      <template v-slot:first_transaction="{ row: customer }">
        {{ customer.first_transaction }}
      </template>
      <template v-slot:last_transaction="{ row: customer }">
        {{ customer.last_transaction }}
      </template>
      <template v-slot:name="{ row: customer }">
        {{ customer.name }}
      </template>
      <template v-slot:service="{ row: customer }">
        {{ customer.service.name }}
      </template>
      <template v-slot:user="{ row: customer }">
        <template v-if="customer.user_agency">
          {{ customer.user_agency.user.name }} ({{
            customer.user_agency.agency.name
          }})
        </template>
      </template>
      <template v-slot:actions="{ row: customer }">
        <a
          href="#"
          class="btn btn-sm btn-light btn-active-light-primary"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="top-end"
          >Actions
          <span class="svg-icon svg-icon-5 m-0">
            <inline-svg src="/media/icons/duotune/arrows/arr072.svg" />
          </span>
        </a>
        <!--begin::Menu-->
        <div
          class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4"
          data-kt-menu="true"
        >
          <!--begin::Menu item-->
          <div class="menu-item px-3">
            <router-link to="#" class="menu-link px-3">View</router-link>
          </div>
          <!--end::Menu item-->
          <!--begin::Menu item-->
          <div class="menu-item px-3">
            <a @click="searchItems(customer.id)" class="menu-link px-3"
              >Delete</a
            >
          </div>
          <!--end::Menu item-->
        </div>
        <!--end::Menu-->
      </template>
    </Datatable>
  </page-with-table>

  <loader v-else></loader>
</template>

<script setup lang="ts">
import PageWithTable from "@/components/PageWithTable.vue";
import { ref, computed, onMounted } from "vue";
import type { IChart, IComplaint } from "@/types";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import arraySort from "array-sort";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { searchByName } from "@/core/helpers/array";
import { getAllComplains } from "@/core/services";
import { getI18nDate } from "../core/helpers";
import Loader from "@/components/Loader.vue";

const charts = ref<IChart[]>([
  {
    type: "bar",
    series: [
      {
        name: "Non traité",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "Traité",
        data: [10, 20, 50, 20, 60, 10, 20, 40],
      },
    ],
    options: {
      title: {
        text: "Status",
      },
    },
  },
  {
    type: "area",
    options: {
      title: {
        text: "Demography",
      },
    },
    series: [
      {
        name: "Non traité",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "Traité",
        data: [10, 20, 50, 20, 60, 10, 20, 40],
      },
    ],
  },
  {
    type: "area",
    options: {
      title: {
        text: "Age",
      },
    },
    series: [
      {
        name: "Non traité",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "Traité",
        data: [10, 20, 50, 20, 60, 10, 20, 40],
      },
    ],
  },
  {
    type: "area",
    options: {
      title: {
        text: "Geography",
      },
    },
    series: [
      {
        name: "Non traité",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "Traité",
        data: [10, 20, 50, 20, 60, 10, 20, 40],
      },
    ],
  },
]);
const tableData = ref<Array<IComplaint>>([]);
const isLoading = ref<boolean>(false);

const tableHeader = ref([
  {
    columnName: "Created at",
    columnLabel: "created_at",
    sortEnabled: true,
    columnWidth: 175,
  },
  {
    columnName: "Detail",
    columnLabel: "detail",
    sortEnabled: true,
    columnWidth: 230,
  },
  {
    columnName: "First transaction",
    columnLabel: "first_transaction",
    sortEnabled: true,
    columnWidth: 175,
  },
  {
    columnName: "Last transaction",
    columnLabel: "last_transaction",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "Name",
    columnLabel: "name",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "Service",
    columnLabel: "service",
    sortEnabled: false,
    columnWidth: 225,
  },
  {
    columnName: "User",
    columnLabel: "user",
    sortEnabled: false,
    columnWidth: 225,
  },
  {
    columnName: "Actions",
    columnLabel: "actions",
    sortEnabled: false,
    columnWidth: 135,
  },
]);

const selectedIds = ref<Array<number>>([]);

const sort = (sort: Sort) => {
  const reverse: boolean = sort.order === "asc";
  if (sort.label) {
    arraySort(tableData.value, sort.label, { reverse });
  }
};

const onItemSelect = (selectedItems: Array<number>) => {
  selectedIds.value = selectedItems;
};

const searchItems = (selectedItems: Array<number>) => {
  selectedIds.value = selectedItems;
};

// Filter logic
const searchValue = ref<string>("");

const arrayFind = computed(() =>
  searchByName(tableData.value, searchValue.value, ["id"])
);

const searchByText = (e: string) => {
  searchValue.value = e;
};

onMounted(async () => {
  isLoading.value = true;
  const complains = await getAllComplains();
  if (complains) tableData.value = complains;
  isLoading.value = false;
});
</script>
