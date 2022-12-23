<template>
  <detail-modal-template
    :selector="props.selector"
    :identifier="props.zone?.id"
    @edit="goToEdit"
  >
    <template v-if="props.zone">
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
              zone?.name
            }}</span>
          </div>
          <!--end::Event name-->
          <!--begin::Event description-->
          <div class="fs-6" data-kt-calendar="event_description">
            <!--begin::Row-->
            <div class="row mb-7">
              <!--begin::Label-->
              <label class="col-lg-4 fw-semibold text-muted">Short name</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-8">
                <span class="fw-bold fs-6 text-gray-800">{{
                  zone?.short_name
                }}</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Row-->
            <!--begin::Input group-->
            <div class="row mb-7">
              <!--begin::Label-->
              <label class="col-lg-4 fw-semibold text-muted"
                >Country code</label
              >
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <span class="fw-semibold text-gray-800 fs-6">{{
                  zone?.country_code
                }}</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="row mb-7">
              <!--begin::Label-->
              <label class="col-lg-4 fw-semibold text-muted">Type</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <span class="fw-semibold text-gray-800 fs-6">{{
                  zone?.type.name
                }}</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="row mb-7">
              <!--begin::Label-->
              <label class="col-lg-4 fw-semibold text-muted">Created at</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <span class="fw-semibold text-gray-800 fs-6">{{
                  getDateFormated(zone?.created_at)
                }}</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="row mb-7" v-if="zone?.children.length">
              <!--begin::Label-->
              <label class="col-lg-4 fw-semibold text-muted"
                >Children zone</label
              >
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <span class="fw-semibold text-gray-800 fs-6">{{
                  zone.children.map((z) => z.name).join("; ")
                }}</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
            <!--begin::Input group-->
            <div class="row mb-7" v-if="zone?.mother">
              <!--begin::Label-->
              <label class="col-lg-4 fw-semibold text-muted">Parent zone</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <span class="fw-semibold text-gray-800 fs-6">{{
                  zone.mother.name
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
import type { IZone } from "@/types";
import DetailModalTemplate from "./DetailModalTemplate.vue";
import { useRouter } from "vue-router";

interface Props {
  zone?: IZone;
  selector: string;
}

const router = useRouter();

const goToEdit = () => {
  router.push({
    name: "update-zone",
    params: {
      id: props.zone?.id,
    },
  });
};

const props = defineProps<Props>();
</script>
