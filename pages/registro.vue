<template>
  <div>
    <RegisterForm />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "centrado",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/calendario",
  },
});
</script>

<style></style>
