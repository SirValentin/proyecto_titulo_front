<template>
  <div>
    <Dialog
      :visible="visible"
      modal
      :closable="false"
      header="Crear Empleado"
      :style="{ width: '25rem' }"
    >
      <div class="flex flex-col align-items-center mb-3">
        <label for="nombre" class="font-semibold w-6rem">Nombre:</label>
        <InputText
          v-model="bodyEmpleado.nombre"
          type="text"
          id="nombre"
          class="flex-auto border px-2 h-10"
          autocomplete="off"
        />
      </div>
      <div class="flex flex-col align-items-center mb-3">
        <label for="apellido" class="font-semibold w-6rem">Apellido:</label>
        <InputText
          v-model="bodyEmpleado.apellido"
          type="text"
          id="apellido"
          class="flex-auto border px-2 h-10"
          autocomplete="off"
        />
      </div>
      <div class="flex flex-col align-items-center mb-3">
        <label for="rut" class="font-semibold w-6rem">Rut:</label>
        <InputText
          v-model="bodyEmpleado.rut"
          type="text"
          id="rut"
          class="flex-auto border px-2 h-10"
          autocomplete="off"
          :invalid="!rutValido"
          @update:modelValue="verificarRut"
        />
      </div>
      <div class="flex flex-col align-items-center mb-3">
        <label for="email" class="font-semibold w-6rem">Email:</label>
        <InputText
          v-model="bodyEmpleado.email"
          type="text"
          id="email"
          class="flex-auto border px-2 h-10"
          autocomplete="off"
          :invalid="!emailValido"
          @update:modelValue="validarEmail"
        />
      </div>
      <div class="flex flex-col align-items-center mb-5">
        <label class="font-semibold w-6rem">Contrato:</label>
        <Dropdown
          v-model="bodyEmpleado.contrato"
          :options="listaContratos"
          optionLabel="nombre"
          placeholder="Selecciona contrato"
          class="w-full md:w-14rem border"
        />
      </div>
      <div class="flex flex-col align-items-center mb-5">
        <label class="font-semibold w-6rem">Cargo:</label>
        <Dropdown
          v-model="bodyEmpleado.cargo"
          :options="listaCargos"
          optionLabel="nombre"
          placeholder="Selecciona cargo"
          class="w-full md:w-14rem border"
        />
      </div>
      <div class="flex flex-col align-items-center mb-5">
        <label class="font-semibold w-6rem">Sucursal:</label>
        <Dropdown
          v-model="bodyEmpleado.sucursal"
          :options="listaSucursales"
          optionLabel="nombre"
          placeholder="Selecciona sucursal"
          class="w-full md:w-14rem border"
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
const storeContrato = useContratoStore();
const storeCargo = useCargoStore();
const storeSucursal = useSucursalStore();

const listaContratos = storeContrato.getContratos;
const listaCargos = storeCargo.getCargos;
const listaSucursales = storeSucursal.getSucursales;

const bodyEmpleado = ref({
  nombre: "",
  apellido: "",
  rut: "",
  email: "",
  contrato: "",
  cargo: "",
  sucursal: "",
});
const emailValido = ref(true);
const rutValido = ref(true);
const botonInvalido = computed(() => {
  return (
    !bodyEmpleado.value.nombre ||
    !bodyEmpleado.value.apellido ||
    !bodyEmpleado.value.rut ||
    !bodyEmpleado.value.email ||
    !bodyEmpleado.value.contrato ||
    !bodyEmpleado.value.cargo ||
    !bodyEmpleado.value.sucursal ||
    !emailValido.value ||
    !rutValido.value
  );
});
// Funciones
const cerrarModal = () => {
  emit("cerrar");
};
const guardar = async () => {
  try {
    const body = JSON.stringify({
      ...bodyEmpleado.value,
      contrato: bodyEmpleado.value.contrato.id,
      cargo: bodyEmpleado.value.cargo.id,
      sucursal: bodyEmpleado.value.sucursal.id,
    });
    await useEmpleadoStore().crearEmpleado(body);
    cerrarModal();
  } catch (error) {
    console.log(error);
  }
};
const validarEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(value)) {
    emailValido.value = true;
  } else {
    emailValido.value = false;
  }
};
const verificarRut = (rut) => {
  const rutFormateado = formatearRut(rut);
  bodyEmpleado.value.rut = rutFormateado;

  const rutSplit = rutFormateado.split("-"); // separamos el numero del digito verificador
  const number = rutSplit[0].replace(/[^0-9]+/g, ""); // numero
  const digit = rutSplit[1]; // digito verificador
  const reverseNumber = number.split("").reverse(); // se transforma en array y se da vuelta el orden de los numeros
  let index = 2; // una serie del 2 al 7 que se multiplica por cada numero del dni
  let total = 0; // suma total de las multiplicaciones
  reverseNumber.forEach((number) => {
    if (index > 7) index = 2; // si llega hasta 7 se devuelve la serie al 2
    const multiplication = +number * index; // se multiplica el numero por la serie
    total += multiplication; // se suman todos los resultados de la multiplicacion
    index++; // se suma una para continuar con la serie hasta el 7
  });
  const remainder = total % 11; // resto
  const res = 11 - remainder;
  if (res === 11) {
    // si el resto es 11 el digito debe ser 0
    rutValido.value = +digit === 0;
  } else if (res === 10) {
    // si el resto es 10 el digito debe ser k
    rutValido.value = digit === "K";
  } else {
    // en otro caso el digito verificador debe ser el resto
    rutValido.value = +digit === res;
  }
  console.log(rutValido.value);
};
const formatearRut = (rut) => {
  // Eliminar guiones y puntos y convertir a mayúsculas
  rut = rut.replace(/[^\dK]/g, "").toUpperCase();

  // Separar parte numérica y dígito verificador
  var rutNumerico = rut.slice(0, -1);
  var dv = rut.slice(-1);

  // Formatear parte numérica con puntos de separación
  var rutFormateado = rutNumerico.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Devolver RUT formateado con guión y dígito verificador
  return rutFormateado + "-" + dv;
};
</script>

<style></style>
