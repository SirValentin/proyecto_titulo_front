<template>
  <div>
    <Dialog
      :visible="visible"
      modal
      :closable="false"
      header="Crear cargo"
      :style="{ width: '25rem' }"
    >
      <div class="flex flex-col align-items-center mb-3">
        <label for="nombre" class="font-semibold w-6rem">Nombre*:</label>
        <InputText
          v-model="bodyCargo.nombre"
          :invalid="!bodyCargo.nombre"
          type="text"
          id="nombre"
          class="flex-auto border px-2"
          autocomplete="off"
        />
      </div>
      <div class="flex flex-col align-items-center mb-5">
        <label for="descripcion" class="font-semibold w-6rem"
          >Descripcion (opcional):</label
        >
        <InputText
          v-model="bodyCargo.descripcion"
          type="text"
          id="descripcion"
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
          :disabled="!bodyCargo.nombre"
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
const bodyCargo = ref({
  nombre: "",
  descripcion: "",
});
// Funciones
const cerrarModal = () => {
  emit("cerrar");
};
const guardar = async () => {
  try {
    const body = JSON.stringify({
      nombre: bodyCargo.value.nombre,
      descripcion: bodyCargo.value.descripcion,
    });
    await useCargoStore().crearCargo(body);
    cerrarModal();
  } catch (error) {
    console.log(error);
  }
};
</script>

<style></style>
