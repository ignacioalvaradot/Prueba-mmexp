const routes = {
    login: "/login",
    inicio: "/inicio", 
    Usuarios: "/gestionarUsuarios" ,
    Experimentos: "/experimentos/:tipoExperimentos" ,
    PlanificacionExp: "/planificacion/:id",
    PreparacionExp: "/preparacion/:id",
    PreparacionConfig: "/preparacionConfig/:id",
    PreparacionVerific: "/preparacionVerific/:id",
    FormDialog: "/ejecucion/:id",
    AnalisisExp: "/analisis/:id",
    TestSocket: "/testSocket/",
};

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
}

export default routesBD;