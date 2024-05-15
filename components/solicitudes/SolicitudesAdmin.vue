<template>
  <div>
    <DataTable
      :value="listaSolicitudesTabla"
      :stripedRows="true"
      tableStyle="min-width: 100%"
    >
      <Column
        v-for="col of columnas"
        :key="col.field"
        class="border border-skin-primary-60 text-left p-2 w-fit"
        :field="col.field"
        :header="col.header"
      >
        <template v-if="col.field === 'turno'" #body="slotProps">
          <div class="flex justify-center">
            <div class="w-fit flex flex-col items-center">
              <div
                class="bg-skin-secondary-100 px-1 rounded space-x-1 flex divide-x-2"
              >
                <div>Fecha: {{ slotProps.data.turnos[0].fecha }}</div>
                <div>
                  Horario: {{ slotProps.data.turnos[0].hora_inicio }} -
                  {{ slotProps.data.turnos[0].hora_final }}
                </div>
                <div>
                  Colacion: {{ slotProps.data.turnos[0].colacion }} min.
                </div>
              </div>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </span>
              <div
                class="bg-skin-secondary-100 px-1 rounded space-x-1 flex divide-x-2"
              >
                <div>Fecha: {{ slotProps.data.turnos[1].fecha }}</div>
                <div>
                  Horario: {{ slotProps.data.turnos[1].hora_inicio }} -
                  {{ slotProps.data.turnos[1].hora_final }}
                </div>
                <div>
                  Colacion: {{ slotProps.data.turnos[1].colacion }} min.
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-if="col.field === 'id'" #body="slotProps">
          <div class="flex space-x-2">
            <Button text @click="aprobarSolicitud(slotProps.data.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Button>
            <Button text @click="rechazarSolicitud(slotProps.data.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
const storeSolicitud = useSolicitudStore();
const { listaSolicitudes } = storeToRefs(storeSolicitud);
const columnas = [
  { field: "nombre_empleado", header: "Empleado" },
  { field: "tipo", header: "Tipo" },
  { field: "turno", header: "Turnos" },
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
const listaSolicitudesTabla = computed(() => {
  if (!listaSolicitudes.value) return [];
  return listaSolicitudes.value.map((solicitud) => {
    return {
      ...solicitud,
      tipo: tipoSolicitud[solicitud.tipo],
      estado: estadoSolicitud[solicitud.estado],
    };
  });
});
onMounted(() => {
  useSolicitudStore().setSolicitudes();
});

const aprobarSolicitud = (idSolicitud) => {
  const body = {
    estado: 2,
    solicitud: idSolicitud,
  };
  storeSolicitud.aprobarSolicitud(body);
};
const rechazarSolicitud = (idSolicitud) => {
  const body = {
    estado: 3,
    solicitud: idSolicitud,
  };
  storeSolicitud.rechazarSolicitud(body);
};
</script>

<style></style>
