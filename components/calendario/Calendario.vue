<template>
  <div class="space-y-5">
    <CalendarioToolbar />
    <div class="overflow-x-auto">
      <FechasCalendario
        style="min-width: 700px"
        :listaEmpleados="listaEmpleados"
      />
      <CalendarioBarraBotones
        style="min-width: 700px"
        :listaEmpleados="listaEmpleados"
      />
      <CalendarioEmpleados
        style="min-width: 700px"
        :listaEmpleados="listaEmpleados"
      />
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

import { useToast } from "primevue/usetoast";
const toast = useToast();
onMounted(() => {
  const hoy = useDayjs();
  storeCalendario.setFechaCalendario(hoy());
  if (useSolicitudStore().listaSolicitudes.length) {
    const totalSolicitudes = useSolicitudStore().listaSolicitudes.filter(
      (solicitud) => solicitud.estado === 1
    ).length;
    if (totalSolicitudes > 0) {
      toast.add({
        severity: "info",
        summary: "Hay solicitudes pendientes!",
        detail: `${totalSolicitudes} solicitudes que faltan por revisar`,
      });
    }
  }
});
</script>

<style></style>
