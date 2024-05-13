<template>
  <div>
    <div>
      <p class="text-2xl">Mis turnos</p>
    </div>
    <div class="shadow w-64 h-8 flex items-center rounded">
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
      <div class="bg-white w-full h-full px-1 flex items-center justify-center">
        <p class="text-xs xl:text-base">{{ textoSemana }}</p>
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
      <FilaTurnoEmpleado
        v-for="fecha in listaFechas"
        :key="fecha"
        :fecha="fecha"
        :turno="getTurnosPerfilEmpleado.find((turno) => turno.fecha === fecha)"
      />
    </div>
  </div>
</template>

<script setup>
const dayjs = useDayjs();
const storeCalendario = useCalendarStore();
const { getListaFechas: listaFechas, fechaCalendario } =
  storeToRefs(storeCalendario);
const storePerfilempleado = usePerfilempleadoStore();
const { getTurnosPerfilEmpleado } = storeToRefs(storePerfilempleado);

const { data } = useAuth();
const textoSemana = computed(() => {
  const inicioSemana = dayjs(listaFechas.value[0]).date();
  const finalSemana = dayjs(listaFechas.value[6]).date();
  const inicioMes = dayjs.monthsShort()[dayjs(listaFechas.value[0]).month()];
  const finalMes = dayjs.monthsShort()[dayjs(listaFechas.value[6]).month()];
  return `${inicioSemana} ${inicioMes} - ${finalSemana} ${finalMes}`;
});

onMounted(() => {
  const hoy = useDayjs();
  storeCalendario.setFechaCalendario(hoy());
  actualizarTurnos();
});

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

const actualizarTurnos = () => {
  const body = {
    fecha_inicio: listaFechas.value[0],
    fecha_final: listaFechas.value[listaFechas.value.length - 1],
    empleados: [data.value.id_empleado],
  };

  usePerfilempleadoStore().setTurnos(body);
};
</script>

<style></style>
