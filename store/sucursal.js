export const useSucursalStore = defineStore("sucursal", {
  state: () => ({
    formCrearSucursalModal: false,
  }),
  getters: {},
  actions: {},
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSucursalStore, import.meta.hot));
}
