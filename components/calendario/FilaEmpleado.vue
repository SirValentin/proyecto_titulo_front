<template>
  <div class="grid grid-cols-25">
    <div class="col-span-4">
      <TarjetaEmpleado :empleado="empleado" />
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
const storeTurno = useTurnoStore();
const { getTurnos } = storeToRefs(storeTurno);

const turnosEmpleado = computed(() => {
  return getTurnos.value.filter((turn) => turn.empleado === props.empleado.id);
});
const listaFechas = storeCalendario.getListaFechas;
</script>

<style></style>
