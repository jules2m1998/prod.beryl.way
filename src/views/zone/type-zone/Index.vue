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
import { getAllTypeZone } from "@/core/services";

const getData = async () => {
  isLoading.value = true;
  const allTypeZones = await getAllTypeZone();
  if (allTypeZones) tableData.value = allTypeZones;
  else console.error("Error when fetch types zone !");
  isLoading.value = false;
};

onMounted(async () => {
  await getData();
});

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
