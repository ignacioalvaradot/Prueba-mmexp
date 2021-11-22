// const routes = {
//     login: "/login",
//     inicio: "/inicio", 
//     Usuarios: "/gestionarUsuarios" ,
//     Experimentos: "/experimentos/:tipoExperimentos" ,
//     PlanificacionExp: "/planificacion/:id",
//     PreparacionExp: "/preparacion/:id",
//     PreparacionConfig: "/preparacionConfig/:id",
//     PreparacionVerific: "/preparacionVerific/:id",
//     FormDialog: "/ejecucion/:id",
//     AnalisisExp: "/analisis/:id",
//     TestSocket: "/testSocket/",
// };

//deben quedar como localhost2
const routesBD = {
    dispositivos: "http://localhost2/api/dispositivos/",
    experimentos: "http://localhost2/api/experimentos/",
    fases: "http://localhost2/api/fases/",
    grupos: "http://localhost2/api/grupos/",
    mediciones: "http://localhost2/api/mediciones/",
    observaciones: "http://localhost2/api/observaciones/",
    participantes: "http://localhost2/api/participantes/",
    reporteResultados: "http://localhost2/api/reporteResultados/",
    tipoDispositivo: "http://localhost2/api/tipoDispositivo/",
    tipoMediciones: "http://localhost2/api/tipoMediciones/",
    users: "http://localhost2/api/users/",
    rutaLocal: "http://localhost2/",
    archivosPruebas: "http://localhost2/api/archivos/consultaMedicion/",
    descargaTest: "http://localhost2/api/descargaTest/",
    socket: "http://192.168.0.3:200/",
}
// const routesBD = {
//     rutaLocal: "http://localhost:81/",
//     dispositivos: "http://localhost:81/api/dispositivos/",
//     experimentos: "http://localhost:81/api/experimentos/",
//     fases: "http://localhost:81/api/fases/",
//     grupos: "http://localhost:81/api/grupos/",
//     mediciones: "http://localhost:81/api/mediciones/",
//     observaciones: "http://localhost:81/api/observaciones/",
//     participantes: "http://localhost:81/api/participantes/",
//     reporteResultados: "http://localhost:81/api/reporteResultados/",
//     tipoDispositivo: "http://localhost:81/api/tipoDispositivo/",
//     tipoMediciones: "http://localhost:81/api/tipoMediciones/",
//     users: "http://localhost:81/api/users/",
//     archivosPruebas: "http://localhost:81/api/archivos/consultaMedicion/",
//     descargaTest: "http://localhost:81/api/descargaTest/",
//     socket: "http://192.168.0.3:200/",
// }

export default routesBD;