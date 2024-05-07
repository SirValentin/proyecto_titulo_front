import dayjs from "dayjs";
export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    currentDay: null,
    calendarLocationSelected: null,
    calendarPositionSelected: null,
    selectedAssignedTurns: [],
    selectedAssignedCells: [],
    showLoading: false,
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
    // getSelectedAssignedCells(state) {
    //   return state.selectedAssignedCells;
    // },
    // getloading(state) {
    //   return state.showLoading;
    // },
    // getDateRangeFromSelectedCells(state) {
    //   return [
    //     ...new Set(state.selectedAssignedCells.map((cell) => cell.stringDate)),
    //   ].sort((a, b) => new Date(a) - new Date(b));
    // },
    // getCurrentDay(state) {
    //   const day = state.currentDay();
    //   return day;
    // },
  },
  actions: {},
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCalendarStore, import.meta.hot));
}
