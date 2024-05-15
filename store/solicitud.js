export const useSolicitudStore = defineStore("solicitud", {
  state: () => ({
    formCrearSolicitudModal: false,
    listaSolicitudesEmpleado: null,
    listaSolicitudes: null,
  }),
  getters: {},
  actions: {
    async crearSolicitud(body) {
      try {
        const data = await useMyFetch("POST", "/solicitud/cambio_turno/", {
          body: body,
        });
        if (data && !this.listaSolicitudesEmpleado) {
          this.listaSolicitudesEmpleado = [data];
        } else if (data) {
          this.listaSolicitudesEmpleado.push(data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async borrarSolicitud(idSolicitud) {
      try {
        const data = await useMyFetch(
          "POST",
          `/solicitud/borrar/${idSolicitud}/`
        );
        const index = this.listaSolicitudesEmpleado.findIndex(
          (item) => item.id === data
        );
        if (index !== -1) {
          this.listaSolicitudesEmpleado.splice(index, 1);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async setSolicitudes() {
      try {
        const data = await useMyFetch("GET", "/solicitud/lista_solicitudes/");
        if (data) {
          this.listaSolicitudes = data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async setSolicitudesEmpleado(idEmpleado) {
      try {
        const data = await useMyFetch(
          "GET",
          `/solicitud/lista_solicitudes/${idEmpleado}`
        );
        if (data) {
          this.listaSolicitudesEmpleado = data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async aprobarSolicitud(body) {
      try {
        const data = await useMyFetch("POST", "/solicitud/aprobar/", {
          body: body,
        });
        if (data) {
          const index = this.listaSolicitudes.findIndex(
            (item) => item.id === data.id
          );
          if (index !== -1) {
            this.listaSolicitudes.splice(index, 1, data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    async rechazarSolicitud(body) {
      try {
        const data = await useMyFetch("POST", "/solicitud/rechazar/", {
          body: body,
        });
        if (data) {
          const index = this.listaSolicitudes.findIndex(
            (item) => item.id === data.id
          );
          if (index !== -1) {
            this.listaSolicitudes.splice(index, 1, data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSolicitudStore, import.meta.hot));
}
