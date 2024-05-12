<template>
  <div>
    <Dialog
      :visible="visible"
      modal
      :closable="false"
      header="Crear Turno"
      :style="{ width: '25rem' }"
    >
      <div class="flex space-x-4">
        <div class="flex flex-col align-items-center mb-3">
          <label for="entrada" class="font-semibold">Entrada:</label>
          <InputMask
            id="entrada"
            v-model="bodyTurno.entrada"
            mask="99:99"
            placeholder="99:99"
            class="px-2 w-20"
            :class="{ 'border-red-500': entradaInvalida }"
            slotChar=""
            @update:modelValue="validarEntrada"
          />
        </div>
        <div class="flex flex-col align-items-center mb-5">
          <label for="salida" class="font-semibold">Salida:</label>
          <InputMask
            id="salida"
            v-model="bodyTurno.salida"
            mask="99:99"
            placeholder="99:99"
            class="border px-2 w-20"
            :class="{ 'border-red-500': salidaInvalida }"
            slotChar=""
            @update:modelValue="validarSalida"
          />
        </div>
      </div>
      <div class="flex flex-col align-items-center mb-5">
        <label for="colacion" class="font-semibold">Colacion (minutos):</label>
        <InputNumber
          v-model="bodyTurno.colacion"
          inputId="colacion"
          :min="0"
          :max="120"
          class="w-20"
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
          :disabled="deshabilitarBoton"
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
const bodyTurno = ref({
  entrada: "",
  salida: "",
  colacion: 0,
});
const entradaInvalida = ref(false);
const salidaInvalida = ref(false);
const deshabilitarBoton = computed(() => {
  return (
    !bodyTurno.value.entrada ||
    !bodyTurno.value.salida ||
    entradaInvalida.value ||
    salidaInvalida.value
  );
});
// Funciones
const cerrarModal = () => {
  emit("cerrar");
};
const storeCalendario = useCalendarStore();
const { celdasSeleccionadas } = storeToRefs(storeCalendario);
const guardar = async () => {
  try {
    const fechasPorEmpleado = celdasSeleccionadas.value.reduce(
      (agrupado, celda) => {
        const index = agrupado.findIndex(
          (item) => item.empleado === celda.empleado
        );
        if (index !== -1) {
          agrupado[index].fechas.push(celda.fecha);
        } else {
          agrupado.push({ empleado: celda.empleado, fechas: [celda.fecha] });
        }
        return agrupado;
      },
      []
    );
    const body = JSON.stringify({
      hora_inicio: bodyTurno.value.entrada,
      hora_final: bodyTurno.value.salida,
      colacion: +bodyTurno.value.colacion,
      seleccionados: fechasPorEmpleado,
    });
    await useTurnoStore().crearTurno(body);
    cerrarModal();
  } catch (error) {
    console.log(error);
  }
};
const validarEntrada = (value) => {
  const horas = +value.split(":")[0];
  const minutos = +value.split(":")[1];
  entradaInvalida.value = horas > 23 || minutos > 59;
};
const validarSalida = (value) => {
  const horas = +value.split(":")[0];
  const minutos = +value.split(":")[1];
  salidaInvalida.value = horas > 23 || minutos > 59;
};
</script>

<style lang="postcss">
#colacion {
  @apply w-20 border px-2;
}
</style>
