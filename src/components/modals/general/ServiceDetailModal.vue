<template>
  <detail-modal-template
    :selector="props.selector"
    :identifier="props.service?.id"
    @edit="goToEdit"
  >
    <template v-if="props.service">
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
              service?.name
            }}</span>
          </div>
          <!--end::Event name-->
          <!--begin::Event description-->
          <div class="fs-6" data-kt-calendar="event_description">
            <!--begin::Row-->
            <div class="row mb-7">
              <!--begin::Label-->
              <label class="col-lg-4 fw-semibold text-muted">Name</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-8">
                <span class="fw-bold fs-6 text-gray-800">{{
                  service?.name
                }}</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Row-->
            <!--begin::Input group-->
            <div class="row mb-7">
              <!--begin::Label-->
              <label class="col-lg-4 fw-semibold text-muted">Level</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <span class="fw-semibold text-gray-800 fs-6">{{
                  service?.level
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
                  service?.name
                }}</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group--><!--begin::Input group-->
            <div class="row mb-7">
              <!--begin::Label-->
              <label class="col-lg-4 fw-semibold text-muted">Created at</label>
              <!--end::Label-->
              <!--begin::Col-->
              <div class="col-lg-8 fv-row">
                <span class="fw-semibold text-gray-800 fs-6">{{
                  getDateFormated(new Date(service?.created_at || ""))
                  }}</span>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->
            <div
              class="d-flex"
              style="display: flex; flex-direction: column; align-items: center"
              v-if="isLoading"
            >
              <img width="100" src="/media/gif/load_2.gif" alt="Loader" />
              <div>Chargement des informations supplémentaires...</div>
            </div>

            <template v-else>
              <!--begin::Input group-->
              <div class="row mb-7" v-if="loadData?.children?.length">
                <!--begin::Label-->
                <label class="col-lg-4 fw-semibold text-muted">Enfants</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-8 fv-row">
                  <span class="fw-semibold text-gray-800 fs-6">{{
                    loadData.children.map((z) => z.name).join("; ")
                  }}</span>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="row mb-7" v-if="loadData?.complains?.length">
                <!--begin::Label-->
                <label class="col-lg-4 fw-semibold text-muted">Plaintes</label>
                <!--end::Label-->
                <!--begin::Col-->
                <div class="col-lg-8 fv-row">
                  <span class="fw-semibold text-gray-800 fs-6">{{
                    loadData.complains.map((z) => z.name).join("; ")
                  }}</span>
                  <div class="panel-collapse" id="collapseOne">
                    <div class="panel-body">
                      <ul class="chat">
                        <li
                          class="left clearfix"
                          v-for="(v, k) in loadData.complains"
                          :key="k"
                        >
                          <div class="chat-body clearfix">
                            <div class="header">
                              <strong class="primary-font"
                                >Numéro de compte {{ v.account_number }}</strong
                              >
                              <small class="pull-right text-muted">
                                <span class="glyphicon glyphicon-time"></span>
                                {{
                                  getI18nDate(new Date(v.created_at)).fromNow()
                                }}
                              </small>
                            </div>
                            <p>
                              {{ v.detail }}
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Input group-->
            </template>
          </div>
          <!--end::Event description-->
        </div>
      </div>
      <!--end::Row-->
    </template>
  </detail-modal-template>
</template>

<script setup lang="ts">
import { getDateFormated, getI18nDate } from "@/core/helpers";
import type { IService } from "@/types";
import DetailModalTemplate from "./DetailModalTemplate.vue";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import { getOneService } from "@/core/services";
import type { IHttpError } from "@/types/https";

interface Props {
  service?: IService;
  selector: string;
}

const router = useRouter();
const isLoading = ref<boolean>(false);
const loadData = ref<IService | null>(null);

const goToEdit = () => {
  router.push({
    name: "service_update",
    params: {
      id: props.service?.id,
    },
  });
};

watch(
  () => props.service?.id,
  async () => {
    isLoading.value = true;
    if (props.service) {
      const response = await getOneService(props.service.id);
      if (!((response as IHttpError).success === false)) {
        loadData.value = response as IService;
      }
    }
    console.log("Changed");
    isLoading.value = false;
  }
);

const props = defineProps<Props>();
</script>
