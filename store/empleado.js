export const useEmpleadoStore = defineStore("empleado", {
  state: () => ({
    listaEmpleados: null,
    formCrearEmpleadoModal: false,
  }),
  getters: {
    getEmpleados(store) {
      return store.listaEmpleados || [];
    },
  },
  actions: {
    async setEmpleados() {
      try {
        const data = await useMyFetch("GET", "/empleado/list/");
        if (data.length) {
          this.listaEmpleados = data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async crearEmpleado(body) {
      try {
        const data = await useMyFetch("POST", "/empleado/create/", {
          body: body,
        });
        if (data && !this.listaEmpleados) {
          this.listaEmpleados = [data];
        } else if (data && this.listaEmpleados) {
          this.listaEmpleados.push(data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async borrarEmpleado(idEmpleado) {
      try {
        const response = await useMyFetch(
          "POST",
          `/empleado/${idEmpleado}/delete/`
        );
        if (response) {
          const indexEmpleado = this.listaEmpleados.findIndex(
            (item) => item.id === response
          );
          if (indexEmpleado !== -1) {
            this.listaEmpleados.splice(indexEmpleado, 1);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEmpleadoStore, import.meta.hot));
}
