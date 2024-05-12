export const useTurnoStore = defineStore("turno", {
  state: () => ({
    listaTurnos: [],
    crearTurnoModal: false,
  }),
  getters: {
    getTurnos(state) {
      return state.listaTurnos;
    },
  },
  actions: {
    async setTurnos(body) {
      try {
        const data = await useMyFetch("POST", "/turno/lista_turnos/", {
          body: body,
        });
        if (data && !this.listaTurnos.length) {
          this.listaTurnos = data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async crearTurno(body) {
      try {
        const data = await useMyFetch("POST", "/turno/create/", {
          body: body,
        });
        if (data && !this.listaTurnos.length) {
          this.listaTurnos = data;
        } else if (data) {
          this.listaTurnos = this.listaTurnos.concat(data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async borrarTurno(body) {
      try {
        const data = await useMyFetch("POST", "/turno/borrar_turno/", {
          body: { turnos: body },
        });
        if (data) {
          this.listaTurnos = this.listaTurnos.filter(
            (turno) => !data.includes(turno.id)
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    async asignarTurnos(body) {
      try {
        const data = await useMyFetch("POST", "/turno/asignar_turno/", {
          body: { turnos: body },
        });
        if (data) {
          this.listaTurnos = this.listaTurnos.map((turno) => {
            const turnoEncontrado = data.find(
              (turnoActualizado) => turnoActualizado.id === turno.id
            );
            return turnoEncontrado || turno;
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTurnoStore, import.meta.hot));
}
