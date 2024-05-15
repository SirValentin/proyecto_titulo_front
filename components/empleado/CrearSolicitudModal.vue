<template>
  <div>
    <Dialog
      :visible="visible"
      modal
      :closable="false"
      header="Crear Solicitud"
      :style="{ width: '25rem' }"
    >
      <div class="mb-4">
        <p>Elige el turno que quieres cambiar:</p>
        <Calendar
          v-model="primeraFecha"
          showIcon
          iconDisplay="input"
          class="w-full border rounded"
          @month-change="mesCambiado"
        >
          <template #date="slotProps">
            <strong
              v-if="
                fechaTurnos.some(
                  (fecha) =>
                    fecha.day == slotProps.date.day &&
                    fecha.month == slotProps.date.month + 1 &&
                    fecha.year == slotProps.date.year
                )
              "
              class="bg-skin-primary-60 rounded-full w-6 text-center"
            >
              {{ slotProps.date.day }}
            </strong>
            <template v-else>{{ slotProps.date.day }}</template>
          </template>
        </Calendar>
        <div
          v-if="turnoSeleccionado1"
          class="flex border px-1 rounded mt-2 space-x-2 bg-skin-primary-60 justify-center"
        >
          <p>
            {{ turnoSeleccionado1.hora_inicio }} -
            {{ turnoSeleccionado1.hora_final }}
          </p>
          <p>{{ turnoSeleccionado1.colacion }} min.</p>
        </div>
        <div v-else class="flex">
          <p>No hay turno ese dia</p>
        </div>
      </div>
      <div class="mb-4">
        <p>Elige el segundo turno que quieres cambiar:</p>
        <Calendar
          v-model="segundaFecha"
          showIcon
          iconDisplay="input"
          class="w-full border rounded"
          @month-change="mesCambiado"
        >
          <template #date="slotProps">
            <strong
              v-if="
                fechaTurnos.some(
                  (fecha) =>
                    fecha.day == slotProps.date.day &&
                    fecha.month == slotProps.date.month + 1 &&
                    fecha.year == slotProps.date.year
                )
              "
              class="bg-skin-primary-60 rounded-full w-6 text-center"
            >
              {{ slotProps.date.day }}
            </strong>
            <template v-else>{{ slotProps.date.day }}</template>
          </template>
        </Calendar>
        <div
          v-if="turnoSeleccionado2"
          class="flex border px-1 rounded mt-2 space-x-2 bg-skin-primary-60 justify-center"
        >
          <p>
            {{ turnoSeleccionado2.hora_inicio }} -
            {{ turnoSeleccionado2.hora_final }}
          </p>
          <p>{{ turnoSeleccionado2.colacion }} min.</p>
        </div>
        <div v-else class="flex">
          <p>No hay turno ese dia</p>
        </div>
      </div>
      <Textarea v-model="comentario" class="border" rows="5" cols="30" />
      <div class="flex justify-between gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="cerrarModal"
        ></Button>
        <Button
          type="button"
          label="Guardar"
          class="btn-primary"
          @click="guardar"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
const emit = defineEmits(["cerrar"]);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const primeraFecha = ref(null);
const segundaFecha = ref(null);
const comentario = ref();
const dayjs = useDayjs();
const { data } = useAuth();
const turnosMes = ref([]);
const fechaModal = ref("");

const fechaTurnos = computed(() => {
  return turnosMes.value.map((turn) => {
    const fechaSplit = turn.fecha.split("-");
    const day = fechaSplit[2];
    const month = fechaSplit[1];
    const year = fechaSplit[0];
    return {
      day: day,
      month: month,
      year: year,
    };
  });
});

const turnoSeleccionado2 = computed(() => {
  const turnoEncontrado = turnosMes.value.find(
    (turn) => turn.fecha === dayjs(segundaFecha.value).format("YYYY-MM-DD")
  );
  return turnoEncontrado;
});
const turnoSeleccionado1 = computed(() => {
  const turnoEncontrado = turnosMes.value.find(
    (turn) => turn.fecha === dayjs(primeraFecha.value).format("YYYY-MM-DD")
  );
  return turnoEncontrado;
});
// Funciones
const guardar = async () => {
  const body = {
    turno1: dayjs(primeraFecha.value).format("YYYY-MM-DD"),
    turno2: dayjs(segundaFecha.value).format("YYYY-MM-DD"),
    tipo: 1,
    empleado: data.value.id_empleado,
    comentario: comentario.value,
  };
  useSolicitudStore().crearSolicitud(body);
  cerrarModal();
};
const cerrarModal = () => {
  emit("cerrar");
};

onMounted(() => {
  fechaModal.value = dayjs().format("YYYY-MM-DD");
  actualizarTurnos();
});

const actualizarTurnos = async () => {
  const body = {
    fecha_inicio: dayjs(fechaModal.value).startOf("month").format("YYYY-MM-DD"),
    fecha_final: dayjs(fechaModal.value).endOf("month").format("YYYY-MM-DD"),
    empleados: [data.value.id_empleado],
    solo_asignado: true,
  };
  try {
    const data = await useMyFetch("POST", "/turno/lista_turnos/", {
      body: body,
    });
    if (data) {
      turnosMes.value = data;
    }
  } catch (error) {
    console.log(error);
  }
};
const mesCambiado = ({ month }) => {
  const nuevaFecha = dayjs()
    .month(month - 1)
    .format("YYYY-MM-DD");
  console.log(nuevaFecha);
  fechaModal.value = nuevaFecha;
  actualizarTurnos();
};
</script>

<style></style>
