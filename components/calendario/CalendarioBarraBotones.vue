<template>
  <div
    class="w-full h-9 bg-skin-secondary-100 grid grid-cols-25 border border-gray-800"
  >
    <div
      class="col-span-4 border-r border-gray-800 flex justify-center items-center"
    >
      <p class="text-lg">Empleados {{ listaEmpleados.length }}</p>
    </div>
    <div class="col-span-21 flex space-x-2 items-center px-4">
      <button
        class="btn-primary h-7"
        :class="{ 'opacity-50': !celdasSeleccionadas.length }"
        :disabled="!celdasSeleccionadas.length"
        @click="crearTurno"
      >
        Crear turno
      </button>
      <!-- <button class="btn-primary h-7">Crear ausencia</button>
      <button class="btn-secondary h-7">Crear dia libre</button> -->
      <Button
        v-show="turnosSeleccionados.length"
        class="px-2"
        label="Borrar"
        severity="danger"
        @click="borrarTurno"
      />
      <button
        v-show="celdasSeleccionadas.length"
        class="bg-blue-300 rounded font-bold px-4 h-7"
        @click="deseleccionar"
      >
        Deseleccionar
      </button>
    </div>
    <CrearTurnoModal
      v-if="crearTurnoModal"
      :visible="crearTurnoModal"
      @cerrar="crearTurnoModal = false"
    />
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
const storeTurno = useTurnoStore();
const { celdasSeleccionadas, turnosSeleccionados } =
  storeToRefs(storeCalendario);
const { crearTurnoModal } = storeToRefs(storeTurno);
const deseleccionar = () => {
  celdasSeleccionadas.value = [];
};
const crearTurno = () => {
  crearTurnoModal.value = true;
};
const borrarTurno = () => {
  storeTurno.borrarTurno(turnosSeleccionados.value);
  turnosSeleccionados.value = [];
};
</script>

<style></style>
