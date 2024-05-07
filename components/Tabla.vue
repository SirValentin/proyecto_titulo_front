<template>
  <table class="w-full">
    <thead class="bg-skin-secondary-100">
      <th
        v-for="(columna, keyCol) in columnas"
        :key="keyCol"
        class="rounded-t px-2"
      >
        <p
          v-if="columna.titulo === 'Acciones'"
          class="flex justify-end items-end"
        >
          {{ columna.titulo }}
        </p>
        <p v-else>{{ columna.titulo }}</p>
      </th>
    </thead>
    <tbody>
      <tr
        v-for="(item, indexItem) in filas"
        :key="`${item[indexItem]} ${indexItem}`"
      >
        <td v-for="(_, keyColumna) in columnas" :key="keyColumna">
          {{ item[keyColumna] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps({
  columnas: {
    type: Object,
    required: true,
  },
  filas: {
    type: Array,
    required: true,
  },
});
</script>

<style></style>
