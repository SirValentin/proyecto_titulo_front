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
</script>

<style></style>
