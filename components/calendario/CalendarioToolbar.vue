<template>
  <div class="w-full flex justify-between">
    <div>
      <Button
        label="Asignar turnos"
        :disabled="!turnosSeleccionados.length"
        class="bg-skin-primary-100 px-2 py-1 text-white text-lg font-bold rounded-xl w-44 h-10"
        @click="asignarTurnos"
      />
    </div>
    <div>
      <div v-show="false" class="h-10">
        <ClientOnly>
          <VueMultiselect
            v-model="cargosSeleccionados"
            :options="locationOptions"
            :searchable="false"
            :close-on-select="true"
            :allow-empty="false"
            label="text"
            placeholder=""
            track-by="text"
            :show-labels="false"
            class="w-44 xl:w-48 h-10"
          >
            <template v-slot:singleLabel="{ option }">
              <div>
                <span class="flex items-center space-x-2 text-xs xl:text-base">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 inline-block text-skin-neutral-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </span>
                  <span
                    class="whitespace-nowrap overflow-ellipsis overflow-hidden"
                  >
                    {{ option.text }}
                  </span>
                </span>
              </div>
            </template>
          </VueMultiselect>
        </ClientOnly>
        <!-- @select="selectCalendarLocation" -->
      </div>
    </div>
  </div>
</template>

<script setup>
import VueMultiselect from "vue-multiselect";
import { useCalendarStore } from "../../store/calendario";

const storeCalendario = useCalendarStore();
const { getListaFechas: listaFechas, turnosSeleccionados } =
  storeToRefs(storeCalendario);
const cargosSeleccionados = ref([]);
const locationOptions = [
  { text: "maipu", value: 1 },
  { text: "maipu2", value: 2 },
];

const asignarTurnos = () => {
  useTurnoStore().asignarTurnos(turnosSeleccionados.value);
  turnosSeleccionados.value = [];
};
</script>

<style></style>
