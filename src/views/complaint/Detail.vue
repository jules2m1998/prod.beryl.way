<template>
  <div
    v-if="!isLoading && current"
    class="card mb-5 mb-xl-10"
    id="kt_profile_details_view"
  >
    <!--begin::Card body-->
    <div class="card-body p-9">
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <!--begin: Pic-->
        <div class="me-7 mb-4">
          <div
            class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
          >
            <img
              :src="getImagePathToServer(current?.user_agency.user.avatar)"
              alt="image"
            />
          </div>
        </div>
        <!--end::Pic-->
        <div class="flex-grow-1">
          <div class="d-flex flex-wrap flex-stack">
            <!--begin::Wrapper-->
            <div class="d-flex flex-column flex-grow-1 pe-8">
              <div class="d-flex flex-wrap">
                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <div
                      class="fs-2 fw-bold"
                      data-kt-countup="true"
                      data-kt-countup-value="4500"
                      data-kt-countup-prefix="$"
                    >
                      {{ current?.first_transaction }}
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-semobold fs-6 text-gray-400">
                    First transaction
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->

                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <div
                      class="fs-2 fw-bold"
                      data-kt-countup="true"
                      data-kt-countup-value="4500"
                      data-kt-countup-prefix="$"
                    >
                      {{ current?.last_transaction }}
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-semobold fs-6 text-gray-400">
                    Last transaction
                  </div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3">
          <!--begin::Row-->
          <div class="mb-7">
            <!--begin::Label-->
            <label class="fw-semobold text-muted">Full Name</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="">
              <span class="fw-bold fs-6 text-dark">{{
                current?.user_agency.user.name
              }}</span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
          <!--begin::Row-->
          <div class="mb-7">
            <!--begin::Label-->
            <label class="fw-semobold text-muted">Email</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="">
              <span class="fw-bold fs-6 text-dark">{{
                current?.user_agency.user.email
              }}</span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
          <!--begin::Row-->
          <div class="mb-7">
            <!--begin::Label-->
            <label class="fw-semobold text-muted">Phone</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="">
              <span class="fw-bold fs-6 text-dark">{{
                formatToXaf(current?.user_agency.user.email)
              }}</span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
          <!--begin::Row-->
          <div class="mb-7">
            <!--begin::Label-->
            <label class="fw-semobold text-muted">Agency</label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="">
              <span class="fw-bold fs-6 text-dark"
                >{{ current?.user_agency.agency.name }} ({{
                  current?.user_agency.agency.location
                }})</span
              >
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
        </div>
        <div class="col-md-9">
          <!--begin::Row-->
          <div class="mb-7">
            <!--begin::Label-->
            <label class="fw-semobold text-muted">Motif</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div>
              <span class="fw-bold fs-6 text-dark">{{ current?.detail }}</span>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
          <!--begin::Row-->
          <div class="mb-7" v-if="current?.path">
            <!--begin::Label-->
            <label class="fw-semobold text-muted">Attachment</label>
            <!--end::Label-->
            <!--begin::Col-->
            <div>
              <div class="fw-bold fs-6 text-dark">
                <button
                  type="button"
                  class="btn btn-light mt-2 mb-2"
                  @click="isAttachmentVisible = !isAttachmentVisible"
                >
                  {{ isAttachmentVisible ? "Close" : "Open" }} attachment
                </button>
                <iframe
                  :src="getImagePathToServer(current?.path)"
                  width="100%"
                  height="500px"
                  v-if="isAttachmentVisible"
                />
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Row-->
        </div>
      </div>
    </div>
    <!--end::Card body-->
  </div>
  <loader v-else></loader>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { getOneComplain } from "@/core/services";
import type { IComplaint } from "@/types";
import type { IHttpError } from "@/types/https";
import Loader from "@/components/Loader.vue";
import { getImagePathToServer } from "@/core/helpers";
import { formatToXaf } from "@/core/helpers";

const route = useRoute();
const current = ref<IComplaint | null>(null);
const isLoading = ref<boolean>(false);
const isAttachmentVisible = ref<boolean>(false);

onMounted(async () => {
  isLoading.value = true;
  const id = +route.params.id;
  const c = await getOneComplain(id);
  const error = c as IHttpError;
  if (!error?.errors?.length) current.value = c as IComplaint;
  isLoading.value = false;
});
</script>

<style scoped></style>
