export const useCargoStore = defineStore("cargo", {
  state: () => ({
    listaCargos: null,
    formCrearCargoModal: false,
  }),
  getters: {
    getCargos(store) {
      return store.listaCargos;
    },
  },
  actions: {
    async setCargos() {
      try {
        const data = await useMyFetch("GET", "/cargo/list/");
        if (data.length) {
          this.listaCargos = data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async crearCargo(body) {
      try {
        const data = await useMyFetch("POST", "/cargo/create/", {
          body: body,
        });
        if (data && !this.listaCargos) {
          this.listaCargos = [data];
        } else if (data && this.listaCargos) {
          this.listaCargos.push(data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async borrarCargo(idContrato) {
      try {
        const response = await useMyFetch(
          "POST",
          `/cargo/${idContrato}/delete/`
        );
        if (response) {
          const indexCargo = this.listaCargos.findIndex(
            (item) => item.id === response
          );
          if (indexCargo !== -1) {
            this.listaCargos.splice(indexCargo, 1);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCargoStore, import.meta.hot));
}
