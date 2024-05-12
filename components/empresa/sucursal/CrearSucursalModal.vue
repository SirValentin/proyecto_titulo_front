<template>
  <div>
    <Dialog
      :visible="visible"
      modal
      :closable="false"
      header="Crear sucursal"
      :style="{ width: '25rem' }"
    >
      <div class="flex flex-col align-items-center mb-3">
        <label for="nombre" class="font-semibold w-6rem">Nombre*:</label>
        <InputText
          v-model="bodySucursal.nombre"
          :invalid="!bodySucursal.nombre"
          type="text"
          id="nombre"
          class="flex-auto border px-2"
          autocomplete="off"
        />
      </div>
      <div class="flex flex-col align-items-center mb-5">
        <label for="direccion" class="font-semibold w-6rem"
          >Direccion (opcional):</label
        >
        <InputText
          v-model="bodySucursal.direccion"
          type="text"
          id="direccion"
          class="flex-auto border px-2"
          autocomplete="off"
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
          :disabled="!bodySucursal.nombre"
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
const bodySucursal = ref({
  nombre: "",
  direccion: "",
});
// Funciones
const cerrarModal = () => {
  emit("cerrar");
};
const guardar = async () => {
  try {
    const body = JSON.stringify({
      nombre: bodySucursal.value.nombre,
      direccion: bodySucursal.value.direccion,
    });
    await useSucursalStore().crearSucursal(body);
    cerrarModal();
  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
