<template>
  <!--begin::Toolbar-->
  <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
    <!--begin::Toolbar container-->
    <div
        id="kt_app_toolbar_container"
        class="app-container d-flex flex-stack"
        :class="{
        'container-fluid': toolbarWidthFluid,
        'container-xxl': !toolbarWidthFluid,
      }"
    >
      <KTPageTitle/>
      <!--begin::Actions-->
      <div
          v-if="addPagePathName"
          class="d-flex align-items-center gap-2 gap-lg-3"
      >
        <!--begin::Secondary button-->
        <router-link
            :to="{ name: addPagePathName }"
            v-if="false"
            class="btn btn-sm fw-bold bg-body btn-color-gray-700 btn-active-color-primary"
        >Rollover
        </router-link
        >
        <!--end::Secondary button-->
        <!--begin::Primary button-->
        <router-link
            :to="{ name: addPagePathName }"
            class="btn btn-sm fw-bold btn-primary"
        >{{ t("add") }}
        </router-link
        >
        <!--end::Primary button-->
      </div>
      <!--end::Actions-->
    </div>
    <!--end::Toolbar container-->
  </div>
  <!--end::Toolbar-->
</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import {toolbarWidthFluid} from "@/core/helpers/config";
import KTPageTitle from "@/layouts/main-layout/toolbar/PageTitle.vue";
import {useRoute} from "vue-router";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "layout-toolbar",
  components: {
    KTPageTitle,
  },
  setup() {
    const route = useRoute();
    const addPagePathName = computed(() => {
      return route.meta.addPathName as string;
    });
    const {t} = useI18n();

    return {
      toolbarWidthFluid,
      addPagePathName,
      t,
    };
  },
});
</script>
