<template>
  <div class="card">
    <DataTable :value="items" :stripedRows="true" tableStyle="min-width: 100%">
      <template #header>
        <div class="flex space-x-2">
          <Button
            label="Crear sucursal"
            class="bg-skin-primary-60 text-xl text-white py-2 px-4"
            @click="formCrearSucursalModal = true"
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
    <CrearSucursalModal
      v-if="formCrearSucursalModal"
      :visible="formCrearSucursalModal"
      @cerrar="formCrearSucursalModal = false"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useSucursalStore } from "../../store/sucursal";
// Data
const storeSucursal = useSucursalStore();
const { formCrearSucursalModal } = storeToRefs(storeSucursal);

const visible = ref(false);
const columnas = [
  { field: "nombre", header: "Sucursal" },
  { field: "direccion", header: "Direccion" },
  { field: "id", header: "Acciones" },
];
const items = [
  { nombre: "Maipu", direccion: "aca nomas", id: 1 },
  { nombre: "Maipu", direccion: "aca nomas", id: 1 },
];
</script>

<style></style>
