<template>
  <div class="border-2 rounded-lg p-6">
    <p class="text-3xl">Planificador de turnos</p>
    <p class="text-2xl">Registrar de cuenta</p>
    <div class="my-6">
      <div class="flex flex-col">
        <label for="nombre">Nombre empresa:</label>
        <input
          v-model="body.nombre"
          type="text"
          name="nombre"
          id="nombre"
          class="border bg-emerald-100 rounded outline-none p-2"
        />
      </div>
      <div class="flex flex-col">
        <label for="rubro">Rubro empresa:</label>
        <input
          v-model="body.rubro"
          type="text"
          name="rubro"
          id="rubro"
          class="border bg-emerald-100 rounded outline-none p-2"
        />
      </div>
      <div class="flex flex-col">
        <label for="email">Email</label>
        <input
          v-model="body.email"
          type="text"
          name="email"
          id="email"
          autocomplete="off"
          class="border bg-emerald-100 rounded outline-none p-2"
        />
      </div>
      <div class="flex flex-col">
        <label for="contraseña">Contraseña</label>
        <input
          v-model="body.password"
          type="password"
          name="contraseña"
          id="contraseña"
          class="border bg-emerald-100 rounded outline-none p-2"
        />
      </div>
      <div class="flex flex-col">
        <label for="contraseña2">Repite Contraseña</label>
        <input
          v-model="body.password2"
          type="password"
          name="contraseña2"
          id="contraseña2"
          class="border bg-emerald-100 rounded outline-none p-2"
        />
      </div>
      <button
        class="bg-yellow-500 mt-6 w-full border rounded-full py-2 text-lg"
        @click="registrar"
      >
        Registrar
      </button>
      <div class="mt-2">
        <NuxtLink to="/login" class="text-sm text-blue-700"
          >Volver a inicio de sesion</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const body = ref({
  nombre: "",
  rubro: "",
  email: "",
  password: "",
  password2: "",
});
const router = useRouter();
const config = useRuntimeConfig();

const registrar = async () => {
  await $fetch(`${config.public.baseURL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: body.value.email,
      password: body.value.password,
    }),
  })
    .then((response) => {
      const usuario = response.id;
      crearEmpresa(usuario);
    })
    .catch((error) => console.log(error));
};

const crearEmpresa = async (idUsuario) => {
  await $fetch(`${config.public.baseURL}/empresa/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario: idUsuario,
      nombre: body.value.nombre,
      rubro: body.value.rubro,
    }),
  })
    .then((response) => {
      console.log(response);
      router.push({ path: "/login" });
    })
    .catch((error) => console.log(error));
};
</script>

<style></style>
