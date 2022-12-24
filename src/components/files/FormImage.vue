<template>
  <!--begin::Image input-->
  <div class="image-input image-input-outline" data-kt-image-input="true">
    <!--begin::Preview existing avatar-->
    <div class="image-input-wrapper w-125px h-125px bg-input"></div>
    <!--end::Preview existing avatar-->

    <!--begin::Label-->
    <label
      class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
      data-kt-image-input-action="change"
      data-bs-toggle="tooltip"
      title="Change avatar"
    >
      <i class="bi bi-pencil-fill fs-7"></i>

      <!--begin::Inputs-->
      <input
        type="file"
        @change="onFileChange"
        name="avatar"
        accept=".png, .jpg, .jpeg"
      />
      <input type="hidden" name="avatar_remove" />
      <!--end::Inputs-->
    </label>
    <!--end::Label-->

    <!--begin::Remove-->
    <span
      class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
      data-kt-image-input-action="remove"
      data-bs-toggle="tooltip"
      title="Remove avatar"
      @click="resetImg"
    >
      <i class="bi bi-x fs-2"></i>
    </span>
    <!--end::Remove-->
  </div>
  <!--end::Image input-->
</template>

<script setup lang="ts">
import { defineEmits, computed, type ComputedRef, defineProps } from "vue";

const defaulImg = "https://pkmdepokutara.depok.go.id/assets/images/default.jpg";

const bg: ComputedRef<string | null> = computed<string | null>(() => {
  if (props.file) return `url(${URL.createObjectURL(props.file)})`;
  return `url(${props.defaulImg ?? defaulImg})`;
});

interface Emits {
  (e: "update:file", file: File | null): void;
}
interface Props {
  file: File | null;
  defaulImg?: string;
}

const emit = defineEmits<Emits>();
const props = defineProps<Props>();

const onFileChange = (e: any) => {
  const [file] = e.target.files;
  if (file) emit("update:file", file as File);
};
const resetImg = () => {
  emit("update:file", null);
};
</script>

<style lang="scss" scoped>
.bg-input {
  background-image: v-bind(bg);
}
</style>
