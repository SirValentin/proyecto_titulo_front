<template>
  <div class="pl-9">
    <TabView>
      <TabPanel header="Solicitudes">
        <SolicitudesEmpleado />
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
