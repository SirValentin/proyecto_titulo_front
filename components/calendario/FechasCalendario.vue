<template>
  <div class="h-9 grid grid-flow-col grid-cols-25">
    <div
      class="col-span-4 h-full flex items-center w-full bg-skin-secondary-100 border border-gray-800"
    >
      <div class="shadow w-full h-8 mr-1.5 flex items-center rounded">
        <button class="bg-skin-secondary-100 px-1 py-1.5 rounded-l">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div
          class="bg-white w-full h-full px-1 flex items-center justify-center"
        >
          <p class="text-xs xl:text-base">01 JUNIO - 07 JUNIO</p>
        </div>
        <button class="bg-skin-secondary-100 px-1 py-1.5 rounded-r">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div>
        <button class="h-7 xl:h-8 text-xs xl:text-base xl:py-2 px-1.5 xl:px-2">
          Hoy
        </button>
      </div>
    </div>
    <div class="col-span-21 grid grid-flow-col grid-cols-21">
      <div
        v-for="(fecha, index) in listaFechas"
        :key="fecha"
        class="col-span-3 border border-gray-800 text-xs xl:text-base flex justify-center items-center bg-skin-secondary-100"
      >
        <!-- :class="{ 'rounded-l-md': index === 0, 'rounded-r-md': index === 6 }" -->
        <p>{{ $dayjs.weekdays(true)[index] }} {{ $dayjs(fecha).date() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCalendarStore } from "../../store/calendario";
const storeCalendario = useCalendarStore();

const listaFechas = storeCalendario.getListaFechas;
// import { calendarView } from "@/composables/useCalendarBase";
// const emit = defineEmits(["fetch-turns"]);

// const dayjs = useDayjs();
// const sizeButtonToday = ref("sm");

// onMounted(() => {
//   if (window.screen.width >= 1280) {
//     sizeButtonToday.value = "lg";
//   }
// });

// Computeds
// const arrayDates = computed(() => {
//   return viewDaysArray.value[0].interval;
// });
// const dateText = computed(() => {
//   return `${viewDaysArray.value[0].mondayText} - ${viewDaysArray.value[0].sundayText}`;
// });
// const arrayWeekDays = computed(() => {
//   const days =  dayjs.weekdays();
//   if (days[0] === 'domingo') {

//   }
// });

// Methods
// const next = () => {
//   const currentDayStore = dayjs(useCalendarStore().$state.currentDay);
//   const dayUpdated = currentDayStore
//     .add(1, calendarView.value)
//     .format("YYYY-MM-DD");
//   useCalendarStore().setcurrentDay(dayUpdated);
//   emit("fetch-turns");
// };
// const previous = () => {
//   const currentDayStore = dayjs(useCalendarStore().$state.currentDay);
//   const dayUpdated = currentDayStore
//     .subtract(1, calendarView.value)
//     .format("YYYY-MM-DD");
//   useCalendarStore().setcurrentDay(dayUpdated);
//   emit("fetch-turns");
// };
// const setToday = () => {
//   const currentDayStore = dayjs();
//   const dayUpdated = currentDayStore.format("YYYY-MM-DD");
//   useCalendarStore().setcurrentDay(dayUpdated);
//   emit("fetch-turns");
// };
</script>

<style></style>
