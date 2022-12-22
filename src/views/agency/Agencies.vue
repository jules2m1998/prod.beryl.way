<template>
  <page-with-table
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
      :checkbox-enabled="true"
      checkbox-label="id"
    >
      <template v-slot:name="{ row: customer }">
        <span v-html="highlightDetectedText(customer.name, searchValue)"></span>
      </template>
      <template v-slot:location="{ row: customer }">
        <a href="#" class="text-gray-600 text-hover-primary mb-1">
          <span
            v-html="highlightDetectedText(customer.location, searchValue)"
          ></span>
        </a>
      </template>
      <template v-slot:longitude="{ row: customer }">
        <span
          v-html="highlightDetectedText(customer.longitude, searchValue)"
        ></span>
      </template>
      <template v-slot:latitude="{ row: customer }">
        <span
          v-html="highlightDetectedText(customer.latitude, searchValue)"
        ></span>
      </template>
      <template v-slot:active="{ row: customer }">
        <span class="badge badge-success" v-if="customer.active">Active</span>
        <span class="badge badge-danger" v-else>Deactivate</span>
      </template>
      <template v-slot:created_at="{ row: customer }">
        <span
          v-html="highlightDetectedText(customer.created_at, searchValue)"
        ></span>
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
  <my-loader v-else></my-loader>
</template>

<script setup lang="ts">
import PageWithTable from "@/components/PageWithTable.vue";
import { ref, computed, onMounted } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import arraySort from "array-sort";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { searchByName } from "@/core/helpers/array";
import { highlightDetectedText } from "@/core/helpers/dom";
import MyLoader from "@/components/Loader.vue";
import type { IAgence } from "@/types";
import { getAllAgence } from "@/core/services";
import { RouterLink } from "vue-router";

const isLoading = ref<boolean>(false);
const tableData = ref<Array<IAgence>>([]);

const tableHeader = ref([
  {
    columnName: "Name",
    columnLabel: "name",
    sortEnabled: true,
    columnWidth: 175,
  },
  {
    columnName: "Location",
    columnLabel: "location",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "Longitude",
    columnLabel: "longitude",
    sortEnabled: true,
    columnWidth: 230,
  },
  {
    columnName: "Latitude",
    columnLabel: "latitude",
    sortEnabled: true,
    columnWidth: 175,
  },
  {
    columnName: "Active",
    columnLabel: "active",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "Created at",
    columnLabel: "created_at",
    sortEnabled: true,
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

// On mounted
onMounted(async () => {
  isLoading.value = true;
  const a = await getAllAgence();
  if (a) tableData.value = a;
  isLoading.value = false;
});
</script>
