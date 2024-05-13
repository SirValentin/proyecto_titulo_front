<template>
  <div class="grid grid-cols-5">
    <div
      class="col-span-1 flex flex-col items-center justify-center bg-skin-secondary-100 border border-gray-700"
    >
      <p class="capitalize">{{ dayjs.weekdays()[dayjs(fecha).day()] }}</p>
      <p class="text-2xl">{{ dayjs(fecha).date() }}</p>
      <p class="uppercase">{{ dayjs.months()[dayjs(fecha).month()] }}</p>
    </div>
    <div v-if="turno" class="col-span-4 grid grid-cols-4 bg-skin-secondary-100">
      <div class="flex justify-center items-center border border-gray-700">
        <p>{{ turno.hora_inicio }} - {{ turno.hora_final }}</p>
      </div>
      <div class="flex justify-center items-center border border-gray-700">
        <p>{{ turno.colacion }} minutos</p>
      </div>
      <div class="flex justify-center items-center border border-gray-700">
        <p>{{ turno.nombre_cargo }}</p>
      </div>
      <div class="flex justify-center items-center border border-gray-700">
        <p>{{ turno.nombre_sucursal }}</p>
      </div>
    </div>
    <div
      v-else
      class="col-span-4 bg-gray-100 border border-gray-700 flex justify-center items-center"
    >
      <p>Sin turno</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  fecha: {
    type: String,
    default: "",
  },
  turno: {
    type: Object,
    default: null,
  },
});
const dayjs = useDayjs();
</script>

<style></style>
