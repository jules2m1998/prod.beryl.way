<template>
  <!--begin::Modal - Create Api Key-->
  <div
    class="modal fade"
    id="kt_modal_set_date"
    ref="createAPIKeyModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_create_api_key_header">
          <!--begin::Modal title-->
          <h2>Reschedule an appointment</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <div class="modal-body">
          <template v-for="(s, k) in slots" :key="k">
            <h6 class="text-muted">
              {{ getI18nDate(new Date(s.date.toString())).format("ll") }}
            </h6>
            <div style="display: flex; gap: 10px" class="mb-5">
              <button
                class="btn btn-sm"
                :class="{
                  'btn-primary':
                    t.start === selectedTime?.start &&
                    t.end === selectedTime?.end &&
                    s.date === selectedDate?.date,
                }"
                v-for="(t, k) in s.values.filter((rr) => rr.available)"
                :key="k"
                @click="() => setActive(s, t)"
              >
                {{ t.start }} - {{ t.end }}
              </button>
            </div>
          </template>
        </div>
        <div class="modal-footer" v-if="selectedDate && selectedTime">
          <button
            class="btn btn-primary"
            @click="update"
            data-bs-dismiss="modal"
          >Update</button>
        </div>
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - Create Api Key-->
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { ISlot, ISlotPeriod } from "@/types";
import { getI18nDate } from "@/core/helpers";

defineProps<{
  slots: ISlot[];
}>();

const emit = defineEmits<{
  (e: "update", { slot: ISlot, period: ISlotPeriod });
}>();

const selectedDate = ref<ISlot | null>(null);
const selectedTime = ref<ISlotPeriod | null>(null);

const setActive = (slot: ISlot, period: ISlotPeriod) => {
  selectedDate.value = slot;
  selectedTime.value = period;
};
const update = () => {
  emit("update", {
    slot: { ...selectedDate.value },
    period: { ...selectedTime.value },
  });
};
</script>
<style scoped></style>
