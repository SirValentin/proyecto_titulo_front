export const usePerfilempleadoStore = defineStore("perfilempleado", {
  state: () => ({
    listaTurnosPerfilEmpleado: [],
  }),
  getters: {
    getTurnosPerfilEmpleado(state) {
      return state.listaTurnosPerfilEmpleado;
    },
  },
  actions: {
    async setTurnos(body) {
      try {
        const data = await useMyFetch("POST", "/turno/lista_turnos/", {
          body: body,
        });
        if (data) {
          this.listaTurnosPerfilEmpleado = data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(usePerfilempleadoStore, import.meta.hot)
  );
}
