<template>
  <!--begin::Layout-->
  <div v-if="!isLoading && currentUser" class="d-flex flex-column">
    <div class="card mb-5 mb-xl-8">
      <!--begin::Card body-->
      <div class="card-body pt-15">
        <!--begin::Summary-->
        <div class="d-flex flex-center flex-column mb-5">
          <!--begin::Avatar-->
          <div class="symbol symbol-100px symbol-circle mb-7">
            <img :src="getImagePathToServer(currentUser?.avatar)" alt="image" />
          </div>
          <!--end::Avatar-->

          <!--begin::Name-->
          <a
            href="#"
            class="fs-3 text-gray-800 text-hover-primary fw-bold mb-1"
          >
            {{ currentUser?.name }}
          </a>
          <!--end::Name-->

          <!--begin::Position-->
          <div class="fs-5 fw-semobold text-muted mb-6">
            {{ currentUser?.email }}
          </div>
          <!--end::Position-->

          <!--begin::Info-->
          <div class="d-flex flex-wrap flex-center">
            <!--begin::Stats-->
            <div
              class="border border-gray-300 border-dashed rounded py-3 px-3 mb-3 me-3"
            >
              <div class="fs-4 fw-bold text-gray-700">
                <span class="w-75px">#{{ currentUser?.matricule }}</span>
              </div>
              <div class="fw-semobold text-muted">Matricule</div>
            </div>
            <!--end::Stats-->
            <!--begin::Stats-->
            <div
              class="border border-gray-300 border-dashed rounded py-3 px-3 mb-3"
            >
              <div class="fs-4 fw-bold text-gray-700">
                <span class="w-75px">{{
                  formatPhoneNumber(currentUser?.phone)
                }}</span>
              </div>
              <div class="fw-semobold text-muted">Phone number</div>
            </div>
            <!--end::Stats-->
          </div>
          <!--end::Info-->
        </div>
        <!--end::Summary-->

        <!--begin::Details toggle-->
        <div class="d-flex flex-stack fs-4 py-3">
          <div
            class="fw-bold rotate collapsible"
            data-bs-toggle="collapse"
            href="#kt_customer_view_details"
            role="button"
            aria-expanded="false"
            aria-controls="kt_customer_view_details"
          >
            Details
            <span class="ms-2 rotate-180">
              <span class="svg-icon svg-icon-3">
                <inline-svg src="/media/icons/duotune/arrows/arr072.svg" />
              </span>
            </span>
          </div>

          <span
            data-bs-toggle="tooltip"
            data-bs-trigger="hover"
            title="Edit customer details"
          >
            <router-link
              :to="{ name: 'user-update', params: { id: currentUser?.id } }"
              class="btn btn-sm btn-light-primary"
            >
              Edit
            </router-link>
          </span>
        </div>
        <!--end::Details toggle-->

        <div class="separator separator-dashed my-3"></div>

        <!--begin::Details content-->
        <div id="kt_customer_view_details" class="collapse show">
          <div class="py-5 fs-6">
            <div class="fw-bold mt-5">Agencies</div>
            <div class="text-gray-600">
              <template v-for="(v, k) in currentUser?.agencies" :key="k">
                {{ v.name }} <br />
              </template>
            </div>
            <!--begin::Badge-->
            <!--begin::Details item-->
            <div class="fw-bold mt-5">Token</div>
            <div class="text-gray-600">{{ currentUser?.token }}</div>
            <!--begin::Details item-->
            <!--begin::Details item-->
            <div class="fw-bold mt-5">Opt code</div>
            <div class="text-gray-600">{{ currentUser?.opt_code }}</div>
            <!--begin::Details item-->
            <!--begin::Details item-->
            <div class="fw-bold mt-5">Upcoming Invoice</div>
            <div class="text-gray-600">54238-8693</div>
            <!--begin::Details item-->
            <!--begin::Details item-->
            <div class="fw-bold mt-5">Created at</div>
            <div class="text-gray-600">
              {{ getI18nDate(currentUser?.created_at).format("ll") }}
            </div>
            <!--begin::Details item-->
          </div>
        </div>
        <!--end::Details content-->
      </div>
      <!--end::Card body-->
    </div>
  </div>
  <!--end::Layout-->
  <loader v-else></loader>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

import { getOneUser } from "@/core/services";
import Loader from "@/components/Loader.vue";
import {
  formatPhoneNumber,
  getI18nDate,
  getImagePathToServer,
} from "@/core/helpers";
import type { IUser } from "@/types";
import type { IHttpError } from "@/types/https";

const currentUser = ref<IUser | null>(null);
const isLoading = ref<boolean>(false);

const route = useRoute();

onMounted(async () => {
  isLoading.value = true;
  const id = +route.params.id;
  const u = await getOneUser(id);
  if (!(u as IHttpError).message) currentUser.value = u as IUser;
  isLoading.value = false;
});
</script>
