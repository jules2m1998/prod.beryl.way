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
        :initial-values="initialValues"
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
                :defaul-img="defaultImg"
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
            <span class="indicator-label"> Send </span>
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
import { defineComponent, ref, onMounted, computed } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import type { IAgence, IUserRequest } from "@/types";
import {
  differentsPropValue,
  excludeParamsToObject,
  getImagePathToServer,
  objectToFormData, successAlert
} from "@/core/helpers";
import FormImage from "@/components/files/FormImage.vue";
import { createUser, getAllAgence, getOneUser, updateUser } from "@/core/services";
import MyLoader from "@/components/Loader.vue";
import type { IHttpError } from "@/types/https";
import type { IUser } from "@/types";
import { useRoute } from "vue-router";

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
    const route = useRoute();
    const currentUser = ref<IUser | null>(null);
    const defaultImg = ref<string>("/media/default/default-agency.png");

    const agences = ref<IAgence[]>([]);
    const interact = ref<any[]>([]);
    const is_loading = ref<boolean>(false);

    const updateId = computed<number>(() => +route.params.id);
    const initialValues = computed<Partial<IUserRequest>>(() => {
      if (currentUser.value)
        return {
          name: currentUser.value.name,
          phone: currentUser.value.phone,
          email: currentUser.value.email,
          password: "",
          agency_id: currentUser.value.agencies[0]?.id,
        };
      return {};
    });

    const userValidator = Yup.object().shape({
      name: Yup.string().required().label("Full name"),
      phone: Yup.string().required().label("Contact phone"),
      email: Yup.string().email().required().label("Email"),
      password: Yup.string().label("Password"),
      agency_id: Yup.string().required().label("Agence"),
      interaction_type_id: Yup.string().required().label("Role"),
    });

    const create = async (data: IUserRequest) => {
      const formData = objectToFormData(data);
      await createUser(formData);
    };

    const update = async (data: IUserRequest) => {
      const updated = excludeParamsToObject(
        data,
        differentsPropValue<Partial<IUserRequest>>(data, initialValues.value)
          .unchanged
      );
      const formData = objectToFormData(updated);
      const updateResult = await updateUser(formData, updateId.value);
      if ((updateResult as IHttpError).message) await successAlert("User updated successfully !")
    };

    const saveChanges1 = async (e: any) => {
      if (submitButton1.value) {
        // Activate indicator
        submitButton1.value.setAttribute("data-kt-indicator", "on");
        const data = e as IUserRequest;
        data.is_client = val_con.value ? 1 : 0;
        if (file.value) data.path = file.value;

        if (!updateId.value) await create(data);
        else await update(data);
        submitButton1.value?.removeAttribute("data-kt-indicator");
      }
    };

    const handleInvalid = (e) => {
      console.log(e);
    };

    const loadUpdateUser = async () => {
      if (updateId.value) {
        const u = await getOneUser(updateId.value);
        if (!(u as IHttpError).message) {
          const user = u as IUser;
          currentUser.value = user;
          if (user.avatar) defaultImg.value = getImagePathToServer(user.avatar);
        }
      }
    };

    onMounted(async () => {
      is_loading.value = true;
      await loadUpdateUser();
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
      is_loading.value = false;
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
      currentUser,
      initialValues,
      defaultImg,
    };
  },
});
</script>
