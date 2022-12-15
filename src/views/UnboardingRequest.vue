<script setup lang="ts">
import { ref } from 'vue';
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable//table-partials/models";
import ManyChart from "@/components/chart/ManyChart.vue";
import arraySort from "array-sort";
import type { IUnboarding } from "@/core/data/Unboarding";
import unboarding from "@/core/data/Unboarding";
import type { IChart } from "@/types";

const tableData = ref<Array<IUnboarding>>(unboarding);
const search = ref<string>("");
const selectedIds = ref<Array<number>>([]);
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

const sort = (sort: Sort) => {
    const reverse: boolean = sort.order === "asc";
    if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
    }
};

const onItemSelect = (selectedItems: Array<number>) => {
    selectedIds.value = selectedItems;
};

const deleteCustomer = (id: number) => {
    for (let i = 0; i < tableData.value.length; i++) {
        if (tableData.value[i].id === id) {
            tableData.value.splice(i, 1);
        }
    }
};

const searchItems = () => { }


const deleteFewCustomers = () => {
    selectedIds.value.forEach((item) => {
        deleteCustomer(item);
    });
    selectedIds.value.length = 0;
};

</script>

<template>
    <div class="mb-5 filter-charts">
        <div class="card rounded-0">
            <div class="card-body">
                <label class="form-label" for="test">Title to filter</label>
                <select class="form-select" aria-label="Default select example">
                    <option disabled>Open this select menu</option>
                    <option value="1">Filter one</option>
                    <option value="2">Filter two</option>
                    <option value="3">Filter Three</option>
                </select>
            </div>
        </div>
        <div class="card rounded-0">
            <div class="card-body">
                <many-chart :charts="charts"></many-chart>
            </div>
        </div>
    </div>
    <div class="card rounded-0">
        <div class="card-header border-0 pt-6">
            <div class="card-title">
                <!--begin::Search-->
                <div class="d-flex align-items-center position-relative my-1">
                    <span class="svg-icon svg-icon-1 position-absolute ms-6">
                        <inline-svg src="/media/icons/duotune/general/gen021.svg" />
                    </span>
                    <input type="text" v-model="search" @input="searchItems()"
                        class="form-control form-control-solid w-250px ps-15" placeholder="Search request..." />
                </div>
                <!--end::Search-->
            </div>

            <!--begin::Card toolbar-->
            <div class="card-toolbar">
                <!--begin::Toolbar-->
                <div v-if="selectedIds.length === 0" class="d-flex justify-content-end"
                    data-kt-customer-table-toolbar="base">
                    <!--begin::Export-->
                    <button type="button" class="btn btn-light-primary me-3" data-bs-toggle="modal"
                        data-bs-target="#kt_customers_export_modal">
                        <span class="svg-icon svg-icon-2">
                            <inline-svg src="/media/icons/duotune/arrows/arr078.svg" />
                        </span>
                        Export
                    </button>
                    <!--end::Export-->
                </div>
                <!--end::Toolbar-->
                <!--begin::Group actions-->
                <div v-else class="d-flex justify-content-end align-items-center"
                    data-kt-customer-table-toolbar="selected">
                    <div class="fw-bold me-5">
                        <span class="me-2">{{ selectedIds.length }}</span>Selected
                    </div>
                    <button type="button" class="btn btn-danger" @click="deleteFewCustomers()">
                        Delete Selected
                    </button>
                </div>
                <!--end::Group actions-->
                <!--begin::Group actions-->
                <div class="d-flex justify-content-end align-items-center d-none"
                    data-kt-customer-table-toolbar="selected">
                    <div class="fw-bold me-5">
                        <span class="me-2" data-kt-customer-table-select="selected_count"></span>Selected
                    </div>
                    <button type="button" class="btn btn-danger" data-kt-customer-table-select="delete_selected">
                        Delete Selected
                    </button>
                </div>
                <!--end::Group actions-->
            </div>
            <!--end::Card toolbar-->
        </div>
        <div class="card-body pt-0">
            <Datatable @on-sort="sort" @on-items-select="onItemSelect" :data="tableData" :header="tableHeader"
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
                            <a @click="deleteCustomer(customer.id)" class="menu-link px-3">Delete</a>
                        </div>
                        <!--end::Menu item-->
                    </div>
                    <!--end::Menu-->
                </template>
            </Datatable>

        </div>
    </div>
</template>

<style lang="scss" scoped>
.filter-charts{
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: .5rem;
}
</style>