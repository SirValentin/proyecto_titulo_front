<template>
  <div
    class="h-full flex flex-col items-center justify-center cursor-pointer text-xs lg:text-base"
    :class="[
      seleccionado
        ? 'border-4 border-skin-primary-100'
        : 'border border-gray-800',
      classEstado,
    ]"
    :style="
      turno.estado === 1
        ? 'background-image: linear-gradient(45deg,rgba(255, 255, 255, 0.5) 25%,transparent 25%,transparent 50%,rgba(255, 255, 255, 0.5) 50%,rgba(255, 255, 255, 0.5) 75%,transparent 75%,transparent);'
        : ''
    "
    @click="seleccionarTurno"
  >
    <p class="leading-4">{{ turno.hora_inicio }} - {{ turno.hora_final }}</p>
    <p class="leading-4">{{ turno.colacion }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  turno: {
    type: Object,
    default: {},
  },
});
const storeCalendario = useCalendarStore();
const { turnosSeleccionados } = storeToRefs(storeCalendario);

const seleccionado = computed(() =>
  turnosSeleccionados.value.includes(props.turno.id)
);

const classEstado = computed(() => {
  return props.turno.estado === 1
    ? "bg-skin-secondary-60"
    : "bg-skin-primary-60";
});
const seleccionarTurno = () => {
  storeCalendario.manejadorTurno(props.turno.id);
};
</script>

<style></style>
