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
      <template v-slot:amount="{ row: customer }">
        <span
          v-html="
            highlightDetectedText(formatToXaf(customer.amount), searchValue)
          "
        ></span>
      </template>
      <template v-slot:duration="{ row: customer }">
        <a href="#" class="text-gray-600 text-hover-primary mb-1">
          <span
            v-html="highlightDetectedText(customer.duration, searchValue)"
          ></span>
        </a>
      </template>
      <template v-slot:monthly_payment="{ row: customer }">
        <span
          v-html="
            highlightDetectedText(
              formatToXaf(customer.monthly_payment),
              searchValue
            )
          "
        ></span>
      </template>
      <template v-slot:estimated_cost="{ row: customer }">
        <span
          v-html="
            highlightDetectedText(
              formatToXaf(customer.estimated_cost),
              searchValue
            )
          "
        ></span>
      </template>
      <template v-slot:salary="{ row: customer }">
        <span
          v-html="
            highlightDetectedText(formatToXaf(customer.salary), searchValue)
          "
        ></span>
      </template>
      <template v-slot:status="{ row: customer }">
        <span
          v-html="highlightDetectedText(customer.status, searchValue)"
        ></span>
      </template>
      <template v-slot:client_employer="{ row: customer }">
        <span
          v-html="highlightDetectedText(customer.client_employer, searchValue)"
        ></span>
      </template>
      <template v-slot:on_going_credit="{ row: customer }">
        <span
          v-html="highlightDetectedText(customer.on_going_credit, searchValue)"
        ></span>
      </template>
      <template v-slot:ongoing_amount="{ row: customer }">
        <span
          v-html="
            highlightDetectedText(
              formatToXaf(customer.ongoing_amount),
              searchValue
            )
          "
        ></span>
      </template>
      <template v-slot:ongoing_monthly_payment="{ row: customer }">
        <span
          v-html="
            highlightDetectedText(
              formatToXaf(customer.ongoing_monthly_payment),
              searchValue
            )
          "
        ></span>
      </template>
      <template v-slot:ongoing_credit_start="{ row: customer }">
        <span
          v-html="
            highlightDetectedText(
              getI18nDate(customer.ongoing_credit_start).format('ll'),
              searchValue
            )
          "
        ></span>
      </template>
      <template v-slot:ongoing_credit_end="{ row: customer }">
        <span
          v-html="
            highlightDetectedText(
              getI18nDate(customer.ongoing_credit_end).format('ll'),
              searchValue
            )
          "
        ></span>
      </template>
      <template v-slot:ongoing_credit_institution="{ row: customer }">
        <span
          v-html="
            highlightDetectedText(
              customer.ongoing_credit_institution,
              searchValue
            )
          "
        ></span>
      </template>
      <template v-slot:finisher="{ row: customer }">
        <span
          v-html="
            highlightDetectedText(customer.finisher?.user?.name, searchValue)
          "
        ></span>
      </template>
      <template v-slot:processor="{ row: customer }">
        <span
          v-html="
            highlightDetectedText(customer.processor?.user?.name, searchValue)
          "
        ></span>
      </template>
      <template v-slot:client="{ row: customer }">
        <span
          v-html="highlightDetectedText(customer.client?.name, searchValue)"
        ></span>
      </template>
      <template v-slot:created_at="{ row: customer }">
        {{ getI18nDate(customer.created_at).format("lll") }}
      </template>

      <template v-slot:actions="{ row: customer }">
        <drop-down-menu name="Actions" :menu="menu">
          <template v-slot:update>
            <router-link
              :to="{ name: 'credit-detail', params: { id: customer.id } }"
              class="menu-link px-3"
              >Détail</router-link
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
import { computed, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import arraySort from "array-sort";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { searchByName } from "@/core/helpers/array";
import { highlightDetectedText } from "@/core/helpers/dom";
import MyLoader from "@/components/Loader.vue";
import type { ICredit } from "@/types";
import { getAllCredit } from "@/core/services";
import { RouterLink } from "vue-router";
import { formatToXaf, getI18nDate, openModal } from "@/core/helpers";
import DropDownMenu from "@/components/dropdown/DropDownMenu.vue";

const selector = "detail-zone-modal";

const isLoading = ref<boolean>(false);
const tableData = ref<Array<ICredit>>([]);
const menu = ref<string[]>(["update"]);
const selectedItem = ref<ICredit | undefined>(undefined);

const tableHeader = ref([
  {
    columnName: "Amount",
    columnLabel: "amount",
    sortEnabled: true,
    columnWidth: 175,
  },
  {
    columnName: "Duration",
    columnLabel: "duration",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "Monthly payment",
    columnLabel: "monthly_payment",
    sortEnabled: true,
    columnWidth: 230,
  },
  {
    columnName: "Estimate cost",
    columnLabel: "estimated_cost",
    sortEnabled: true,
    columnWidth: 175,
  },
  {
    columnName: "Status",
    columnLabel: "status",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "Salary",
    columnLabel: "salary",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "Client employer",
    columnLabel: "client_employer",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "On going credit",
    columnLabel: "on_going_credit",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "On going amount",
    columnLabel: "ongoing_amount",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "On going monthly payment",
    columnLabel: "ongoing_monthly_payment",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "On going credit start",
    columnLabel: "ongoing_credit_start",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "On going credit end",
    columnLabel: "ongoing_credit_end",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "On going credit institution",
    columnLabel: "ongoing_credit_institution",
    sortEnabled: true,
    columnWidth: 225,
  },
  {
    columnName: "Finisher",
    columnLabel: "finisher",
    sortEnabled: false,
    columnWidth: 225,
  },
  {
    columnName: "Processor",
    columnLabel: "processor",
    sortEnabled: false,
    columnWidth: 225,
  },
  {
    columnName: "Client",
    columnLabel: "client",
    sortEnabled: false,
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
  const a = await getAllCredit();
  if (a) tableData.value = a;
  isLoading.value = false;
});
</script>
