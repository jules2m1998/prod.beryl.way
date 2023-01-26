<template>
  <!--begin::Layout-->
  <div v-if="!isLoading" class="d-flex flex-column flex-lg-row">
    <!--begin::Sidebar-->
    <div
      class="flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0"
    >
      <!--begin::Contacts-->
      <div class="card card-flush">
        <!--begin::Card header-->
        <div class="card-header pt-7" id="kt_chat_contacts_header">
          <!--begin::Form-->
          <form class="w-100 position-relative" autocomplete="off">
            <!--begin::Icon-->
            <span
              class="svg-icon svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 position-absolute top-50 ms-5 translate-middle-y"
            >
              <inline-svg src="/media/icons/duotune/general/gen021.svg" />
            </span>
            <!--end::Icon-->

            <!--begin::Input-->
            <input
              type="text"
              class="form-control form-control-solid px-15"
              name="search"
              value=""
              placeholder="Search by username or email..."
            />
            <!--end::Input-->
          </form>
          <!--end::Form-->
        </div>
        <!--end::Card header-->

        <!--begin::Card body-->
        <div class="card-body pt-5" id="kt_chat_contacts_body">
          <!--begin::List-->
          <div
            class="scroll-y me-n5 pe-5 h-200px h-lg-auto"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-max-height="auto"
            data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_chat_contacts_header"
            data-kt-scroll-wrappers="#kt_content, #kt_chat_contacts_body"
            data-kt-scroll-offset="0px"
          >
            <template v-for="(item, index) in conversations" :key="index">
              <div
                class="d-flex flex-stack py-4 selected"
                @click="() => selectConversation(index)"
              >
                <!--begin::Details-->
                <div class="d-flex align-items-center">
                  <!--begin::Avatar-->
                  <div class="symbol symbol-45px symbol-circle">
                    <img
                      v-if="item.user.avatar"
                      :src="getImagePathToServer(item.user.avatar)"
                      alt=""
                    />
                    <span
                      v-else
                      :class="`bg-light-danger text-danger`"
                      class="symbol-label fs-6 fw-bold"
                      >{{ item.user.name.charAt(0) }}</span
                    >
                    <div
                      v-if="false"
                      class="symbol-badge bg-success start-100 top-100 border-4 h-15px w-15px ms-n2 mt-n2"
                    ></div>
                  </div>
                  <!--end::Avatar-->
                  <!--begin::Details-->
                  <div class="ms-5">
                    <a
                      href="#"
                      class="fs-5 fw-bold text-gray-900 text-hover-primary mb-2"
                      >{{ item.user.name }}</a
                    >
                    <div class="fw-semobold text-gray-400">
                      {{ item.user.email }}
                    </div>
                  </div>
                  <!--end::Details-->
                </div>
                <!--end::Details-->

                <!--begin::Lat seen-->
                <div class="d-flex flex-column align-items-end ms-2">
                  <span class="text-muted fs-7 mb-1">{{
                    getI18nDate(new Date(item.created_at)).fromNow()
                  }}</span>
                </div>
                <!--end::Lat seen-->
              </div>
            </template>
          </div>
          <!--end::List-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Contacts-->
    </div>
    <!--end::Sidebar-->

    <!--begin::Content-->
    <div class="flex-lg-row-fluid ms-lg-7 ms-xl-10" v-if="selectedConversion">
      <!--begin::Messenger-->
      <div class="card" id="kt_chat_messenger">
        <!--begin::Card header-->
        <div class="card-header" id="kt_chat_messenger_header">
          <!--begin::Title-->
          <div class="card-title">
            <!--begin::User-->
            <div class="d-flex justify-content-center flex-column me-3">
              <div v-if="isGroupChat" class="symbol-group symbol-hover">
                <div class="symbol symbol-35px symbol-circle">
                  <img alt="Pic" src="/media/avatars/300-5.jpg" />
                </div>
                <div class="symbol symbol-35px symbol-circle">
                  <img alt="Pic" src="/media/avatars/300-25.jpg" />
                </div>
                <div class="symbol symbol-35px symbol-circle">
                  <span class="symbol-label bg-light-warning text-warning 40px"
                    >M</span
                  >
                </div>
                <div class="symbol symbol-35px symbol-circle">
                  <img alt="Pic" src="/media/avatars/300-9.jpg" />
                </div>
                <div class="symbol symbol-35px symbol-circle">
                  <span class="symbol-label bg-light-danger text-danger 40px"
                    >O</span
                  >
                </div>
                <div class="symbol symbol-35px symbol-circle">
                  <span class="symbol-label bg-light-primary text-primary 40px"
                    >N</span
                  >
                </div>
                <div class="symbol symbol-35px symbol-circle">
                  <img alt="Pic" src="/media/avatars/300-23.jpg" />
                </div>
                <a
                  href="#"
                  class="symbol symbol-35px symbol-circle"
                  data-bs-toggle="modal"
                  data-bs-target="#kt_modal_view_users"
                >
                  <span
                    class="symbol-label fs-8 fw-bold"
                    data-bs-toggle="tooltip"
                    data-bs-trigger="hover"
                    title=""
                    data-bs-original-title="View more users"
                    >+42</span
                  >
                </a>
                <!--end::All users-->
              </div>
              <template v-else>
                <a
                  href="#"
                  class="fs-4 fw-bold text-gray-900 text-hover-primary me-1 mb-2 lh-1"
                  >{{ selectedConversion.reason }}</a
                >

                <!--begin::Info-->
                <div class="mb-0 lh-1" v-if="false">
                  <span
                    class="badge badge-success badge-circle w-10px h-10px me-1"
                  ></span>
                  <span class="fs-7 fw-semobold text-gray-400">Active</span>
                </div>
                <!--end::Info-->
              </template>
            </div>
            <!--end::User-->
          </div>
          <!--end::Title-->

          <!--begin::Card toolbar-->
          <div class="card-toolbar">
            <!--begin::Menu-->
            <div class="me-n3">
              <button
                class="btn btn-sm btn-icon btn-active-light-primary"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
                data-kt-menu-flip="top-end"
              >
                <i class="bi bi-three-dots fs-2"></i>
              </button>
              <Dropdown4></Dropdown4>
            </div>
            <!--end::Menu-->
          </div>
          <!--end::Card toolbar-->
        </div>
        <!--end::Card header-->

        <!--begin::Card body-->
        <div class="card-body" id="kt_chat_messenger_body">
          <!--begin::Messages-->
          <div
            class="scroll-y me-n5 pe-5 h-800px"
            ref="messagesRef"
            data-kt-element="messages"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-max-height="auto"
            data-kt-scroll-dependencies="#kt_header, #kt_toolbar, #kt_footer, #kt_chat_messenger_header, #kt_chat_messenger_footer"
            data-kt-scroll-wrappers="#kt_content, #kt_chat_messenger_body"
            data-kt-scroll-offset="-2px"
          >
            <template
              v-for="(item, index) in selectedConversion.messages"
              :key="index"
            >
              <MessageIn
                ref="messagesInRef"
                v-if="!item.responder_id"
                :name="selectedConversion.user.name"
                :image="getImagePathToServer(selectedConversion.user.avatar)"
                :time="getI18nDate(new Date(item.created_at)).fromNow()"
                :text="item.message"
                :image-message="
                  item.link ? getImagePathToServer(item.link) : undefined
                "
              ></MessageIn>
              <MessageOut
                ref="messagesOutRef"
                v-else
                :image="getImagePathToServer(user.user.avatar)"
                :time="getI18nDate(new Date(item.created_at)).fromNow()"
                :text="item.message"
                :image-message="
                  item.link ? getImagePathToServer(item.link) : undefined
                "
              ></MessageOut>
            </template>
          </div>
          <!--end::Messages-->
        </div>
        <!--end::Card body-->

        <!--begin::Card footer-->
        <div class="card-footer pt-4" id="kt_chat_messenger_footer">
          <!--begin::Input-->
          <input
            v-model="newMessageText"
            @keydown.enter="addNewMessage"
            class="form-control form-control-flush mb-3"
            data-kt-element="input"
            placeholder="Type a message"
          />
          <!--end::Input-->

          <!--begin:Toolbar-->
          <div class="d-flex flex-stack">
            <!--begin::Actions-->
            <div class="d-flex align-items-center me-2">
              <button
                class="btn btn-sm btn-icon btn-active-light-primary me-1"
                type="button"
                data-bs-toggle="tooltip"
                title="Coming soon"
              >
                <i class="bi bi-paperclip fs-3"></i>
              </button>
              <button
                class="btn btn-sm btn-icon btn-active-light-primary me-1"
                type="button"
                data-bs-toggle="tooltip"
                title="Coming soon"
              >
                <i class="bi bi-upload fs-3"></i>
              </button>
            </div>
            <!--end::Actions-->

            <!--begin::Send-->
            <button
              @click="addNewMessage"
              class="btn btn-primary"
              type="button"
              data-kt-element="send"
            >
              Send
            </button>
            <!--end::Send-->
          </div>
          <!--end::Toolbar-->
        </div>
        <!--end::Card footer-->
      </div>
      <!--end::Messenger-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Layout-->

  <loader v-else></loader>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Dropdown4 from "@/components/dropdown/Dropdown4.vue";
