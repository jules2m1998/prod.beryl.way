<template>
  <div class="modal fade" :id="selector" tabindex="-1" aria-hidden="true">
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
            @click="emit('edit', props.identifier || 0)"
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
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

interface Props {
  identifier?: number;
  selector: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "edit", id: number): void;
}>();
</script>
