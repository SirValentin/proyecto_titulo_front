<template>
  <div class="">
    <Toast />
    <Calendario />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "navbar",
});
const storeSolicitud = useSolicitudStore();
const { listaSolicitudes } = storeToRefs(storeSolicitud);

import { useToast } from "primevue/usetoast";
const toast = useToast();
// if (useSolicitudStore().listaSolicitudes.length) {
//   const totalSolicitudes = useSolicitudStore().listaSolicitudes.filter(
//     (solicitud) => solicitud.estado === 1
//   ).length;
//   if (totalSolicitudes > 0) {
//     toast.add({
//       severity: "info",
//       summary: "Hay solicitudes pendientes!",
//       detail: `${totalSolicitudes} solicitudes que faltan por revisar`,
//     });
//   }
// }
toast.add({
  severity: "info",
  summary: "Hay solicitudes pendientes!",
  detail: `solicitudes que faltan por revisar`,
});

if (!useEmpleadoStore().listaEmpleados) {
  const { data: dataEmpleado } = await useAsyncData("empleados", () =>
    useEmpleadoStore().setEmpleados()
  );
}
if (!useSucursalStore().listaSucursales) {
  const { data: dataSucursal } = await useAsyncData("sucursales", () =>
    useSucursalStore().setSucursales()
  );
}
if (!useCargoStore().listaCargos) {
  const { data: dataCargo } = await useAsyncData("cargos", () =>
    useCargoStore().setCargos()
  );
}
if (!useContratoStore().listaContratos) {
  const { data: dataContrato } = await useAsyncData("contratos", () =>
    useContratoStore().setContratos()
  );
}
if (!useJornadaStore().listaJornadas) {
  const { data: dataJornada } = await useAsyncData("jornadas", () =>
    useJornadaStore().setJornada()
  );
}
if (!useSolicitudStore().listaSolicitudes) {
  const { data: dataSolicitud } = await useAsyncData("solicitudes", () =>
    useSolicitudStore().setSolicitudes()
  );
}
</script>

<style></style>
