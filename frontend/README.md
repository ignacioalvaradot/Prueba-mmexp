# Manual de Usuario Plataforma MMExP - FrontEnd
Este proyecto ha sido desarrollado a través de un stack "MERN", basado en programación con javascript, herramientas de base de datos en MongoDB, servidor de ExpressJS, FrontEnd basado en ReactJS y gestión general de NodeJS.

<p align="center">
<img src="https://miro.medium.com/max/1400/1*k0SazfSJ-tPSBbt2WDYIyw.png" width="300">
</p>

## Índice

- [Introducción](#introducción).
- [Requisitos Previos](#requisitos-previos).
- [Instalación y Configuración](#instalación-y-configuración).
- [Manejo del Sistema](#manejo-del-sistema).
- [Cambios al Sistema](#cambios-al-sistema).
- [Configuraciones Avanzadas](#configuraciones-avanzadas).
- [Comentarios Finales](#comentarios-finales).


## Introducción
Este proyecto se encuentra basado en la utilización de contenedores Docker, para el levantamiento de cada servicio, como se mencionó en el manual de instalación.
 
MMExP, es una plataforma online enfocada en experimentos basados en tecnologías MMLA (Multimodal Learning Analytics), donde su propósito es gestionar reuniones de distintas índoles, donde se reciba un flujo de datos estadísticos de tecnologías de aprendizaje multimodal, para generar a futuro análisis predictivo de cada reunión realizada, por lo que, el enfoque principal que mantiene la plataforma, es organizar la información y parámetros que una reunión debe de registrar, de forma que el usuario pueda ver de forma más clara, cada componente que el uso de tecnologías MMLA comprende.
 
El manual de usuario presente abarcara los requisitos necesarios por parte del usuario para comprender el manejo del sistema, continuar brevemente en cómo se instalan y configuran ciertos aspectos de la plataforma, como manejar el sistema dentro de cada vista, como realizar cambios de cada funcionalidad de estas vistas y finalizando con las configuraciones avanzadas en ciertos archivos, en caso de ser necesarios por parte del usuario.
 
A continuación, se revisarán los conocimientos y requisitos previos que deben de ser considerados a la hora de manejar el control y uso de la plataforma MMExP.

## Requisitos Previos
Para manejar el sistema e implementar nuevas características sobre el área del "FrontEnd", se debe tener un conocimiento regular sobre los siguientes lenguajes de programación:
 
- JavaScript
- ReactJS
- NodeJS
 
Tener cierto conocimiento sobre JavaScript y ReactJS ayudará al usuario a comprender e idear nuevas formas de mejorar la plataforma, como también entender cada aspecto que este sistema posee. Por otro lado, NodeJS es requerido específicamente para levantar todo este apartado de diseño del sitio web, por lo que además de comprender brevemente su funcionamiento, se debe de tener instalado una versión de este, sobre el sistema que se utilizara. A continuación, se facilitarán todas las versiones de “NodeJS” disponibles, pero, cabe destacar que la versión de NodeJS que el sistema utiliza actualmente es la versión "v12.9.0". [(NodeJS Releases)](https://nodejs.org/es/download/releases/)
 
Adicionalmente, cada dependencia que el sistema posee, esta especificada en los archivos de configuración de la carpeta raíz del “FrontEnd”, siendo estos los archivos "package.json" y "package-lock.json", donde pueden ser revisados para comprobar las versiones que cada dependencia del sistema utiliza e implementar a futuro nuevas características funcionales que puedan generarse por parte del usuario.

## Instalación y Configuración
Una vez Instalado NodeJS en nuestro sistema, se puede proseguir de 2 formas, la primera es simplemente instalar todas las dependencias que tiene registrado el sistema y continuar con el levantamiento de la aplicación, donde este caso solamente es realizado si solo se debe levantar el sistema de forma predeterminada, pero, si se desea levantar el sistema de forma local o con otro tipo de configuración, se recomienda modificar 2 archivos, 1 es el archivo ya mencionado, "package.json" y el otro archivo respectivo a las rutas "routes.js" disponible en la siguiente ruta de archivos "./src/helpers/routes.js". Para esta explicación se abordará el último caso, debido a que el último caso también considera en cierta forma el primero.
 
### Configuración
 
#### Scripts
Primero que nada, abriremos el archivo "package.json", donde buscaremos y modificaremos la siguiente línea de código
 
#### `"start": "PORT=80 react-scripts start",`
 
En caso de requerir utilizar la plataforma de forma predeterminada no modificaremos nada, pero si queremos levantar la plataforma de manera local, esta configuración debe quedar de la siguiente manera:
 
#### `"start": "set PORT=80  && react-scripts start",`
 
Eso bastará para configurar el puerto y ejecutar el script de forma correcta de forma local, debido a que el sistema está pensado para ser levantado como un servicio de Docker. Cabe destacar, que el puerto ("PORT") puede ser el que elija el usuario.
 
#### Rutas
El siguiente paso consiste en cambiar las rutas de especificación para la plataforma, tanto para el dominio local del "FrontEnd", como de las consultas a "BackEnd". Este paso es imprescindible por si se necesita instanciar la plataforma en algún otro dominio, como también de forma local. Pues bien, localizaremos el archivo "routes.js" y cambiaremos las constantes "rutaBD" y "rutaFront", las cuales contienen la información del dominio de la página web para completar las rutas relativas que contiene ese archivo de configuración, las cuales permitirán redireccionar y consultar a las rutas respectivas del apartado del "FrontEnd" y "BackEnd" de la plataforma online.

De ser necesario, en la constante exportada por default, "routesBD", se encuentran todas las rutas relativas relacionadas con las bases de datos, por lo que también se encuentra la ruta por la cual se realiza la conexión por "socket.io", el cual es una herramienta para recibir constantemente un flujo de datos, el cual nos servirá para recibir las mediciones realizadas por las tecnologías de aprendizaje multimodal, por lo que se debe cambiar su ruta, acorde al servicio de envío de mediciones que se utilizará para la plataforma.


## Manejo del Sistema
Una vez configurados los pasos anteriores, se instalarán las dependencias de la plataforma, instanciadas en el archivo de configuración "package-lock.json" y "package.json". Para comenzar vamos a utilizar el siguiente comando: 

#### `npm install`

Este comando permitirá instalar todas las librerías de dependencias que el frontend posee. Una vez instaladas estas dependencias, se procederá a levantar el sistema con el siguiente comando: 

#### `npm start`

Este comando actuara dependiendo de la configuración que se le asigno en el "package.json", tanto por cómo funciona el script, como en el puerto al cual se apunta la plataforma.

Una vez se ejecute este comando y se espere por su iniciación, se habrá logrado el levantamiento correcto de la plataforma MMExP.

A continuación, se procederá a revisar el funcionamiento de cada vista de la plataforma.

### Login

<p align="center">
<img src="https://i.imgur.com/jGyqQH5.png" width="800">
</p>
La primera vista del sistema es para iniciar sesión. Se debe considerar que si es la primera vez que se inicia el sistema, se debe tener un usuario con contraseña, ingresados en el sistema de base de datos, específicamente un nombre de usuario, contraseña, correo y tipo de usuario del sistema. Una vez se puede ingresar a la plataforma, se redirigirá a la siguiente vista.

### Inicio

<p align="center">
<img src="https://i.imgur.com/i4aw98r.png" width="800">
</p>
La vista de inicio comprende desde la creación de nuevos experimentos, donde es posible crear un nuevo experimento ingresando el nombre de este, para luego dirigirse directamente a la vista de planificación de un experimento. También se puede ver la cantidad de experimentos que se encuentran en las distintas etapas de realización, en primer lugar la cantidad de experimentos en planificación, donde se configuran las bases de cada experimento, luego los que se encuentran en preparación deben ingresar sus participantes y dispositivos de registros de mediciones MMLA, tras esto se encuentran los que están en alguna fase de ejecución del experimento, y finalmente los experimentos finalizados. Si uno ingresa a "Ver Experimentos", podrá ver cada experimento en la etapa seleccionada. También se encuentra para el usuario administrador de la plataforma, la vista de "Usuarios", la cual puede ingresar a través de la barra de navegación, como también el cerrar sesión y volver a esta vista de inicio.

### Usuarios

<p align="center">
<img src="https://i.imgur.com/WMyD7D7.png" width="800">
</p>
Esta vista es específica del usuario administrador del sistema, para que así, este pueda registrar y crear nuevos usuarios para la plataforma. Primero se encuentra el campo de nombre de usuario, contraseña, tipo de usuario y correo, donde tipo de usuario se refiere a un usuario específicamente, “regular” o “admin”, siendo estos los parámetros que deben ser ingresados en la plataforma a la hora de crear nuevos usuarios. También se pueden observar cada usuario de la plataforma con la información que se ingresó, además de guardar ciertos cambios que se realicen o se eliminen los usuarios de la plataforma.

### Experimentos

<p align="center">
<img src="https://i.imgur.com/EW99QiQ.png" width="800">
</p>
La vista de experimentos contiene información de todos los experimentos que se encuentren en la etapa seleccionada en la vista de inicio de la plataforma, donde se muestra el nombre del experimento, la fecha del experimento y la última vez que se modificó, además de permitir editar o continuar la configuración del experimento, como también eliminarlo.

### Planificación

<p align="center">
<img src="https://i.imgur.com/e3pqdf5.png" width="800">
</p>
La planificación de un experimento permite al usuario agregar fases o salir a la vista de inicio, donde al agregar fases (idealmente agregarlas todas en un principio) permite configurar los parámetros de cada una de estas, es decir, permitir definir la fecha de realización de cada fase, su hora de inicio y término, descripción de cada fase, links de los documentos que se compartirán en cada fase(documentos de apoyo para las reuniones), además de escoger las mediciones que se van a registrar. Las mediciones que se registrarán deberán ser ingresadas a la base de datos antes de utilizar la plataforma online, el ingreso de estas mediciones está especificado en el manual de usuario del “backend” de la plataforma. Por último, se encuentran los botones de salir al inicio, guardar y salir o continuar de fase para configurar cada una. Cabe destacar que también es posible regresar entre fases, seleccionando la fase previa, en cada punto de la plataforma

Una vez que se termina de configurar cada fase, se le preguntará al usuario si quiere guardar en cada instancia, para que, una vez finalizado, se avance a la etapa de preparación y configuración de los dispositivos y participantes del experimento.

### Preparación - Configuración

<p align="center">
<img src="https://i.imgur.com/FpYnjZc.png" width="800">
</p>
En esta etapa del experimento, se deben configurar en cada fase, los grupos que éstas poseen, los participantes, los dispositivos y las asignaciones de cada uno dentro del experimento.
 
Lo primero es agregar nuevos grupos, mediante el botón "+", donde una vez agregado se debe seleccionar para agregar y cargar nuevos dispositivos a cada grupo. Estos dispositivos deben ser los mismos que contiene el sistema de métricas externo, para así especificar el mismo nombre con el que se recibirán las mediciones de cada dispositivo. Además se debe de ingresar cada tipo de dispositivo al apartado de "Backend" antes de utilizar el sistema para que se registren los canales que este debe poseer y el usuario pueda seleccionarlos.
 
También se encuentra la viñeta de participantes, el cual permite agregar o eliminar participantes al grupo seleccionado, como se puede ver en la siguiente imagen.
 
<p align="center">
<img src="https://i.imgur.com/o6ynqVm.png" width="800">
</p>
 
Por otro lado, es importante que se guarde cada configuración de cada viñeta, una vez que se hayan ingresado o modificado los dispositivos y participantes en cada fase. Una vez se haya guardado estos parámetros, se debe apretar el botón "Ir a Asignaciones Dispositivos", el cual permitirá asignar cada dispositivo ingresado, directamente a cada participante, como se puede apreciar en la siguiente imagen.
 
<p align="center">
<img src="https://i.imgur.com/jKs1K1I.png" width="800">
</p>
En este punto, se le permite al usuario escoger el grupo ingresado en cada fase, para luego seleccionar sus participantes y así, relacionar a cada uno con los dispositivos ingresados con anterioridad. Se debe escoger el dispositivo y el canal que cada uno representa los distintos participantes, guardando así su configuración y continuar, una vez que se hayan relacionados todos los participantes y dispositivos de una fase, hasta la fase siguiente, continuando así, hasta la siguiente etapa, la etapa de "Preparación - Verificación".

### Preparación - Verificación

<p align="center">
<img src="https://i.imgur.com/RslWOPA.png" width="800">
</p>
En esta etapa, es posible verificar que cada canal, de cada dispositivo, de cada participante, reciba correctamente las mediciones asociadas al experimento. Como se puede ver en la imagen, se presenta una tabla de cada fase, donde se pueden observar las configuraciones asociadas en la etapa anterior. Esta vista está conectada directamente con el sistema de mediciones externo, donde cada vez que se toque el botón "Verificar Métricas", evaluará que esté llegando la información solicitada de cada medición.
 
Una vez verificado esto, se debe de avanzar a la etapa de ejecución del experimento.

### Ejecución

<p align="center">
<img src="https://i.imgur.com/qZsDcCB.png" width="800">
</p>
En la etapa de ejecución, se puede observar, todo lo relacionado con la ejecución de un experimento en tiempo real. Primero se presenta la fase actual en ejecución, luego el contador de tiempo del experimento, desde el momento en que se ingresó a esta vista, hasta lo que debe durar el experimento (tiempo configurado en etapa de planificación). La fase en ejecución puede ser detenida en cualquier momento, por parte del botón "Detener Fase".
 
Por otro lado, se presenta la tabla de mediciones realizadas por los dispositivos del sistema de mediciones externo. Esta tabla presenta de forma general, las distintas mediciones registradas en la viñeta "Tabla General", donde en las demás viñetas se mostrarán las mediciones que deben registrarse, las cuales fueron configuradas en la etapa de planificación. Arriba de esta tabla se encuentra el botón Agregar observaciones, el cual permitirá agregar observaciones en tiempo real por parte del gestor de la reunión o experimento. Este botón de observaciones mostrará una ventana sobre la vista actual, que permitirá configurar el tiempo en que se realiza la observación y agregar la descripción respectiva. Las observaciones agregadas se mostrarán en la última tabla de esta vista, la tabla de "Observaciones", la cual permite visualizar la observación, además de poder eliminarla, en caso de tener algún inconveniente.
 
Por último se permite al usuario "Cancelar" la ejecución actual, volviendo así al inicio de la plataforma, como también "Guardar y Salir" o simplemente continuar de fase. Una vez llegado hasta la fase final, se le permite al usuario avanzar a la etapa final de un experimento, la etapa de Análisis.

### Análisis

<p align="center">
<img src="https://i.imgur.com/iwGUcyZ.png" width="800">
</p>
Finalmente, se presenta la vista de análisis de un experimento, donde se puede observar la fase activa que se encuentra mostrando sus datos registrados. El funcionamiento que tiene esta vista es recibir la información limitada del experimento, es decir, por parte de los datos que registro el sistema de mediciones externo, se recibe una muestra de todo lo registrado, más que nada para que el usuario pueda verificar que se registraron datos por parte del sistema de mediciones y este pueda descargarlas. Lo que muestra la viñeta "Tabla General" es distinto a su etapa previa, ya que ahora presenta las configuraciones de los experimentos, es decir, el grupo, los participantes y los dispositivos asociados a cada fase.
 
Los botones debajo de la tabla de mediciones permiten descargar la configuración general del experimento, es decir, lo relacionado con la viñeta "Tabla General", y su descarga se realiza a través de un Excel. Por otro lado, el botón descargar mediciones solicita exportar todas las mediciones registradas por el sistema de mediciones externo, a lo cual este debe de recabar y compactar toda la información solicitada por una fase del experimento, por lo que es externo a lo que realiza la plataforma online. Lo que presenta la plataforma es la imagen siguiente:
 
<p align="center">
<img src="https://i.imgur.com/lmJtBW0.png" width="800">
</p>
Esta imagen, demuestra que se le notificará al usuario del sistema cuando estén disponibles las mediciones para ser descargadas, esto hará que cuando el sistema externo una vez tenga lista la exportación de los datos, notificará a través del correo del usuario, cuando este pueda descargar las mediciones desde un link directo.
 
Finalmente, esto concluye todo el flujo de un experimento y lo que puede ofrecer la plataforma online, permitiendo al usuario tocar el botón "Finalizar Experimento" para volver al inicio del sistema.
 
### Pagina No Encontrada
 
<p align="center">
<img src="https://i.imgur.com/v2Q6nYf.png" width="800">
</p>
Adicionalmente, frente a rutas que no sean de la página, o se hayan equivocado al escribir las direcciones de la página, la plataforma ofrece una página de "error 404 not found!", la cual permite mostrarle al usuario que no se encontró la dirección que él estaba buscando visualizar.


## Cambios al Sistema
A continuación, se indagará sobre los componentes del sistema, por cada vista presentada con anterioridad. Primero se localizarán los archivos relacionados de cada componente y de forma general, ciertas funcionalidades que presenta cada archivo o configuraciones que estos presenten de manera breve.
 
### Login
El archivo login de usuario se encuentra en la siguiente ruta: "./src/components/Login.js". Este login de usuario confirma que el usuario y su contraseña sean correctos, acorde a lo registrado en la base de datos. Además, una vez que el usuario ingrese a la plataforma, se mantendrán los datos de inicio de sesión, almacenados en una variable global. Esta variable global se referencia de los componentes y funciones referentes a los archivos contenidos en la carpeta "auth", los cuales contienen la siguiente ruta: "./src/components/auth/AuthProvider.js" y "./src/components/useAuth.js". El primer archivo, provee la funcionalidad de "logearse" o  “ingresar” en el sistema, cerrar sesión, y ofrecer a las demás vistas, la información del usuario ingresado. El segundo archivo permite darles un contexto a todos los componentes de la plataforma, es decir, si se quiere consultar la información del usuario, se debe de consultar directamente al archivo "useAuth.js" para que disponga la información del "AuthProvider.js" o proveedor de autenticación de usuario, a cada componente que busque utilizar alguna funcionalidad o constante que el sistema de autenticación de usuario provee.

### Inicio
La vista de inicio se encuentra en la siguiente ruta: "./src/components/InicioExperimentos.js". Esta vista se encarga de redireccionar a la vista de experimentos, dependiendo de cual se seleccione, además de consultar por la cantidad de experimentos que se encuentran en las distintas etapas. Este componente además, permite crear nuevos experimentos y registrar el nombre de un nuevo experimento en la base de datos.
 
### Usuarios
El componente usuarios de la ruta: "./src/components/Usuarios.js" se encarga de traer a todos los usuarios en base de datos, permitir cambiar el nombre de los usuarios, el tipo de usuario, la contraseña y su correo. además permite agregar nuevos usuarios ingresando la información solicitada de cada campo, llamando así las funciones de subida de datos, actualización de usuario y eliminación de este respectivamente.
 
### Experimentos
La vista de experimentos se encuentra en la siguiente ruta: "./src/components/Experimentos.js". Esta vista se encarga de traer todos los experimentos, especificados en la ruta “url” que invocó el ingreso a esta vista. El componente es capaz eliminar experimentos de su debida fase y reanudar experimentos desde el punto en que se dejó, más que nada redirecciona dependiendo de la id que posee cada experimento seleccionado en la tabla presente de experimentos.

### Planificación
El componente de planificación de "./src/components/PlanificacionExp.js" contiene funcionalidades como controlar la fecha de un experimento, su hora de inicio y término, traer las mediciones que se encuentran almacenadas en base de datos, volver a traer los datos de un experimento en caso de retomar su etapa de planificación, rellenando así todos los campos que se encontraban registrados previamente, permitir cambiar entre fases de un experimento, permitir crear nuevas fases, cambiar el estado de los "checkbox" de la tabla de mediciones, eliminar la fase desde base de datos, además de poder guardar los datos de cada fase y continuar a la siguiente etapa de un experimento.
 
La funcionalidad más importante y que podría mejorarse, guarda relación con la creación de nuevas fases, debido a que un experimento puede poseer distintas fases, pero a la hora de crear una fase, una vez modificada una fase actual, los contenidos y nuevos datos se pierden debido a que la fase no avanza correctamente, para el usuario que quiera cambiar esta funcionalidad, perfectamente puede revisar e implementar nuevos métodos dentro de la función "agregarNuevaFase".
 
### Preparación - Configuración
La vista de "Preparación - Configuración" que se encuentra en la ruta: "./src/components/PreparacionConfiguracion.js", podría decirse que guarda una gran complejidad, debido a que debe mantener la creación de grupos, dispositivos y participantes, además de proporcionar una debida asignación de cada dispositivo a cada participante. Primero se trae la información reservada en base de datos de cada fase, en caso de contener información previa de los grupos y participantes. En caso de contener información de grupos, seleccionar un grupo permitirá cargar el contenido tanto de dispositivos, como de participantes que estos posean. Cabe considerar, que la recarga de cada componente, se realiza a través de "Banderas" de estado, eso es para considerar que un componente debe ser nuevamente recargado o renderizado, una vez se altere la funcionalidad de algún estado, entonces, para considerar el modificar alguna función referente a esta vista, se debe considerar revisar, si es que además de la función, también depende del cambio de estado de alguna bandera, para volver a refrescar un componente en caso de ser necesario alguna actualización.
 
También es importante destacar el cambio de fases activas, es decir, la función de cambio de fase ("cambiarFaseActiva"), comprende la recarga de varios de los componentes e informaciones que la vista presenta, por lo que debe considerar también, en caso de realizar nuevas implementaciones, que la fase activa debe volver a traer o cambiar los estados de las constantes y variables que posee, para así refrescar completamente alguno de los componentes, en caso de ver que los cambios no se estén realizando en tiempo real o alguna otra inconveniencia que esto presente.
 
### Preparación - Verificación
En la etapa de verificación de un experimento de la ruta: "./src/components/PreparacionVerificacion.js", se comprueba que los dispositivos asignados a cada grupo y participante reciban correctamente las mediciones por medio de la conexión establecida por "socket.io". Como es una etapa de verificación de datos, se consultan los datos de un experimento y sus fases más que nada, por lo que la función más importante de este módulo, corresponde a la función "conectarSocket" el cual recibe datos desde la ruta especificada en el archivo de configuración de rutas, además de filtrar toda la información llegada por parte del sistema externo, es decir, a la hora de realizar cambios, se debe tener en cuenta la cantidad de información que llega, y que esta sea acorde a los datos configurados con anterioridad por parte de cada fase.

### Ejecución
La ejecución de un experimento contempla distintas funciones y flujo de datos. Este componente se encuentra en la ruta: "./src/components/EjecucionExp.js", y este componente presenta distintos aspectos importantes de considerar. En primer lugar se encuentra el tiempo, el cual se concentra en la constante "barraProgreso" y "tiempoActual", debido a que la barra de progreso, avanza en intervalos dependientes del tiempo, debido a que el tiempo puede ser distintos en cada fase, la barra de progreso debe de avanzar acorde al nivel de porcentaje de tiempo que esto signifique para la fase, por lo que funciones importantes para calcular el tiempo de la fase y cuánto significa esto, se encuentran en ciertas funciones como "calcularTiempoFases", "calcularTiemposActuales" y "detenerFase", los cuales calculan el tiempo de cada fase, el tiempo actual y permiten detener la fase actual, el contador de tiempo y la barra de progreso.
 
Al igual que en componentes previos, este módulo también presenta las funciones de "conectarSocket" y "desconectarSocket", los cuales pueden ser revisados acorde a lo que necesite el usuario mostrar por las tablas que registran cada medición recibida por el servicio de mediciones externo.
 
Por otro lado, las funciones "enviarDatos" y "guardarObservacion", se encuentran relacionados con el ingreso y actualización de la información de las tablas de observaciones relacionadas con la fase actual, para tener en consideración a la hora de realizar implementaciones en esta área.
 
### Análisis
El componente de la ruta "./src/components/AnalisisExp.js", contiene las funciones respectivas para cargar información desde archivos enviados por parte del sistema de mediciones externos. La función "traerArchivos", permite cargar la tabla de la viñeta actual de mediciones, dependiendo del archivo "Excel" que envié este, ajustándose a la disponibilidad de filas y columnas que esté presente, siendo idealmente un componente que cargue información de muestra con baja cantidad de registros, para así no mostrar toda la cantidad de información que se registró en un experimento debido a las grandes cantidades de datos que estos pueden significar. 

Es necesario que el equipo de desarrollo, en caso de necesitarlo, revise las funciones de carga de cada viñeta de la tabla, acorde a las mediciones del sistema de mediciones externo, debido a que este apartado de momento funciona con datos de pruebas, subidos en la plataforma de base de datos, pero una vez que el sistema de mediciones externo genere datos de prueba, estos deben ser rellenados en cada viñeta de la tabla de mediciones correctamente a como los envía el servicio externo.
 
También "parametrosGenerales", "exportToCsv" y "handleModalDescargar" permiten generar y descargar la información de la fase, las primeras funciones traen y generan un archivo de descarga en formato "Excel", para descargar las configuraciones de un experimento, referente a sus parámetros de grupos, participantes y dispositivos que están configurados en la etapa de preparación. También la última función, está enfocada en que se realice la conexión con el sistema de mediciones externo, avisando de que debe generarse un enlace de descarga de los datos de mediciones MMLA, recabados de la fase actual del experimento.
 
### Pagina No Encontrada
Como vista extra, se considera el componente de la ruta "./src/components/PrivateRoute.js", como un componente capaz de ser llamado, cada vez que se intente ingresar a alguna ruta que no es de las especificadas en el archivo enrutador de vistas, localizado en "./src/routers/AppRouter.js".

## Configuraciones Avanzadas
A continuación, se considerarán algunos archivos de configuración de la plataforma MMExP.
 
### Navegación
Este componente corresponde a la barra de navegación de la plataforma, el cual dependiendo del tipo de usuario que se encuentre ingresado, escogerá si presentar o no ciertos enlaces, como el caso de presentar o no el acceso a la vista de gestión de usuarios de la plataforma.
 
### Rutas
Las rutas son un aspecto importante para la plataforma, debido a que primero es importante considerar las rutas específicas de cada vista, especificadas en el archivo "./src/helpers/routes.js", el cual contiene el dominio y las rutas del sistema. Por otro lado, se especifican las rutas públicas y privadas mediante los componentes "PrivateRoute.js" y "PublicRoute.js", además de ser componentes llamados a través del componente principal "./src/routers/AppRouter.js", el cual presenta las condiciones para ingresar a cada ruta y si es una ruta privada o pública.
 
### App.js
Finalmente el componente que instancia principalmente los componentes globales para los demás archivos viene desde la carpeta raíz del apartado del “frontend” de la plataforma, refiriéndonos al archivo "./App.js", este componente instancia el componente que enruta las distintas vistas del sistema, instancia al proveedor de autenticación de usuarios, y llama al enrutador "AppRouter" de la plataforma. 

## Comentarios Finales
 
Esperando que esta guía sea de ayuda para el usuario y permita mejorar el sistema a futuro, además de que cada punto haya sido abordado y desarrollado satisfactoriamente para el lector, se espera que pueda levantarlo y manejarlo de manera satisfactoria, deseando lo mejor del camino de desarrollo para el usuario.
 
***Hasta la Próxima y Suerte!***


**Nota: Este Manual de usuario, contempla que el usuario tenga cierto manejo previo sobre Docker, JavaScript y ReactJS, de forma que se comprenda por parte del usuario y esté abierto a nuevas mejoras o implementaciones para el uso de este sistema a futuro**
