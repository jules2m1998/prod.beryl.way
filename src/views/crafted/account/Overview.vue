<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Profile Details</h3>
      </div>
      <!--end::Card title-->

      <!--begin::Action-->
      <router-link
        to="/account/settings"
        class="btn btn-primary align-self-center"
        >Edit Profile</router-link
      >
      <!--end::Action-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Full Name</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">{{ store.user.name }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">Agency</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 fv-row">
          <span class="fw-semobold fs-6">{{ user_agency?.agency.name }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted"> Contact Phone </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 d-flex align-items-center">
          <a
            :href="'tel:' + store.user.phone"
            class="fw-semobold fs-6 text-dark text-hover-primary"
            >{{ store.user.phone }}</a
          >
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group--><!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted"> Email </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <a
            :href="'mailto:' + store.user.email"
            class="fw-semobold fs-6 text-dark text-hover-primary"
            >{{ store.user.email }}</a
          >
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->

  <!--begin::Row-->
  <div class="row gy-10 gx-xl-10">
    <!--begin::Col-->
    <div class>
      <KTListWidget5
        widget-classes="card-xxl-stretch mb-5 mb-xl-10"
      ></KTListWidget5>
    </div>
    <!--end::Col-->
  </div>
  <!--end::Row-->
</template>

<script setup lang="ts">
import KTListWidget5 from "@/components/widgets/lists/Widget5.vue";
import { computed } from "vue";

import { useAuthStore } from "@/stores/auth";
import type { IUserAgency } from "@/types/user-agency";

const store = useAuthStore();
const user_agency = computed<IUserAgency | null>(() =>
  store.user.user_agency?.length > 0 ? store.user.user_agency[0] : null
);
</script>
