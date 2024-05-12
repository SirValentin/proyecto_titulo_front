export const useJornadaStore = defineStore("jornada", {
  state: () => ({
    listaJornadas: null,
  }),
  getters: {
    getJornadas(store) {
      return store.listaJornadas;
    },
  },
  actions: {
    async setJornada() {
      try {
        const data = await useMyFetch("GET", "/contrato/list_jornadas/");
        if (data.length) {
          this.listaJornadas = data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useJornadaStore, import.meta.hot));
}
