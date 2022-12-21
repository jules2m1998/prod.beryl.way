<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
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
        <h3 class="fw-bold m-0">{{ t("adminZoneTypeCreate") }}</h3>
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
        @submit="saveChanges1()"
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
                name="company"
                class="form-control form-control-lg form-control-solid"
                placeholder="Company name"
                v-model="profileDetails.company"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="company" />
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
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useI18n } from "vue-i18n";

interface ProfileDetails {
  avatar: string;
  name: string;
  surname: string;
  company: string;
  contactPhone: string;
  companySite: string;
  country: string;
  language: string;
  timezone: string;
  currency: string;
  communications: {
    email: boolean;
    phone: boolean;
  };
  allowMarketing: boolean;
}

export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  setup() {
    const { t } = useI18n();
    const submitButton1 = ref<HTMLElement | null>(null);
    const submitButton2 = ref<HTMLElement | null>(null);
    const submitButton3 = ref<HTMLElement | null>(null);
    const submitButton4 = ref<HTMLElement | null>(null);
    const submitButton5 = ref<HTMLElement | null>(null);
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);

    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const profileDetailsValidator = Yup.object().shape({
      fname: Yup.string().required().label("First name"),
      lname: Yup.string().required().label("Last name"),
      company: Yup.string().required().label("Company"),
      phone: Yup.string().required().label("Contact phone"),
      website: Yup.string().label("Webside"),
      country: Yup.string().required().label("Country"),
      language: Yup.string().required().label("Language"),
      timezone: Yup.string().required().label("Timezone"),
      currency: Yup.string().required().label("Currency"),
    });

    const changeEmail = Yup.object().shape({
      emailaddress: Yup.string().required().email().label("Email"),
      confirmemailpassword: Yup.string().required().label("Password"),
    });

    const changePassword = Yup.object().shape({
      currentpassword: Yup.string().required().label("Current password"),
      newpassword: Yup.string().min(4).required().label("Password"),
      confirmpassword: Yup.string()
        .min(4)
        .required()
        .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
        .label("Password Confirmation"),
    });

    const profileDetails = ref<ProfileDetails>({
      avatar: "/media/avatars/300-1.jpg",
      name: "Max",
      surname: "Smith",
      company: "Keenthemes",
      contactPhone: "044 3276 454 935",
      companySite: "keenthemes.com",
      country: "MY",
      language: "msa",
      timezone: "Kuala Lumpur",
      currency: "USD",
      communications: {
        email: false,
        phone: false,
      },
      allowMarketing: false,
    });

    const saveChanges1 = () => {
      if (submitButton1.value) {
        // Activate indicator
        submitButton1.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          submitButton1.value?.removeAttribute("data-kt-indicator");
        }, 2000);
      }
    };

    const saveChanges2 = () => {
      if (submitButton2.value) {
        // Activate indicator
        submitButton2.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          submitButton2.value?.removeAttribute("data-kt-indicator");
        }, 2000);
      }
    };

    const saveChanges3 = () => {
      if (submitButton3.value) {
        // Activate indicator
        submitButton3.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          submitButton3.value?.removeAttribute("data-kt-indicator");
        }, 2000);
      }
    };

    const saveChanges4 = () => {
      if (submitButton4.value) {
        // Activate indicator
        submitButton4.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          submitButton4.value?.removeAttribute("data-kt-indicator");
        }, 2000);
      }
    };

    const deactivateAccount = () => {
      if (submitButton5.value) {
        // Activate indicator
        submitButton5.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          submitButton5.value?.removeAttribute("data-kt-indicator");

          Swal.fire({
            text: "Email is successfully changed!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          }).then(() => {
            emailFormDisplay.value = false;
          });
        }, 2000);
      }
    };

    const updateEmail = () => {
      if (updateEmailButton.value) {
        // Activate indicator
        updateEmailButton.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          updateEmailButton.value?.removeAttribute("data-kt-indicator");

          emailFormDisplay.value = false;
        }, 2000);
      }
    };

    const updatePassword = () => {
      if (updatePasswordButton.value) {
        // Activate indicator
        updatePasswordButton.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          updatePasswordButton.value?.removeAttribute("data-kt-indicator");

          Swal.fire({
            text: "Password is successfully changed!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          }).then(() => {
            passwordFormDisplay.value = false;
          });
        }, 2000);
      }
    };

    const removeImage = () => {
      profileDetails.value.avatar = "/media/avatars/blank.png";
    };

    return {
      submitButton1,
      submitButton2,
      submitButton3,
      submitButton4,
      submitButton5,
      saveChanges1,
      saveChanges2,
      saveChanges3,
      saveChanges4,
      deactivateAccount,
      profileDetails,
      emailFormDisplay,
      passwordFormDisplay,
      removeImage,
      profileDetailsValidator,
      changeEmail,
      changePassword,
      updateEmailButton,
      updatePasswordButton,
      updateEmail,
      updatePassword,
      t,
    };
  },
});
</script>
