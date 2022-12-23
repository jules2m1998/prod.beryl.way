<template>
  <detail-modal-template
    :selector="props.selector"
    :identifier="props.agence?.id"
    @edit="goToEdit"
  >
    <template v-if="props.agence">
      <!--begin::Details-->
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <!--begin: Pic-->
        <div class="me-7 mb-4">
          <div
            class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
          >
            <img
              src="/media/logos/logo_beryl.png"
              class="img-fluid img-thumbnail"
              style="object-fit: contain"
              alt="image"
            />
          </div>
        </div>
        <!--end::Pic-->

        <!--begin::Info-->
        <div class="flex-grow-1">
          <!--begin::Title-->
          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <!--begin::User-->
            <div class="d-flex flex-column">
              <!--begin::Name-->
              <div class="d-flex align-items-center mb-2">
                <a
                  href="#"
                  class="text-gray-800 text-hover-primary fs-2 fw-bold me-1"
                  >{{ agence?.name }}</a
                >
                <a href="#">
                  <span class="svg-icon svg-icon-1 svg-icon-primary">
                    <inline-svg src="/media/icons/duotune/general/gen026.svg" />
                  </span>
                </a>
              </div>
              <!--end::Name-->

              <!--begin::Info-->
              <div class="d-flex flex-wrap fw-semobold fs-6 mb-4 pe-2">
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotune/maps/map002.svg" />
                  </span>
                  {{ agence?.location }}
                </a>
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotune/general/gen018.svg" />
                  </span>
                  lat., {{ agence?.latitude }}
                </a>
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotune/general/gen018.svg" />
                  </span>
                  ln., {{ agence?.longitude }}
                </a>
                <a
                  href="#"
                  class="d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2"
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg src="/media/icons/duotune/general/gen014.svg" />
                  </span>
                  Create {{ getI18nDate(agence?.created_at).fromNow() }}
                </a>
              </div>
              <!--end::Info-->
            </div>
            <!--end::User-->
          </div>
          <!--end::Title-->
        </div>
        <!--end::Info-->
      </div>
      <!--end::Details-->
    </template>
  </detail-modal-template>
</template>

<script setup lang="ts">
import { getI18nDate } from "@/core/helpers";
import type { IAgence } from "@/types";
import DetailModalTemplate from "./DetailModalTemplate.vue";
import { useRouter } from "vue-router";

interface Props {
  agence?: IAgence;
  selector: string;
}

const router = useRouter();

const goToEdit = () => {
  router.push({
    name: "update-agency",
    params: {
      id: props.agence?.id,
    },
  });
};

const props = defineProps<Props>();
</script>
