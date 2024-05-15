<template>
  <div class="h-12 bg-skin-secondary-60 border border-gray-800 p-1">
    <p class="text-base leading-4">{{ empleado.nombre }}</p>
    <p class="text-xs">
      {{ totalHoras }}/{{ contratoEmpleado.horas_semanales }} hrs
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  empleado: {
    type: Object,
    default: {},
  },
  totalHoras: {
    type: Number,
    default: 0,
  },
});
const storeContrato = useContratoStore();
const listaContratos = storeContrato.getContratos;

const contratoEmpleado = computed(() => {
  return listaContratos
    ? listaContratos.find((contrato) => contrato.id === props.empleado.contrato)
    : {};
});
</script>

<style></style>
