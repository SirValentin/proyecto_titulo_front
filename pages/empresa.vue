<template>
  <div class="h-screen">
    <TabView>
      <TabPanel header="Sucursales">
        <Sucursales />
      </TabPanel>
      <TabPanel header="Cargos">
        <Cargos />
      </TabPanel>
      <TabPanel header="Contratos">
        <Contratos />
      </TabPanel>
      <TabPanel header="Empleados">
        <Empleados />
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "navbar",
});
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
if (!useEmpleadoStore().listaEmpleados) {
  const { data: dataEmpleado } = await useAsyncData("empleados", () =>
    useEmpleadoStore().setEmpleados()
  );
}
</script>

<style></style>
