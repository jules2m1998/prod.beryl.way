<template>
  <div
    class="modal fade show"
    id="kt_modal_add_event"
    aria-modal="true"
    role="dialog"
    ref="newTargetModalRef"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <el-form
          class="form fv-plugins-bootstrap5 fv-plugins-framework"
          id="kt_modal_add_event_form"
          @submit.prevent="submit()"
          ref="formRef"
          label-position="top"
        >
          <div class="modal-header">
            <h2 class="fw-bold">Add slots</h2>
            <div
              class="btn btn-icon btn-sm btn-active-icon-primary"
              id="kt_modal_add_event_close"
              data-bs-dismiss="modal"
            >
              <span class="svg-icon svg-icon-1">
                <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
              </span>
            </div>
          </div>
          <!--end::Modal header-->
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <div class="row mb-9">
              <el-form-item label="Type de période">
                <el-select
                  v-model="selectedPeriodType"
                  placeholder="please select your period"
                  @change="onSelectChange"
                >
                  <el-option
                    v-for="(p, k) in typePeriod"
                    :key="k"
                    :label="p.label"
                    :value="p.value"
                  />
                </el-select>
              </el-form-item>
            </div>
            <!--begin::Input group-->
            <div>
              <h3 class="row">Slot</h3>
              <div class="row">
                <div
                  class="fv-row fv-plugins-icon-container fv-plugins-bootstrap5-row-valid"
                >
                  <!--begin::Input-->
                  <el-form-item label="Date" required>
                    <el-date-picker
                      :type="compDateType"
                      :teleported="false"
                      :disabled-date="disabledDate"
                      start-placeholder="Start date"
                      end-placeholder="End date"
                      placeholder="Enter date"
                      v-model="form.date"
                    />
                  </el-form-item>
                  <!--end::Input-->
                  <div
                    class="fv-plugins-message-container invalid-feedback"
                  ></div>
                </div>
              </div>
              <div class="row" v-for="(p, i) in form.values" :key="i">
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <div
                    class="fv-row mb-9 fv-plugins-icon-container fv-plugins-bootstrap5-row-valid"
                  >
                    <!--begin::Input-->
                    <el-form-item label="Start hour" required>
                      <el-time-picker
                        v-model="form.values[i].start"
                        type="time"
                        :teleported="false"
                        name="startTime"
                      />
                    </el-form-item>
                    <!--end::Input-->
                    <div
                      class="fv-plugins-message-container invalid-feedback"
                    ></div>
                  </div>
                </div>
                <div class="col-lg-5 col-md-5 col-sm-5">
                  <div
                    class="fv-row mb-9 fv-plugins-icon-container fv-plugins-bootstrap5-row-valid"
                  >
                    <!--begin::Input-->
                    <el-form-item label="End hour" required>
                      <el-time-picker
                        v-model="form.values[i].end"
                        type="time"
                        :teleported="false"
                        name="startTime"
                      />
                    </el-form-item>
                    <!--end::Input-->
                    <div
                      class="fv-plugins-message-container invalid-feedback"
                    ></div>
                  </div>
                </div>
                <div
                  class="col-lg-1 col-md-1 col-sm-1 d-flex justify-content-center align-items-center"
                >
                  <!--end::Input group-->
                  <span
                    type="button"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete this slot"
                    @click="removeThis(i)"
                  >
                    <inline-svg
                      color="red"
                      src="media/icons/duotune/general/gen040.svg"
                    />
                  </span>
                </div>
              </div>
            </div>
            <!--end::Input group-->
            <button
              type="button"
              class="btn btn-sm btn-link"
              @click="addPeriod"
            >
              Add slot
            </button>
          </div>
          <!--end::Modal body-->
          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <button
              data-bs-dismiss="modal"
              type="reset"
              id="kt_modal_add_event_cancel"
              class="btn btn-light me-3"
            >
              Cancel
            </button>
            <!--end::Button-->
            <!--begin::Button-->
            <button
              :data-kt-indicator="loading ? 'on' : null"
              :disabled="!isValid"
              class="btn btn-lg btn-primary"
              type="submit"
            >
              <span v-if="!loading" class="indicator-label">
                Submit
                <span class="svg-icon svg-icon-3 ms-2 me-0">
                  <inline-svg src="/media/icons/duotune/arrows/arr064.svg" />
                </span>
              </span>
              <span v-if="loading" class="indicator-progress">
                Please wait...
                <span
                  class="spinner-border spinner-border-sm align-middle ms-2"
                ></span>
              </span>
            </button>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
          <div></div>
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import {
  formatDate,
  formatTime,
  successAlert,
  errorAlert,
} from "@/core/helpers";
import type { FormRules } from "element-plus";
import type { IAppointment, IAppointmentRequest, ISlot } from "@/types";
import { createAppointment } from "@/core/services";

