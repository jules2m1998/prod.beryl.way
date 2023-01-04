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
      <template v-slot:full_name="{ row: onboard }">
        <span
          v-html="highlightDetectedText(onboard.full_name, searchValue)"
        ></span>
      </template>
      <template v-slot:surname="{ row: onboard }">
        <span
          v-html="highlightDetectedText(onboard.surname, searchValue)"
        ></span>
      </template>
      <template v-slot:father_name="{ row: onboard }">
        <span
          v-html="highlightDetectedText(onboard.father_name, searchValue)"
        ></span>
      </template>
      <template v-slot:mother_name="{ row: onboard }">
        <span
          v-html="highlightDetectedText(onboard.mother_name, searchValue)"
        ></span>
      </template>
      <template v-slot:matrimonial_status="{ row: onboard }">
        <span
          v-html="
            highlightDetectedText(onboard.matrimonial_status, searchValue)
          "
        ></span>
      </template>
      <template v-slot:date_of_birth="{ row: onboard }">
        <span
          v-html="highlightDetectedText(onboard.date_of_birth, searchValue)"
        ></span>
      </template>
      <template v-slot:delivery_date="{ row: onboard }">
        <span
          v-html="highlightDetectedText(onboard.delivery_date, searchValue)"
        ></span>
      </template>
      <template v-slot:delivery_number="{ row: onboard }">
        <span
          v-html="highlightDetectedText(onboard.delivery_number, searchValue)"
        ></span>
      </template>
      <template v-slot:profession="{ row: onboard }">
        <span
          v-html="highlightDetectedText(onboard.profession, searchValue)"
        ></span>
      </template>
      <template v-slot:employer="{ row: onboard }">
        <span
          v-html="highlightDetectedText(onboard.employer, searchValue)"
        ></span>
      </template>
      <template v-slot:monthly_revenue="{ row: onboard }">
        <span
          v-html="highlightDetectedText(onboard.monthly_revenue, searchValue)"
        ></span>
      </template>
      <template v-slot:residence="{ row: onboard }">
        <span
          v-html="highlightDetectedText(onboard.residence, searchValue)"
        ></span>
      </template>
      <template v-slot:card_holder_name="{ row: onboard }">
        <span
          v-html="highlightDetectedText(onboard.residence, searchValue)"
        ></span>
      </template>
      <template v-slot:principal_phone="{ row: onboard }">
        <span
          v-html="highlightDetectedText(onboard.principal_phone, searchValue)"
        ></span>
      </template>
      <template v-slot:email="{ row: onboard }">
        <span v-html="highlightDetectedText(onboard.email, searchValue)"></span>
      </template>
      <template v-slot:code="{ row: onboard }">
        <span v-html="highlightDetectedText(onboard.code, searchValue)"></span>
      </template>

      <template v-slot:actions="{ row: onboard }">
        <drop-down-menu name="Actions" :menu="menu">
          <template v-slot:view>
            <router-link
              :to="{ name: 'unboarding-detail', params: { id: onboard.id } }"
              class="menu-link px-3"
              >Afficher</router-link
            >
          </template>
        </drop-down-menu>
      </template>
    </Datatable>
  </page-with-table>
  <my-loader v-else></my-loader>
</template>

<script setup lang="ts">
import PageWithTable from "@/components/PageWithTable.vue";
import { ref, computed, onMounted } from "vue";
import type { IChart, IOnboard } from "@/types";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import arraySort from "array-sort";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { searchByName } from "@/core/helpers/array";
import { getAllOnboard } from "@/core/services";
import { highlightDetectedText } from "@/core/helpers/dom";
import DropDownMenu from "@/components/dropdown/DropDownMenu.vue";
import MyLoader from "@/components/Loader.vue";
import { successErrorColor } from "@/core/helpers";
import { RouterLink } from "vue-router";

const menu = ref<string[]>(["view"]);
const isLoading = ref<boolean>(false);

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
      colors: successErrorColor,
    },
  },
  {
    type: "area",
    options: {
      title: {
        text: "Demography",
      },
      colors: successErrorColor,
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
      colors: successErrorColor,
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
      colors: successErrorColor,
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
const tableData = ref<Array<IOnboard>>([]);

const tableHeader = ref([
  {
    columnName: "Nom complet",
    columnLabel: "full_name",
    sortEnabled: true,
    columnWidth: 175,
  },
  {
    columnName: "Surnom",
    columnLabel: "surname",
    sortEnabled: true,
    columnWidth: 230,
  },
  {
    columnName: "Nom du père",
    columnLabel: "father_name",
    sortEnabled: true,
    columnWidth: 175,
  },
  {
    columnName: "Nom de mère",
    columnLabel: "mother_name",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "Status matrimonial",
    columnLabel: "matrimonial_status",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "Date de naissance",
    columnLabel: "date_of_birth",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "Date de délivrance de la carte d'identité",
    columnLabel: "delivery_date",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "Delivery number",
    columnLabel: "delivery_number",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "Profession",
    columnLabel: "profession",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "employer",
    columnLabel: "employer",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "Revenus mensuels",
    columnLabel: "monthly_revenue",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "Résidence",
    columnLabel: "residence",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "card_holder_name",
    columnLabel: "card_holder_name",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "Numéro de téléphone (principal)",
    columnLabel: "principal_phone",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "Adresse email",
    columnLabel: "email",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "code",
    columnLabel: "code",
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

const showDetail = (id: number) => {};

onMounted(async () => {
  isLoading.value = true;
  const ob = await getAllOnboard();
  if (ob) tableData.value = ob;
  console.log(ob);
  isLoading.value = false;
});
</script>
