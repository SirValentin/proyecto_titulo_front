export const useSucursalStore = defineStore("sucursal", {
  state: () => ({
    listaSucursales: null,
    formCrearSucursalModal: false,
  }),
  getters: {
    getSucursales(store) {
      return store.listaSucursales;
    },
  },
  actions: {
    async setSucursales() {
      try {
        const data = await useMyFetch("GET", "/sucursal/list/");
        if (data.length) {
          this.listaSucursales = data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async crearSucursal(body) {
      try {
        const data = await useMyFetch("POST", "/sucursal/create/", {
          body: body,
        });
        if (data && !this.listaSucursales) {
          this.listaSucursales = [data];
        } else if (data && this.listaSucursales) {
          this.listaSucursales.push(data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async borrarSucursal(idSucursal) {
      try {
        const response = await useMyFetch(
          "POST",
          `/sucursal/${idSucursal}/delete/`
        );
        if (response) {
          const indexSucursal = this.listaSucursales.findIndex(
            (item) => item.id === response
          );
          if (indexSucursal !== -1) {
            this.listaSucursales.splice(indexSucursal, 1);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSucursalStore, import.meta.hot));
}
