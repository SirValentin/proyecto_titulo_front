<template>
  <div class="px-5">
    <LoginForm />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "centrado",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});
</script>

<style></style>
