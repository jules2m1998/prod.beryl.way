<template>
  <div class="card rounded-0 mb-5 mb-xl-10">
    <!--begin::Content-->
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <VForm
        id="kt_account_profile_details_form"
        class="form"
        novalidate
        @submit="() => null"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Question</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                :model-value="current?.title"
                class="form-control form-control-lg form-control-solid"
                name="question"
                placeholder="Edit question..."
                type="text"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="question" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6"
              >Steps</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <template v-for="(v, k) in current?.answers" :key="k">
                <Field
                  :model-value="v.value"
                  :name="'question' + k"
                  as="textarea"
                  class="form-control form-control-lg form-control-solid"
                  cols="33"
                  placeholder="Edit question..."
                  rows="5"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="question" />
                  </div>
                </div>
                <button
                  v-if="response.length > 1"
                  class="btn btn-link me-2"
                  @click.prevent="removeStep(k)"
                >
                  Remove this step
                </button>
              </template>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->
        </div>
        <!--end::Card body-->

        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            class="btn btn-active-light-primary btn-active-light-primary me-2"
            @click.prevent="addStep"
          >
            Add a step
          </button>
          <button
            class="btn btn-light btn-active-light-primary me-2"
            type="reset"
          >
            Discard
          </button>

          <button
            id="kt_account_profile_details_submit"
            ref="submitButton1"
            class="btn btn-primary"
            type="submit"
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
  <loader></loader>
  <!--end::Content-->
</template>

<script setup lang="ts">
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useRoute } from "vue-router";
import type { Ref } from "vue";
import { computed, onMounted, ref } from "vue";
import type { IFaq, IFaqWithResponse } from "@/types/faq";
import { getOneFaq } from "@/core/services";
import type { IHttpError } from "@/types/https";
import Loader from "@/components/Loader.vue";

const route = useRoute();

const response: Ref<string[]> = ref<string[]>([""]);
const current: Ref<Partial<IFaqWithResponse>> = ref<Partial<IFaqWithResponse>>({
  title: "",
  answers: [
    {
      value: "",
      step: 0,
    },
  ],
});
const isLoading: Ref<boolean> = ref<boolean>(false);

onMounted(async () => {
  const id = +route.params.id;
  if (id) {
    isLoading.value = true;
    const f = await getOneFaq(+route.params.id);
    if (!(f as IHttpError).message) {
      const r = f as IFaq;
      current.value = { ...r, answers: JSON.parse(r.answers) };
    }
    isLoading.value = false;
  }
});

const addStep = () => {
  response.value.push("");
};

const isEmptyStep = computed<boolean>(() => {
  return response.value.length > 1;
});

const removeStep = (position: number) => {
  if (response.value.length > 1)
    response.value = response.value.filter((_, index) => index !== position);
};
</script>
