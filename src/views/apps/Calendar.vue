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

  <new-event-modal :selected-date="selectedPeriod"></new-event-modal>
</template>

<script setup lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import type { CalendarOptions, EventInput } from "@fullcalendar/vue3";

import NewEventModal from "@/components/modals/forms/NewEventModal.vue";
import MyLoader from "@/components/Loader.vue";

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import moment from "moment";

import { ON_PROGESS_COLOR } from "@/core/data/const";
import { Modal } from "bootstrap";
import { ref, onMounted, computed } from "vue";
import type { IAppointment } from "@/types";
import { getAllAppointment } from "@/core/services/AppointmentService";

const selectedPeriod = ref<EventInput | null>(null);
const isLoading = ref<boolean>(false);

const appointments = ref<IAppointment[]>([]);

// Calender

const todayDate = moment().startOf("day");
const YM = todayDate.format("YYYY-MM");
const YESTERDAY = todayDate.clone().subtract(1, "day").format("YYYY-MM-DD");
const TODAY = todayDate.format("YYYY-MM-DD");
const TOMORROW = todayDate.clone().add(1, "day").format("YYYY-MM-DD");

const date = new Date();
const d = date.getDate();
const m = date.getMonth();
const y = date.getFullYear();

const e = computed<EventInput[]>(() =>
  appointments.value.map((e, k) => {
    const date = new Date(e.time);
    return {
      id: e.id.toString(),
      title: `Rendez-vous de ${e.agent.user.name} avec ${e.client.user.name}`,
      start: TODAY + `T1${k}:30:00`,
      description: e.reason,
      end: TODAY + `T1${k + 1}:30:00`,
      className: "fc-event-success",
    };
  })
);

const events: EventInput[] = [
  {
    id: "1",
    title: "All Day Event",
    start: YM + "-01",
    description: "Toto lorem ipsum dolor sit incid idunt ut",
    color: ON_PROGESS_COLOR,
  },
  {
    id: "2",
    title: "Teste de jules",
    start: new Date(y, m, d, 8, 10),
    description: "Lorem ipsum dolor incid idunt ut labore",
    end: new Date(y, m, d, 8, 40),
    className: "fc-event-success",
  },
  {
    id: "3",
    title: "Company Trip",
    start: YM + "-02",
    description: "Lorem ipsum dolor sit tempor incid",
    end: YM + "-03",
    className: "fc-event-primary",
  },
  {
    id: "4",
    title: "ICT Expo 2017 - Product Release",
    start: YM + "-03",
    description: "Lorem ipsum dolor sit tempor inci",
    end: YM + "-05",
    className: "fc-event-light fc-event-solid-primary",
  },
  {
    id: "5",
    title: "Dinner",
    start: YM + "-12",
    description: "Lorem ipsum dolor sit amet, conse ctetur",
    end: YM + "-10",
  },
  {
    id: "6",
    title: "Repeating Event",
    start: YM + "-09T16:00:00",
    description: "Lorem ipsum dolor sit ncididunt ut labore",
    className: "fc-event-danger",
  },
  {
    id: "7",
    title: "Repeating Event",
    description: "Lorem ipsum dolor sit amet, labore",
    start: YM + "-16T16:00:00",
  },
  {
    id: "8",
    title: "Conference",
    start: YESTERDAY,
    end: TOMORROW,
    description: "Lorem ipsum dolor eius mod tempor labore",
    className: "fc-event-primary",
  },
  {
    id: "9",
    title: "Meeting",
    start: TODAY + "T10:30:00",
    end: TODAY + "T12:30:00",
    description: "Lorem ipsum dolor eiu idunt ut labore",
  },
  {
    id: "10",
    title: "Lunch",
    start: TODAY + "T12:00:00",
    className: "fc-event-info",
    description: "Lorem ipsum dolor sit amet, ut labore",
  },
  {
    id: "11",
    title: "Meeting",
    start: TODAY + "T14:30:00",
    className: "fc-event-warning",
    description: "Lorem ipsum conse ctetur adipi scing",
  },
  {
    id: "12",
    title: "Happy Hour",
    start: TODAY + "T17:30:00",
    className: "fc-event-info",
    description: "Lorem ipsum dolor sit amet, conse ctetur",
  },
  {
    id: "13",
    title: "Dinner",
    start: TOMORROW + "T05:00:00",
    className: "fc-event-solid-danger fc-event-light",
    description: "Lorem ipsum dolor sit ctetur adipi scing",
  },
  {
    id: "14",
    title: "Birthday Party",
    start: TOMORROW + "T07:00:00",
    className: "fc-event-primary",
    description: "Lorem ipsum dolor sit amet, scing",
  },
  {
    id: "15",
    title: "Click for Google",
    url: "http://google.com/",
    start: YM + "-28",
    className: "fc-event-solid-info fc-event-light",
    description: "Lorem ipsum dolor sit amet, labore",
  },
];

const onClickToEvent = ({ event: e }: { event: EventInput }) => {
  console.log(e.start, e.end, e.id);
};

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
  now: TODAY + "T09:25:00", // just for demo

  views: {
    dayGridMonth: { buttonText: "month" },
    timeGridWeek: { buttonText: "week" },
    timeGridDay: { buttonText: "day" },
  },

  initialView: "timeGridDay",
  initialDate: TODAY,
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
