<template>
  <div
    class="hover:bg-blue-200 cursor-pointer h-full"
    :class="
      seleccionada ? 'border-4 border-blue-400' : 'border border-gray-800'
    "
    @click="seleccionarCelda(fecha)"
  ></div>
</template>

<script setup>
const props = defineProps({
  empleado: {
    type: Object,
    default: {},
  },
  fecha: {
    typeof: String,
    default: "",
  },
});
const storeCalendario = useCalendarStore();
const { celdasSeleccionadas } = storeToRefs(storeCalendario);

const seleccionada = computed(() =>
  celdasSeleccionadas.value.some(
    (celda) =>
      celda.empleado === props.empleado.id && celda.fecha === props.fecha
  )
);

const seleccionarCelda = (fecha) => {
  const celda = {
    empleado: props.empleado.id,
    fecha,
  };
  storeCalendario.manejadorCelda(celda);
};
</script>

<style></style>
