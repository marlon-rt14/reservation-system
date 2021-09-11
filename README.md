# reservation-system
Reservation system with NodeJs, express &amp; MySQL MariaDB

## TECNOLOGIAS USADAS
- NodeJS v14.17.6 Stable
- npm v7.21.1 Stable
- MariaDB v10.3.31 con versión de MySQL 15.1

## REQUERIMIENTOS<br>
_Las instrucciones de instalación pueden variar dependiendo del sistema operativo usado_
- <a href="https://nodejs.org/en/">Tener instalado NodeJS versión >= 10</a> (Verificar la version de npm después de instalar NodeJS)
- Tener instalado npm versión >= 4
- Tener instalado un Motor de BDD de preferencia para MySQL

## EJECUCION
- Crear la base de datos con el script db.sql que se encuentra en la carpeta "database"
1. Copiar todo el script
2. Abra una nueva consulta en el gestor de base de datos que tenga instalado
3. Pegar el script. En esta parte puede cambiar el nombre de la BDD en ```CREATE DATABSE nuevo_nombre``` y en ```USE nuevo_nombre```, no recomendado
4. Ejecutar el script

### Configurar el logger en la base de datos
- Abrir el gestor de base de datos y abrir una nueva consulta
**Ejecutar**
> set global general_log = 1;
> set global log_output = 'table';

**NOTA: Es importante limpiar este logger cada cierto tiempo porque consumirá espacio. Ejecutar**
> truncate table mysql.general_log;

**Deshabilitar el logger**
> set global general_log = 0;
  
#### Errores y advertencias con la base de datos
1. Advertencias caracterizadas por un triángulo de color amarillo puede ignorarlas. </li>
2. Si al ejecutar el script se muestra un mensaje de error puede eliminar la base de datos con el comando ```DROP DATABASE nombre_de_la_BDD``` y ejcutar las sentencias una a una. Revisar y corregir la sentencia causante del problema.</li>
  
- Abrir el terminal y dirigirse a la carpeta del proyecto. Use el comando ```cd``` para ello.
- Cuando en el terminal vea un archivo "package.json" ejecute este comando ```<npm install package.json```. Comenzará a instalar todos los módulos y dependencias necesarios para el funcionamiento de este proyecto
- Dirigirse a la carpeta "src"
- Al abrir el archivo "keys.js" puede configurar la conexión con la base de datos. Cámbielos de acuerdo a su configuración del motor de BDD
- Regresar a la carpeta inicial que contiene todo el proyecto.
- Ejecutar el comando ```npm run dev``` La consola mostrará que el servidor está corriendo el puerto 3000
- Puede abrir el sistema en la direccion http://localhost:3000

## MAS CONFIGURACIONES
- Para cambiar el puerto diríjase al archivo "src/index.js" en settings
- Para cambiar el comando ```npm run dev``` abrir el archivo "/package.json" en "scripts"  cambiando la palabra "dev" por "nuevo-nombre", asegúrese que este entre comillas. Después diríjase a la carpeta principal que contiene el proyecto y ejecute el comando ```npm run nuevo-nombre```
    