import MessageIn from "@/components/messenger-parts/MessageIn.vue";
import MessageOut from "@/components/messenger-parts/MessageOut.vue";
import type { IConversation } from "@/types";
import { getAllDiscussions } from "@/core/services";
import Loader from "@/components/Loader.vue";
import { getI18nDate, getImagePathToServer } from "@/core/helpers";
import { useAuthStore } from "@/stores/auth";

interface KTMessage {
  type: string;
  name?: string;
  image: string;
  time: string;
  text: string;
}

const messagesRef = ref<null | HTMLElement>(null);
const messagesInRef = ref<null | HTMLElement>(null);
const messagesOutRef = ref<null | HTMLElement>(null);

const isLoading = ref<boolean>(false);
const conversations = ref<IConversation[]>([]);
const selectedIndex = ref<number>(0);
const user = useAuthStore();

const selectedConversion = computed<IConversation | null>(
  () => conversations.value[selectedIndex.value]
);

const route = useRoute();

const messages = ref<Array<KTMessage>>([
  {
    type: "in",
    name: "Brian Cox",
    image: "/media/avatars/300-25.jpg",
    time: "5 Hours",
    text: "How likely are you to recommend our company to your friends and family ?",
  },
  {
    type: "out",
    image: "/media/avatars/300-1.jpg",
    time: "2 Hours",
    text: "Hey there, we’re just writing to let you know that you’ve been subscribed to a repository on GitHub.",
  },
  {
    type: "in",
    name: "Brian Cox",
    image: "/media/avatars/300-25.jpg",
    time: "2 Hour",
    text: "Ok, Understood!",
  },
  {
    type: "out",
    image: "/media/avatars/300-1.jpg",
    time: "2 Hours",
    text: "You’ll receive notifications for all issues, pull requests!",
  },
  {
    type: "in",
    name: "Brian Cox",
    image: "/media/avatars/300-25.jpg",
    time: "1 Hour",
    text: "You can unwatch this repository immediately by clicking here: Keenthemes.com",
  },
  {
    type: "out",
    image: "/media/avatars/300-1.jpg",
    time: "4 mins",
    text: "Most purchased Business courses during this sale!",
  },
  {
    type: "in",
    name: "Brian Cox",
    image: "/media/avatars/300-25.jpg",
    time: "2 mins",
    text: "Company BBQ to celebrate the last quater achievements and goals. Food and drinks provided",
  },
]);

const newMessageText = ref("");

const addNewMessage = () => {
  if (!newMessageText.value) {
    return;
  }
  messages.value.push({
    type: "out",
    image: "/media/avatars/300-1.jpg",
    time: "Just now",
    text: newMessageText.value,
  });

  setTimeout(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
    }
  }, 1);

  newMessageText.value = "";
  setTimeout(() => {
    messages.value.push({
      type: "in",
      name: "Ja Morant",
      image: "/media/avatars/300-25.jpg",
      time: "Just now",
      text: "Thank you for your awesome support!",
    });

    setTimeout(() => {
      if (messagesRef.value) {
        messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
      }
    }, 1);
  }, 2000);
};

const isGroupChat = computed(() => {
  return route.path.indexOf("/group-chat") !== -1;
});

const fetchConversions = async () => {
  isLoading.value = true;
  const conv = await getAllDiscussions();
  if (conv) conversations.value = conv;
  isLoading.value = false;
};

const selectConversation = (id: number) => {
  selectedIndex.value = id;
};

onMounted(async () => {
  await fetchConversions();
});
</script>
