export default defineNuxtRouteMiddleware((to, from) => {
  const { data, status } = useAuth();
  const paginasEmpleado = ["/turnos-empleado"];
  if (
    status.value === "authenticated" &&
    data.value.es_empleado &&
    !paginasEmpleado.includes(to.path)
  ) {
    return navigateTo("/turnos-empleado");
  } else {
    return;
  }
});
