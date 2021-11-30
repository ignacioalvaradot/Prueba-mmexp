# Manual de Usuario Plataforma MMExP - BackEnd
Este proyecto ha sido desarrollado a través de un stack "MERN", basado en programación con javascript, herramientas de base de datos en MongoDB, servidor de ExpressJS, FrontEnd basado en ReactJS y gestión general de NodeJS.
 
<p align="center">
<img src="https://miro.medium.com/max/1400/1*k0SazfSJ-tPSBbt2WDYIyw.png" width="300">
</p>
 
## Índice
 
- [Introducción](#introducción).
- [Requisitos Previos](#requisitos-previos).
- [Instalación y Configuración](#instalación-y-configuración).
- [Manejo de la Base de Datos](#manejo-de-la-base-de-datos).
- [Cambios y Configuraciones Avanzadas](#cambios-y-configuraciones-avanzadas).
- [Comentarios Finales](#comentarios-finales).

 
## Introducción
Este proyecto se encuentra basado en la utilización de contenedores Docker, para el levantamiento de cada servicio, como se mencionó en el manual de instalación.
 
MMExP, es una plataforma online enfocada en experimentos basados en tecnologías MMLA (Multimodal Learning Analytics), donde su propósito es gestionar reuniones de distintas índoles, donde se reciba un flujo de datos estadísticos de tecnologías de aprendizaje multimodal, para generar a futuro análisis predictivo de cada reunión realizada, por lo que, el enfoque principal que mantiene la plataforma, es organizar la información y parámetros que una reunión debe de registrar, de forma que el usuario pueda ver de forma más clara, cada componente que el uso de tecnologías MMLA comprende.
 
El manual de usuario presente abarcara los requisitos necesarios por parte del usuario para comprender el manejo de la base de datos y el servidor, continuar brevemente en cómo se instalan y configuran ciertos aspectos de este "BackEnd", como manejar la base de datos, como realizar cambios de la estructura de datos y finalizando con las configuraciones avanzadas en ciertos archivos, en caso de ser necesarios por parte del usuario.
 
A continuación, se revisarán los conocimientos y requisitos previos que deben de ser considerados a la hora de manejar el control y uso de la base de datos de la plataforma MMExP.
 
## Requisitos Previos
Para manejar el sistema e implementar nuevas características sobre el área del "BackEnd", se debe tener un conocimiento regular sobre las siguientes herramientas y lenguajes de programación:
 
- JavaScript
- MongoDB
- ExpressJS
- NodeJS
- Insomnia
 
Tener cierto conocimiento sobre JavaScript ayudará al usuario a comprender e idear nuevas formas de mejorar la estructura de la base de datos, como también entender cada aspecto que este sistema posee. Por otro lado, “NodeJS” es requerido específicamente para levantar y gestionar todo este apartado de “ExpressJS” y “MongoDB”, por lo que además de comprender brevemente su funcionamiento, se debe de tener instalado una versión de estas herramientas, sobre el sistema que se utilizara. A continuación, se facilitarán todas las versiones de “NodeJS” disponibles, pero, cabe destacar que la versión de NodeJS que el sistema utiliza actualmente es la versión "v12.9.0". [(NodeJS Releases)](https://nodejs.org/es/download/releases/). La versión de “ExpressJS” utilizada es la versión "4.17.1" y la versión de MongoDB es la versión "^5.12.15". Además, se requiere la utilización de alguna herramienta que realice peticiones "HTTP" a la "Api" del sistema, esto con el fin de incorporar datos iniciales sobre la base de datos, donde por preferencia de simpleza y facilidad, se decidió utilizar la herramienta [Insomnia](https://insomnia.rest), en su versión "2021.6.0". Una alternativa de Insomnia, que en algunos aspectos es bastante similar, es "[Postman](https://www.postman.com)", en caso de que el usuario se maneje más con esta herramienta, puede ser una alternativa viable.
 
Adicionalmente, cada dependencia que el sistema posee, esta especificada en los archivos de configuración de la carpeta raíz del “BackEnd”, siendo estos los archivos "package.json" y "package-lock.json", donde pueden ser revisados para comprobar las versiones que cada dependencia del sistema utiliza e implementar a futuro nuevas características funcionales que puedan generarse por parte del usuario.
 
## Instalación y Configuración
 
Una vez Instalado NodeJS en nuestro sistema, se puede proseguir de 2 formas, la primera es simplemente instalar todas las dependencias que tiene registrado el sistema y continuar con el levantamiento de la aplicación, donde este caso solamente es realizado si solo se debe levantar el sistema de forma predeterminada, pero, si se desea levantar el sistema de forma local o con otro tipo de configuración, se recomienda modificar 2 archivos, el primero es el archivo "./src/app.js", donde modificaremos exactamente esta línea:
 
#### `app.set('port', process.env.PORT || 80);`
De forma que eliminemos la opción de escoger el puerto desde una variable de entorno, y que nosotros podamos escogerlo específicamente de la siguiente forma:
 
#### `app.set('port', 81);`
Lo que configura el puerto del servidor en el puerto 81, condicionando así la conexión del servidor, acorde al puerto que estime más conveniente el usuario.
 
El otro archivo importante para cambiar está en la ruta "./src/database.js", referente a la conexión de la base de datos. Este archivo instancia la conexión de MongoDB del sistema, por lo que se debe cambiar la constante "URI", la cual servirá para referirse a la base de datos de mongo que se utilizará, es decir debe de cambiarse por conveniencia del usuario, en el caso local, se puede asignar de la siguiente forma:
 
#### `const URI = 'mongodb://localhost/mongodatabase';`
 
Y con eso finalizamos las configuraciones necesarias para levantarlo de manera local, cualquiera de estas configuraciones pueden ser alteradas a conveniencia del usuario, además de los otros archivos de configuración, pero por nuestro lado, eso será lo suficiente para levantar el sistema de base de datos.
 
Para continuar se levanta el sistema con el siguiente comando en la consola del sistema:
 
#### `npm run dev`
 
Lo cual se debe esperar a que se confirme la conexión del servidor y la base de datos.
Ahora se procederá a continuar con el uso y manejo de la base de datos.


## Manejo de la Base de Datos
Primero que nada, la estructura de la base de datos en MongoDB está orientada de forma que mediante las rutas especificadas, se realicen consultas del protocolo "HTTP", es por esto por lo que en términos estructurales de cómo se almacenan y configuran, se optó por este tipo de base de datos, debido a su simpleza y facilidad de uso. Las rutas base de la "Api", donde se deben realizar cada consulta, por cada entidad del sistema, están documentadas en el archivo principal del servidor "./src/app.js".
 
Para comenzar, se debe considerar 2 tópicos, el primero es en cómo está organizado cada módulo, y lo segundo es, que datos deben de estar en la base de datos, antes de utilizar la plataforma online. Para el primer punto, se debe mencionar que se utilizó una estructura de ruta, modelo y controlador, es decir, mediante las respectivas rutas de cada entidad de la base de datos, se realizan consultas acordes al modelo de estructura "JSON", para almacenar objetos en la base de datos, de forma que al enviar estas estructuras a las rutas, el controlador derivara el funcionamiento de lo que se reciba. Como es una estructura basada en una "Api" y conservando el protocolo "HTTP", se realizarán consultas de tipo "GET","POST","UPDATE" Y "DELETE", por lo que a la hora de realizar cualquier consulta, se realizarán acorde a esa estructura.
 
Entonces para sintetizar, la organización de cada funcionalidad se encuentra definida desde las rutas para realizar consultas, los modelos que son la estructura de base de cada entidad y los controladores que contienen la funcionalidad de una entidad. Esto permitirá al usuario identificar dónde debe modificar o ingresar a la hora de realizar algún cambio, o comprender los atributos y requerimientos de cada consulta a realizar.
 
Para manejar en un inicio la base de datos, se deben de agregar ciertas informaciones a esta antes de utilizar la plataforma online, debido a que habrá datos que deben estar definidos para no presentar ciertos problemas o errores, a la hora de utilizar el sistema completo. Las entidades más importantes que deben tener un registro son:
 
 - Usuarios
 - Mediciones
 - Dispositivos
 - Archivos (Solo en caso de no contar con servicio de mediciones externo)
 
### Usuarios
Los usuarios del sistema permitirán iniciar sesión en este, por lo que es importante que el usuario revise las estructuras de cada entidad, y que datos se requieren a la hora de realizar una consulta "Post" para crear nuevos usuarios, esto, con la finalidad de que cree un usuario administrador en la plataforma, ya que una vez obtenido un usuario administrador, es posible crear nuevos usuarios a partir de este en la plataforma online (explicado en el manual de usuario del "FrontEnd"). Vamos a dar un ejemplo de un objeto "JSON" de prueba para que el usuario pueda crear fácilmente un usuario en la plataforma y tenga una idea de este paso.
**Nota: Es necesario destacar que estos pasos son obligatorio, por lo que es de suma importancia realizar esta configuración antes de utilizar la plataforma online MMExP.**
 
```javascript
{
    "tipoUsuario": "admin",
    "nombreUsuario": "Admin",
    "contraseña": "12345678",
    "correo": "test@correo.test"
}
```
Aquí se puede apreciar la estructura de un objeto, respecto a un usuario, este objeto, debe ser enviado a la ruta específica en el archivo de rutas "./src/routes/users.js", donde se debe realizar mediante un método "POST", el cual para facilidad del usuario, se documentará el envío a la siguiente ruta (dependiendo del levantamiento de la base de datos):

#### `http://localhost:81/api/users` (En caso Local)
 ó
#### `http://api.mmexp.informatica.uv.cl/api/users` (En caso del Docker)
 
Esto permitirá al usuario mediante el método "GET", el consultar si el usuario fue creado o no dentro de la plataforma. Si el usuario fue creado correctamente, se le notificara con un mensaje, a través de la consola de la herramienta de consultas a utilizar, si es que su creación fue exitosa o no, en caso de no serlo, debe verificar el tipo de dato que se deben enviar dentro del archivo "./src/models/User.js", y, en caso de necesitar mayores informaciones, puede consultar cómo se reciben y procesan los datos que está enviando dentro del controlador de la misma entidad en "./src/controllers/users.controller.js".
 
Una vez creado el usuario administrador correctamente, se procederá a ingresar las mediciones MMLA al sistema de base de datos.

### Mediciones
Los registros de mediciones permiten al usuario seleccionar, al momento de planificar un experimento, cada medición a registrar en la etapa de ejecución, por lo que para seleccionar mediciones MMLA, primero se deben ingresar las mediciones que se recibirán por parte del sistema de mediciones externo. Por facilidad de uso, se recomienda conservar los mismos nombres que utilizan en el sistema externo. Para añadir nuevos registros, se debe de tener en cuenta las rutas, modelos y controladores de esta entidad, los cuales son "./src/routes/mediciones.js", "./src/models/Medicion.js" y "./src/mediciones.controller.js".
 
Para generar mediciones de pruebas se ingresarán 2 mediciones, considerando que en el paso siguiente se ingresarán dispositivos de cámara y micrófono (sólo para este caso de prueba, el usuario puede acomodarse de acuerdo con sus requisitos o propósitos).
 
```javascript
{
    "dispositivosAsociados": ["Micrófono"],
    "idTipoMedicion": "1",
    "nombre": "Tiempo Habla",
}
 
```
Este primer registro considera los dispositivos que tendrá esta medición asociados, para que más adelante, la plataforma permita identificar de qué dispositivos deberían llegar las mediciones. El "idTipoMedicion", conserva la lógica para que la plataforma online los represente de manera organizada, pero está abierto a que a futuro la entidad "TipoMediciones", permita darle un mayor uso en cuanto a los requerimientos del usuario. Finalmente nombre de esta medición será "Tiempo Habla" y buscará registrar el tiempo de habla de cada participante de una reunión. En base a esto se enviará este objeto "JSON", por método "POST", a la siguiente ruta:

#### `http://localhost:81/api/mediciones` (En caso Local)
 ó

#### `http://api.mmexp.informatica.uv.cl/api/mediciones` (En caso Docker)
 
Una vez ingresado correctamente en la herramienta de consultas HTTP (Insomnia en nuestro caso), se procederá a ingresar el segundo registro, que poseerá cámara y medirá los tipos de postura de cada participante de la reunión.
 
```javascript
{
    "dispositivosAsociados": ["Cámara"],
    "idTipoMedicion": "2",
    "nombre": "Postura",
}
```
 
Una vez ingresado correctamente, de la misma manera que el objeto anterior, se procederá a verificar su ingreso mediante el método "GET" a la misma ruta anterior, continuando así con el ingreso de los dispositivos de las mediciones.

### Dispositivos
Los dispositivos por ingresar, como consideramos con anterioridad, son un dispositivo de cámara y otro dispositivo de micrófono. Estos dispositivos tienen mayor relación con un tipo de dispositivo, ya que su información es relevante de consultar para saber cuántos canales posee cada uno, ya que más adelante, los dispositivos agregados en cada experimento, pasarán a ser un campo exclusivo de cada grupo y participante, es decir, una vez que la plataforma se encuentre en uso, no se registraran cada dispositivo de medición, si no que cada dispositivo debe ser ingresado por parte del usuario y estos tendrán relación con el nombre que recibe cada dispositivo en su sistema de mediciones externo, por lo que, en nuestro lado de base de datos, solo registraremos los tipos de dispositivos que se medirán en cada experimento, y estos puedan ser seleccionados por parte del usuario en la etapa de "Preparación - Configuración".
 
Las rutas de esta entidad se encuentran en el archivo "./src/routes/dispositivos.js", su modelo de objetos en "./src/models/Dispositivo.js" y su controlador en "./src/controllers/mediciones.controller.js". Ahora se procederá a ingresar primero un tipo de dispositivo de cámara y luego un tipo de micrófono, de la siguiente estructura:
 
```javascript
{
      "nombre": "Micrófono",
      "canales": 5
}
```
Este primer registro, permitirá seleccionar más adelante el tipo de dispositivo a registrar y el canal específico, relacionado con cada participante de una fase del experimento. En base a esto se enviará este objeto "JSON", por método "POST", a la ruta:
 
#### `http://localhost:81/api/dispositivos` (En caso Local)
 ó
 
#### `http://api.mmexp.informatica.uv.cl/api/dispositivos` (En caso Docker)
 
Una vez ingresado correctamente en la herramienta de consultas "HTTP", se procederá a ingresar el segundo registro, que será un tipo de cámara.
 
```javascript
{
      "nombre": "Cámara",
      "canales": 4
}
```
Finalmente, estos serán los registros **más importantes** del sistema, a la hora de utilizar la plataforma online.
 
A continuación, se considerará el caso de subir archivos "Excel", en formato ".csv" a la plataforma, para tener en cuenta en caso de no disponer directamente de un servidor de mediciones para generar data de prueba, específicamente, para la etapa de análisis de un experimento.

### Archivos (Solo en caso de no contar con servicio de mediciones externo)
En caso de no contar con un servidor de mediciones externo, o se requiera levantar de manera específicamente local, se pueden ingresar archivos de formato ".csv" en la base de datos del sistema. Principalmente se sube un archivo dentro del servidor, directamente en la ruta "./src/uploads", y al subirse, se registra en la base de datos su dirección de ruta y a qué tipo de medición se encuentra asociado. Para lograr esta subida, "Insomnia" permite estructurar un tipo de consulta a la base de datos (Postman también tiene su forma), de manera que, dentro de las viñetas de la herramienta, se puede escoger la estructura con que se enviará la información, se debe configurar en vez de estructura tipo texto de "JSON", a una estructura de formularios en múltiples partes o "Multipart Form", formato el cual permite escoger un archivo del computador o sistema local, además de incorporar ciertos campos de texto como atributos del registro.
 
Para que el usuario pueda observar, el envío se realiza de la siguiente manera:
 
<p align="center">
<img src="https://i.imgur.com/sx3nH23.png" width="800">
</p>
 
Aquí se puede apreciar la subida del campo "archivo" con el documento a subir, y el campo "medicion" con el tipo de medición a la cual se refiere, todo mediante el método "POST", recibiendo como resultado, una confirmación de que el archivo de prueba fue creado y subido exitosamente. En este ejemplo la ruta de envío de la consulta es la siguiente:
 
#### `http://localhost:81/api/archivos` (En caso Local)
 ó
 
#### `http://api.mmexp.informatica.uv.cl/api/archivos` (En caso Docker)
 
Finalmente, los archivos de prueba subidos se encontrarán en el siguiente enlace para ser descargados por cualquier usuario que quiera utilizarlos para subir datos de prueba al sistema y verificarlos en la etapa de análisis. [(Enlace Archivos de Prueba)](https://mega.nz/folder/Z5ZBWK4J#kSnJWV_vEsmIm3Ue--4boA).
 
Para finalizar este apartado del manejo de la base de datos, cada estructura de cada entidad se encuentra organizada, como ya se mencionó con anterioridad, de forma que las rutas, los modelos de datos y los controladores, estén organizados de forma que puedan revisarse y generar nuevas implementaciones o mejoras. En base a estos registros creados hasta este punto, ya es posible utilizar el sistema de Plataforma online sin mayores complicaciones tanto de forma local como con la utilización de Docker.
 
A continuación se analizarán ciertos detalles de algunas entidades que podrían ser de utilidad en implementaciones futuras.
## Cambios y Configuraciones Avanzadas
Para que el usuario considere ciertos detalles o entidades a las cuales puede aferrarse a futuras implementaciones, se tienen las entidades "descargaTest", "archivoPrueba", "reporteResultados", "tipoDispositivos" y "tipoMediciones", las cuales en un principio buscaban implementar las funcionalidades que estas describen en sus nombres, pero que en caso de no ser necesarios, no son tan relevantes para el sistema. En retrospectiva, son entidades que tenían un propósito inicial, y que son fácilmente removibles, pero que se conservaron para darle un enfoque a futuro de la plataforma y un apoyo en caso de ser necesitadas por algún equipo de desarrollo futuro. Es por esto, que hay que considerar algunas que cumplen un mayor propósito, como es el caso de "archivoPrueba", esta entidad es crucial en caso de que no se disponga de un sistema de mediciones externo, debido a que deben subirse archivos de prueba de cada medición para que el sistema sea capaz de consultarlos en la etapa de análisis (en caso de poseer un sistema, el equipo de desarrollo debe modificar ese apartado en el “FrontEnd” de la plataforma, específicamente en el componente "AnalisisExp.js", del lado del “FrontEnd” y las rutas respectivas).
 
Otro punto para considerar es "DescargaTest", el cual es una entidad que ayudaba a descargar el archivo de mediciones de la medición de cada fase del experimento, punto por el cual se consideró descargar las mediciones desde el servidor externo, por lo que su funcionalidad no fue llevada a cabo de manera significante, y es un punto que puede ser impulsado o simplemente desechado a futuro.
 
Como estructura importante y para finalizar este apartado, la estructura principal que debe de mantenerse, o considerarse importante para el sistema que busque mejorar esta base de datos, es conservar la idea de que un Experimento, contiene fases (reuniones o pequeñas etapas), de las cuales, cada fase posee un grupo de participantes, y estos grupos a su vez participantes, y esos grupos y participantes contienen la información de los dispositivos y canales, como también una fase posee observaciones.
 
## Comentarios Finales
 
Esperando que esta guía sea de ayuda para el usuario y permita mejorar el sistema a futuro, además de que cada punto haya sido abordado y desarrollado satisfactoriamente para el lector, se espera que pueda levantarlo y manejarlo de manera satisfactoria, deseando lo mejor del camino de desarrollo para el usuario.
 
***Hasta la Próxima y Suerte!***


**Nota: Este Manual de usuario, contempla que el usuario tenga cierto manejo previo sobre Docker, JavaScript, MongoDB, ExpressJS y alguna herramienta de consultas del protocolo "HTTP" de forma que se comprenda por parte del usuario y esté abierto a nuevas mejoras o implementaciones para el uso de este sistema a futuro**
