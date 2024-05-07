<template>
  <div>
    <DataTable :value="items" :stripedRows="true" tableStyle="min-width: 100%">
      <template #header>
        <div class="flex space-x-2">
          <Button
            label="Crear empleado"
            class="bg-skin-primary-60 text-xl text-white py-2 px-4"
          />
        </div>
      </template>
      <Column
        v-for="col of columnas"
        :key="col.field"
        class="border border-skin-primary-60 text-left p-2"
        :field="col.field"
        :header="col.header"
      ></Column>
    </DataTable>
  </div>
</template>

<script setup>
const columnas = [
  { field: "nombre", header: "Nombre" },
  { field: "apellido", header: "Apellido" },
  { field: "sucursal", header: "Sucursal" },
  { field: "cargo", header: "Cargo" },
  { field: "id", header: "Acciones" },
];
const items = ref([]);
</script>

<style></style>
