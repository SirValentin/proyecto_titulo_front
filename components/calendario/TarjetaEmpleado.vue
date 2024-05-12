<template>
  <div class="h-12 bg-skin-secondary-60 border border-gray-800 p-1">
    <p class="text-base leading-4">{{ empleado.nombre }}</p>
    <p class="text-xs">0/{{ contratoEmpleado.horas_semanales }} hrs</p>
  </div>
</template>

<script setup>
const props = defineProps({
  empleado: {
    type: Object,
    default: {},
  },
});
const storeContrato = useContratoStore();
const listaContratos = storeContrato.getContratos;

const contratoEmpleado = computed(() => {
  return listaContratos
    ? listaContratos.find((contrato) => contrato.id === props.empleado.contrato)
    : {};
});
// const dataEmpleado = {
//   nombre: empleado.value.nombre,
//   contrato: empleado.value.contrato,
// }
</script>

<style></style>
