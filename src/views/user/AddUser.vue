<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10" v-if="!is_loading">
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
        <h3 class="fw-bold m-0">Create user</h3>
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
        @submit="saveChanges1"
        @invalid-submit="handleInvalid"
        :validation-schema="userValidator"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group AVATAR-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Avatar</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <form-image
                v-model:file="file"
                defaul-img="/media/default/default-agency.png"
              ></form-image>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group FULL NAME-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Full Name</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <Field
                type="text"
                name="name"
                class="form-control form-control-lg form-control-solid"
                placeholder="Full name"
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

          <!--begin::Input group Phone-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Contact Phone</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="tel"
                name="phone"
                class="form-control form-control-lg form-control-solid"
                placeholder="Phone number"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="phone" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group EMAIL-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Email</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="email"
                class="form-control form-control-lg form-control-solid"
                placeholder="Company name"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="email" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group EMAIL-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Password</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="password"
                class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                name="password"
                id="currentpassword"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="password" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group IS_CLIENT-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Is a client</label
            >
            <!--begin::Label-->

            <!--begin::Label-->
            <div class="col-lg-8 d-flex align-items-center">
              <div class="form-check form-check-solid form-switch fv-row">
                <input
                  class="form-check-input w-45px h-30px"
                  type="checkbox"
                  id="allowmarketing"
                  name="is_client"
                  v-model="val_con"
                />
                <label class="form-check-label" for="allowmarketing"></label>
              </div>
            </div>
            <!--begin::Label-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group AGENCE-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Agence</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                as="select"
                name="agency_id"
                class="form-select form-select-solid form-select-lg fw-semobold"
              >
                <option :value="v.id" v-for="(v, k) in agences" :key="k">
                  {{ v.name }}
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="agency_id" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group ITERACTION TYPE-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Role</span>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                as="select"
                name="interaction_type_id"
                class="form-select form-select-solid form-select-lg fw-semobold"
              >
                <option :value="v.id" v-for="(v, k) in interact" :key="k">
                  {{ v.name }}
                </option>
              </Field>
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="interaction_type_id" />
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
            ref="submitButton1"
            class="btn btn-primary"
          >
            <span class="indicator-label"> Create </span>
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
import { defineComponent, ref, onMounted } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import type { IAgence, IUserRequest } from "@/types";
import { objectToFormData } from "@/core/helpers";
import FormImage from "@/components/files/FormImage.vue";
import { createUser, getAllAgence } from "@/core/services";
import { makeRequestAndAlert } from "@/core/helpers";
import MyLoader from "@/components/Loader.vue";

interface ITypesInteraction {
  id: number;
  name: string;
}

export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
    FormImage,
    VForm,
    MyLoader,
  },
  setup() {
    const submitButton1 = ref<HTMLElement | null>(null);
    const is_client = ref<0 | 1>(0);
    const val_con = ref();
    const file = ref<File | null>(null);

    const agences = ref<IAgence[]>([]);
    const interact = ref<any[]>([]);
    const is_loading = ref<boolean>(false);

    const userValidator = Yup.object().shape({
      name: Yup.string().required().label("Full name"),
      phone: Yup.string().required().label("Contact phone"),
      email: Yup.string().email().required().label("Email"),
      password: Yup.string().label("Password"),
      agency_id: Yup.string().required().label("Agence"),
      interaction_type_id: Yup.string().required().label("Role"),
    });

    const saveChanges1 = async (e: any) => {
      if (submitButton1.value) {
        // Activate indicator
        submitButton1.value.setAttribute("data-kt-indicator", "on");
        const data = e as IUserRequest;
        data.is_client = val_con.value ? 1 : 0;
        if (file.value) data.path = file.value;

        const formData = objectToFormData(data);
        await makeRequestAndAlert(
          "Utilisateur créé avec succes",
          "Erreure lors de la creation de cet utilisateur",
          "users",
          async () => await createUser(formData)
        );
        console.log(data);
        setTimeout(() => {
          submitButton1.value?.removeAttribute("data-kt-indicator");
        }, 2000);
      }
    };

    const handleInvalid = (e) => {
      console.log(e);
    };

    onMounted(async () => {
      const agencies = await getAllAgence();
      const interaction: ITypesInteraction[] = [
        {
          id: 2,
          name: "Customer care",
        },
        {
          id: 3,
          name: "Account manager",
        },
        {
          id: 4,
          name: "Director",
        },
        {
          id: 5,
          name: "On board",
        },
      ];

      if (agencies) agences.value = agencies;
      if (interaction) interact.value = interaction;
    });

    return {
      submitButton1,
      saveChanges1,
      handleInvalid,
      is_client,
      val_con,
      file,
      agences,
      interact,
      is_loading,
      userValidator,
    };
  },
});
</script>
