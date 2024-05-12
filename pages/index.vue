<template>
  <div class="">
    <Calendario />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "navbar",
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
</script>

<style></style>
