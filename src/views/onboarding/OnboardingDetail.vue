<template>
  <template v-if="!loading">
    <div class="card mb-5 mb-xxl-8">
      <div class="card-body pt-9 pb-0">
        <!--begin::Details-->
        <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
          <!--begin: Pic-->
          <div class="me-7 mb-4">
            <div
              class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
            >
              <img
                :src="getImagePathToServer(currentOnboard?.path)"
                alt="image"
              />
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
                    {{ currentOnboard?.full_name }}
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
                    {{ currentOnboard?.profession }} ({{
                      currentOnboard?.employer
                    }})
                  </a>
                  <a
                    href="#"
                    class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                  >
                    <span class="svg-icon svg-icon-4 me-1">
                      <inline-svg
                        src="/media/icons/duotune/general/gen018.svg"
                      />
                    </span>
                    {{ currentOnboard?.residence }}
                  </a>
                  <a
                    href="#"
                    class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                  >
                    <span class="svg-icon svg-icon-4 me-1">
                      <inline-svg
                        src="/media/icons/duotune/communication/com005.svg"
                      />
                    </span>
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                      "
                    >
                      <div
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          gap: 5px;
                        "
                        v-if="currentOnboard?.principal_phone"
                      >
                        {{ formatPhoneNumber(currentOnboard?.principal_phone) }}

                        <span class="badge badge-primary">#1</span>
                      </div>
                      <div
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          gap: 5px;
                        "
                        v-if="currentOnboard?.phone_1"
                      >
                        {{ formatPhoneNumber(currentOnboard?.phone_1) }}

                        <span class="badge badge-success">#2</span>
                      </div>
                      <div
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          gap: 5px;
                        "
                        v-if="currentOnboard?.phone_2"
                      >
                        {{ formatPhoneNumber(currentOnboard?.phone_2) }}

                        <span class="badge badge-warning">#3</span>
                      </div>
                    </div>
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
                    {{ currentOnboard?.email }}
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
                      <div
                        class="fs-2 fw-bold"
                        data-kt-countup="true"
                        data-kt-countup-value="4500"
                        data-kt-countup-prefix="$"
                      >
                        {{ formatToXaf(+currentOnboard?.monthly_revenue) }}
                      </div>
                    </div>
                    <!--end::Number-->

                    <!--begin::Label-->
                    <div class="fw-semobold fs-6 text-gray-400">
                      Monthly income
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
                        data-kt-countup-value="75"
                      >
                        {{
                          getI18nDate(
                            new Date(currentOnboard?.created_at)
                          ).fromNow()
                        }}
                      </div>
                    </div>
                    <!--end::Number-->

                    <!--begin::Label-->
                    <div class="fw-semobold fs-6 text-gray-400">Creation</div>
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
                        data-kt-countup-value="60"
                        data-kt-countup-prefix="%"
                      >
                        {{ currentOnboard?.account_type }}
                      </div>
                    </div>
                    <!--end::Number-->

                    <!--begin::Label-->
                    <div class="fw-semobold fs-6 text-gray-400">
                      Account type
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
                        data-kt-countup-value="60"
                        data-kt-countup-prefix="%"
                      >
                        {{ currentOnboard?.status }}
                      </div>
                    </div>
                    <!--end::Number-->

                    <!--begin::Label-->
                    <div class="fw-semobold fs-6 text-gray-400">Status</div>
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
      </div>
    </div>
    <!--begin::details View-->
    <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
      <!--begin::Card header-->
      <div class="card-header cursor-pointer">
        <!--begin::Card title-->
        <div class="card-title m-0">
          <h3 class="fw-bold m-0">Unboarding Details</h3>
        </div>
        <!--end::Card title-->
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
            <span class="fw-bold fs-6 text-dark">{{
              currentOnboard?.full_name
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted">Surname</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bold fs-6 text-dark">{{
              currentOnboard?.surname
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted">Birth day</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bold fs-6 text-dark">{{
              getI18nDate(new Date(currentOnboard?.date_of_birth)).format("ll")
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted">Delivery date</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bold fs-6 text-dark">{{
              getI18nDate(new Date(currentOnboard?.delivery_date)).format("ll")
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted">Delivery number</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bold fs-6 text-dark">{{
              currentOnboard?.delivery_number
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted">Father name</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bold fs-6 text-dark">{{
              currentOnboard?.father_name
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted">Mother name</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bold fs-6 text-dark">{{
              currentOnboard?.mother_name
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
        <!--begin::Row-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted"
            >Matrimonial status</label
          >
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-bold fs-6 text-dark">{{
              currentOnboard?.matrimonial_status
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->

        <!--begin::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted">Profession</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <span
              >{{ currentOnboard?.profession }} ({{
                currentOnboard?.employer
              }})</span
            >
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted">Residence</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <span>{{ currentOnboard?.residence }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted"
            >Card holder name</label
          >
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <span>{{ currentOnboard?.card_holder_name }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted">Email</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <span>{{ currentOnboard?.email }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted">Accept delivery</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8 fv-row">
            <span>{{ currentOnboard?.accept_delivery }}</span>
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
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
              "
            >
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 5px;
                "
                v-if="currentOnboard?.principal_phone"
                class="fw-semobold fs-6"
              >
                {{ formatPhoneNumber(currentOnboard?.principal_phone) }}

                <span class="badge badge-primary">#1</span>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 5px;
                "
                v-if="currentOnboard?.phone_1"
                class="fw-semobold fs-6"
              >
                {{ formatPhoneNumber(currentOnboard?.phone_1) }}

                <span class="badge badge-success">#2</span>
              </div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 5px;
                "
                v-if="currentOnboard?.phone_2"
                class="fw-semobold fs-6"
              >
                {{ formatPhoneNumber(currentOnboard?.phone_2) }}

                <span class="badge badge-warning">#3</span>
              </div>
            </div>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted">Account reason</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-semobold fs-6 text-dark text-hover-primary">{{
              currentOnboard?.account_reason
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted">Account type</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-semobold fs-6 text-dark text-hover-primary">{{
              currentOnboard?.account_type
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-7">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted">Status</label>
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <span class="fw-semobold fs-6 text-dark text-hover-primary">{{
              currentOnboard?.status
            }}</span>
          </div>
          <!--end::Col-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-10">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted">Is resident ?</label>
          <!--begin::Label-->

          <!--begin::Label-->
          <div class="col-lg-8">
            <span class="fw-semobold fs-6">{{
              currentOnboard?.is_resident === "1" ? "Yes" : "No"
            }}</span>
          </div>
          <!--begin::Label-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-10">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted">Is saving ?</label>
          <!--begin::Label-->

          <!--begin::Label-->
          <div class="col-lg-8">
            <span class="fw-semobold fs-6">{{
              currentOnboard?.is_saving === "1" ? "Yes" : "No"
            }}</span>
          </div>
          <!--begin::Label-->
        </div>
        <!--end::Input group-->

        <!--begin::Input group-->
        <div class="row mb-10">
          <!--begin::Label-->
          <label class="col-lg-4 fw-semobold text-muted">Is us citizen ?</label>
          <!--begin::Label-->

          <!--begin::Label-->
          <div class="col-lg-8">
            <span class="fw-semobold fs-6">{{
              currentOnboard?.is_us_citizen === "1" ? "Yes" : "No"
            }}</span>
          </div>
          <!--begin::Label-->
        </div>
        <!--end::Input group-->

        <div class="my-img">
          <div class="my-img-block">
            <label class="col-lg-4 fw-semobold text-muted">Signature</label>
            <img
              :src="getImagePathToServer(currentOnboard?.signature)"
              alt="image"
            />
          </div>
          <div class="my-img-block">
            <label class="col-lg-4 fw-semobold text-muted">Id card</label>
            <img
              :src="getImagePathToServer(currentOnboard?.id_card)"
              alt="image"
            />
          </div>
        </div>
      </div>
      <!--end::Card body-->
    </div>
  </template>
  <!--end::details View-->
  <loader v-else></loader>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { getOneOnboard } from "@/core/services";
import type { IOnboard } from "@/types";
import type { IHttpError } from "@/types/https";
import Loader from "@/components/Loader.vue";
import {
  formatToXaf,
  getI18nDate,
  getImagePathToServer,
  formatPhoneNumber,
} from "@/core/helpers";

const currentOnboard = ref<IOnboard | null>();
const loading = ref<boolean>(false);

onMounted(async () => {
  loading.value = true;
  const one = await getOneOnboard(1);
  if (!(one as IHttpError).message) currentOnboard.value = one as IOnboard;
  loading.value = false;
});
</script>

<style scoped lang="scss">
.my-img{
  display: flex;
  flex-direction: column;
  gap: 10px;

  &-block{
    label{
      margin-bottom: 10px;
    }
    img{
      min-width: 100px;
      aspect-ratio: 1;
      object-fit: cover;
    }
  }
}
</style>
