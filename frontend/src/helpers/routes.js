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
let rutaBD = "http://localhost2/"
const routesBD = {
    dispositivos: rutaBD + "api/dispositivos/",
    experimentos: rutaBD + "api/experimentos/",
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