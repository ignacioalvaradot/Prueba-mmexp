//let rutaBD = "http://localhost:81/"
//let rutaFront = "http://localhost/"

/* const rutaBD = "http://api.mmexp.informatica.uv.cl/";
const rutaFront = "http://mmexp.informatica.uv.cl/";
 */
const rutaBD = "http://localhost3:80/";
const rutaFront = "http://localhost2:80/";

export const rutasFront = {
  login: rutaFront + "login/",
  inicio: rutaFront + "inicio/",
  Usuarios: rutaFront + "gestionarUsuarios/",
  Experimentos: rutaFront + "experimentos/",
  PlanificacionExp: rutaFront + "planificacion/",
  PreparacionExp: rutaFront + "preparacion/",
  PreparacionConfig: rutaFront + "preparacionConfig/",
  PreparacionVerific: rutaFront + "preparacionVerific/",
  EjecucionExp: rutaFront + "ejecucion/",
  AnalisisExp: rutaFront + "analisis/",
  rutaLocal: rutaFront,
};

const routesBD = {
  dispositivos: rutaBD + "api/dispositivos/",
  experimentos: rutaBD + "api/experimentos/",
  experimentosVis: rutaBD + "api/experimentosVis/",
  fases: rutaBD + "api/fases/",
  grupos: rutaBD + "api/grupos/",
  mediciones: rutaBD + "api/mediciones/",
  observaciones: rutaBD + "api/observaciones/",
  participantes: rutaBD + "api/participantes/",
  reporteResultados: rutaBD + "api/reporteResultados/",
  tipoDispositivo: rutaBD + "api/tipoDispositivo/",
  tipoMediciones: rutaBD + "api/tipoMediciones/",
  users: rutaBD + "api/users/",
  rutaLocal: rutaBD,
  archivosPruebas: rutaBD + "api/archivos/consultaMedicion/",
  descargaTest: rutaBD + "api/descargaTest/",
  socket: "http://192.168.0.3:200/",
};

export default routesBD;
