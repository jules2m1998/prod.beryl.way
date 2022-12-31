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
      <template v-slot:level="{ row: customer }">
        <a href="#" class="text-gray-600 text-hover-primary mb-1">
          <span> {{ customer.level }} </span>
        </a>
      </template>
      <template v-slot:created_at="{ row: customer }">
        {{ getDateFormated(customer.created_at) }}
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
              :to="{ name: 'service_update', params: { id: customer.id } }"
              class="menu-link px-3"
              >Modifier</router-link
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
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import arraySort from "array-sort";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { searchByName } from "@/core/helpers/array";
import { highlightDetectedText } from "@/core/helpers/dom";
import MyLoader from "@/components/Loader.vue";
import type { IService } from "@/types";
import { getALlServices } from "@/core/services";
import { RouterLink } from "vue-router";
import { getDateFormated, openModal } from "@/core/helpers";
import DropDownMenu from "@/components/dropdown/DropDownMenu.vue";

const selector = "detail-zone-modal";

const isLoading = ref<boolean>(false);
const tableData = ref<Array<IService>>([]);
const menu = ref<string[]>(["view", "update"]);
const selectedItem = ref<IService | undefined>(undefined);

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

const showDetail = (id: number) => {
  selectedItem.value = tableData.value.find((v) => id === v.id);
  if (selectedItem.value) openModal(selector);
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
  const a = await getALlServices();
  if (a) tableData.value = a;
  isLoading.value = false;
});
</script>
