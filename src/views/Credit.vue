<template>
    <page-with-table :charts="charts" @search-items="searchByText" :value="arrayFind" :table-header="tableHeader"
        :selected-ids="selectedIds">
        <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="arrayFind" :header="tableHeader"
            :enable-items-per-page-dropdown="true" :checkbox-enabled="true" checkbox-label="id">

            <template v-slot:name="{ row: customer }">
                {{ customer.name }}
            </template>
            <template v-slot:email="{ row: customer }">
                <a href="#" class="text-gray-600 text-hover-primary mb-1">
                    {{ customer.field1 }}
                </a>
            </template>
            <template v-slot:company="{ row: customer }">
                {{ customer.field2 }}
            </template>
            <template v-slot:date="{ row: customer }">
                {{ customer.field3 }}
            </template>
            <template v-slot:actions="{ row: customer }">
                <a href="#" class="btn btn-sm btn-light btn-active-light-primary" data-kt-menu-trigger="click"
                    data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">Actions
                    <span class="svg-icon svg-icon-5 m-0">
                        <inline-svg src="/media/icons/duotune/arrows/arr072.svg" />
                    </span>
                </a>
                <!--begin::Menu-->
                <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold fs-7 w-125px py-4"
                    data-kt-menu="true">
                    <!--begin::Menu item-->
                    <div class="menu-item px-3">
                        <router-link to="#" class="menu-link px-3">View</router-link>
                    </div>
                    <!--end::Menu item-->
                    <!--begin::Menu item-->
                    <div class="menu-item px-3">
                        <a @click="searchItems(customer.id)" class="menu-link px-3">Delete</a>
                    </div>
                    <!--end::Menu item-->
                </div>
                <!--end::Menu-->
            </template>

        </Datatable>
    </page-with-table>
</template>

<script setup lang="ts">
import PageWithTable from '@/components/PageWithTable.vue';
import { ref, computed } from "vue";
import type { IChart } from '@/types';
import type { IUnboarding } from "@/core/data/Unboarding";
import unboarding from "@/core/data/Unboarding";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import arraySort from "array-sort";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import { searchByName } from "@/core/helpers/array";


const charts = ref<IChart[]>([
    {
        type: "bar",
        series: [
            {
                name: 'Non traité',
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            },
            {
                name: 'Traité',
                data: [10, 20, 50, 20, 60, 10, 20, 40]
            },
        ],
        options: {
            title: {
                text: "Status"
            }
        }
    },
    {
        type: "area",
        options: {
            title: {
                text: "Demography"
            }
        },
        series: [
            {
                name: 'Non traité',
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            },
            {
                name: 'Traité',
                data: [10, 20, 50, 20, 60, 10, 20, 40]
            },
        ]
    },
    {
        type: "area",
        options: {
            title: {
                text: "Age"
            }
        },
        series: [
            {
                name: 'Non traité',
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            },
            {
                name: 'Traité',
                data: [10, 20, 50, 20, 60, 10, 20, 40]
            },
        ]
    },
    {
        type: "area",
        options: {
            title: {
                text: "Geography"
            }
        },
        series: [
            {
                name: 'Non traité',
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            },
            {
                name: 'Traité',
                data: [10, 20, 50, 20, 60, 10, 20, 40]
            },
        ]
    },
]);
const tableData = ref<Array<IUnboarding>>(unboarding);

const tableHeader = ref([
    {
        columnName: "Field 1",
        columnLabel: "name",
        sortEnabled: true,
        columnWidth: 175,
    },
    {
        columnName: "Field 2",
        columnLabel: "email",
        sortEnabled: true,
        columnWidth: 230,
    },
    {
        columnName: "Field 2",
        columnLabel: "company",
        sortEnabled: true,
        columnWidth: 175,
    },
    {
        columnName: "Field 3",
        columnLabel: "date",
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

const searchValue = ref<string>('')

const arrayFind = computed(
    () => searchByName(tableData.value, searchValue.value, ["id"])
)


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

const searchByText = (e: string) => {
    searchValue.value = e;
}

</script>