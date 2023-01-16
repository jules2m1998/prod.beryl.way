<template>
  <div v-if="!isLoading" class="questions">
    <template v-for="(v, k) in questions" :key="k">
      <div :id="'kt_modal_' + k" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ v.title }}</h5>

              <!--begin::Close-->
              <div
                aria-label="Close"
                class="btn btn-icon btn-sm btn-active-light-primary ms-2"
                data-bs-dismiss="modal"
              >
                <span class="svg-icon svg-icon-2x"></span>
              </div>
              <!--end::Close-->
            </div>

            <div class="modal-body">
              <ol>
                <li v-for="(i, k) in getSteps(v.answers)" :key="k">
                  {{ i.value }}
                </li>
              </ol>
            </div>

            <div class="modal-footer">
              <button
                :to="{ name: 'questionsUpdate' }"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                type="button"
                @click.prevent="navigate(v.id)"
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        :data-bs-target="'#kt_modal_' + k"
        class="card rounded-0"
        data-bs-toggle="modal"
        role="button"
      >
        <div class="card-body">
          <h5 class="cart-title">
            {{ v.title }}
          </h5>
          <h6 class="card-subtitle text-muted mb-2">
            By {{ v.creator.name }} on
            {{ getI18nDate(new Date(v.created_at)).format("lll") }}
          </h6>
          <div
            style="
              display: flex;
              flex-direction: row;
              gap: 10px;
              flex-wrap: wrap;
            "
          >
            <span>
              <img
                src="/media/icons/duotune/general/gen034.svg"
                class="h-20px"
              />
              {{ v.not_helpful_count }}
            </span>
            <div>
              <img
                src="/media/icons/duotune/general/gen037.svg"
                class="h-20px"
              />
              {{ v.helpful_count }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
  <loader v-else></loader>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import type { IAnswer, IFaq } from "@/types/faq";
import { getAllFaq } from "@/core/services";
import Loader from "@/components/Loader.vue";
import { getI18nDate } from "@/core/helpers";

const questions = ref<IFaq[]>([]);
const isLoading = ref<boolean>(false);

const router = useRouter();

const navigate = (id: number) => {
  router.push({
    name: "questionsUpdate",
    query: {},
    params: {
      id,
    },
  });
};
const getSteps = (answer: string): IAnswer[] => JSON.parse(answer) as IAnswer[];

onMounted(async () => {
  isLoading.value = true;
  const f = await getAllFaq();
  if (f) questions.value = f;
  isLoading.value = false;
});
</script>

<style scoped lang="scss">
.questions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
}
</style>
