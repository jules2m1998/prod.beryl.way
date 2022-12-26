<template>
  <div class="card rounded-0" v-if="!isLoading">
    <div class="card-header">
      <div class="card-title">
        {{ t("addAgence") }}
      </div>
    </div>
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <VForm
        id="kt_account_profile_details_form"
        class="form"
        novalidate
        :validation-schema="agenceValidator"
        @submit="saveChange($event as unknown as IAgenceRequest)"
        @invalid-submit="onInvalidSubmit"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Photo</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <form-image
                v-model:file="file"
                defaul-img="/media/default/default-agency.png"
              ></form-image>
              <!--begin::Hint-->
              <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
              <!--end::Hint-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

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
                placeholder="Agency name"
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
              >Location</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="location"
                class="form-control form-control-lg form-control-solid"
                placeholder="Agency location"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="location" />
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
              <span class="required">Longitude</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="number"
                name="longitude"
                class="form-control form-control-lg form-control-solid"
                placeholder="Longitude"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="longitude" />
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
              <span class="required">Latitude</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="number"
                name="latitude"
                class="form-control form-control-lg form-control-solid"
                placeholder="Latitude"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="latitude" />
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
              >Zone</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                as="select"
                name="zone_id"
                class="form-select form-select-solid form-select-lg"
              >
                <option :value="z.id" v-for="(z, k) in zone" :key="k">
                  {{ z.name }}
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="zone_id" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-0">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6 required"
              >Active</label
            >
            <!--begin::Label-->

            <!--begin::Label-->
            <div class="col-lg-8 d-flex align-items-center">
              <div class="form-check form-check-solid form-switch fv-row">
                <Field
                  type="checkbox"
                  name="active"
                  class="form-check-input w-45px h-30px"
                />
                <label class="form-check-label" for="allowmarketing"></label>
              </div>
            </div>
            <!--begin::Label-->
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
import { getAllZone, createAgence } from "@/core/services";
import type { IZone, IAgenceRequest } from "@/types";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { ref, onMounted, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import * as Yup from "yup";
import MyLoader from "@/components/Loader.vue";
import FormImage from "@/components/files/FormImage.vue";
import { errorAlert, successAlert } from "@/core/helpers";
import { useRouter } from "vue-router";

const isLoading = ref<boolean>(false);
const zone = ref<IZone[]>();
const submitButton = ref<HTMLElement | null>(null);
const file: Ref<File | null> = ref<File | null>(null);

const { t } = useI18n();
const router = useRouter();

const agenceValidator = Yup.object().shape({
  location: Yup.string().required().label("Location"),
  name: Yup.string().required().label("Location"),
  longitude: Yup.string().required().label("Longitude"),
  latitude: Yup.string().required().label("Latitude"),
  zone_id: Yup.string().required().label("Zone"),
});

const saveChange = async (values: IAgenceRequest) => {
  submitButton?.value?.setAttribute("data-kt-indicator", "on");
  console.log(values);
  values.active = !values.active ? 1 : 0;
  const data = new FormData();

  for (const [key, value] of Object.entries(values)) {
    data.append(key, value);
  }

  if (file.value) data.append("path", file.value as Blob);

  const response = await createAgence(data);
  if (response) {
    successAlert("Agence créée avec success !").then(() => {
      router.push({
        name: "agencies",
      });
    });
  } else {
    errorAlert(
      "Echec lors de la creation de l'agence verifiez vos informations et reessayez !"
    );
  }
  submitButton?.value?.removeAttribute("data-kt-indicator");
};
const onInvalidSubmit = (values: any) => {
  console.log(values);
};

onMounted(async () => {
  isLoading.value = true;
  const z = await getAllZone();
  if (z) zone.value = z;
  isLoading.value = false;
});
</script>
