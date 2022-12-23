<template>
  <div class="card rounded-0" v-if="!isLoading">
    <div class="card-header">
      <h2 class="card-title fw-bold">Calendar</h2>
      <div class="card-toolbar">
        <button class="btn btn-flex btn-primary" @click="addEvent()">
          <span class="svg-icon svg-icon-2">
            <inline-svg src="/media/icons/duotune/arrows/arr075.svg" />
          </span>
          Creer une horaire libre
        </button>
      </div>
    </div>

    <div class="card-body">
      <full-calendar :options="calendarOptions"> </full-calendar>
    </div>
  </div>

  <my-loader v-else></my-loader>

  <new-event-modal :selected-date="selectedAppointment"></new-event-modal>

  <calendar-detail-model
    :current="selectedAppointment"
    @close="resetCurrentAppointment"
    @edit="addEvent"
  ></calendar-detail-model>
</template>

<script setup lang="ts">
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import type { CalendarOptions, EventClickArg } from "@fullcalendar/vue3";

import NewEventModal from "@/components/modals/forms/NewEventModal.vue";
import MyLoader from "@/components/Loader.vue";
import CalendarDetailModel from "@/components/modals/general/CalendarDetailModal.vue";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import { ON_PROGESS_COLOR } from "@/core/data/const";
import { Modal } from "bootstrap";
import { ref, onMounted, computed } from "vue";
import type { IAppointment } from "@/types";
import { getAllAppointment } from "@/core/services/AppointmentService";

const isLoading = ref<boolean>(false);

const appointments = ref<IAppointment[]>([]);
const selectedAppointment = ref<IAppointment | undefined>(undefined);

// Calender

const addHour = (date: Date, hours: number) => {
  const copy = new Date(date);
  copy.setHours(date.getHours() + hours);

  return copy;
};

const calendarOptions = computed<CalendarOptions>(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
  },

  height: 800,
  contentHeight: 780,
  aspectRatio: 3, // see: https://fullcalendar.io/docs/aspectRatio

  nowIndicator: true,
  now: new Date(), // just for demo

  views: {
    dayGridMonth: { buttonText: "month" },
    timeGridWeek: { buttonText: "week" },
    timeGridDay: { buttonText: "day" },
  },

  initialView: "timeGridDay",
  initialDate: new Date(),
  slotDuration: "00:10:00", // Set a period size

  editable: true,
  dayMaxEvents: true, // allow "more" link when too many events
  navLinks: true,
  events: appointments.value.map((e) => {
    const date = new Date(e.time);
    return {
      id: e.id.toString(),
      title: `Rendez-vous de ${e.agent.user.name} avec ${e.client.user.name}`,
      start: date,
      description: e.reason,
      end: addHour(date, 1),
      className: "fc-event-success",
    };
  }),
  eventClick: onOneClick,
}));

// Actions
const addEvent = () => {
  const elt = document.getElementById("kt_modal_add_event") as Element;

  if (elt) {
    const modal = new Modal(elt);
    modal.show();
  } else {
    console.error("Model not exist");
  }
};

const openDetailModal = () => {
  const elt = document.getElementById("kt_modal_calendar_detail") as Element;

  if (elt) {
    const modal = new Modal(elt);
    modal.show();
  } else {
    console.error("Model not exist");
  }
};

const onOneClick = (e: EventClickArg) => {
  setCurrentAppointment(+e.event.id);
  openDetailModal();
};

const setCurrentAppointment = (id: number): IAppointment | undefined => {
  const current: IAppointment | undefined = appointments.value.find(
    (a) => a.id === id
  );
  if (current) selectedAppointment.value = current;

  return current;
};
const resetCurrentAppointment = () => {
  selectedAppointment.value = undefined;
};

// OnMounted
onMounted(async () => {
  isLoading.value = true;
  const ap = await getAllAppointment();
  if (ap) appointments.value = ap;
  console.log(ap);
  isLoading.value = false;
});
</script>

<style scoped>
.fc-agenda-slots td div {
  height: 20px;
}
</style>
