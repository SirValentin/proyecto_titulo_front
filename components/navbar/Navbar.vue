<template>
  <nav
    class="bg-skin-secondary-100 fixed z-30 h-screen shadow-xl py-8 px-2 transition-all overflow-hidden flex flex-col overflow-y-auto"
    :class="openNavbar ? 'w-56 items-stretch' : 'w-12 justify-between'"
    style="min-width: 48px"
    @mouseover="openNavbar = true"
    @mouseleave="openNavbar = false"
  >
    <div class="mb-6">
      <div class="space-y-2" :class="openNavbar ? 'w-20' : ''">
        <h2 class="font-bold text-lg flex flex-col">
          <span v-show="openNavbar">{{
            data?.es_empleado ? "Empleado" : "Admin"
          }}</span>
          <span v-show="!openNavbar">{{ data?.email }}</span>
          <span v-show="openNavbar">{{ data?.email }}</span>
        </h2>
      </div>
    </div>
    <ul v-if="data?.es_empleado" :class="{ 'space-y-1': !openNavbar }">
      <!-- Mis turnos -->
      <li>
        <NuxtLink
          to="/turnos-empleado"
          :class="openNavbar ? 'px-4 hover:pl-2' : 'px-0.5 justify-center'"
          class="nav-bar-item"
        >
          <span>
            <svg
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
          <h1 v-show="openNavbar">Mis turnos</h1>
        </NuxtLink>
      </li>
      <!-- Solicitudes -->
      <li>
        <NuxtLink
          to="/solicitudes-empleado"
          :class="openNavbar ? 'px-4 hover:pl-2' : 'px-0.5 justify-center'"
          class="nav-bar-item"
        >
          <span>
            <svg
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
          <h1 v-show="openNavbar">Solicitudes</h1>
        </NuxtLink>
      </li>
    </ul>
    <ul v-else :class="{ 'space-y-1': !openNavbar }">
      <!-- Calendario -->
      <li>
        <NuxtLink
          to="/"
          :class="openNavbar ? 'px-4 hover:pl-2' : 'px-0.5 justify-center'"
          class="nav-bar-item"
        >
          <span>
            <svg
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
          <h1 v-show="openNavbar">calendario</h1>
        </NuxtLink>
      </li>
      <!-- Empresa -->
      <li>
        <NuxtLink
          to="/empresa"
          :class="openNavbar ? 'px-4 hover:pl-2' : 'px-0.5 justify-center'"
          class="nav-bar-item"
        >
          <span>
            <svg
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
          <h1 v-show="openNavbar">empresa</h1>
        </NuxtLink>
      </li>
      <!-- Solicitudes -->
      <li>
        <NuxtLink
          to="/solicitudes"
          :class="openNavbar ? 'px-4 hover:pl-2' : 'px-0.5 justify-center'"
          class="nav-bar-item"
        >
          <span>
            <svg
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </span>
          <h1 v-show="openNavbar">solicitudes</h1>
        </NuxtLink>
      </li>
    </ul>
    <ul :class="{ 'h-full flex flex-col justify-end': openNavbar }">
      <!-- Cerrar sesion -->
      <li>
        <button
          class="nav-bar-item w-full"
          :class="openNavbar ? 'px-4 hover:pl-2' : 'px-0.5 justify-center'"
          @click="cerrarSesion"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </span>
          <h1 v-show="openNavbar">Cerrar sesión</h1>
        </button>
      </li>
    </ul>
  </nav>
</template>
<script setup>
const openNavbar = ref(false);

//Data
const { signOut, data } = useAuth();

//Methods
async function cerrarSesion() {
  await signOut({ callbackUrl: "/login" });
  useEmpleadoStore().$reset();
  useSucursalStore().$reset();
  useCargoStore().$reset();
  useContratoStore().$reset();
  useJornadaStore().$reset();
  useTurnoStore().$reset();
  useCalendarStore().$reset();
  usePerfilempleadoStore().$reset();
  useSolicitudStore().$reset();
}
</script>
