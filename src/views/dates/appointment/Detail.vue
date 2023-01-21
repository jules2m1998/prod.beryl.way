<template>
  <div
    v-if="!isLoading && current"
    class="card mb-5 mb-xl-10"
    id="kt_profile_details_view"
  >
    <!--begin::Card body-->
    <div class="card-body p-9">
      <div
        class="d-flex flex-wrap flex-sm-nowrap mb-3"
        style="
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        "
      >
        <div style="max-width: 200px">
          <div
            class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
          >
            <img
              :src="getImagePathToServer(current?.agent.user.avatar)"
              alt="image"
            />
          </div>
          <div class="mt-4">
            <!--begin::Row-->
            <div class="mb-7">
              <!--begin::Label-->
              <label class="fw-semobold text-muted">Agency</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div>
                <span class="fw-bold fs-6 text-dark"
                  >{{ current?.agent.agency.name }} ({{
                    current?.agent.agency.location
                  }})</span
                >
              </div>
              <!--end::Col-->
            </div>
            <!--end::Row-->
            <!--begin::Row-->
            <div class="mb-7">
              <!--begin::Label-->
              <label class="fw-semobold text-muted">Agent name</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div>
                <span class="fw-bold fs-6 text-dark">{{
                  current?.agent.user.name
                }}</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Row-->
            <!--begin::Row-->
            <div class="mb-7">
              <!--begin::Label-->
              <label class="fw-semobold text-muted">Agent email</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div>
                <span class="fw-bold fs-6 text-dark">{{
                  current?.agent.user.email
                }}</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Row-->
            <!--begin::Row-->
            <div class="mb-7">
              <!--begin::Label-->
              <label class="fw-semobold text-muted">Agent phone</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div>
                <span class="fw-bold fs-6 text-dark">{{
                  formatPhoneNumber(current?.agent.user.phone)
                }}</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Row-->
          </div>
        </div>
        <div style="max-width: 200px">
          <div
            class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
          >
            <img
              :src="getImagePathToServer(current?.client.user.avatar)"
              alt="image"
            />
          </div>
          <div class="mt-4">
            <!--begin::Row-->
            <div class="mb-7">
              <!--begin::Label-->
              <label class="fw-semobold text-muted">Agency</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div>
                <span class="fw-bold fs-6 text-dark"
                  >{{ current?.client.agency.name }} ({{
                    current?.client.agency.location
                  }})</span
                >
              </div>
              <!--end::Col-->
            </div>
            <!--end::Row-->
            <!--begin::Row-->
            <div class="mb-7">
              <!--begin::Label-->
              <label class="fw-semobold text-muted">Client name</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div>
                <span class="fw-bold fs-6 text-dark">{{
                  current?.client.user.name
                }}</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Row-->
            <!--begin::Row-->
            <div class="mb-7">
              <!--begin::Label-->
              <label class="fw-semobold text-muted">Agent email</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div>
                <span class="fw-bold fs-6 text-dark">{{
                  current?.client.user.email
                }}</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Row-->
            <!--begin::Row-->
            <div class="mb-7">
              <!--begin::Label-->
              <label class="fw-semobold text-muted">Agent phone</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div>
                <span class="fw-bold fs-6 text-dark">{{
                  formatPhoneNumber(current?.client.user.phone)
                }}</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Row-->
          </div>
        </div>
      </div>

      <!--begin::Row-->
      <div class="mb-7">
        <!--begin::Label-->
        <label class="fw-semobold text-muted">Date and hour</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="">
          <span class="fw-bold fs-6 text-dark">{{
            getI18nDate(current?.time).format("lll")
          }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Row-->
      <div class="mb-7">
        <!--begin::Label-->
        <label class="fw-semobold text-muted">Status</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="">
          <span class="fw-bold fs-6 text-dark">{{ current?.status }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Row-->
      <div class="mb-7">
        <!--begin::Label-->
        <label class="fw-semobold text-muted">Reason</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="">
          <span class="fw-bold fs-6 text-dark">{{ current?.reason }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <div style="display: flex; gap: 10px">
        <div
          class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
        >
          <img :src="getImagePathToServer(current?.file1)" alt="image" />
        </div>

        <div
          class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
        >
          <img :src="getImagePathToServer(current?.file2)" alt="image" />
        </div>
      </div>
    </div>
    <!--end::Card body-->

    <div
      class="card-footer"
      style="display: flex; justify-content: flex-end; gap: 10px"
    >
      <button class="btn btn-primary btn-sm" @click="openDialog">
        To send back
      </button>
      <button
        class="btn btn-success btn-sm"
        @click="validateAppointment"
        :disabled="current?.status === 'ACCEPTED'"
      >
        To validate
      </button>
      <button
        class="btn btn-danger btn-sm"
        @click="rejectAppointment"
        :disabled="current?.status === 'REJECTED'"
      >
        Reject
      </button>
    </div>
  </div>
  <loader v-else></loader>
  <appointment-send-back
    :slots="slots"
    @update="updateTime"
  ></appointment-send-back>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import {
  getAllSlots,
  getOneAppointment,
  updateOneAppointment,
} from "@/core/services";
import type { IAppointment, ISlot, ISlotPeriod } from "@/types";
import type { IHttpError } from "@/types/https";
import Loader from "@/components/Loader.vue";
import {
  formatPhoneNumber,
  getI18nDate,
  getImagePathToServer,
  successAlert,
} from "@/core/helpers";
import AppointmentSendBack from "@/components/modals/forms/AppointmentSendBack.vue";
import { Modal } from "bootstrap";

const route = useRoute();
const current = ref<IAppointment | null>(null);
const isLoading = ref<boolean>(false);
const slots = ref<ISlot[]>([]);

const validateAppointment = async () => {
  isLoading.value = true;
  const r = await updateStatus("ACCEPTED");
  if (r) await loadData();
  else isLoading.value = false;
};

const rejectAppointment = async () => {
  isLoading.value = true;
  const r = await updateStatus("REJECTED");
  console.log(r);
  if (r) await loadData();
  else isLoading.value = false;
};

const openDialog = async () => {
  const elt = document.getElementById("kt_modal_set_date") as Element;
  if (elt) {
    const modal = new Modal(elt);
    modal.show();
  } else {
    console.error("Model not exist");
  }
};

const updateStatus = async (status: string) => {
  if (current?.value) {
    const result = await updateOneAppointment(current?.value?.id, {
      status: status,
    });
    if ((result as { success: boolean }).success)
      await successAlert("Status updated successfully !");

    return (result as { success: boolean }).success;
  }
  return false;
};

const loadData = async () => {
  isLoading.value = true;
  const id = +route.params.id;
  const c = await getOneAppointment(id);
  const s = await getAllSlots();
  const error = c as IHttpError;
  if (!error?.errors?.length) current.value = c as IAppointment;
  if (s)
    slots.value = s
      .map((v) => ({ ...v, values: JSON.parse(v.values) }))
      .filter((v) => v.values.some((v) => v.available === true));
  isLoading.value = false;
};

const updateTime = async (e: { slot: ISlot; period: ISlotPeriod }) => {
  console.log(e);
  const newTime = `${e.slot.date} ${e.period.start}`;
  if (current?.value) {
    const result = await updateOneAppointment(current?.value?.id, {
      time: newTime as unknown as Date,
    });
    if ((result as { success: boolean }).success) {
      await successAlert("Appointment updated successfully !");
      await loadData();
    }
  }
};

onMounted(async () => {
  await loadData();
});
</script>

<style scoped></style>
