<template>
  <div>
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
