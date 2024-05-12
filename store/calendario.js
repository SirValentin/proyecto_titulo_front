import dayjs from "dayjs";
export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    celdasSeleccionadas: [],
    turnosSeleccionados: [],
    listaFechas: [],
  }),
  getters: {
    getListaFechas() {
      const hoy = dayjs();
      const primerDiaSemana = hoy.startOf("week");
      const lista = Array.from(Array(7).keys(), (n) => {
        const diaSemana = primerDiaSemana.add(n, "day");
        return diaSemana.format("YYYY-MM-DD");
      });
      return lista;
    },
    getCeldasSeleccionadas(state) {
      return state.celdasSeleccionadas;
    },
    getTurnosSeleccionadas(state) {
      return state.turnosSeleccionados;
    },
  },
  actions: {
    manejadorCelda(celda) {
      const indexCelda = this.celdasSeleccionadas.findIndex((celdaStore) => {
        return (
          celdaStore.empleado === celda.empleado &&
          celdaStore.fecha === celda.fecha
        );
      });
      if (indexCelda !== -1) {
        this.celdasSeleccionadas.splice(indexCelda, 1);
      } else {
        this.celdasSeleccionadas.push(celda);
      }
    },
    manejadorTurno(turno) {
      const indexTurno = this.turnosSeleccionados.findIndex((turnoStore) => {
        return turnoStore === turno;
      });
      if (indexTurno !== -1) {
        this.turnosSeleccionados.splice(indexTurno, 1);
      } else {
        this.turnosSeleccionados.push(turno);
      }
    },
  },
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCalendarStore, import.meta.hot));
}
