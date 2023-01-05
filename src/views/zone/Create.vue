<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10" v-if="!isLoading">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details"
      aria-expanded="true"
      aria-controls="kt_account_profile_details"
    >
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">{{ t("adminZoneCreate") }}</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <VForm
          id="kt_account_profile_details_form"
          class="form"
          novalidate
          :initial-values="initialValue"
          @submit="saveChanges($event)"
          :validation-schema="profileDetailsValidator"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
            >Name</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="name"
                class="form-control form-control-lg form-control-solid"
                placeholder="Zone name"
                v-model="profileDetails.name"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="name" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Country code</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="country_code"
                class="form-control form-control-lg form-control-solid"
                placeholder="Country code"
                v-model="profileDetails.country_code"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="country_code" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Short name</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="short_name"
                class="form-control form-control-lg form-control-solid"
                placeholder="Short name"
                v-model="profileDetails.short_name"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="short_name" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Parent</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <!--begin::Input-->
              <Field
                as="select"
                name="parent_id"
                class="form-select form-select-solid form-select-lg"
                v-model="profileDetails.parent_id"
              >
                <option :value="null">Any</option>
                <option v-for="(p, k) in parentTypes" :key="k" :value="p.id">
                  {{ p.name }}
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="parent_id" />
                </div>
              </div>
              <!--end::Input-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Zone type</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <!--begin::Input-->
              <Field
                as="select"
                name="zone_type_id"
                class="form-select form-select-solid form-select-lg"
                v-model="profileDetails.zone_type_id"
              >
                <option v-for="(z, k) in zoneTypes" :key="k" :value="z.id">
                  {{ z.name }}
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="zone_type_id" />
                </div>
              </div>
              <!--end::Input-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Card body-->

        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            type="reset"
            class="btn btn-light btn-active-light-primary me-2"
          >
            Discard
          </button>

          <button
            type="submit"
            id="kt_account_profile_details_submit"
            ref="submitButton"
            class="btn btn-primary"
          >
            <span class="indicator-label"> Save Changes </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Actions-->
      </VForm>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Basic info-->

  <my-loader v-else></my-loader>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from "vue";
import {ErrorMessage, Field, Form as VForm} from "vee-validate";
import * as Yup from "yup";
import {useI18n} from "vue-i18n";
import type {IZone, IZoneRequest, IZoneType} from "@/types";
import {createZone, getAllTypeZone, getAllZone, getOneZone, updateZone,} from "@/core/services";
import MyLoader from "@/components/Loader.vue";
import {differentsPropValue, excludeParamsToObject, successAlert,} from "@/core/helpers";
import {useRoute, useRouter} from "vue-router";
import type {IHttpError} from "@/types/https";

export default defineComponent({
  name: "create-zone-form",
  components: {
    ErrorMessage,
    Field,
    MyLoader,
    VForm,
  },
  setup() {
    const {t} = useI18n();
    const submitButton = ref<HTMLElement | null>(null);
    const zoneTypes = ref<IZoneType[]>([]);
    const parentTypes = ref<IZone[]>([]);
    const isLoading = ref<boolean>(false);
    const currentZone = ref<IZone | null>(null);

    const router = useRouter();
    const route = useRoute();

    const id = computed<number | undefined>(() => +route.params.id);
    const initialValue = computed<IZoneRequest>(
        () =>
            ({
              name: currentZone.value?.name || "",
              short_name: currentZone.value?.short_name || "",
              country_code: currentZone.value?.country_code || "",
              parent_id: currentZone.value?.parent_id || 0,
              zone_type_id: currentZone.value?.zone_type_id || 0,
            } as IZoneRequest)
    );

    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const profileDetailsValidator = Yup.object().shape({
      country_code: Yup.string().required().label("Country code"),
      short_name: Yup.string().required().label("Short name"),
      zone_type_id: Yup.string().required().label("Zone type"),
      name: Yup.string().required().label("Name"),
    });

    onMounted(async () => {
      isLoading.value = true;
      await loadZoneForUpdate();

      const zT = await getAllTypeZone();
      if (zT) zoneTypes.value = zT;

      const z = await getAllZone();
      if (z) parentTypes.value = z.filter((z) => z.id !== id.value);

      isLoading.value = false;
    });

    const profileDetails = ref<IZoneRequest>({
      name: currentZone.value?.name || "",
      short_name: currentZone.value?.short_name || "",
      country_code: currentZone.value?.country_code || "",
      parent_id: currentZone.value?.parent_id || null,
      zone_type_id: currentZone.value?.zone_type_id || 0,
    });

    const saveChanges = async (data: IZoneRequest) => {
      if (submitButton.value) {
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
        if (!id.value) await create();
        else await update(data);
        submitButton.value?.removeAttribute("data-kt-indicator");
      }
    };

    const create = async () => {
      if (id.value) return;
      const response = await createZone(profileDetails.value);
      if (response) {
        successAlert("Zone créée avec success !").then(() => {
          router.push({name: "zone"});
        });
      }
    };
    const update = async (data: IZoneRequest) => {
      if (!id.value) return;
      const diff = differentsPropValue<IZoneRequest>(data, {
        ...currentZone.value,
      } as IZoneRequest);
      if (!diff.isDifferent) return;
      const objExcluded = excludeParamsToObject(data, diff.unchanged);
      const result = await updateZone(id.value, objExcluded);
      if ((result as IHttpError)?.success !== false) {
        successAlert("Zone modifiée avec success !").then(() => {
          router.push({name: "zone"});
        });
      }
    };

    const loadZoneForUpdate = async () => {
      if (id.value) {
        const zone = await getOneZone(id.value);
        if (!(zone as IHttpError).message) currentZone.value = zone as IZone;
      }
    };

    return {
      submitButton,
      saveChanges,
      profileDetails,
      emailFormDisplay,
      passwordFormDisplay,
      profileDetailsValidator,
      zoneTypes,
      parentTypes,
      isLoading,
      currentZone,
      initialValue,
      t,
    };
  },
});
</script>
