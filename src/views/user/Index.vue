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
      <template v-slot:name="{ row: customer }">
        <span v-html="highlightDetectedText(customer.name, searchValue)"></span>
      </template>
      <template v-slot:email="{ row: customer }">
        <a href="#" class="text-gray-600 text-hover-primary mb-1">
          <span
            v-html="highlightDetectedText(customer.email, searchValue)"
          ></span>
        </a>
      </template>
      <template v-slot:phone="{ row: customer }">
        <a href="#" class="text-gray-600 text-hover-primary mb-1">
          <span
            v-html="highlightDetectedText(customer.phone, searchValue)"
          ></span>
        </a>
      </template>
      <template v-slot:matricule="{ row: customer }">
        <a href="#" class="text-gray-600 text-hover-primary mb-1">
          <span
            v-html="highlightDetectedText(customer.matricule, searchValue)"
          ></span>
        </a>
      </template>
      <template v-slot:created_at="{ row: customer }">
        <a href="#" class="text-gray-600 text-hover-primary mb-1">
          <span
            v-html="highlightDetectedText(customer.created_at, searchValue)"
          ></span>
        </a>
      </template>
      <template v-slot:actions="{ row: customer }">
        <drop-down-menu name="Actions" :menu="menu">
          <template v-slot:update>
            <router-link
              :to="{ name: 'user-detail', params: { id: customer.id } }"
              class="menu-link px-3"
            >
              Detail
            </router-link>
          </template>
          <template v-slot:view>
            <router-link
              :to="{ name: 'user-update', params: { id: customer.id } }"
              class="menu-link px-3"
              >Modifier</router-link
            >
          </template>
        </drop-down-menu>
      </template>
    </Datatable>
  </page-with-table>
  <loader v-else></loader>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import arraySort from "array-sort";

import PageWithTable from "@/components/PageWithTable.vue";
import type { IChart, IUser } from "@/types";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import DropDownMenu from "@/components/dropdown/DropDownMenu.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { searchByName } from "@/core/helpers/array";
import { highlightDetectedText } from "@/core/helpers/dom";
import { getAllUsers } from "@/core/services";
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
const tableData = ref<Array<IUser>>([]);
const isLoading = ref<boolean>(false);
const menu = ref<string[]>(["view", "update"]);

const tableHeader = ref([
  {
    columnName: "Name",
    columnLabel: "name",
    sortEnabled: true,
    columnWidth: 175,
  },
  {
    columnName: "Email",
    columnLabel: "email",
    sortEnabled: true,
    columnWidth: 230,
  },
  {
    columnName: "Phone",
    columnLabel: "phone",
    sortEnabled: true,
    columnWidth: 175,
  },
  {
    columnName: "Matricule",
    columnLabel: "matricule",
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

onMounted(async () => {
  isLoading.value = true;
  const us = await getAllUsers();
  if (us) tableData.value = us;
  isLoading.value = false;
});
</script>
