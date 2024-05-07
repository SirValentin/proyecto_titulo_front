<template>
  <div class="grid grid-cols-25">
    <div class="col-span-4">
      <TarjetaEmpleado />
    </div>
    <div class="col-span-21 grid grid-cols-21">
      <div
        v-for="fecha in listaFechas"
        :key="fecha"
        class="col-span-3 border border-gray-800 hover:bg-blue-200 cursor-pointer"
      >
        asd
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCalendarStore } from "../../store/calendario";
const storeCalendario = useCalendarStore();

const listaFechas = storeCalendario.getListaFechas;
</script>

<style></style>
