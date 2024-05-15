<template>
  <div class="grid grid-cols-25">
    <div class="col-span-4">
      <TarjetaEmpleado :empleado="empleado" :totalHoras="totalHoras" />
    </div>
    <div class="col-span-21 grid grid-cols-21">
      <div v-for="fecha in listaFechas" :key="fecha" class="col-span-3 h-full">
        <Turno
          v-if="turnosEmpleado.some((turno) => turno.fecha === fecha)"
          :turno="turnosEmpleado.find((turno) => turno.fecha === fecha)"
        />
        <Celda v-else :fecha="fecha" :empleado="empleado" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCalendarStore } from "../../store/calendario";
const storeCalendario = useCalendarStore();
const props = defineProps({
  empleado: {
    type: Object,
    default: {},
  },
});
const dayjs = useDayjs();
const storeTurno = useTurnoStore();
const { getTurnos } = storeToRefs(storeTurno);

const turnosEmpleado = computed(() => {
  return getTurnos.value.filter((turn) => turn.empleado === props.empleado.id);
});
const { getListaFechas: listaFechas } = storeToRefs(storeCalendario);

const totalHoras = computed(() => {
  const listaHoras = turnosEmpleado.value.map((turno) => {
    const [horasInicio, minutosInicio] = turno.hora_inicio
      .split(":")
      .map(Number);
    const [horasFinal, minutosFinal] = turno.hora_final.split(":").map(Number);
    const colacion = turno.colacion;

    const diferenciaHoras = horasFinal - horasInicio;
    const diferenciaMinutos = minutosFinal - minutosInicio;

    if (diferenciaMinutos < 0) {
      diferenciaMinutos += 60;
    }

    let diferenciaTotalEnMinutos = diferenciaHoras * 60 + diferenciaMinutos;
    diferenciaTotalEnMinutos = diferenciaTotalEnMinutos - colacion;
    return diferenciaTotalEnMinutos / 60;
  });
  return listaHoras.reduce((a, b) => a + b, 0);
});
</script>

<style></style>
