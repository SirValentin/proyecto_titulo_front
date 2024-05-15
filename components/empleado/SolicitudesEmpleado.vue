<template>
  <div>
    <DataTable
      :value="listaSolicitudesTabla"
      :stripedRows="true"
      tableStyle="min-width: 300px"
    >
      <template #header>
        <div class="flex space-x-2">
          <Button
            label="Crear Solicitud"
            class="bg-skin-primary-60 text-xl text-white py-2 px-4"
            @click="formCrearSolicitudModal = true"
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
          <Button
            v-if="slotProps.data.estado === 'En revision'"
            text
            @click="borrarItem(slotProps.data.id)"
          >
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
          </Button>
        </template>
      </Column>
    </DataTable>
    <CrearSolicitudModal
      v-if="formCrearSolicitudModal"
      :visible="formCrearSolicitudModal"
      @cerrar="formCrearSolicitudModal = false"
    />
  </div>
</template>

<script setup>
const storeSolicitud = useSolicitudStore();
const { formCrearSolicitudModal, listaSolicitudesEmpleado } =
  storeToRefs(storeSolicitud);
const columnas = [
  { field: "tipo", header: "Tipo" },
  // { field: "turnos", header: "Turnos" },
  { field: "comentario", header: "Comentario" },
  { field: "estado", header: "Estado" },
  { field: "id", header: "Acciones" },
];
const tipoSolicitud = {
  1: "Cambio de turno",
  2: "Dia libre",
  3: "Ausencia",
};
const estadoSolicitud = {
  1: "En revision",
  2: "Aceptado",
  3: "Rechazado",
};
const { data } = useAuth();
const listaSolicitudesTabla = computed(() => {
  if (!listaSolicitudesEmpleado.value) return [];
  return listaSolicitudesEmpleado.value.map((solicitud) => {
    return {
      ...solicitud,
      tipo: tipoSolicitud[solicitud.tipo],
      estado: estadoSolicitud[solicitud.estado],
    };
  });
});
onMounted(() => {
  storeSolicitud.setSolicitudesEmpleado(data.value.id_empleado);
});
// Methods

const borrarItem = (id) => {
  storeSolicitud.borrarSolicitud(id);
};
</script>

<style></style>
