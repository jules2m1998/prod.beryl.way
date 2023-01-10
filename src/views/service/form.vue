<template>
  <div class="card rounded-0" v-if="!isLoading">
    <div class="card-header">
      <div class="card-title">
        {{ t("addService") }}
      </div>
    </div>
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <VForm
          id="kt_account_profile_details_form"
          :initial-values="initialValue"
          :validation-schema="agenceValidator"
          class="form"
          novalidate
          @submit="saveChange($event)"
          @invalid-submit="onInvalidSubmit"
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
                placeholder="Service name"
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
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Level</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                as="select"
                name="level"
                class="form-select form-select-solid form-select-lg"
              >
                <option :value="z" v-for="(z, k) in [1, 2]" :key="k">
                  {{ z }}
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="level" />
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
              <Field
                as="select"
                name="parent_id"
                class="form-select form-select-solid form-select-lg"
              >
                <option :value="z.id" v-for="(z, k) in zone" :key="k">
                  {{ z.name }}
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="parent_id" />
                </div>
              </div>
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
  </div>
  <my-loader v-else></my-loader>
</template>

<script setup lang="ts">
import {createService, getALlServices, getOneService, updateService,} from "@/core/services";
import type {IService, IServiceRequest} from "@/types";
import {ErrorMessage, Field, Form as VForm} from "vee-validate";
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import * as Yup from "yup";
import MyLoader from "@/components/Loader.vue";
import {differentsPropValue, excludeParamsToObject, objectToFormDataAndExclude, successAlert,} from "@/core/helpers";
import {useRoute, useRouter} from "vue-router";
import type {IHttpError} from "@/types/https";

const isLoading = ref<boolean>(false);
const zone = ref<IService[]>([]);
const current = ref<IService | null>(null);
const submitButton = ref<HTMLElement | null>(null);

const {t} = useI18n();
const router = useRouter();
const route = useRoute();

const agenceValidator = Yup.object().shape({
  name: Yup.string().required().label("Nom"),
  level: Yup.string().required().label("Level"),
  parent_id: Yup.string().required().label("parent"),
});

const initialValue = computed(() => ({
  name: current.value?.name || "",
  level: current.value?.level || "",
  parent_id: current.value?.parent_id || "",
}));

const create = async (values: IServiceRequest) => {
  const data = objectToFormDataAndExclude(values);
  const response = await createService(data);
  if (response) {
    successAlert("Service créée avec success !").then(() => {
      router.push({
        name: "services",
      });
    });
  }
};

const update = async (values: IServiceRequest) => {
  const diff = differentsPropValue<IServiceRequest>(
    values,
    current.value as IServiceRequest
  );
  if (!diff.isDifferent) return;
  const objExcluded = excludeParamsToObject(values, diff.unchanged);
  const result = await updateService(objExcluded, +current.value!.id);
  if ((result as IHttpError)?.success !== false)
    successAlert("Service modifier avec success !").then(() => {
      router.push({
        name: "services",
      });
    });
};

const saveChange = async (values: any) => {
  submitButton?.value?.setAttribute("data-kt-indicator", "on");
  if (!current.value) await create(values as IServiceRequest);
  else await update(values);
  submitButton?.value?.removeAttribute("data-kt-indicator");
};
const onInvalidSubmit = (values: any) => {
  console.log(values);
};

onMounted(async () => {
  isLoading.value = true;
  if (route.params.id) {
    const cur = await getOneService(+route.params.id);
    if (!(cur as IHttpError).success) current.value = cur as IService;
  }
  const s = await getALlServices();
  if (s) zone.value = s.filter((s) => s.id !== +route.params.id);
  isLoading.value = false;
});
</script>
