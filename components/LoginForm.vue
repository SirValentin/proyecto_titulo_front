<template>
  <div class="border-2 rounded-lg p-6">
    <p class="text-3xl">Planificador de turnos</p>
    <div class="my-6">
      <div class="flex flex-col">
        <label for="email">Usuario</label>
        <input
          v-model="email"
          type="text"
          name="email"
          id="email"
          class="border bg-emerald-100 rounded outline-none p-2"
        />
      </div>
      <div class="flex flex-col">
        <label for="contraseña">Contraseña</label>
        <input
          v-model="password"
          type="password"
          name="contraseña"
          id="contraseña"
          class="border bg-emerald-100 rounded outline-none p-2"
        />
      </div>
      <button
        class="bg-yellow-500 mt-6 w-full border rounded-full py-2 text-lg"
        @click="signInWithCredentials"
      >
        Ingresar
      </button>
      <div class="mt-2">
        <NuxtLink to="/registro" class="text-sm text-blue-700"
          >Registrar cuenta</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const message = "component login";
const email = ref("");
const password = ref("");

const { signIn } = useAuth();
async function signInWithCredentials() {
  const credentials = {
    email: email.value,
    password: password.value,
  };
  try {
    await signIn(credentials, { callbackUrl: "/" });
    alert("Bienvenido!");
  } catch (error) {
    console.error(error);
  }
}

async function submit() {
  await $fetch(`${config.public.baseURL}/users/token/login/`, {
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
      router.push({ path: "/login" });
    })
    .catch((error) => console.log(error));
}
</script>

<style></style>
