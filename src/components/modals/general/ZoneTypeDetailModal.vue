<template>
  <detail-modal-template
    :selector="props.selector"
    :identifier="props.typeZone?.id"
    @edit="goToEdit"
  >
    <template v-if="props.typeZone">
      <!--begin::Row-->
      <div class="d-flex">
        <!--begin::Icon-->
        <!--begin::Svg Icon | path: icons/duotune/general/gen014.svg-->
        <inline-svg
          style="width: 50px"
          class="me-5"
          src="/media/icons/duotune/maps/map001.svg"
        />
        <!--end::Svg Icon-->
        <!--end::Icon-->
        <div class="mb-9">
          <!--begin::Event name-->
          <div class="d-flex align-items-center mb-9">
            <span class="fs-3 fw-bold me-3" data-kt-calendar="event_name">{{
              typeZone?.name
            }}</span>
          </div>
          <!--end::Event name-->
          <!--begin::Event description-->
          <div class="fs-6" data-kt-calendar="event_description">
            <!--begin::Input group-->
            <div class="row mb-7">
              <!--begin::Label-->
              <label class="col-lg-4 fw-semibold text-muted">Created at</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <span class="fw-semibold text-gray-800 fs-6">{{
                  getDateFormated(typeZone?.created_at)
                }}</span>
              </div>
              <!--end::Col-->
            </div>
            <div class="row mb-7">
              <!--begin::Label-->
              <label class="col-lg-4 fw-semibold text-muted">Level</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <span class="fw-semibold text-gray-800 fs-6">{{
                  typeZone?.level
                }}</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
          </div>
          <!--end::Event description-->
        </div>
      </div>
      <!--end::Row-->
    </template>
  </detail-modal-template>
</template>

<script setup lang="ts">
import { getDateFormated } from "@/core/helpers";
import type { IZoneType } from "@/types";
import DetailModalTemplate from "./DetailModalTemplate.vue";
import { useRouter } from "vue-router";

interface Props {
  typeZone?: IZoneType;
  selector: string;
}

const router = useRouter();

const goToEdit = () => {
  router.push({
    name: "zone-type-update",
    params: {
      id: props.typeZone?.id,
    },
  });
};

const props = defineProps<Props>();
</script>
