<template>
  <div
    class="modal fade"
    id="kt_modal_calendar_detail"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header pb-0 border-0 justify-content-end">
          <!--begin::Close-->
          <button
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Edit"
            @click="openEditAppointment"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/art/art005.svg" />
            </span>
          </button>
          <!--end::Close-->
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-icon-danger"
            data-bs-dismiss="modal"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Delete"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/general/gen027.svg" />
            </span>
          </div>
          <!--end::Close-->
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Close"
            @click="emit('close')"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <div class="modal-body pt-0 pb-20 px-lg-17">
          <!--begin::Row-->
          <div class="d-flex">
            <!--begin::Icon-->
            <!--begin::Svg Icon | path: icons/duotune/general/gen014.svg-->
            <inline-svg
              class="me-5"
              src="/media/icons/duotune/general/gen014.svg"
            />
            <!--end::Svg Icon-->
            <!--end::Icon-->
            <div class="mb-9">
              <!--begin::Event name-->
              <div class="d-flex align-items-center mb-2">
                <span class="fs-3 fw-bold me-3" data-kt-calendar="event_name"
                  >Rendez-vous avec le client ({{
                    props.current?.client.user.name
                  }})</span
                >
                <span
                  class="badge badge-light-success"
                  data-kt-calendar="all_day"
                  >All Day</span
                >
              </div>
              <!--end::Event name-->
              <!--begin::Event description-->
              <div class="fs-6" data-kt-calendar="event_description">
                {{ $props.current?.reason }}
              </div>
              <!--end::Event description-->
            </div>
          </div>
          <!--end::Row-->
          <!--begin::Row-->
          <div class="d-flex align-items-center mb-2">
            <!--begin::Icon-->
            <!--begin::Svg Icon | path: icons/duotune/abstract/abs050.svg-->
            <inline-svg
              class="me-5"
              src="/media/icons/duotune/abstract/abs050.svg"
            />
            <!--end::Svg Icon-->
            <!--end::Icon-->
            <!--begin::Event start date/time-->
            <div class="fs-6">
              <span class="fw-bold me-1">Starts</span>
              <span data-kt-calendar="event_start_date">{{
                getDateFormated(props.current?.time)
              }}</span>
            </div>
            <!--end::Event start date/time-->
          </div>
          <!--end::Row-->
          <!--begin::Row-->
          <div class="d-flex align-items-center mb-9">
            <!--begin::Icon-->
            <!--begin::Svg Icon | path: icons/duotune/abstract/abs050.svg-->
            <span class="svg-icon svg-icon-1 svg-icon-danger me-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
              >
                <circle fill="currentColor" cx="12" cy="12" r="8"></circle>
              </svg>
            </span>
            <!--end::Svg Icon-->
            <!--end::Icon-->
            <!--begin::Event end date/time-->
            <div class="fs-6">
              <span class="fw-bold me-1">Ends</span>
              <span data-kt-calendar="event_end_date">{{
                getDateFormated(endDate)
              }}</span>
            </div>
            <!--end::Event end date/time-->
          </div>
          <!--end::Row-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDateFormated } from "@/core/helpers";
import type { IAppointment } from "@/types";
import { computed } from "vue";

interface IProps {
  current?: IAppointment;
}

const props = defineProps<IProps>();
const emit = defineEmits<{
  (e: "close"): void;
  (e: "edit", id: number): void;
}>();

const endDate = computed<Date>(() => {
  if (!props.current) return new Date();
  const copy = new Date(props.current.time && new Date());
  copy.setHours(copy.getHours() + 1);
  return copy;
});

const openEditAppointment = () => {
  if (!props.current) return;
  emit("edit", props.current?.id);
};
</script>
