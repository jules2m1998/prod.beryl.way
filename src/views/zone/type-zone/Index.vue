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
      <template v-slot:level="{ row: typeZone }">
        <a href="#" class="text-gray-600 text-hover-primary mb-1">
          <span
            v-html="highlightDetectedText(typeZone.level, searchValue)"
          ></span>
        </a>
      </template>
      <template v-slot:created_at="{ row: customer }">
        <span
          v-html="highlightDetectedText(customer.created_at, searchValue)"
        ></span>
      </template>
    </Datatable>
  </page-with-table>
  <my-loader v-else></my-loader>
</template>

<script setup lang="ts">
import PageWithTable from "@/components/PageWithTable.vue";
import MyLoader from "@/components/Loader.vue";
import { ref, computed, onMounted } from "vue";
import type { IChart, IZoneType } from "@/types";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import arraySort from "array-sort";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { searchByName } from "@/core/helpers/array";
import { highlightDetectedText } from "@/core/helpers/dom";
import ApiService from "@/core/services/ApiService";
import type { IHttpResponse } from "@/types/https";

const getData = async () => {
  isLoading.value = true;
  try {
    ApiService.setHeader();
    const data = await ApiService.get("zone-type");
    const requests = data.data as IHttpResponse<IZoneType>;
    console.log(requests);
    tableData.value = requests.data as IZoneType[];
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await getData();
});

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
const tableData = ref<Array<IZoneType>>([]);
const isLoading = ref<boolean>(false);

const tableHeader = ref([
  {
    columnName: "Name",
    columnLabel: "name",
    sortEnabled: true,
    columnWidth: 175,
  },
  {
    columnName: "Level",
    columnLabel: "level",
    sortEnabled: true,
    columnWidth: 230,
  },
  {
    columnName: "Created at",
    columnLabel: "created_at",
    sortEnabled: true,
    columnWidth: 175,
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

// Filter logic
const searchValue = ref<string>("");

const arrayFind = computed(() =>
  searchByName(tableData.value, searchValue.value, ["id"])
);

const searchByText = (e: string) => {
  searchValue.value = e;
};
</script>
