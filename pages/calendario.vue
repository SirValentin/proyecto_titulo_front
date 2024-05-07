<template>
  <div class="">
    <Calendario />
    <button @click="cerrarSesion">cerrar</button>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "navbar",
});
const {
  data,
  status,
  lastRefreshedAt,
  getCsrfToken,
  getProviders,
  signIn,
  signOut,
  getSession,
} = useAuth();
async function cerrarSesion() {
  await signOut({ callbackUrl: "/login" });
  // console.log(getCsrfToken);
}
</script>

<style></style>
