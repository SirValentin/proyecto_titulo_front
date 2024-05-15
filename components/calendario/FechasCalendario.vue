<template>
  <div class="h-9 grid grid-flow-col grid-cols-25">
    <div
      class="col-span-4 h-full flex items-center w-full bg-skin-secondary-100 border border-gray-800"
    >
      <div class="shadow w-full h-8 flex items-center rounded">
        <button
          class="bg-skin-secondary-100 px-1 py-1.5 rounded-l"
          @click="fechaAnterior"
        >
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
          class="bg-white w-full h-full px-1 items-center justify-center flex min-w-5 min-h-8"
        >
          <p class="text-xs 2xl:text-base hidden lg:block">{{ textoSemana }}</p>
        </div>
        <button
          class="bg-skin-secondary-100 px-1 py-1.5 rounded-r"
          @click="fechaSiguiente"
        >
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
        <Button
          class="h-7 xl:h-8 text-xs xl:text-base border"
          @click="setFechaHoy"
        >
          Hoy
        </Button>
      </div>
    </div>
    <div class="col-span-21 grid grid-flow-col grid-cols-21">
      <div
        v-for="(fecha, index) in listaFechas"
        :key="fecha"
        class="col-span-3 border border-gray-800 text-xs xl:text-base flex justify-center items-center bg-skin-secondary-100"
      >
        <p>{{ $dayjs.weekdays(true)[index] }} {{ $dayjs(fecha).date() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCalendarStore } from "../../store/calendario";
const props = defineProps({
  listaEmpleados: {
    type: Array,
    default: [],
  },
});
const storeCalendario = useCalendarStore();
const storeTurno = useTurnoStore();

const { getListaFechas: listaFechas, fechaCalendario } =
  storeToRefs(storeCalendario);
const dayjs = useDayjs();
// Computeds
const textoSemana = computed(() => {
  const inicioSemana = dayjs(listaFechas.value[0]).date();
  const finalSemana = dayjs(listaFechas.value[6]).date();
  const inicioMes = dayjs.monthsShort()[dayjs(listaFechas.value[0]).month()];
  const finalMes = dayjs.monthsShort()[dayjs(listaFechas.value[6]).month()];
  return `${inicioSemana} ${inicioMes} - ${finalSemana} ${finalMes}`;
});

// Methods
const fechaAnterior = () => {
  const semanaAnterior = fechaCalendario.value.subtract(1, "week");
  storeCalendario.setFechaCalendario(semanaAnterior);
  actualizarTurnos();
};
const fechaSiguiente = () => {
  const semanaSiguiente = fechaCalendario.value.add(1, "week");
  storeCalendario.setFechaCalendario(semanaSiguiente);
  actualizarTurnos();
};
const setFechaHoy = () => {
  const hoy = dayjs();
  storeCalendario.setFechaCalendario(hoy);
  actualizarTurnos();
};

const actualizarTurnos = async () => {
  const body = {
    fecha_inicio: listaFechas.value[0],
    fecha_final: listaFechas.value[listaFechas.value.length - 1],
    empleados: props.listaEmpleados.map((empleado) => empleado.id),
  };
  await storeTurno.setTurnos(body);
};
</script>

<style></style>
