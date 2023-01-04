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
        {{ getI18nDate(customer.created_at).calendar() }}
      </template>
      <template v-slot:actions="{ row: customer }">
        <drop-down-menu name="Actions" :menu="menu">
          <template v-slot:update>
            <a @click="showDetail(customer.id)" class="menu-link px-3"
              >Détail</a
            >
          </template>
          <template v-slot:view>
            <router-link
              :to="{ name: 'zone-type-update', params: { id: customer.id } }"
              class="menu-link px-3"
              >Modifier</router-link
            >
          </template>
        </drop-down-menu>
      </template>
    </Datatable>
  </page-with-table>
  <my-loader v-else></my-loader>

  <zone-type-detail-modal
    :selector="selector"
    :type-zone="selectedItem"
  ></zone-type-detail-modal>
</template>

<script setup lang="ts">
import PageWithTable from "@/components/PageWithTable.vue";
import MyLoader from "@/components/Loader.vue";
import { ref, computed, onMounted } from "vue";
import type {  IZoneType } from "@/types";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import arraySort from "array-sort";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { searchByName } from "@/core/helpers/array";
import { highlightDetectedText } from "@/core/helpers/dom";
import { getAllTypeZone } from "@/core/services";
import { getI18nDate, openModal } from "@/core/helpers";
import DropDownMenu from "@/components/dropdown/DropDownMenu.vue";
import ZoneTypeDetailModal from "@/components/modals/general/ZoneTypeDetailModal.vue";

const getData = async () => {
  isLoading.value = true;
  const allTypeZones = await getAllTypeZone();
  if (allTypeZones) tableData.value = allTypeZones as IZoneType[];
  else console.error("Error when fetch types zone !");
  isLoading.value = false;
};

onMounted(async () => {
  await getData();
});

const selector = "detail-zone-type-modal";
const menu = ref<string[]>(["view", "update"]);

const tableData = ref<Array<IZoneType>>([]);
const isLoading = ref<boolean>(false);
const selectedItem = ref<IZoneType | undefined>(undefined);

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
  {
    columnName: "Actions",
    columnLabel: "actions",
    sortEnabled: false,
    columnWidth: 135,
  },
]);

const showDetail = (id: number) => {
  selectedItem.value = tableData.value.find((v) => id === v.id);
  if (selectedItem.value) openModal(selector);
};
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
