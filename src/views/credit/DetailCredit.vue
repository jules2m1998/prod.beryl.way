<template>
  <div
    v-if="!isLoading"
    class="card mb-5 mb-xl-10"
    id="kt_profile_details_view"
  >
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Credit Details</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9" v-if="current">
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Client</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{ current?.client.name }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--begin::Row-->
      <div class="row mb-7" v-if="current?.processor">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Processor</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            current?.processor?.user?.name
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--begin::Row-->
      <div class="row mb-7" v-if="current?.processed_at">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Processed at</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            getI18nDate(new Date(current.processed_at ?? "")).format("lll")
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--begin::Row-->
      <div class="row mb-7" v-if="current?.finisher">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Finisher</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            current?.finisher?.user?.name
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <div class="row mb-7" v-if="current?.finished_at">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Finished at</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            getI18nDate(new Date(current.finished_at ?? "")).format("lll")
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Amount</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            formatToXaf(+current.amount)
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Duration</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{ current.duration }}</span>
        </div>
        <!--end::Col-->
      </div>
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Monthly payment</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            current.monthly_payment
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Estimated coast</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            current.estimated_cost
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--begin::Row-->
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Status</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{ current.status }}</span>
        </div>
        <!--end::Col-->
      </div>
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Salary</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            formatToXaf(+current.salary)
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Client employer</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            formatToXaf(+current.client_employer)
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">On going credit</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            current.on_going_credit
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">On going amount</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            formatToXaf(+current.ongoing_amount)
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted"
          >On going monthly payment</label
        >
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            formatToXaf(+current.ongoing_monthly_payment)
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted"
          >On going credit start</label
        >
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            getI18nDate(new Date(current.ongoing_credit_start)).format("ll")
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted"
          >On going credit end</label
        >
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            getI18nDate(new Date(current.ongoing_credit_end)).format("ll")
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted"
          >On going credit institution</label
        >
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{
            current.ongoing_credit_institution
          }}</span>
        </div>
        <!--end::Col-->
      </div>
    </div>
    <!--end::Card body-->
  </div>
  <loader v-else></loader>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import type { ICredit } from "@/types";
import { getOneCredit } from "@/core/services";
import type { IHttpError } from "@/types/https";
import Loader from "@/components/Loader.vue";
import { formatToXaf, getI18nDate } from "../../core/helpers";

const current = ref<ICredit | null>(null);
const isLoading = ref<boolean>(false);
const route = useRoute();

onMounted(async () => {
  isLoading.value = true;
  const id = +route.params.id;
  const c = await getOneCredit(id);
  if (!(c as IHttpError).message) current.value = c as ICredit;
  isLoading.value = false;
});
</script>
<style scoped></style>
