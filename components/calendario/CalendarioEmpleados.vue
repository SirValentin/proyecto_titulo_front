<template>
  <div class="w-full">
    <div class="w-full">
      <FilaEmpleado
        v-for="empleado in listaEmpleados"
        :key="empleado.id"
        :empleado="empleado"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  listaEmpleados: {
    type: Array,
    default: [],
  },
});
const storeCalendario = useCalendarStore();
const { getListaFechas } = storeToRefs(storeCalendario);
const dayjs = useDayjs();
onMounted(async () => {
  let body;
  if (!getListaFechas.value.length) {
    body = {
      fecha_inicio: dayjs().startOf("week").format("YYYY-MM-DD"),
      fecha_final: dayjs().endOf("week").format("YYYY-MM-DD"),
      empleados: props.listaEmpleados.map((empleado) => empleado.id),
    };
  } else {
    body = {
      fecha_inicio: getListaFechas.value[0],
      fecha_final: getListaFechas.value[getListaFechas.value.length - 1],
      empleados: props.listaEmpleados.map((empleado) => empleado.id),
    };
  }
  if (!useTurnoStore().listaTurnos.length) {
    await useTurnoStore().setTurnos(body);
  }
});
</script>

<style></style>
