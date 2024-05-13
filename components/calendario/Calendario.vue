<template>
  <div class="space-y-5">
    <CalendarioToolbar />
    <div>
      <FechasCalendario :listaEmpleados="listaEmpleados" />
      <CalendarioBarraBotones :listaEmpleados="listaEmpleados" />
      <CalendarioEmpleados :listaEmpleados="listaEmpleados" />
      <p v-show="!listaEmpleados.length">
        Configure su cuenta en la pagina /empresa, crear sucursales, cargos,
        contratos y empleados.
      </p>
    </div>
  </div>
</template>

<script setup>
const storeEmpleados = useEmpleadoStore();
const listaEmpleados = storeEmpleados.getEmpleados;
const storeCalendario = useCalendarStore();

onMounted(() => {
  const hoy = useDayjs();
  storeCalendario.setFechaCalendario(hoy());
});
</script>

<style></style>
