# Manual Instalación Plataforma MMExP

Este proyecto ha sido desarrollado a través de un stack "MERN", basado en programación con javascript, se utilizaron herramientas de base de datos en MongoDB, servidor de ExpressJS, FrontEnd basado en ReactJS y gestión de NodeJS.

<p align="center">
<img src="https://miro.medium.com/max/1400/1*k0SazfSJ-tPSBbt2WDYIyw.png" width="300">
</p>

Este proyecto se encuentra dividido en un principio, en los contenedores Docker que funcionarán para el levantamiento del sistema, donde cada contenedor del FrontEnd y BackEnd son indispensables para lograr el manejo y gestión de cada característica que el sistema posee.
 
Este Manual de instalación se basa en cómo lograr el levantamiento de cada servicio y como se encuentra configurada la plataforma Online MMExP. Dentro de las carpetas FrontEnd y Backend se encuentra el correspondiente entorno y manual de usuario del uso de cada aspecto del sistema.

## Software Requerido

Este proyecto fue implementado mediante contenedores Docker, por lo que es necesaria su instalación para el manejo y uso de esta plataforma online.
 
<img src="https://www.docker.com/sites/default/files/d8/2019-07/horizontal-logo-monochromatic-white.png" width="200">

Puede descargar Docker Desktop, la aplicación de escritorio de Docker, desde el siguiente enlace: [(Docker Desktop)](https://www.docker.com/products/docker-desktop).
Se utilizó Dockers con actualizaciones automáticas de software, por lo que no hubo problemas con versiones de la aplicación, pero por si es necesario para el usuario, la última versión con la que se trabajó fue la versión "3.4.0 (65384)", la cual posee Docker Engine versión "20.10.7", Compose versión "1.29.2" y Kubernetes versión "v1.21.1".
 
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png" width="50">

Además, para manejar técnicamente el sistema y realizar nuevas implementaciones, se puede utilizar cualquier editor de código, aunque se recomienda utilizar por comodidad y para replicar la misma instancia de desarrollo inicial, "Visual Studio Code" versión "1.62.3 (user setup)", el cual puedes encontrar en el siguiente enlace: [(Visual Studio Code)](https://code.visualstudio.com/updates/v1_62) .


 
## Para Comenzar
 
La estructura que presenta este proyecto se encuentra dividida en 2 contenedores, el primer contenedor es el referente al encargado de configurar los puertos de conexión, el cual es el contenedor de "nginx", el cual determinará los puertos de entrada y salida de cada servicio del proyecto y el ingreso al sistema por parte del cliente. El segundo contenedor abarca todo el proyecto en general, donde este se subdivide en 3 servicios, primero el servicio que funciona como servidor para conectar el servicio de base de datos y las interfaces de la plataforma, luego el servicio de base de datos, encargado de gestionar el manejo de información del sistema, y finalmente el servicio de interfaces de la plataforma que cumple la funcionalidad de mostrar una interfaz para el usuario a modo de plataforma online.
 
### Paso 1:
 
Primero abriremos una terminal de comandos, situada en la carpeta raíz del proyecto.
 
Cada contenedor se inicia de manera independiente, por lo que el primer paso es ejecutar el contenedor de "nginx", ingresando a su carpeta y levantando el servicio de "nginx" de la siguiente manera:
 
#### `cd nginx`
#### `docker-compose up -d`
 
Este comando permitirá que se levante el servicio, el cual utilizara la imagen del servicio de "nginx" que el DockerFile (Archivo de configuración Docker) específica, logrando que su funcionamiento se logre de manera paralela, permitiéndonos levantar la plataforma online de manera simultánea, dentro de la misma consola de comandos.
 
### Paso 2:
Luego, el segundo paso es levantar la plataforma online, por lo que regresaremos a la carpeta anterior, a lo que de forma consiguiente, realizaremos una construcción del proyecto, de forma que el contenedor de Docker se cree con los servicios definidos en cada DockerFile dentro de las carpetas de "frontend" y "backend". Construiremos el contenedor de la siguiente forma:
 
#### `docker-compose build`
 
### Paso 3:
Este paso tomará un poco de tiempo, debido a que se deben crear las imágenes de los contenedores. Una vez completado su creación, se debe de levantar el servicio:
 
#### `docker-compose up`
 
Siendo este el paso final para instanciar y levantar todo lo referente a los contenedores de conexión y la plataforma online.
 
### A continuación:
En la siguiente sección, se presentarán los archivos de configuración de cada servicio, donde es necesario que se configure dependiendo del lugar de conexión del usuario, es decir, deben ser configurables cada vez que se cambie la dirección IP del servicio de hosting donde se alojen.
 
## Configuración del sistema
Para configurar el sistema se deben de tener en cuenta los 2 contenedores, si se quiere configurar algo respectivo a la conexión y los puertos del sistema, se debe verificar en el contenedor de "nginx", si se quiere configurar algo respectivo a la configuración de la plataforma o a su base de datos, se debe ingresar a las carpetas de "frontend" o "backend". En base a que se busca la configuración del sistema para su correcto funcionamiento, se realizará una breve introducción a la configuración de los parámetros de "backend" y "frontend".
 
### Servidor y Base de Datos:
Por el lado de backend, hay 2 archivos importantes que configurar, uno es dentro de la carpeta "backend/src/", el archivo "app.js", el cual obtendrá el puerto de acceso desde su archivo de variables de entorno ".env" o por defecto utilizará el puerto "80", el cual está documentado para utilizarlo de manera local, y que modificar en caso de necesitarlo, y por otro lado, se encuentra el archivo "database.js", el cual contiene la "url" de acceso para conectarse al servicio de base de datos, es decir, por este lado, el primer archivo funcionara para mantener la conexión del servidor hacia las consultas y peticiones que se hagan por el "frontend", y el segundo archivo conservará los parámetros de configuración del levantamiento de la base de datos para que el servidor también los conecte.
 
### Plataforma Online:
 
#### Package.json
Por el lado del frontend, se encuentran 2 archivos importantes para la hora de configurar el funcionamiento del sistema, el primero es referente con el "package.json", el cual, dentro de las configuraciones, a la hora de ejecutar los correspondientes "scripts", concretamente :
 
#### `"start": "PORT=80 react-scripts start",`
 
En caso de requerir utilizar el sistema de manera local, esta configuración debe quedar de la siguiente manera:
 
#### `"start": "set PORT=80  && react-scripts start",`
 
 
#### Rutas
Por otro lado, tenemos el segundo archivo, el cual se encuentra en la ruta "frontend/src/helpers/", específicamente el archivo "routes.js", donde se pueden configurar las rutas de las consultas a la base de datos, ahí se encuentra la variable "rutaBD", la cual sirve para apuntar al dominio de la “api” a la cual realizar las debidas consultas.
 
 
## Archivos Docker
 
Dentro de los archivos de configuración, tenemos el archivo "docker-compose.yml", el cual se encuentra en la carpeta raíz del proyecto, donde su finalidad es lograr la construcción y levantamiento de cada contenedor y servicio Docker del proyecto. Además, dentro de este archivo, es donde se debe configurar el dominio de cada servicio, es decir, la dirección y los puertos por los cuales se conectarán entre sí. Por último, acá también, se debe de configurar la conexión de la red proxy y privadas que el sistema mantiene.
 
Por otro lado, los “DockerFile” dentro de las carpetas, contienen la información de cómo se construye la imagen que se montara de cada servicio, y también deben de coordinar los puertos y se definieron en el archivo "docker-compose.yml", a lo que además, configuran todo para que se construya y levante el contenedor del servicio.

**Nota: Este documento de instalación, contempla que el usuario tenga cierto manejo previo sobre Docker, de forma que se comprenda y esté abierto a nuevas mejoras o implementaciones para el uso de este sistema a futuro**
