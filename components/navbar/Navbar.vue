<template>
  <nav
    class="bg-skin-secondary-100 fixed z-30 h-screen shadow-xl py-8 px-2 transition-all overflow-hidden flex flex-col overflow-y-auto"
    :class="openNavbar ? 'w-56 items-stretch' : 'w-12 justify-between'"
    style="min-width: 48px"
    @mouseover="openNavbar = true"
    @mouseleave="openNavbar = false"
  >
    <div class="mb-6">
      <div
        class="space-y-2 text-center"
        :class="openNavbar ? 'w-20 mx-auto' : ''"
      >
        <h2 class="font-bold text-lg">
          <!-- <span v-show="!openNavbar">{{ initials }}</span> -->
          <span v-show="!openNavbar">hola</span>
          <!-- <span v-show="openNavbar">{{ organization?.name }}</span> -->
          <span v-show="openNavbar">hola</span>
        </h2>
      </div>
    </div>
    <ul :class="{ 'space-y-1': !openNavbar }">
      <!-- Calendario -->
      <li>
        <NuxtLink
          to="/calendario"
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
          @click="logOut"
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
// import { storeToRefs } from "pinia";
// const navbarStore = useNavbarStore();
// const organizationStore = useOrganizationStore();
// const { openNavbar } = storeToRefs(navbarStore);
const openNavbar = ref(false);
// const { organization } = storeToRefs(organizationStore);
// const { $loadingplugin } = useNuxtApp();

//Data
// const { signOut } = useAuth();
// const openSubmenuEmpresa = ref(false);
// const openSubmenuPlantillas = ref(false);
// const openSubmenuConfiguracion = ref(false);

// watch(openSubmenuEmpresa, () => {
//   if (openSubmenuEmpresa.value) {
//     openSubmenuPlantillas.value = false;
//     openSubmenuConfiguracion.value = false;
//   }
// });
// watch(openSubmenuPlantillas, () => {
//   if (openSubmenuPlantillas.value) {
//     openSubmenuEmpresa.value = false;
//     openSubmenuConfiguracion.value = false;
//   }
// });
// watch(openSubmenuConfiguracion, () => {
//   if (openSubmenuConfiguracion.value) {
//     openSubmenuPlantillas.value = false;
//     openSubmenuEmpresa.value = false;
//   }
// });
//Computeds
// const initials = computed(() => {
//   const name = organization.value?.name;
//   if (!name) return "";
//   const spliName = name.split(" ");
//   let initials;
//   if (spliName.length > 1) {
//     initials = spliName.map((word) => word.slice(0, 1));
//   } else {
//     initials = spliName[0].slice(0, 2);
//   }
//   return initials;
// });

//Methods

// const logOut = async () => {
//   $loadingplugin.start();
//   await signOut();
//   const { data, error } = await useMyFetch2.post("auth/token/logout/");
//   if (data) {
//     // process data
//     await signOut();
//   } else if (error) {
//     // errorpage
//     console.log(error.statusCode);
//   }
// };
</script>
