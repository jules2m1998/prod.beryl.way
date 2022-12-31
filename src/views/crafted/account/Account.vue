<template>
  <!--begin::Navbar-->
  <div class="card mb-5 mb-xl-10">
    <div class="card-body pt-9 pb-0">
      <!--begin::Details-->
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <!--begin: Pic-->
        <div class="me-7 mb-4">
          <div
            class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
          >
            <img :src="userAvatar" alt="image" />
          </div>
        </div>
        <!--end::Pic-->

        <!--begin::Info-->
        <div class="flex-grow-1">
          <!--begin::Title-->
          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <!--begin::User-->
            <div class="d-flex flex-column">
              <!--begin::Name-->
              <div class="d-flex align-items-center mb-2">
                <a
                  href="#"
                  class="text-gray-800 text-hover-primary fs-2 fw-bold me-1"
                >
                  {{ store.user.name }}
                </a>
              </div>
              <!--end::Name-->

              <!--begin::Info-->
              <div class="d-flex flex-wrap fw-semobold fs-6 mb-4 pe-2">
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg
                      src="/media/icons/duotune/communication/com006.svg"
                    />
                  </span>
                  {{ store.user.role.name }}
                </a>
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg
                      src="/media/icons/duotune/communication/com011.svg"
                    />
                  </span>
                  {{ store.user.email }}
                </a>
              </div>
              <!--end::Info-->
            </div>
            <!--end::User-->
          </div>
          <!--end::Title-->

          <!--begin::Stats-->
          <div class="d-flex flex-wrap flex-stack">
            <!--begin::Wrapper-->
            <div class="d-flex flex-column flex-grow-1 pe-8">
              <!--begin::Stats-->
              <div class="d-flex flex-wrap">
                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <span class="svg-icon svg-icon-success me-2">
                      <inline-svg
                        src="/media/icons/duotune/arrows/arr066.svg"
                      />
                    </span>
                    <div
                      class="fs-2 fw-bold"
                      data-kt-countup="true"
                      data-kt-countup-value="4500"
                      data-kt-countup-prefix="$"
                    >
                      4500$
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-semobold fs-6 text-gray-400">Earnings</div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->

                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <span class="svg-icon svg-icon-3 svg-icon-danger me-2">
                      <inline-svg
                        src="/media/icons/duotune/arrows/arr065.svg"
                      />
                    </span>
                    <div
                      class="fs-2 fw-bold"
                      data-kt-countup="true"
                      data-kt-countup-value="75"
                    >
                      75
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-semobold fs-6 text-gray-400">Projects</div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->

                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <span class="svg-icon svg-icon-3 svg-icon-success me-2">
                      <inline-svg
                        src="/media/icons/duotune/arrows/arr066.svg"
                      />
                    </span>
                    <div
                      class="fs-2 fw-bold"
                      data-kt-countup="true"
                      data-kt-countup-value="60"
                      data-kt-countup-prefix="%"
                    >
                      60%
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-semobold fs-6 text-gray-400">Success Rate</div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->
              </div>
              <!--end::Stats-->
            </div>
            <!--end::Wrapper-->
          </div>
          <!--end::Stats-->
        </div>
        <!--end::Info-->
      </div>
      <!--end::Details-->

      <!--begin::Navs-->
      <div class="d-flex overflow-auto h-55px">
        <ul
          class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold flex-nowrap"
        >
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/crafted/account/overview"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Overview
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/crafted/account/settings"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Settings
            </router-link>
          </li>
          <!--end::Nav item-->
        </ul>
      </div>
      <!--begin::Navs-->
    </div>
  </div>
  <!--end::Navbar-->
  <router-view></router-view>
</template>

<script setup lang="ts">
import Dropdown3 from "@/components/dropdown/Dropdown3.vue";
import { computed } from "vue";

import { useAuthStore } from "@/stores/auth";
import { getImagePathToServer } from "@/core/helpers";

const store = useAuthStore();

const userAvatar = computed(() => {
  return getImagePathToServer(store.user.avatar);
});
</script>
