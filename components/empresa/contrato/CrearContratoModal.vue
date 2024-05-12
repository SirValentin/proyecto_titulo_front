<template>
  <div>
    <Dialog
      :visible="visible"
      modal
      :closable="false"
      header="Crear Contrato"
      :style="{ width: '25rem' }"
    >
      <div class="flex flex-col align-items-center mb-3">
        <label for="nombre" class="font-semibold w-6rem">Nombre:</label>
        <InputText
          v-model="bodyContrato.nombre"
          :invalid="!bodyContrato.nombre"
          type="text"
          id="nombre"
          class="flex-auto border px-2 h-10"
          autocomplete="off"
        />
      </div>
      <div class="flex flex-col align-items-center mb-5">
        <label for="jornada" class="font-semibold w-6rem">Tipo jornada:</label>
        <Dropdown
          v-model="bodyContrato.jornada"
          :options="listaJornadas"
          :invalid="!bodyContrato.jornada"
          optionLabel="nombre_tipo"
          placeholder="Selecciona tipo de jornada"
          class="w-full md:w-14rem border"
        />
      </div>
      <div class="flex flex-col align-items-center mb-5">
        <label for="horas" class="font-semibold w-6rem">Horas semanales:</label>
        <InputNumber
          v-model="bodyContrato.horas_semanales"
          id="horas"
          class="border px-2 h-10"
          :min="1"
          :max="45"
        />
      </div>
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
          :disabled="botonInvalido"
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
const storeJornada = useJornadaStore();
const listaJornadas = storeJornada.getJornadas;

// const opcionesJornadas = listaJornadas.map((jornada) => {

// };
const bodyContrato = ref({
  nombre: "",
  jornada: "",
  horas_semanales: 0,
});

const botonInvalido = computed(() => {
  return (
    !bodyContrato.value.nombre ||
    !bodyContrato.value.jornada ||
    !bodyContrato.value.horas_semanales
  );
});
// Funciones
const cerrarModal = () => {
  emit("cerrar");
};
const guardar = async () => {
  try {
    const body = JSON.stringify({
      nombre: bodyContrato.value.nombre,
      jornada: bodyContrato.value.jornada.id,
      horas_semanales: +bodyContrato.value.horas_semanales,
    });
    await useContratoStore().crearContrato(body);
    cerrarModal();
  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
