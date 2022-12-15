<template>
    <div class="questions">
        <template v-for="(v, k) in questions" :key="k">
            <div class="modal fade" tabindex="-1" :id="'kt_modal_' + k">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{{ v.title }}</h5>

                            <!--begin::Close-->
                            <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal"
                                aria-label="Close">
                                <span class="svg-icon svg-icon-2x"></span>
                            </div>
                            <!--end::Close-->
                        </div>

                        <div class="modal-body">
                            <ol>
                                <li v-for="(i, k) in v.steps">{{ i }}</li>
                            </ol>
                        </div>

                        <div class="modal-footer">
                            <button type="button" :to="{ name: 'questionsUpdate' }" @click.prevent="navigate(v.id)"
                                data-bs-dismiss="modal" class="btn btn-primary">
                                Modifier
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card rounded-0" role="button" data-bs-toggle="modal" :data-bs-target="'#kt_modal_' + k">
                <div class="card-body">
                    <div class="subtitle">
                        {{ v.title }}
                    </div>
                </div>
                <div class="card-header">
                    <h4>
                        seen by {{ v.nbrVue }} peoples
                    </h4>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import type { Question } from '@/core/data/faq';
import q from '@/core/data/faq';

const questions = ref<Question[]>(q)

const router = useRouter()
const route = useRoute()

const navigate = (id: number) => {
    router.push({
        name: 'questionsUpdate',
        query: {},
        params: {
            id
        }
      })
}
</script>

<style scoped lang="scss">
.questions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;
}
</style>