interface NewAddressData {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

interface TypePeriod {
  label: string;
  value: number;
}

interface Props {
  selectedDate: IAppointment | undefined;
}

export default defineComponent({
  name: "new-event-modal",
  components: {},
  emits: ["refresh"],
  setup(props: Props, { emit }) {
    const formRef = ref<null | HTMLFormElement>(null);
    const newTargetModalRef = ref<null | HTMLElement>(null);
    const loading = ref<boolean>(false);
    const authStore = useAuthStore();

    const disabledDate = (time: Date) => {
      return time.getTime() <= Date.now();
    };

    const targetData = ref<NewAddressData>({
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
    });

    const form = ref<ISlot>({
      id: 1,
      created_at: "",
      date: "",
      values: [
        {
          start: "",
          end: "",
        },
      ],
    });

    const typePeriod = ref<TypePeriod[]>([
      {
        label: "Période",
        value: 1,
      },
      {
        label: "Jour",
        value: 2,
      },
    ]);

    const selectedPeriodType = ref<number>(typePeriod.value[1].value);

    const compDateType = computed(() =>
      selectedPeriodType.value === 1 ? "daterange" : "date"
    );

    const isValid = computed<boolean>(
      () =>
        !!form.value.date && form.value.values.every((e) => e.end && e.start)
    );

    const addPeriod = () => {
      form.value.values.push({
        start: "",
        end: "",
      });
    };
    const removeThis = (pos: number) => {
      if (form.value.values.length > 1)
        form.value.values = form.value.values.filter((_, k) => k !== pos);
    };

    const resetForm = () => {
      form.value = {
        id: 1,
        created_at: "",
        date: "",
        values: [
          {
            start: "",
            end: "",
          },
        ],
      };
    };
    const onSelectChange = () => {
      resetForm();
    };

    const rules = ref<FormRules>({
      startDate: [
        {
          required: true,
          message: "Please input a valid start date",
          trigger: "blur",
        },
      ],
      startTime: [
        {
          type: "date",
          required: true,
          message: "Please input a valid start time",
          trigger: "blur",
        },
      ],
      endDate: [
        {
          type: "date",
          required: true,
          message: "Please input a valid end date",
          trigger: "blur",
        },
      ],
      endTime: [
        {
          type: "date",
          required: true,
          message: "Please input a valid end time",
          trigger: "blur",
        },
      ],
    });

    const submit = async () => {
      loading.value = true;
      const currentUser = authStore.user;
      const d = form.value.date;
      const is_date = d instanceof Date;
      const date: string | string[] = is_date
        ? formatDate(d)
        : JSON.stringify((d as string[]).map((d) => formatDate(d)));

      const ap: IAppointmentRequest = {
        date,
        values: JSON.stringify(
          form.value.values.map((s) => ({
            start: formatTime(s.start),
            end: formatTime(s.end),
            available: true,
          }))
        ),
        user_agency_id: currentUser.user_agency[0].id,
      };
      if (!is_date) ap.is_period = 1;
      console.log(ap);
      const result = await createAppointment(ap);
      if (result) {
        emit("refresh");
        successAlert("Enregistrement effectué avec success");
        resetForm();
      } else {
        errorAlert(
          "Impossible d'effectuer cette enregistrement veillez verifier les informations soumises !"
        );
      }
      console.log(result);
      loading.value = false;
    };

    return {
      formRef,
      newTargetModalRef,
      loading,
      targetData,
      rules,
      submit,
      emit,
      form,
      addPeriod,
      typePeriod,
      selectedPeriodType,
      isValid,
      compDateType,
      removeThis,
      disabledDate,
      onSelectChange,
      props,
    };
  },
});
</script>

<style lang="scss">
.el-select {
  width: 100%;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
