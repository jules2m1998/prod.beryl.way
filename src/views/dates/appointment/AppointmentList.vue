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
        {{ slot.values }}
      </template>
      <template v-slot:reason="{ row: slot }">
        {{ slot.reason }}
      </template>
      <template v-slot:agent="{ row: slot }">
        {{ slot.agent.user.name }}
      </template>
      <template v-slot:client="{ row: slot }">
        {{ slot.client?.user?.name }}
        <template v-if="slot.client?.agency">
          ({{ slot.client?.agency?.name }})
        </template>
      </template>
      <template v-slot:created_at="{ row: slot }">
        {{ getI18nDate(slot.created_at).fromNow() }}
      </template>

      <template v-slot:actions="{ row: customer }">
        <drop-down-menu name="Actions" :menu="menu">
          <template v-slot:update>
            <a @click="showDetail(customer.id)" class="menu-link px-3">View</a>
          </template>
          <template v-slot:view>
            <a class="menu-link px-3">Update </a>
          </template>
          <template v-slot:delete>
            <div
              class="menu-link text-danger px-3"
              @click="deleteAppointment(customer.id)"
            >
              Delete
            </div>
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
import type { IAppointment } from "@/types";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import arraySort from "array-sort";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { searchByName } from "@/core/helpers/array";
import { getAllAppointment } from "@/core/services";
import DropDownMenu from "@/components/dropdown/DropDownMenu.vue";
import MyLoader from "@/components/Loader.vue";
import { getI18nDate } from "@/core/helpers";

const menu = ref<string[]>(["view", "update", "delete"]);
const isLoading = ref<boolean>(false);

const tableData = ref<Array<IAppointment>>([]);

const tableHeader = ref([
  {
    columnName: "Date",
    columnLabel: "date",
    sortEnabled: true,
    columnWidth: 175,
  },
  {
    columnName: "reason",
    columnLabel: "reason",
    sortEnabled: true,
    columnWidth: 175,
  },
  {
    columnName: "Created at",
    columnLabel: "created_at",
    sortEnabled: true,
    columnWidth: 175,
  },
  {
    columnName: "Agent",
    columnLabel: "agent",
    sortEnabled: false,
    columnWidth: 135,
  },
  {
    columnName: "Client",
    columnLabel: "client",
    sortEnabled: false,
    columnWidth: 135,
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
const deleteAppointment = (id: number) => {
  console.log(id);
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
  const ob = await getAllAppointment();
  if (ob) tableData.value = ob;
  console.log(ob);
  isLoading.value = false;
});
</script>
