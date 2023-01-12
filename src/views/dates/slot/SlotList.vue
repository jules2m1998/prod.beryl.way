<template>
  <page-with-table
    @search-items="searchByText"
    :value="tableData"
    :table-header="tableHeader"
    :selected-ids="selectedIds"
    :is-not-search="true"
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
      <template v-slot:date="{ row: slot }">
        {{ getI18nDate(slot.date).format("ll") }}
      </template>
      <template v-slot:period="{ row: slot }">
        {{ displayTimes(slot.values) }}
      </template>
      <template v-slot:created_at="{ row: slot }">
        {{ getI18nDate(slot.created_at).fromNow() }}
      </template>

      <template v-slot:actions="{ row: onboard }">
        <drop-down-menu name="Actions" :menu="menu">
          <template v-slot:view>
            <router-link
              :to="{ name: 'unboarding-detail', params: { id: onboard.id } }"
              class="menu-link px-3"
              >Afficher
            </router-link>
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
import type { ISlot, ISlotPeriod } from "@/types";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import arraySort from "array-sort";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { searchByName } from "@/core/helpers/array";
import { getAllSlots } from "@/core/services";
import DropDownMenu from "@/components/dropdown/DropDownMenu.vue";
import MyLoader from "@/components/Loader.vue";
import { getI18nDate } from "@/core/helpers";
import { RouterLink } from "vue-router";

const menu = ref<string[]>(["view"]);
const isLoading = ref<boolean>(false);

const tableData = ref<Array<ISlot>>([]);

const tableHeader = ref([
  {
    columnName: "Date",
    columnLabel: "date",
    sortEnabled: true,
    columnWidth: 175,
  },
  {
    columnName: "Period",
    columnLabel: "period",
    sortEnabled: false,
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

const displayTimes = (periods: ISlotPeriod[]): string =>
  periods.map((p) => `${p.start} - ${p.end}`).join("; ");

onMounted(async () => {
  isLoading.value = true;
  const ob = await getAllSlots();
  if (ob)
    tableData.value = ob.map((slotS) => ({
      ...slotS,
      values: JSON.parse(slotS.values),
    }));
  isLoading.value = false;
});
</script>
