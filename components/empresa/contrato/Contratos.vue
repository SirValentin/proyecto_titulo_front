<template>
  <div>
    <DataTable
      :value="itemsContratos"
      :stripedRows="true"
      tableStyle="min-width: 100%"
    >
      <template #header>
        <div class="flex space-x-2">
          <Button
            label="Crear contrato"
            class="bg-skin-primary-60 text-xl text-white py-2 px-4"
            @click="formCrearContratoModal = true"
          />
        </div>
      </template>
      <Column
        v-for="col of columnas"
        :key="col.field"
        class="border border-skin-primary-60 text-left p-2"
        :field="col.field"
        :header="col.header"
      >
        <template v-if="col.field === 'id'" #body="slotProps">
          <button @click="borrarItem(slotProps.data.id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 text-red-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button> </template
      ></Column>
    </DataTable>
    <CrearContratoModal
      v-if="formCrearContratoModal"
      :visible="formCrearContratoModal"
      @cerrar="formCrearContratoModal = false"
    />
  </div>
</template>

<script setup>
// Store
const storeJornada = useJornadaStore();
const listaJornadas = storeJornada.getJornadas;
const storeContrato = useContratoStore();
const { formCrearContratoModal, getContratos } = storeToRefs(storeContrato);
// Data
const itemsContratos = computed(() => {
  return getContratos.value.map((contrato) => {
    const tipoJornada = listaJornadas.find((j) => j.id === contrato.tipo);
    return { ...contrato, tipo: tipoJornada ? tipoJornada.nombre_tipo : "" };
  });
});
const columnas = [
  { field: "nombre", header: "Contrato" },
  { field: "tipo", header: "Jornada" },
  { field: "horas_semanales", header: "Horas" },
  { field: "id", header: "Acciones" },
];
async function borrarItem(item) {
  await storeContrato.borrarContrato(item);
}
</script>

<style></style>
