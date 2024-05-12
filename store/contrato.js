export const useContratoStore = defineStore("contrato", {
  state: () => ({
    listaContratos: null,
    formCrearContratoModal: false,
  }),
  getters: {
    getContratos(store) {
      return store.listaContratos || [];
    },
  },
  actions: {
    async setContratos() {
      try {
        const data = await useMyFetch("GET", "/contrato/list/");
        if (data.length) {
          this.listaContratos = data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async crearContrato(body) {
      try {
        const data = await useMyFetch("POST", "/contrato/create/", {
          body: body,
        });
        if (data && !this.listaContratos) {
          this.listaContratos = [data];
        } else if (data && this.listaContratos) {
          this.listaContratos.push(data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async borrarContrato(idContrato) {
      try {
        const response = await useMyFetch(
          "POST",
          `/contrato/${idContrato}/delete/`
        );
        if (response) {
          const indexContrato = this.listaContratos.findIndex(
            (item) => item.id === response
          );
          if (indexContrato !== -1) {
            this.listaContratos.splice(indexContrato, 1);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useContratoStore, import.meta.hot));
}
